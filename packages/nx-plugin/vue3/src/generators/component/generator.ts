import * as path from 'path';
import {
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  updateJson,
  readRootPackageJson,
  addDependenciesToPackageJson,
  installPackagesTask,
  formatFiles,
  updateProjectConfiguration,
  readProjectConfiguration,
} from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/js'
import { major, gte } from 'semver' // todo: dynamic import this AFTER installing package json
import { ComponentGeneratorSchema } from './schema';
import * as yaml from 'yaml' // todo: dynamic import this AFTER installing package json
import {pascalCase} from 'pascal-case'


type WorkspaceLayout = ReturnType<typeof getWorkspaceLayout>

type NormalizedSchema = ComponentGeneratorSchema & {
  [key in keyof WorkspaceLayout]: WorkspaceLayout[key];
} & {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  updatePackageJsonVueVersion: boolean;
  vitePluginVueVersion: string;
  updatePackageJsonVitePluginVueVersion: boolean;
  viteTsConfigPath: string;
}

async function getVueVersion(options: ComponentGeneratorSchema){
  if(options.vueVersion && major(options.vueVersion) !== 3) throw new Error(`You cannot use ${options.vueVersion}. You must use vue 3.x.x`)

  const {dependencies, devDependencies} = readRootPackageJson();

  const packageJsonVueVersion = (() => {
    if(Object.keys(dependencies).includes('vue')) return dependencies['vue'];
    return false;
  })()

  if(packageJsonVueVersion && major(packageJsonVueVersion) !== 3) throw new Error(`vue ${packageJsonVueVersion} is listed as a dependency, but this generator requires vue 3. Please remove vue ${packageJsonVueVersion} from the root package.json. If you need vue ${packageJsonVueVersion} for some of your packages, include it in those package's package.json files, instead of in the root package.json`)

  const vueVersion = options.vueVersion || packageJsonVueVersion || await (async () => {
    const response = await fetch('https://registry.npmjs.org/vue')
    const { versions } = await response.json() as unknown as {versions: Record<string, any>}
    const versionNumbers = Object.keys(versions).sort((a, b) => gte(a, b) ? 1 : -1) /* technically not needed, since the api returns version numbers in order. However, it is here to ENSURE that version numbers are ALWAYS ordered*/

    let majorVersion = 4
    let latest = ''

    do {
      latest = versionNumbers.pop();
      majorVersion = major(latest);
    } while(majorVersion > 3)

    return latest
  })()

  const updatePackageJsonVueVersion = !packageJsonVueVersion

  const {vitePluginVueVersion, updatePackageJsonVitePluginVueVersion} = await ( async () => {

    const vv = '@vitejs/plugin-vue'

    if(Object.keys(dependencies).includes(vv)){
      console.warn(`'${vv}' should be in devDependencies, not in dependencies`)
      return {
        vitePluginVueVersion: dependencies[vv],
        updatePackageJsonVitePluginVueVersion: false
      }
    }
    if(Object.keys(devDependencies).includes('@vitejs/plugin-vue'))
    return {
      vitePluginVueVersion: devDependencies[vv],
      updatePackageJsonVitePluginVueVersion: false,
    }
    const response = await (await fetch('https://registry.npmjs.org/@vitejs/plugin-vue/latest')).json() as unknown as {version: string} /* coupled to npmjs api */



    return {vitePluginVueVersion: response.version, updatePackageJsonVitePluginVueVersion: true}
  })()

  return {vueVersion, updatePackageJsonVueVersion, vitePluginVueVersion, updatePackageJsonVitePluginVueVersion }
}

async function getVersionOfPackage(pkgName: string, isDevDependency?: true): Promise<string> {
  /* return the version in pkg json if available */
  const {dependencies, devDependencies} = readRootPackageJson()
  const dep = isDevDependency ? devDependencies : dependencies
  const hasPkg = Object.keys(dep).includes(pkgName);


  if(hasPkg) return dep[pkgName]

  const response = await (await fetch(`https://registry.npmjs.org/${pkgName}/latest`)).json() as unknown as {version: string}
  return response.version

}

async function normalizeOptions(tree: Tree, options: ComponentGeneratorSchema): Promise<NormalizedSchema> {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  const layout = getWorkspaceLayout(tree);

  const {vueVersion, updatePackageJsonVueVersion, vitePluginVueVersion, updatePackageJsonVitePluginVueVersion} = await getVueVersion(options)

  const viteTsConfigPath = `${path.relative(projectRoot, tree.root)}/`

  return {
    ...options,
    ...layout,
    npmScope: options.npmScope || layout.npmScope,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    vueVersion,
    updatePackageJsonVueVersion,
    vitePluginVueVersion,
    updatePackageJsonVitePluginVueVersion,
    viteTsConfigPath
  };
}

