/* this file MUST be run from within the package directory */

import {defineConfig} from 'vite';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as fs from 'fs'


import { join } from 'path';
const cwd = process.cwd();

const packageJson = JSON.parse(fs.readFileSync(join(cwd, 'package.json'), 'utf-8'));

const {dependencies, devDependencies, peerDependencies} = packageJson;

const external = [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || []), ...Object.keys(peerDependencies || [])];

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
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points.
      entry: `${cwd}/src/index.ts`,
      fileName: 'index',
      formats: ['es'],
    },
    rollupOptions: {
      // External packages that should not be bundled into your library.
      external, 
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
