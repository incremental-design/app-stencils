import { default as Theme } from './Theme';
import { IOS, hexAlphaToRGBA } from './presets';

describe('Theme', () => {
  describe('Accessors', () => {
    it('lists all available platforms, with "Theme.platforms"', async () => {
      for await (const platform of Theme.platforms) {
        await print(platform);
      }
    });
  });
  describe('Static methods', () => {});
});

const print = (chunk: string) =>
  new Promise<void>((resolve) => {
    if (!process.stdout.write(chunk)) {
      process.stdout.once('drain', resolve);
    } else {
      resolve();
    }
  });