async function addVueFiles(tree: Tree, options: NormalizedSchema){

  const {projectRoot, name, description, vueVersion, bugs, vitePluginVueVersion, updatePackageJsonVitePluginVueVersion, importPrefix } = options;

  tree.delete(path.join(projectRoot,'src','lib'))

  const allNames = names(name)
  const className = `${pascalCase(importPrefix)}${allNames.className}`

  const templateOptions = {
    ...options,
    ...allNames,
    className,
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: ''
  };
  generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);

  const {devDependencies} = JSON.parse(tree.read(`package.json`).toString())

  const vitePluginVue = updatePackageJsonVitePluginVueVersion ? {'@vitejs/plugin-vue': vitePluginVueVersion} : {}

  /* update package.json */
  updateJson(tree, path.join(projectRoot,'package.json'), (json) => {
    json.private = false,
    json.main = `index.js`
    json.module = `index.mjs`
    json.types = `index.d.ts`
    json.description = description
    json.dependencies = {vue: vueVersion}

    json.devDependencies = {
      'vite-plugin-dts': devDependencies['vite-plugin-dts'],
      'vite-tsconfig-paths': devDependencies['vite-tsconfig-paths'],
      ...vitePluginVue
    }
    json.bugs = {
      url: bugs
    }
    return json
  })

  /* update .eslintrc.json */
  updateJson(tree, path.join(projectRoot,'.eslintrc.json'), (json) => {

  json.ignorePatterns.push("node_modules/**", "src/shims-vue.d.ts")

  json.overrides = [
    {
      files: ["*.vue"],
      extends: ["plugin:@nrwl/nx/typescript", "plugin:vue/vue3-recommended"],
      env: {
        node: false, /* so that SSR components can be rendered on edge */
        browser: true,
      },
      parser: "vue-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        sourceType: "module"
      },
      rules: {
        "vue/max-attributes-per-line": "off",
        "vue/html-self-closing": [
          "error",
          {
            html: {
              void: "always",
              normal: "always",
              component: "always"
            },
            svg: "always",
            math: "always"
          }
        ]
      }
    }
  ];
  return json;
})
}

async function addPackageManagerWorkspace(tree: Tree, options: NormalizedSchema){

  const {appsDir, libsDir } = options;

  if(tree.exists('pnpm-lock.yaml')){
    if(tree.exists('pnpm-workspace.yaml')){
      const workspaceFileContents = yaml.parse(tree.read('pnpm-workspace.yaml').toString())
      if(!workspaceFileContents['packages']) throw new Error(`Your pnpm-workspace.yaml does not have a 'packages' entry that points to '${appsDir}/**'${appsDir === libsDir ? '' : 'and \'' + libsDir + '/**\''}. Cannot install this package's dependencies.`)

      const dirs = [appsDir, libsDir]

      dirs.forEach(dir => {
        if(!workspaceFileContents['packages'].includes(`${dir}/**`)) throw new Error(`Your pnpm-workspace.yaml 'packages' entry is missing '${dir}/**'. Cannot install this package's dependencies.`)
      })
      return;
    } else {
      const pkgDirs = appsDir === libsDir ? [appsDir] : [appsDir, libsDir]
      const pnpmWorkspaceYaml = yaml.stringify({packages: pkgDirs.map(d => `${d}/**`)})
      tree.write('pnpm-workspace.yaml', pnpmWorkspaceYaml)
    }
  }
    // todo: check npm, yarn, yarn berry
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {

  const n = await normalizeOptions(tree, options)

  const {
    name,
    directory,
    tags,
    npmScope,
    importPrefix,
    updatePackageJsonVueVersion,
    vueVersion,
    vitePluginVueVersion,
    updatePackageJsonVitePluginVueVersion,
    projectName
  } = n

  await libraryGenerator(tree, {
    name,
    directory,
    tags,
    unitTestRunner: 'vitest',
    linter: 'eslint',
    importPath: `${npmScope}${npmScope ? '/' : ''}${importPrefix}${name}`,
    pascalCaseFiles: true,
    strict: true,
    publishable: true,
    compiler: 'swc',
    bundler: 'vite',
  })


  const vuePkg = updatePackageJsonVueVersion ? {vue: vueVersion } : {} /* do not downgrade the vue version in the root package json if it is farther ahead of the specified vue version. instead, just let this one component have a different version of vue */

  const [vp, ep] = await Promise.all([getVersionOfPackage('vue-eslint-parser'), getVersionOfPackage('eslint-plugin-vue')]) /* only get the latest version IF pkg not already installed */

  const addViteDevDeps = updatePackageJsonVitePluginVueVersion ? {'@vitejs/plugin-vue': vitePluginVueVersion} : {}

  await Promise.all([
    addDependenciesToPackageJson(
      tree,
      {...vuePkg},
      {
        /* install the packages needed to successfully lint vue files */
        "vue-eslint-parser": vp,
        "eslint-plugin-vue": ep,
        ...addViteDevDeps,
      }
      ),
      addVueFiles(tree, n),
      await addPackageManagerWorkspace(tree, n),
      // updateViteConfigTs(tree, n),
    ])

    const c = readProjectConfiguration(tree, projectName)
      c.targets['format'] = {
      executor: "@incremental.design/nx-plugin-vue3:format",
      outputs: ["{projectRoot}/**/*"]
    }

    updateProjectConfiguration(tree, projectName, c)

  await formatFiles(tree)

  return () => installPackagesTask(
    tree,
    true /* always run, so that volar will work */
    )
}
