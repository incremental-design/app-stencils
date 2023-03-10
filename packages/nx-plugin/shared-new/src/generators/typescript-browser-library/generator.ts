import * as path from 'path';
import { readFile } from 'fs/promises';
import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
  addDependenciesToPackageJson,
  updateJson,
  installPackagesTask,
  readJson,
} from '@nrwl/devkit';

import { TypescriptBrowserLibraryGeneratorSchema } from './schema';

interface NormalizedSchema extends TypescriptBrowserLibraryGeneratorSchema {
  projectName: string;
  projectRoot: string;
  projectDirectory: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: TypescriptBrowserLibraryGeneratorSchema
): NormalizedSchema {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    tsconfigBase: path.relative(
      path.resolve(tree.root, options.projectRoot),
      path.join(tree.root, 'tsconfig.base.json')
    ), // todo: handle no tsconfig base json
    rootEslintrc: path.relative(
      path.resolve(tree.root, options.projectRoot),
      path.join(tree.root, '.eslintrc.json') // todo: handle no eslintrc json
    ),
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

async function addViteConfigBaseTs(tree: Tree) {
  tree.write(
    './vite.config.base.ts',
    await readFile(path.resolve(__dirname, 'vite.config.base.ts')),
    {}
  );
}

function addTsPath(tree: Tree, options: NormalizedSchema) {
  const { npmScope } = readJson(tree, './nx.json');

  const tsPathName = `${npmScope}/${options.projectName}`;

  updateJson(tree, './tsconfig.base.json', (tsconfig) => {
    return {
      ...tsconfig,
      compilerOptions: {
        ...tsconfig.compilerOptions,
        paths: {
          ...tsconfig.compilerOptions.paths,
          [tsPathName]: [
            path.relative(
              tree.root,
              path.resolve(options.projectRoot, 'index.ts')
            ),
          ],
        },
      },
    };
  });
}

export default async function (
  tree: Tree,
  options: TypescriptBrowserLibraryGeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      document: {
        executor: '@incremental.design/nx-plugin-shared-new:document',
        dependsOn: ['build'],
        outputs: [path.join('dist', normalizedOptions.projectRoot)],
      },
      build: {
        executor: '@incremental.design/nx-plugin-shared-new:build',
        outputs: ['{options.outputPath}'],
        options: {
          outputPath: path.join('dist', normalizedOptions.projectRoot),
          bugs: options.bugs,
        },
        dependsOn: [
          'test',
          '^build',
        ] /* ^ means dependencies ... see: https://nx.dev/reference/project-configuration#dependson */,
      },
      test: {
        executor: '@incremental.design/nx-plugin-shared-new:test',
        dependsOn: ['lint'],
      },
      lint: {
        executor: '@incremental.design/nx-plugin-shared-new:lint',
        outputs: [normalizedOptions.projectRoot],
        dependsOn: [
          'format',
        ] /* because we want the linter to have the final say on the contents of the file */,
      },
      format: {
        executor: '@incremental.design/nx-plugin-shared-new:format',
        outputs: [normalizedOptions.projectRoot],
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await addViteConfigBaseTs(tree);
  await formatFiles(tree);

  /* make sure @nrwl/linter, ESlint, Prettier, vite, vite plugins, and vitest are installed */

  // todo: test this in a new repo!!
  addDependenciesToPackageJson(
    tree,
    {},
    {
      '@nrwl/linter': '15.4.5',
      eslint: '^8.33.0',
      prettier: '^2.6.2',
      vite: '^4.1.1',
      'vite-plugin-dts': '^1.7.1',
      'vite-tsconfig-paths': '^4.0.2',
      vitest: '^0.28.4',
      'vue-eslint-parser': '9.1.0',
    }
  );

  addTsPath(tree, normalizedOptions);

  installPackagesTask(
    tree,
    true /* force run to trigger pnpm workspace installations */
  );
}
