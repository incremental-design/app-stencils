import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  readRootPackageJson,
  updateJson,
  addDependenciesToPackageJson,
  installPackagesTask,
  ensurePackage,
  GeneratorCallback
} from '@nrwl/devkit';
import * as path from 'path';
import { ComponentGeneratorSchema } from './schema';
import { major, gte } from 'semver'

type AllNames = ReturnType<typeof names>
type WorkspaceLayout = ReturnType<typeof getWorkspaceLayout>

type NormalizedSchema = ComponentGeneratorSchema & {
  [key in keyof AllNames]: AllNames[key];
} & {
  [key in keyof WorkspaceLayout]: WorkspaceLayout[key];
}
& {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
  updatePackageJsonVueVersion: boolean;
  // rootEslintrc: string;
};

async function normalizeOptions(tree: Tree, options: ComponentGeneratorSchema): Promise<NormalizedSchema> {

  const allNames = names(options.name);
  const fileName = allNames.fileName;

  const layout = getWorkspaceLayout(tree)

  const npmScope = options.npmScope || layout.npmScope
  const importPrefix = options.importPrefix || ''

  if(options.vueVersion && major(options.vueVersion) !== 3) throw new Error(`You cannot use ${options.vueVersion}. You must use vue 3.x.x`)

  const packageJsonVueVersion = (() => {
    const {dependencies} = readRootPackageJson();
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


  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${fileName}`
    : fileName;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${layout.libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

    // const rootEslintrc = path.join(path.relative(projectRoot ,tree.root),".eslintrc.json")

  return {
    ...allNames,
    ...layout,
    ...options,
    npmScope,
    importPrefix,
    vueVersion,
    updatePackageJsonVueVersion,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    // rootEslintrc
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
    const templateOptions = {
      ...options,
      ...names(options.name),
      offsetFromRoot: offsetFromRoot(options.projectRoot),
      template: ''
    };
    generateFiles(tree, path.join(__dirname, 'files'), options.projectRoot, templateOptions);
}

async function addToTsconfigBaseJson (tree: Tree, options: NormalizedSchema){

  const add = (tree: Tree, file: string) => updateJson(tree, file, (json) => {
    json.compilerOptions.paths[`${options.npmScope}/${options.importPrefix}${options.fileName}`] = [options.projectRoot]
    return json
  })

  let p: string

  const tryPaths = ['tsconfig.base.json', 'tsconfig.json'];
  for(const path of tryPaths){
    p = path
    if(tree.exists(path)) break;
  }

  return add(tree, p)
}

/* see: https://github.com/nrwl/nx/blob/master/packages/workspace/src/generators/library/library.ts */
export async function addLint(
  tree: Tree,
  options: NormalizedSchema
): Promise<GeneratorCallback> {

  const nxVersion = readRootPackageJson().devDependencies['nx'];

  await ensurePackage(tree, '@nrwl/linter', nxVersion);
  const { lintProjectGenerator, Linter } = await import('@nrwl/linter');
  return lintProjectGenerator(tree, {
    project: options.projectName,
    linter: Linter.EsLint,
    skipFormat: true,
    eslintFilePatterns: [
      ...['.ts','.js','.json','.tsx','.jsx','.vue'].map(ext => `${options.projectRoot}/**/*${ext}`)
    ],
  });
}

export default async function (tree: Tree, options: ComponentGeneratorSchema) {
  const normalizedOptions = await normalizeOptions(tree, options);

  addProjectConfiguration(
    tree,
    normalizedOptions.projectName,
    {
      root: normalizedOptions.projectRoot,
      projectType: 'library',
      sourceRoot: `${normalizedOptions.projectRoot}/src`,
      targets: {
        format: {
          executor: "@incremental.design/nx-plugin-vue3:format",
        },
        build: {
          executor: "@incremental.design/nx-plugin-vue3:build",
        },
        test: {
          executor: "@incremental.design/nx-plugin-vue3:test",
        },
        lint: {
          executor: "@nrwl/linter:eslint",
        },
      },
      tags: normalizedOptions.parsedTags,
    },
    true
  );

  async function getVersionOfPackage(pkgName: string, isDevDependency?: true): Promise<string> {
    /* return the version in pkg json if available */
    const {dependencies, devDependencies} = readRootPackageJson()
    const dep = isDevDependency ? devDependencies : dependencies
    const hasPkg = Object.keys(dep).includes(pkgName);


    if(hasPkg) return dep[pkgName]

    const response = await (await fetch(`https://registry.npmjs.org/${pkgName}/latest`)).json() as unknown as {version: string}
    return response.version

  }

  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
  await addToTsconfigBaseJson(tree, normalizedOptions)

  const vuePkg = normalizedOptions.updatePackageJsonVueVersion ? {vue: normalizedOptions.vueVersion } : {} /* do not downgrade the vue version in the root package json if it is farther ahead of the specified vue version. instead, just let this one component have a different version of vue */

  const [vp, ep] = await Promise.all([getVersionOfPackage('vue-eslint-parser'), getVersionOfPackage('eslint-plugin-vue')]) /* only get the latest version IF pkg not already installed */

  await addDependenciesToPackageJson(
    tree,
    {...vuePkg},
    {
      /* install the packages needed to successfully lint vue files */
      "vue-eslint-parser": vp,
      "eslint-plugin-vue": ep,
    }
  )

  // todo: check root and add in a pnpm workspace (or npm or yarn workspace) if needed

  /* set up root .eslintrc.json if needed */
  const addLintTask = await addLint(tree, normalizedOptions)

  /* set up project .eslintrc.json */
  updateJson(tree, path.join(normalizedOptions.projectRoot,'.eslintrc.json'), (json) => {

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

  return () => {
    installPackagesTask(
      tree,
      true /* always run because we need to make sure that child node_modules are updated. Otherwise, Volar won't work. */
      ) /* for some weird reason nx requires that we return a CALLBACK to this task */
    addLintTask();
  }
}
