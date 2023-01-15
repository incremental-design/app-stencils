import * as path from 'path'
import {stat, readFile, writeFile} from 'fs/promises'
import { ExecutorContext } from '@nrwl/devkit';
import type * as Prettier from 'prettier';
import { FormatExecutorSchema } from './schema';

export async function getPrettier(){

  let prettier: typeof Prettier;

  try {
    prettier = await import('prettier');
  } catch (e){
    console.error(e)
  }

  if(!prettier) return false;

  return prettier;

}

export async function getPrettierOptions(prettier: typeof Prettier, root: string){
  const editorconfig = await (async () => {
    try {
      await stat(path.join(root, '.editorconfig'))
      return true
    } catch (e) {
      return false
    }
  })()

  return prettier.resolveConfig(root, {
    editorconfig
  })
}

export default async function runExecutor(
  options: FormatExecutorSchema,
  context: ExecutorContext,
) {

  const toFormat = context.projectGraph.nodes[context.projectName].data.files.map(fileObject => path.join(context.root,fileObject.file)) as unknown as Array<string> /* file paths to format, relative to workspace root. Note that this is strongly coupled to ExecutorContext */

  /* see: https://github.com/nrwl/nx/blob/master/packages/devkit/src/generators/format-files.ts */

  const prettier = await getPrettier();

  if(!prettier) return {
    success: false
  }

  const resolvedOptions = await getPrettierOptions(prettier, context.root)

  await Promise.all(toFormat.map(async(file) => {

    const {ignored, inferredParser} = await prettier.getFileInfo(file)

    if(ignored) return;

    const p = {
      parser: inferredParser
    }

    if(file.endsWith('.swcrc')){
      p.parser = 'json'
    }

    const options = {
      ...p,
      ...resolvedOptions
    }


    const contents = await readFile(file);

    const f = prettier.format(contents.toString('utf-8'), options)
    await writeFile(file, f)
  }))


  return {
    success: true
  };
}

// use tree to run prettier api, and then write files back out
