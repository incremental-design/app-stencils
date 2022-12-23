import { createTreeWithEmptyWorkspace } from '@nrwl/devkit/testing';
import { Tree, readProjectConfiguration } from '@nrwl/devkit';

import generator from './generator';
import { NxPluginNxPluginComponentVue3GeneratorSchema } from './schema';

describe('nx-plugin-nx-plugin-component-vue3 generator', () => {
  let appTree: Tree;
  const options: NxPluginNxPluginComponentVue3GeneratorSchema = {
    name: 'test',
  };

  beforeEach(() => {
    appTree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await generator(appTree, options);
    const config = readProjectConfiguration(appTree, 'test');
    expect(config).toBeDefined();
  });
});
