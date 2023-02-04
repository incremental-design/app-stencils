import * as path from 'path';
import { readFile } from 'fs/promises';
import { InlineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';

/**
 *
 * @param workspaceRoot - absolute path to the workspace
 * @param projectRoot - absolute path to the project
 * @param projectName - name of the project. Should be kebab-cased
 * @param outDir - the absolute path to the directory where vite will output the build
 * @param packageJson - object containing the contents of the project's package.json. Optional. If not specified, then this function will get the package JSON automatically. Specify it if you already have the package JSON and don't want to waste cycles reading it again.
 * @returns an {@link InlineConfig} that vite will use to build the project
 */
export default async function getViteInlineConfig(
  workspaceRoot: string,
  projectRoot: string,
  projectName: string,
  outDir: string,
  packageJson?: { dependencies: Record<string, string> }
): Promise<InlineConfig> {
  const root =
    path.join(
      projectRoot
    ); /* every other path in this config is relative to this path */

  const tsConfigFilePath = path.relative(
    root,
    path.resolve(workspaceRoot, 'tsconfig.base.json')
  ); // todo: supply a local tsconfig json if this is missing

  const dts = await import('vite-plugin-dts');

  const plugins = [
    viteTsConfigPaths({ projects: [tsConfigFilePath] }),
    //@ts-expect-error - dts typing is broken, but this function call works
    dts({
      tsConfigFilePath,
      entryRoot: '.',
      outputDir: path.relative(root, outDir),
      skipDiagnostics: true,
      emptyOutDir: false,
    }),
  ];

  // todo: support build as web worker??

  const entry = 'index.ts';
  const name = projectName;

  const pj =
    packageJson ||
    JSON.parse(await readFile(path.join(projectRoot, 'package.json'), 'utf-8'));

  const external = Object.keys(pj.dependencies);

  const build = {
    outDir: path.relative(root, outDir),
    lib: {
      entry,
      name,
      fileName: 'index',
      formats: ['es', 'cjs'] as Array<'es' | 'cjs'>,
    },
    rollupOptions: {
      external,
    },
  };

  return {
    root,
    plugins,
    build,
  };
}
