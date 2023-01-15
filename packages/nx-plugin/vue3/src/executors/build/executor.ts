import { ExecutorContext, runExecutor } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';
import * as path from 'path'
import {readFile, writeFile} from 'fs/promises'
import { getPrettier, getPrettierOptions } from '../format/executor'

export default async function* build(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {

  const project = context.projectName
  const target = 'vite-build'
  const configuration = options.viteConfig

  /* see: https://nx.dev/recipes/executors/compose-executors */
  for await (const output of await runExecutor(
    {project, target, configuration},
    {},
    context
  )) {
    if(!output.success) throw new Error('vite build failed'); // todo: verify that @nrwl/vite is actually installed
    yield;
  }

  const {outputPath} = context.projectsConfigurations.projects[context.projectName].targets['vite-build'].options

  const outDir = path.join(context.root, outputPath)

  const packageJsonPath = path.join(outDir, 'package.json')

  const contents = await readFile(packageJsonPath, 'utf-8')

  const packageJson = JSON.parse(contents);

  packageJson.module = 'index.mjs'
  packageJson.main = 'index.js'
  packageJson.types = 'index.d.ts'

  const contentsToWrite = JSON.stringify(packageJson)

  const prettier = await getPrettier()

  if(!prettier){
    await writeFile(packageJsonPath, contentsToWrite )
  } else {
    const prettierOptions = await getPrettierOptions(prettier, context.root)
    const formatted = prettier.format(contentsToWrite, {...prettierOptions, parser: 'json'})
    await writeFile(packageJsonPath, formatted)
  }


  return {success: true}
}
