#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * usage: pnpm create-package packages/<package-folder>/<package-name> <description>
 */

const __dirname = path.parse(fileURLToPath(import.meta.url)).dir;

const version = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "lerna.json"))
).version;

const getVueDevDeps = (isVuePackage) =>
  isVuePackage
    ? {
        "@vitejs/plugin-vue": "^3.0.0",
        "vue-tsc": "^1.0.0",
        "postcss-mixins": "^9.0.4",
        "postcss-nesting": "^10.1.10",
        "vite-plugin-dts": "^1.4.0",
      }
    : {
        "dts-bundle-generator": "^7.0.0",
      };

const getVueDeps = (isVuePackage) =>
  isVuePackage
    ? {
        dependencies: {
          vue: "^3.2.37",
        },
      }
    : {};

const getVueScripts = (isVuePackage, entryFileName) =>
  isVuePackage
    ? {
        build: "vue-tsc --noEmit && vite build",
      }
    : {
        build: "vite build && pnpm build:types",
        "build:types": `dts-bundle-generator -o dist/types/${entryFileName}.d.ts src/index.ts`,
      };

const makePackageJSON = (entryFileName, packageName, isVuePackage) =>
  JSON.stringify(
    {
      name: `@incremental.design/${packageName}`,
      private: false,
      sideEffects: isVuePackage,
      license: "MIT",
      author: "Ajay Ganapathy <ajay@incremental.design>",
      version,
      type: "module",
      main: `dist/${entryFileName}.umd.cjs`,
      module: `dist/${entryFileName}.js`,
      types: `dist/types/${entryFileName}.d.ts`,
      scripts: {
        ...getVueScripts(isVuePackage, entryFileName),
        lint: `eslint src/**/*${isVuePackage ? "{.vue,.ts}" : ".ts"} --fix`,
      },
      ...getVueDeps(isVuePackage),
      devDependencies: {
        typescript: "^4.6.4",
        vite: "^3.0.0",
        ...getVueDevDeps(isVuePackage),
      },
      publishConfig: {
        access: "public",
      },
      bugs: {
        url: "https://github.com/incremental-design/app-stencils/issues",
      },
    },
    null,
    2
  );

const makeViteConfig = (fileName, isVuePackage) =>
  `import { defineConfig } from 'vite'
${isVuePackage ? "import vue from '@vitejs/plugin-vue'" : ""}
import { resolve } from 'path'
${isVuePackage ? "import dts from 'vite-plugin-dts'" : ""}

${
  isVuePackage
    ? `const dtsConfig = {
  outputDir: 'dist/types',
  staticImport: true,
  insertTypesEntry: true,
  rollupTypes: true,
  copyDtsFiles: false
}`
    : ``
}

export default defineConfig({
  ${isVuePackage ? "plugins: [vue(), dts(dtsConfig)]," : ""}
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: '${fileName}',
        fileName: '${fileName}',
      },
      ${
        isVuePackage
          ? `rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }`
          : ""
      }
  }
})
  `;

const makeTsConfig = (dir, isVuePackage) => {
  const numDirComponents = dir.slice(__dirname.length).split("/").length;

  const tsConfig = {
    extends: `${
      new Array(numDirComponents).fill("..").join(path.sep) + path.sep
    }tsconfig.json`,
    ...(isVuePackage
      ? {}
      : {
          isolatedModules: false,
          declaration: true,
        }),
  };

  return JSON.stringify(tsConfig);
};

const makeIndexTs = (isVuePackage, packageName) =>
  isVuePackage
    ? `import ${packageName} from './${packageName}.vue'
// import whatever else you want. Please do not import from any file that isn't in ./src
// you can import any .css file you want and rollup will bundle it.
  // Keep in mind that if you import a .css file, it becomes part of the global namespace. Be careful if you use this feature!

export default ${packageName}
// export /* any named exports you want */
      `
    : `// write your typescript code here`;

const viteEnvDTs = `///<reference types="vite/client"/>`;

const shimsVueDTs = `declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, any>
  export default component
}`;

const vueComponent = `<template>
</template>

<script setup lang="ts">

  /* see: https://vuejs.org/api/sfc-script-setup.html */
  
  /* see: https://vuejs.org/api/sfc-script-setup.html#defineprops-defineemits */
  const props = defineProps({})
  const emits = defineEmits({})

  /* see: https://vuejs.org/api/sfc-script-setup.html#defineexpose */

  // defineExpose({})

</script>
  `;

const makeEslintrc = (isVuePackage) => {
  const v = `\n
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  rules: {
    "vue/max-attributes-per-line": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "always",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
  },
  `;
  return `// eslint-disable-next-line no-undef
  module.exports = {${isVuePackage ? v : ""}
    env: {
        node: false,
        browser: true,
    }
  }`;
};

const makePostcssConfig = () => `
module.exports = {
  plugins: [require("postcss-mixins"), require("postcss-nesting")],
};
`;

function createPackage() {
  const packageFolderAndName = process.argv[2];

  const { dir, base } = path.parse(path.resolve(packageFolderAndName));

  console.log(dir, base);

  try {
    fs.statSync(dir);
  } catch (e) {
    const packageDirs = fs.readdirSync(path.resolve(__dirname, "packages"));
    console.log(
      `Directory '${
        path.parse(packageFolderAndName).dir
      }' does not exist. Please choose one of \n${packageDirs
        .map((d) => `packages/${d}`)
        .join("\n")}`
    );
    process.exit(1);
  }

  if (fs.readdirSync(dir).includes(base)) {
    console.log(`Package '${base}' already exists in '${dir}'`);
    process.exit(1);
  }

  const root = path.join(dir, base);

  fs.mkdirSync(root);

  const isVuePackage = dir.split(path.sep).pop() === "vue3";

  const packageName = base
    .split("-")
    .map((c) /* (c)omponent */ => c.slice(0, 1).toUpperCase() + c.slice(1))
    .join("");

  fs.writeFileSync(
    path.join(root, "package.json"),
    makePackageJSON(packageName, base, isVuePackage)
  );
  fs.writeFileSync(
    path.join(root, "vite.config.ts"),
    makeViteConfig(packageName, isVuePackage)
  );
  fs.writeFileSync(
    path.join(root, "tsconfig.json"),
    makeTsConfig(dir, isVuePackage)
  );
  fs.writeFileSync(
    path.join(root, ".eslintrc.cjs"),
    makeEslintrc(isVuePackage)
  );

  if (isVuePackage)
    fs.writeFileSync(
      path.join(root, "postcss.config.cjs"),
      makePostcssConfig()
    );

  const src = path.join(root, "src");
  fs.mkdirSync(src);
  fs.writeFileSync(
    path.join(src, "index.ts"),
    makeIndexTs(isVuePackage, packageName)
  );
  if (isVuePackage) {
    fs.writeFileSync(path.join(src, "vite-env.d.ts"), viteEnvDTs);
    fs.writeFileSync(path.join(src, "shims-vue.d.ts"), shimsVueDTs);
    fs.writeFileSync(path.join(src, `${packageName}.vue`), vueComponent);
  }
}

createPackage();
