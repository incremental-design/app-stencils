import { ExtractApiExecutorSchema } from './schema';
import {
  Extractor,
  ExtractorConfig,
} from '@microsoft/api-extractor'
import * as path from 'path'
import { ExecutorContext } from '@nrwl/devkit';
import { readdir, rm } from 'fs/promises'

export default async function runExecutor(
  options: ExtractApiExecutorSchema,
  context: ExecutorContext
) {

  const tsconfigFilePath = path.resolve(
    context.root,
    context.workspace.projects[context.projectName].root,
    'tsconfig.lib.json'
    )

  const outDir = path.resolve(
    context.root,
    options.outDir,
  )

  const packageJsonFullPath = path.join(outDir, 'package.json')

  const projectFolder = path.resolve(context.root, options.outDir)

  const extractorConfig = ExtractorConfig.prepare({
     configObject:{
      projectFolder,
      mainEntryPointFilePath:"<projectFolder>/index.d.ts",
      compiler: {
        tsconfigFilePath
      },
      apiReport: {
        enabled: false,
        reportFileName: "<unscopedPackageName>.api.md"
      },
      docModel: {
        enabled: true,
        apiJsonFilePath: "<projectFolder>/<unscopedPackageName>.api.json"
      },
      dtsRollup: {
        enabled: true,
        untrimmedFilePath:"<projectFolder>/index.d.ts"
      }
     },
     configObjectFullPath: undefined,
     packageJsonFullPath
  })

  Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true
  })

  /* delete all the other .d.ts files since they are no longer needed */
  const dtsFiles = (await readdir(outDir)).filter(entry => entry.endsWith('.d.ts') && !(entry === 'index.d.ts')).map(entry => path.join(outDir, entry))

  await Promise.all(dtsFiles.map(file => rm(file)))

  return {
    success: true
  };
}

