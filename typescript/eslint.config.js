import tslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import globals from "globals";
import eslintJsPlugin from "@eslint/js";

// see https://stackoverflow.com/questions/74237042/how-to-correctly-configure-the-parser-plugins-with-eslints-new-flat-config
export default [
  {
    rules: eslintJsPlugin.configs.recommended.rules,
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tslint,
    },
    languageOptions: {
      parser: tsparser,
      globals: globals.node, // todo: change this once we've decided where to put "node" typescript things and "browser" typescript things
    },
    rules: {
      ...tslint.configs.recommended.rules,
      "no-console": "error",
    },
  },
];
