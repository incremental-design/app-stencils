/* this file MUST be run from within the package directory */

import {defineConfig} from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

import { join } from 'path';
const cwd = process.cwd();


export default defineConfig({
  plugins: [
    dts({
      tsconfigPath: join(cwd, '../../tsconfig.json'), 
      include: [join(cwd, 'src/**/*.{ts,tsx}')],
      outDir: join(cwd, 'dist'),
      rollupTypes: true,
    }),

    viteTsConfigPaths({
      root: '../',
    }),
  ],

  // Configuration for building your library.
  // See: https://vitejs.dev/guide/build.html#library-mode
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: `${cwd}/src/index.ts`,
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external: [], /* need to pull everything from package json */
    },
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
    },
  },

  // test: {
  //   globals: true,
  //   cache: {
  //     dir: '../../../node_modules/.vitest',
  //   },
  //   environment: 'jsdom',
  //   include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  // },
});

/**
 * todo: try lighning css https://vitejs.dev/guide/features.html#lightning-css
 *  - no css preprocessors (that's prob fine given that we have css modules and advanced css features now)
 * 
 * vite build
 * 
 * vite optimize(?)
 * 
 */
