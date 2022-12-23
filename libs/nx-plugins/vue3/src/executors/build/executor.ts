import { BuildExecutorSchema } from './schema';
import { ExecutorContext } from '@nrwl/devkit'
import {build, InlineConfig} from 'vite'
import vue from "@vitejs/plugin-vue"
import dts from "vite-plugin-dts"
import { resolve } from "path";

const dtsConfig = {
  outputDir: "dist/types",
  staticImport: true,
  insertTypesEntry: true,
  rollupTypes: true,
  copyDtsFiles: false,
};

const viteConfig: InlineConfig = {
  plugins: [vue(), dts(dtsConfig)],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "ComponentBase",
      fileName: "ComponentBase",
      formats: ["cjs", "es"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
}

export default async function runExecutor(options: BuildExecutorSchema, context: ExecutorContext) {

  const {projectName} = context;

  console.log(projectName);

  // // console.log('Executor ran for Build', options);
  // const {cwd} = context
  // console.log(cwd)
  // return {
  //   success: true,
  // };

  // const output = await build(viteConfig)
  // console.log(output)


  return {
    success: true
  }
}
