import type { ESLint } from 'eslint';

// maybe here is a good place to make sure @nrwl/linter is installed?

export default async function getEslint(
  o: ESLint.Options
): Promise<{ eslint: ESLint; outputFixes: typeof ESLint.outputFixes } | false> {
  try {
    await import(
      '@nrwl/linter'
    ); /* just make sure that @nrwl/linter is installed before running this step */
    const { ESLint } = await import('eslint');

    const eslint = new ESLint();
    const outputFixes = ESLint.outputFixes;
    return { eslint, outputFixes };
  } catch (e) {
    console.error(e);
    return false;
  }
}
