import { defineConfig } from 'vitest/config';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import { readFile } from 'fs/promises';

/**
 * this file is automatically generated by @incremental.design/shared ... do NOT modify it
 *
 * This file has to be placed here, because nx can only invoke vitest via its CLI. Vitest CLI needs this file to share config with vite
 *
 * The overall idea is that vitest and vite are run from the root, and reach into a package in order to test and build it
 *
 * this file is invoked by both vite and vitest, which are invoked by '@incremental.design/shared:build' and '@incremental.design/shared:test' respectively. This config receives the following environment variables:
 *
 * __FRAMEWORK__ one of 'vue3', 'ts-browser' - controls whether to use @vitejs/plugin-vue
 * __LIBRARY__ one of 'true' or 'false' - controls whether to build as library and externalize deps, or build as app, and internalize deps
 * __PROJECT_ROOT__ absolute path to the project to build/test
 * __OUTDIR__ absolute path to the location of built files
 * __PROJECT_NAME__ the unscoped name of the project, as it would appear when imported in a browser
 * __TEST_ENV__ is one of {@link https://vitest.dev/guide/environment.html vite's test environments} i.e. 'node', 'jsdom', 'happy-dom', 'edge-runtime', defaults to 'jsdom'
 */

//@ts-expect-error defineConfig typing is messed up, but this function works
export default defineConfig(async (command, mode) => {
  // todo: support vite serve for all 'serve-able' things
  if (command === 'serve' || mode === 'dev')
    throw new Error('serve and dev not supported ... yet');

  // todo: change settings for mode dev and mode prod

  const framework = process.env.__FRAMEWORK__;
  const library = process.env.__LIBRARY__ === 'true' ? true : false;
  const projectRoot = process.env.__PROJECT_ROOT__;
  const outDir = process.env.__OUTDIR__;
  const projectName = process.env.__PROJECT_NAME__;
  const testEnv = process.env.__TEST_ENV__ || 'jsdom';

  if (!framework) throw new Error('process.env.__FRAMEWORK__ not defined');
  if (!library) throw new Error('process.env.__LIBRARY__ not defined');
  if (!projectRoot) throw new Error('process.env.__PROJECT_ROOT__ not defined');
  if (!outDir) throw new Error('process.env.__OUTDIR__ not defined');
  if (!projectName) throw new Error('process.env.__PROJECT_NAME__ not defined');

  /* this plugin tells vite how to to find local packages */
  const plugins = [
    viteTsConfigPaths({ root: './' }),
    /* ALWAYS run from workspace root!! */
  ];

  if (framework === 'vue3') plugins.push(vue());
  /* this tells vite how to make type declarations ... it should be added in AFTER vue 3 */
  plugins.push(
    dts({
      tsConfigFilePath: path.join(__dirname, 'tsconfig.base.json'), // todo: make sure that tsconfig.base.json exists and is what you think it is
      skipDiagnostics: true,
      outputDir: path.resolve(outDir, 'types'),
      entryRoot: path.resolve(projectRoot),
      //@ts-expect-error - the typings for dts are messed up, but this function call works
      emptyOutDir: false,
      rollupTypes:
        false /* don't roll up types with dts. Instead, roll them up with API extractor */,
    })
  );

  // todo: support build as web worker?

  const test = {
    globals: true,
    cache: {
      dir: path.resolve(__dirname, 'node_modules', '.vitest'),
    },
    environment: testEnv,
    include: [
      `${projectRoot}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}`,
    ],
  };

  if (library) {
    const lib = library
      ? {
          entry: path.resolve(projectRoot, 'index.ts'),
          name: projectName,
          fileName: 'index',
          formats: ['es', 'cjs'] as Array<'es' | 'cjs'>,
        }
      : {};

    const rollupOptions = library
      ? {
          external: Object.keys(
            JSON.parse(
              await readFile(path.resolve(projectRoot, 'package.json'), 'utf-8')
            ).dependencies
          ),
        }
      : {};

    return {
      root: __dirname,
      build: {
        outDir,
        plugins,
        lib,
        rollupOptions,
      },
      test,
    };
  } else {
    return {
      root: __dirname,
      build: {
        outDir,
        plugins,
      },
      test,
    };
  }
});
