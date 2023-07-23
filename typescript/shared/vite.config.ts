/* this file MUST be run from within the package directory */

import {defineConfig} from 'vitest/config';

import viteTsConfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';
import * as fs from 'fs'
import * as path from 'path'
import { Features } from 'lightningcss'

const cwd = process.cwd();

const packageJson = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf-8'));

const {dependencies, devDependencies, peerDependencies} = packageJson;

const external = [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || []), ...Object.keys(peerDependencies || [])]; /* get all deps from the package.json and make them external */

const dtsConfig = {
  tsconfigPath: path.resolve(cwd, '../../tsconfig.json'), 
  include: [path.resolve(cwd, 'src/**/*.{ts,tsx}')],
  outDir: path.resolve(cwd, 'dist'),
  rollupTypes: true,
}

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined'
  },
  plugins: [
    dts(dtsConfig),

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
    // cssMinify: "lightningcss" // todo: explain 'what', 'why' and limitations of lightning css
    cssMinify: 'esbuild'
  },
  css: {
    // transformer: 'lightningcss',
    transformer: "postcss",
    modules: {
      localsConvention: 'camelCaseOnly' /* to enable named imports. see: https://vitejs.dev/guide/features.html#css-modules */
    },
    // lightningcss: {
    //   drafts: {
    //     nesting: true, /* enable css nesting */
    //     customMedia: true /* enable css customMedia */
    //   },
    //   nonStandard: {
    //     deepSelectorCombinator: true /* use >>> to deep-select CSS classes */
    //   },
    //   include: Features.VendorPrefixes | 0, /*forces vendor prefixes are added in. Generally, you don't have to force a feature, because lightningcss will automatically use the features needed for the browsers specified in 'targets'. For all features that can be forced, see: https://lightningcss.dev/transpilation.html */ 
    //   targets: { /* see: https://browsersl.ist/#q=%3E0.7%25%2C+since+2020%2C+not+dead */
    //     android: 114,
    //     chrome: 78,
    //     edge: 79,
    //     firefox: 72,
    //     /* ie is dead, not going to target it */ 
    //     ios_saf: 13,
    //     opera: 66,
    //     safari: 13,
    //     samsung: 11 
    //     /* note that lightning css needs non-negative integers for versions ... it can't do 11.1, 13.3 etc. */
    //   },
    //   cssModules: {
    //     pattern: '[hash]-[local]', /* because "css grid" https://lightningcss.dev/css-modules.html */
        
    //   }
    // }
  },

  test: {
    globals: true,
    cache: {
      dir: '../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/index.ts'], // for now, dump the tests into index.ts see: https://vitest.dev/guide/in-source.html#setup
    // todo: change where tests live??
  },
});
