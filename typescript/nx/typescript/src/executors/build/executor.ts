import * as path from 'path';
import { spawn } from 'child_process';
import { readFile, writeFile, stat } from 'fs/promises';
import type { ExecutorContext } from '@nrwl/devkit';
import { BuildExecutorSchema } from './schema';
import { getPrettier, getPrettierOptions } from '../format/getPrettier';
import getRoots from '../getRoots';

/**
 * Reads a package's src directory, and the dependencies in its package JSON, and outputs:
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

  // todo: set these based on project options
  const __FRAMEWORK__ = 'ts-browser';
  const __LIBRARY__ = 'true';
  const __PROJECT_ROOT__ = projectRoot;
  const __OUTDIR__ = outDir;
  const __PROJECT_NAME__ = projectName;

  const vitePath = path.resolve(workspaceRoot, 'node_modules', '.bin', 'vite');

  try {
    await stat(vitePath);
  } catch (e) {
    console.error(e);
    return { success: false };
  }

  const buildProcess = spawn(
    vitePath,
    ['build', '--mode=production', '--config=vite.config.base.ts'],
    {
      cwd: workspaceRoot,
      env: {
        __FRAMEWORK__,
        __LIBRARY__,
        __PROJECT_ROOT__,
        __OUTDIR__,
        __PROJECT_NAME__,
      },
    }
  );
  buildProcess.stdout.on('data', (data) => console.log(data.toString('utf8')));
  buildProcess.stderr.on('data', (data) =>
    console.error(data.toString('utf8'))
  );

  await new Promise<void>((resolve, reject) => {
    buildProcess.on('close', (code) => {
      if (code !== 0) reject();
      resolve();
    });
  });

  const bugs = options.bugs ? { url: options.bugs } : {};

  /* then, output package.json */

  const version = '0.0.1'; // need to figure out versioning

  const w = context.workspace;
  const { npmScope } = w;

  const packageJson = JSON.parse(
    await readFile(path.join(projectRoot, 'package.json'), 'utf-8')
  );

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
