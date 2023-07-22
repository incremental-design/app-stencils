import tslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";
import eslintJsPlugin from "@eslint/js";
import vuelint from "eslint-plugin-vue";
import vueparser from "vue-eslint-parser";
import eslintConfigPrettier from "eslint-config-prettier";

// see https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config
export default [
  {
    rules: {
      ...eslintJsPlugin.configs.recommended.rules,
      ...eslintConfigPrettier.rules,
    },
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tslint,
    },
    languageOptions: {
      parser: tsparser,
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      ...tslint.configs.recommended.rules,
      "no-console": "error",
    },
  },
  {
    files: ["**/*.vue"],
    plugins: {
      vue: vuelint,
    },
    languageOptions: {
      parser: vueparser /* run the whole vue file through vueparser */,
      parserOptions: {
        parser:
          tsparser /* run the <script> section through typescript parser */,
        sourceType: "module",
      },
      globals: globals.browser, // need to explore this more: not entirely sure what all the globals are
    },
    rules: {
      ...vuelint.configs["vue3-recommended"].rules,
      "no-console": "error",
    },
  },
  // so, this is 'cheating' a little bit. We shouldn't actually have this section in here. eventually, we'll use verdaccio and a separate project for this nuxt site
  {
    files: ["incremental-design/**/*"],
    rules: {
      "no-console": "error",
      "no-undef": "off",
    },
  },
];
