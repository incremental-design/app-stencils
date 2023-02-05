import * as path from 'path';
import { stat } from 'fs/promises';
import { mergeConfig } from 'vite'; // do we need to import type, and then dynamic import this?
import { defineConfig } from 'vitest/config'; // do we need to import type, and then dynamic import this?
import { ExecutorContext } from '@nrwl/devkit';
import { TestExecutorSchema } from './schema';
import checkVite from '../build/checkVite';
import getRoots from '../getRoots';
import getViteInlineConfig from '../build/getViteInlineConfig';
import { spawn } from 'child_process';
import { temporaryFile } from 'tempy';
import { writeFile } from 'fs';

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
) {
  const v = await checkVite();

  if (!v) return { success: false };

  const { workspaceRoot, projectRoot, projectName } = getRoots(context);

  const viteBinPath = path.resolve(
    workspaceRoot,
    'node_modules',
    '.bin',
    'vitest'
  );

  try {
    await stat(viteBinPath);
  } catch (e) {
    console.error(e);
    console.error(`vitest executable not found at ${viteBinPath}`);
    return { success: false };
  }

  const outDir =
    context.projectsConfigurations.projects[projectName].targets['build']
      .options.outputPath;

  console.log(outDir);

  const viteConfig = await getViteInlineConfig(
    workspaceRoot,
    projectRoot,
    projectName,
    outDir
  );

  /* see: https://vitest.dev/config/#configuration */
  const vitestConfig = mergeConfig(
    viteConfig,
    defineConfig({
      test: {
        globals: true,
        cache: {
          dir: './node_modules/.vitest' /* because nx runs this from workspace root */,
        },
        environment: 'jsdom',
        include: [
          `${path.relative(
            workspaceRoot,
            projectRoot
          )}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`,
        ],
      },
    })
  );

  const vitestConfigFile = temporaryFile({ name: 'vitest.config.ts' });

  // await writeFile(vitestConfigFile, )

  const cp = spawn(viteBinPath);

  console.log(vitestConfig);

  return { success: true };
}
