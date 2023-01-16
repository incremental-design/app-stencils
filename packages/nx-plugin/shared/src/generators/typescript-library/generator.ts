import {
  getWorkspaceLayout,
  Tree,
  readProjectConfiguration,
  names,
  updateProjectConfiguration,
  updateJson,
} from '@nrwl/devkit';
import { TypescriptLibraryGeneratorSchema } from './schema';
import * as path from 'path';
import { libraryGenerator } from '@nrwl/js';
import { Project, ScriptTarget, ts } from 'ts-morph';
import { readFile } from 'fs/promises';

async function updateViteConfigTs(tree: Tree, projectRoot: string) {

  const viteConfigTsPath = path.join(projectRoot, 'vite.config.ts')

  const viteConfigTs = tree.read(viteConfigTsPath, 'utf-8');

  const [
    rootTsConfig,
    projectTsConfig,
    projectTsConfigLib
  ] = await Promise.all(
    [
      readFile(path.join(tree.root, 'tsconfig.base.json'), 'utf-8'),
      tree.read(path.join(projectRoot, 'tsconfig.json'), 'utf-8'),
      tree.read(path.join(projectRoot, 'tsconfig.lib.json'), 'utf-8'),
    ]
  );
  // todo: safely handle error in case root tsconfig isn't available (maybe make sure that @nrwl/js has been initialized first?)

  const compilerOptions = [
    rootTsConfig,
    projectTsConfig,
    projectTsConfigLib
  ].map(jsonString => JSON.parse(jsonString)).map(json => json.compilerOptions).reduce((acc, curr) => ({...acc, ...curr}))

  /* see: https://ts-morph.com/setup/index#compiler-options */
  const project = new Project({
    compilerOptions,
    skipAddingFilesFromTsConfig: true,
    useInMemoryFileSystem: true,
  });

  const vts = project.createSourceFile('/vite.config.ts', viteConfigTs)


  const dtsConfig = vts.forEachChildAsArray().filter(child => child.isKind(ts.SyntaxKind.ExportAssignment))[0].forEachChildAsArray()[0].forEachChildAsArray()[1].forEachChildAsArray()[0].forEachChildAsArray()[1].forEachChildAsArray()[0].forEachChildAsArray()[1] // this is a flimsy way to access dtsConfig because it blindly reaches into the AST. It should instead search the AST for the 'dtsConfig' function, validate the existing config, and then update it.

  dtsConfig.asKind(ts.SyntaxKind.ObjectLiteralExpression).addPropertyAssignment({
    name: 'rollupTypes',
    initializer: 'true'
  })

  await project.save()

  const newConfig = await project.getFileSystem().readFile('/vite.config.ts', 'utf8')

  tree.write(viteConfigTsPath, newConfig)

}

export default async function (
  tree: Tree,
  options: TypescriptLibraryGeneratorSchema
) {
  const { name, directory, tags } = options;

  const { npmScope } = getWorkspaceLayout(tree);

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
  });

  /* add format configuration */

  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;

  const c = readProjectConfiguration(tree, projectName);

  c.targets['format'] = {
    executor: '@incremental.design/nx-plugin-vue3:format', // todo: test publishing and installing this generator in another repo - see if nx-plugin-vue3 will automatically be installed
    outputs: ['{projectRoot}/**/*'],
  };

  const viteBuild = c.targets['build'];

  c.targets['build'] = {
    executor: '@incremental.design/nx-plugin-vue3:build',
    options: {
      viteConfig: 'production',
    },
  };

  c.targets['vite-build'] = viteBuild;

  updateProjectConfiguration(tree, projectName, c);

  /* update package.json */
  updateJson(tree, path.join(projectRoot, 'package.json'), (json) => {
    (json.private = false), (json.module = `src/index.ts`);
    json.description = options.description;
    json.private = false;
    json.sideEffects = true;
    json.publishConfig = {
      access: 'public',
    };
    json.license = 'MIT';
    json.bugs = {
      url: options.bugs,
    };
    return json;
  });

  /* update vite.config.ts */
  await updateViteConfigTs(tree, projectRoot);
}
