import { ExecutorContext, names } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';
import { stat } from 'fs/promises'
import {resolve, join} from 'path'
import { copyAssets } from '@nrwl/js'
import { build, InlineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {

  const projectRoot = context.workspace.projects[context.projectName].root;
  const outRoot = join('dist/packages', context.projectName, 'dist')
  const outputPath = resolve(context.root, outRoot)
  const outDir = join(outRoot, 'dist')

  const name = names(context.projectName).className;

  const inlineConfig: InlineConfig = {
    root: context.root,
    plugins: [vue()],
    build: {
      target: 'modules',
      outDir,
      lib: {
        entry: resolve(projectRoot, 'src/index.ts'),
        name,
        fileName: name,
        formats: ["cjs", 'es']
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue"
          }
        }
      },
    }
  }

  /* check to make sure all files are there */
  await Promise.all([
    stat(resolve(projectRoot,'package.json')), /* will error if no package.json */
    // todo: put rest of the file checks here
  ])

  /* then build */
  await Promise.all([
    build(inlineConfig),
    copyAssets(
      {
        outputPath,
        assets: [
          {
            input: projectRoot,
            output: '.',
            glob: 'package.json'
          }
        ]
      },
      context
    ) // use createPackageJson https://github.com/nrwl/nx/blob/f3465a9c0760692c39bba97ab72fc21a4b12ff19/packages/nx/src/utils/create-package-json.ts ??
  ])

  return {
    success: true
  };
}
