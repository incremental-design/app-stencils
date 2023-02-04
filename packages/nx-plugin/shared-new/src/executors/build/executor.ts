import * as path from 'path';
import { readFile, writeFile } from 'fs/promises';
import type { ExecutorContext } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';
import { build } from 'vite';
import { getPrettier, getPrettierOptions } from '../format/getPrettier';
import getViteInlineConfig from './getViteInlineConfig';
import getRoots from '../getRoots';

/**
 * Reads a package's src directory, and the dependencies in it's package JSON, and outputs:
 * - a new package JSON that is populated with all of the values needed to publish it to NPM
 * - a dist folder with three files: an index.cjs (common js module), an index.js (esmodule), and an index.d.ts (type declaration) file.
 *
 * @returns: an object with member 'success' as a boolean. {@link nx.dev nx} consumes this object after this {@link https://nx.dev/plugin-features/use-task-executors executor} runs.
 */
export default async function runExecutor(
  options: BuildExecutorSchema,
  context: ExecutorContext
) {
  /* make sure prettier is available, so that package json can be formatted at end of build step */
  const prettier = await getPrettier();

  if (!prettier)
    return {
      success: false,
    };

  const resolvedOptions = await getPrettierOptions(prettier, context.root);

  /* build project with vite */

  let R: ReturnType<typeof getRoots>;
  try {
    R = getRoots(context);
  } catch (e) {
    console.error(e);
    return { success: false };
  }

  const { workspaceRoot, projectRoot, projectName } = R;

  const outDir = path.join(workspaceRoot, options.outputPath);

  const packageJson = JSON.parse(
    await readFile(path.join(projectRoot, 'package.json'), 'utf-8')
  );

  const c = await getViteInlineConfig(
    workspaceRoot,
    projectRoot,
    projectName,
    outDir,
    packageJson
  );

  await build(c);

  const bugs = options.bugs ? { url: options.bugs } : {};

  /* then, output package.json */

  const version = '0.0.1'; // need to figure out versioning

  const w = context.workspace;
  const { npmScope } = w;

  const name = npmScope ? `${npmScope}/${packageJson.name}` : packageJson.name;
  const [dependencies, devDependencies] = [
    packageJson.dependencies,
    packageJson.devDependencies,
  ].map((d) =>
    Object.fromEntries(
      Object.entries(d).map((entry) => {
        if (entry[1] === '*')
          entry[1] =
            version; /* "*" tells nx to use workspace version of package. But, on publish, we want to use the published version of said package */
        return entry;
      })
    )
  );

  const packageJsonOut = Object.assign({}, packageJson, {
    name,
    version,
    main: 'index.js',
    module: 'index.mjs',
    types: 'index.d.ts',
    sideEffects: false,
    publishConfig: { access: 'public' },
    license: 'MIT',
    ...bugs,
    dependencies,
    devDependencies,
  });

  await writeFile(
    path.join(outDir, 'package.json'),
    prettier.format(JSON.stringify(packageJsonOut), {
      ...resolvedOptions,
      parser: 'json',
    })
  );

  // start here: format package json with prettier

  return { success: true };
}
