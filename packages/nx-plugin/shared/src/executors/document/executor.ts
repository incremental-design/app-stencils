import * as path from 'path';
import { ExecutorContext } from '@nrwl/devkit';
import { Extractor, ExtractorConfig } from '@microsoft/api-extractor';
import { unlink, readdir, rm } from 'fs/promises';
import { glob } from 'glob';
import { DocumentExecutorSchema } from './schema';
import { exec, spawn } from 'child_process';
import { detectPackageManager } from '@nrwl/devkit';

export default async function runExecutor(
  options: DocumentExecutorSchema,
  context: ExecutorContext
) {
  const { outputPath } =
    context.projectsConfigurations.projects[context.projectName].targets.build
      .options;

  const outDir = path.resolve(context.root, outputPath);

  const srcUrl = options.repositoryUrl;

  const currentBranch = await new Promise((resolve, reject) => {
    exec('git rev-parse --abbrev-ref HEAD', (err, out) => {
      if (err) reject(err);
      resolve(out.trim());
    });
  });

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
        ...(srcUrl
          ? { projectFolderUrl: `${srcUrl}/tree/${currentBranch}` }
          : {}),
        apiJsonFilePath: '<projectFolder>/docs.api.json',
      },
    },
    configObjectFullPath: undefined,
    packageJsonFullPath: path.resolve(outDir, 'package.json'),
  });

  Extractor.invoke(config);

  /* at this point, everything we care about has been bundled at the top level of the output directory. anything left in ANY subfolder is garbage */

  const entries = await readdir(outDir, { withFileTypes: true });
  const subdirs = entries.filter((entry) => entry.isDirectory());
  await Promise.all(
    subdirs.map(
      async (subdir) =>
        await rm(path.resolve(outDir, subdir.name), {
          recursive: true,
          force: true,
        })
    )
  );

  /* once subdirs have been deleted, clean up any .d.ts files that aren't index.d.ts */

  const dtsFiles = await glob('**/*.d.ts', {
    cwd: outDir,
    root: './',
  });

  const toDelete = dtsFiles
    .filter((d) => {
      const { dir, base } = path.parse(d);
      if (dir === '' && base === 'index.d.ts') return false;
      return true;
    })
    .map((entry) => path.resolve(outDir, entry));

  await Promise.all(toDelete.map(async (entry) => await unlink(entry)));

  /* finally, run api documenter, which was installed when this plugin's generator was called (see ../../generators/typescript-browser-library/generator.ts) */

  const pm = detectPackageManager(context.root);

  await new Promise<void>((resolve, reject) => {
    const childProcess = spawn(pm, [
      `exec`,
      `api-documenter`,
      `markdown`,
      `--input-folder`,
      `${outDir}`,
      `--output-folder`,
      `${path.resolve(outDir, 'docs')}`,
    ]);

    childProcess.on('exit', (code) => {
      if (code === 0) resolve();
      reject();
    });
  });

  return {
    success: true,
  };
}
