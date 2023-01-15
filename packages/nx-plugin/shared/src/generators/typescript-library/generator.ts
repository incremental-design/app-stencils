import {
  getWorkspaceLayout,
  Tree,
  readProjectConfiguration,
  names,
  updateProjectConfiguration,
  updateJson
} from '@nrwl/devkit';
import { TypescriptLibraryGeneratorSchema } from './schema';
import * as path from 'path'
import { libraryGenerator } from '@nrwl/js'

export default async function (tree: Tree, options: TypescriptLibraryGeneratorSchema) {

    const { name, directory, tags } = options;

    const {npmScope} = getWorkspaceLayout(tree)

    await libraryGenerator(tree, {
    name,
    directory,
    tags,
    unitTestRunner: 'vitest',
    linter: 'eslint',
    importPath: `${npmScope}${npmScope ? '/' : ''}${name}`,
    pascalCaseFiles: true,
    strict: true,
    publishable: true,
    compiler: 'swc',
    bundler: 'vite',
  })

  /* add format configuration */

  const projectDirectory = options.directory
  ? `${names(options.directory).fileName}/${name}`
  : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  const c = readProjectConfiguration(tree, projectName)

  c.targets['format'] = {
  executor: "@incremental.design/nx-plugin-vue3:format", // todo: test publishing and installing this generator in another repo - see if nx-plugin-vue3 will automatically be installed
  outputs: ["{projectRoot}/**/*"]
  }

  const viteBuild = c.targets['build']

  c.targets['build'] = {
    executor: '@incremental.design/nx-plugin-vue3:build',
    options: {
      viteConfig: 'production'
    }
  }

  c.targets['vite-build'] = viteBuild

  updateProjectConfiguration(tree, projectName, c)

    /* update package.json */
    updateJson(tree, path.join(projectRoot,'package.json'), (json) => {
      json.private = false,
      json.module = `src/index.ts`
      json.description = options.description
      json.private = false
      json.sideEffects = true
      json.publishConfig = {
      access: 'public'
      }
      json.license = 'MIT'
      json.bugs = {
        url: options.bugs
      }
      return json
    })


}
