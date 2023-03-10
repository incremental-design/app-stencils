import * as path from 'path';
import { ExecutorContext } from '@nrwl/devkit';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { unlink } from 'fs/promises';
import { glob } from 'glob';
import { DocumentExecutorSchema } from './schema';

export default async function runExecutor(
  options: DocumentExecutorSchema,
  context: ExecutorContext
) {
  const { outputPath } =
    context.projectsConfigurations.projects[context.projectName].targets.build
      .options;

  const outDir = path.resolve(context.root, outputPath);

  const srcUrl = undefined;

  const config = ExtractorConfig.prepare({
    configObject: {
      projectFolder: outDir,
      mainEntryPointFilePath: 'index.d.ts',
      dtsRollup: {
        enabled: true,
        untrimmedFilePath: '<projectFolder>/index.d.ts',
      },
      compiler: {
        tsconfigFilePath: path.resolve(context.root, 'tsconfig.base.json'),
      },
      docModel: {
        enabled: true,
        ...(srcUrl ? { projectFolderUrl: srcUrl } : {}),
        apiJsonFilePath: '<projectFolder>/api.json',
      },
    },
    configObjectFullPath: undefined,
    packageJsonFullPath: path.resolve(outDir, 'package.json'),
  });

  Extractor.invoke(config);

  const dtsFiles = await glob('**/*.d.ts', {
    cwd: outDir,
    root: './',
  });

  const toDelete = dtsFiles.filter((d) => {
    const { dir, base } = path.parse(d);
    if (dir === '' && base === 'index.d.ts') return false;
    return true;
  });

  await Promise.all(toDelete.map(async (item) => await unlink(item)));

  return {
    success: true,
  };
}
