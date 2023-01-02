import * as path from 'path'
import {stat, readFile, writeFile} from 'fs/promises'
import { ExecutorContext } from '@nrwl/devkit';
import type * as Prettier from 'prettier';
import { FormatExecutorSchema } from './schema';

export default async function runExecutor(
  options: FormatExecutorSchema,
  context: ExecutorContext,
) {

  const toFormat = context.projectGraph.nodes[context.projectName].data.files.map(fileObject => path.join(context.root,fileObject.file)) as unknown as Array<string> /* file paths to format, relative to workspace root. Note that this is strongly coupled to ExecutorContext */

  /* see: https://github.com/nrwl/nx/blob/master/packages/devkit/src/generators/format-files.ts */

  let prettier: typeof Prettier;

  try {
    prettier = await import('prettier');
  } catch (e){
    console.error(e)
  }

  if(!prettier) return {
    success: false
  }

  const editorconfig = await (async () => {
    try {
      await stat(path.join(context.root, '.editorconfig'))
      return true
    } catch (e) {
      return false
    }
  })()



  const resolvedOptions = await prettier.resolveConfig(context.root, {
    editorconfig
  })

  await Promise.all(toFormat.map(async(file) => {

    const {ignored, inferredParser} = await prettier.getFileInfo(file)

    if(ignored) return;

    // const parser = (() => {
    //   const p = {}

    //   if(file.endsWith('.swcrc')){
    //     p['parser'] = 'json'
    //   }
    //   return p;
    // })()

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
