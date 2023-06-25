import * as path from 'path';
import { stat } from 'fs/promises';
import type * as Prettier from 'prettier';
export async function getPrettier() {
  let prettier: typeof Prettier;

  try {
    prettier = await import('prettier');
  } catch (e) {
    console.error(e); // todo: make sure prettier is installed in workspace root
  }

  if (!prettier) return false;

  return prettier;
}

export async function getPrettierOptions(
  prettier: typeof Prettier,
  root: string
) {
  const editorconfig = await (async () => {
    try {
      await stat(path.join(root, '.editorconfig'));
      return true;
    } catch (e) {
      return false;
    }
  })();

  return prettier.resolveConfig(root, {
    editorconfig,
  });
}
