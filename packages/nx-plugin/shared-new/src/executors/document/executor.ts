import * as path from 'path';
import { DocumentExecutorSchema } from './schema';
import { ExecutorContext } from '@nrwl/devkit';
import {
  Extractor,
  IConfigFile,
  ExtractorResult,
  ExtractorConfig,
} from '@microsoft/api-extractor';

export default async function runExecutor(
  options: DocumentExecutorSchema,
  context: ExecutorContext
) {
  const { outputPath } =
    context.projectsConfigurations.projects[context.projectName].targets.build
      .options;

  console.log(path.resolve(context.root, outputPath));

  const config = ExtractorConfig.prepare({
    configObject: {
      projectFolder: path.resolve(context.root, outputPath),
      mainEntryPointFilePath: 'index.d.ts',
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: '<projectFolder>/index.d.ts',
      },
      compiler: {
        tsconfigFilePath: path.resolve(context.root, 'tsconfig.base.json'),
      },
    },
    configObjectFullPath: undefined,
    packageJsonFullPath: path.resolve(context.root, outputPath, 'package.json'),
  });

  const extractorResult = Extractor.invoke(config);

  return {
    success: true,
  };
}
