/* this file MUST be run from within the package directory */

import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import * as path from 'path'
import * as fs from 'fs'

const cwd = process.cwd();

const dtsConfig = {
  staticImport: true,
  insertTypesEntry: true,
  rollupTypes: true,
  copyDtsFiles: false,
  tsconfigPath: path.resolve(cwd, '../../tsconfig.json'), 
  include: [path.resolve(cwd, 'src/**/*')],
  outDir: path.resolve(cwd, 'dist'),
  
};

const packageJson = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf-8'));

const {dependencies, devDependencies, peerDependencies} = packageJson;

const external = [...Object.keys(dependencies || {}), ...Object.keys(devDependencies || []), ...Object.keys(peerDependencies || [])];

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
  },
});