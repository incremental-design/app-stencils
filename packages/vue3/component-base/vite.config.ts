import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

const dtsConfig = {
  outputDir: "dist/types",
  staticImport: true,
  insertTypesEntry: true,
  rollupTypes: true,
  copyDtsFiles: false,
};

export default defineConfig({
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
});
