import * as path from 'path';
import { mergeConfig } from 'vite'; // do we need to import type, and then dynamic import this?
import { defineConfig } from 'vitest/config'; // do we need to import type, and then dynamic import this?
import { ExecutorContext } from '@nrwl/devkit';
import { TestExecutorSchema } from './schema';
import checkVite from '../build/checkVite';
import getRoots from '../getRoots';
import getViteInlineConfig from '../build/getViteInlineConfig';
import type { createVitest } from 'vitest/node';
import loadVitestNode from './loadVitestNode.js';

export default async function runExecutor(
  options: TestExecutorSchema,
  context: ExecutorContext
) {
  const v = await checkVite();

  if (!v) return { success: false };

  const { workspaceRoot, projectRoot, projectName } = getRoots(context);

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

  /* see: https://vitest.dev/advanced/api.html#createvitest */
  const vn = await loadVitestNode();

  const cv = vn.createVitest as unknown as createVitest;

  const vitest = await cv('test', vitestConfig);

  await vitest.start();

  return { success: true };
}
