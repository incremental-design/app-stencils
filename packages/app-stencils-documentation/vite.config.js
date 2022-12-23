import { defineConfig } from "vite";
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig(({ command, ssrBuild }) => ({
  plugins: [vuePlugin()],
  experimental: {
    renderBuiltUrl(filename, { hostType, type, ssr }) {
      if (ssr && type === "asset" && hostType === "js") {
        return {
          runtime: `__ssr_vue_processAssetPath(${JSON.stringify(filename)})`,
        };
      }
    },
  },
  build: {
    minify: false,
  },
  css: {
    modules: {
      localsConvention: "camelCaseOnly",
    },
  },
}));
