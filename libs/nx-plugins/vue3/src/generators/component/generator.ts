import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  getWorkspaceLayout,
  names,
  offsetFromRoot,
  Tree,
} from '@nrwl/devkit';
import * as path from 'path';
import { NxPluginsVue3GeneratorSchema } from './schema';

interface NormalizedSchema extends NxPluginsVue3GeneratorSchema {
  projectName: string;
  projectRoot: string;
  parsedTags: string[];
}

function normalizeOptions(
  tree: Tree,
  options: NxPluginsVue3GeneratorSchema
): NormalizedSchema {
  const name = `component-${names(options.name).fileName}`;
  const projectDirectory = `vue3/${name}` /* this tightly couples the plugin to this nx workspace. Later on we'll have to come up with a better way to enforce naming convention */
  const projectName = name;
  const projectRoot = `${getWorkspaceLayout(tree).libsDir}/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    parsedTags,
  };
}

function addFiles(tree: Tree, options: NormalizedSchema) {
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
  };
  generateFiles(
    tree,
    path.join(__dirname, 'files'),
    options.projectRoot,
    templateOptions
  );
}

export default async function (
  tree: Tree,
  options: NxPluginsVue3GeneratorSchema
) {
  const normalizedOptions = normalizeOptions(tree, options);
  addProjectConfiguration(tree, normalizedOptions.projectName, {
    root: normalizedOptions.projectRoot,
    projectType: 'library',
    sourceRoot: `${normalizedOptions.projectRoot}/src`,
    targets: {
      build: {
        executor: '@incremental.design/nx-plugin-vue3:build',
      },
    },
    tags: normalizedOptions.parsedTags,
  });
  addFiles(tree, normalizedOptions);
  await formatFiles(tree);
}
