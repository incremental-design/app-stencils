import { readFile } from 'fs/promises';
import * as path from 'path';
import { ExecutorContext } from '@nrwl/devkit';
import type { ESLint } from 'eslint';
import { LintExecutorSchema } from './schema';
import getEslint from './getEslint';
import getRoots from '../getRoots';

export default async function runExecutor(
  options: LintExecutorSchema,
  context: ExecutorContext
) {
  let R: ReturnType<typeof getRoots>;
  try {
    R = getRoots(context);
  } catch (e) {
    console.error(e);
    return { success: false };
  }

  const { workspaceRoot, projectRoot } = R;

  let baseConfigContents: string;
  const baseConfigPath = path.resolve(workspaceRoot, '.eslintrc.json');
  try {
    baseConfigContents = await readFile(baseConfigPath, 'utf-8');
  } catch (e) {
    baseConfigContents = await readFile(
      path.resolve(__dirname, './eslintrc.default.json'),
      'utf-8'
    );
  }

  const baseConfig = JSON.parse(baseConfigContents);

  const o: ESLint.Options = {
    cwd: workspaceRoot,
    baseConfig,
    fix: true,
    ignore: false,
  };

  const e = await getEslint(o);

  if (!e) return { success: false };

  const { eslint, outputFixes } = e;

  const results = await eslint.lintFiles(`${projectRoot}/**/*.ts`);

  await outputFixes(results);

  const f = await eslint.loadFormatter('stylish');

  console.log(f.format(results));

  const success = results.every((result) => {
    const { errorCount, fatalErrorCount } = result;
    return errorCount + fatalErrorCount === 0;
  });

  return {
    success,
  };
}
