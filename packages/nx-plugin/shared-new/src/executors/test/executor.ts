import * as path from 'path';
import { stat } from 'fs/promises';
import { ExecutorContext } from '@nrwl/devkit';
import { TestExecutorSchema } from './schema';
import checkVite from '../build/checkVite';
import getRoots from '../getRoots';
import { spawn } from 'child_process';

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
) {
  const v = await checkVite();

  if (!v) return { success: false };

  let R: ReturnType<typeof getRoots>;
  try {
    R = getRoots(context);
  } catch (e) {
    console.error(e);
    return { success: false };
  }

  const { workspaceRoot, projectRoot, projectName } = R;

  const vitestBinPath = path.resolve(
    workspaceRoot,
    'node_modules',
    '.bin',
    'vitest'
  );

  try {
    await stat(vitestBinPath);
  } catch (e) {
    console.error(e);
    console.error(`vitest executable not found at ${vitestBinPath}`);
    return { success: false };
  }

  const outDir =
    context.projectsConfigurations.projects[projectName].targets['build']
      .options.outputPath;

  // todo: set these based on project options
  const __FRAMEWORK__ = 'ts-browser';
  const __LIBRARY__ = 'true';
  const __PROJECT_ROOT__ = projectRoot;
  const __OUTDIR__ = outDir;
  const __PROJECT_NAME__ = projectName;

  const testProcess = spawn(
    vitestBinPath,
    ['run', '--config=vite.config.base.ts'], // todo: try these options https://vitest.dev/guide/cli.html
    {
      cwd: workspaceRoot,
      env: {
        __FRAMEWORK__,
        __LIBRARY__,
        __PROJECT_ROOT__,
        __OUTDIR__,
        __PROJECT_NAME__,
      },
    }
  );
  testProcess.stdout.on('data', (data) => console.log(data.toString('utf8')));
  testProcess.stderr.on('data', (data) => console.error(data.toString('utf8')));

  await new Promise<void>((resolve, reject) => {
    testProcess.on('close', (code) => {
      if (code !== 0) reject();
      resolve();
    });
  });

  return { success: true };
}
