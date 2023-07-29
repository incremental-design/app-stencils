/* this file MUST be run from within the package directory */

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import * as path from 'path'
import * as fs from 'fs'
import { Features } from 'lightningcss'

const cwd = process.cwd();

const dtsConfig = {
  staticImport: true,
  insertTypesEntry: false,
  rollupTypes: true,
  copyDtsFiles: false,
  tsconfigPath: path.resolve(cwd, '../../tsconfig.json'), 
  include: [path.resolve(cwd, 'src/**/*')],
  outDir: path.resolve(cwd, 'dist'),
  
};

const packageJson = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf-8'));

const {dependencies, devDependencies, peerDependencies} = packageJson;

const external = [
  ...Object.keys(dependencies || {}),
  ...Object.keys(devDependencies || []),
  ...Object.keys(peerDependencies || [])
];

export default defineConfig({
  plugins: [vue(), dts(dtsConfig)],
  build: {
    lib: {
      entry: resolve(cwd, "src/index.ts"),
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external,
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
    cssMinify: 'lightningcss'
  },
  css: {
    transformer: 'lightningcss',
    lightningcss: {
      drafts: {
        nesting: true, /* enable css nesting */
        customMedia: true /* enable css customMedia */
      },
      nonStandard: {
        deepSelectorCombinator: true /* use >>> to deep-select CSS classes */
      },
      include: Features.VendorPrefixes | 0, /*forces vendor prefixes are added in. Generally, you don't have to force a feature, because lightningcss will automatically use the features needed for the browsers specified in 'targets'. For all features that can be forced, see: https://lightningcss.dev/transpilation.html */ 
      targets: { /* see: https://browsersl.ist/#q=%3E0.7%25%2C+since+2020%2C+not+dead */
        android: 114,
        chrome: 78,
        edge: 79,
        firefox: 72,
        /* ie is dead, not going to target it */ 
        ios_saf: 13,
        opera: 66,
        safari: 13,
        samsung: 11 
        /* note that lightning css needs non-negative integers for versions ... it can't do 11.1, 13.3 etc. */
      },
      cssModules: {
        pattern: '[hash]-[local]' /* because "css grid" https://lightningcss.dev/css-modules.html */
      }
    }
  },
});


// todo: test