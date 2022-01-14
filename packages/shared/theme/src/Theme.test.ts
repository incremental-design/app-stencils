import { default as Theme } from './Theme';
import { IOS, hexAlphaToRGBA } from './presets';

describe('Theme', () => {
  describe('Accessors', () => {
    it('lists all available platforms, with "Theme.platforms"', async () => {
      for await (const platform of Theme.platforms) {
        await print(`${platform}\n`);
      }
    });
  });
  describe('Static methods', () => {
    it('lists all of the available layouts for each platform, with Platform(<name of platform>)', async () => {
      for await (const platform of Theme.platforms) {
        const { layout, layouts } = Theme.platform(platform);
        await print(`\n\nLayouts for ${platform} are:\n\n`);
        for await (const layout of layouts) {
          await print(`${layout}\n`);
        }
      }
    });
    it('lists all of the available styles for each layout, with Platform(<name of platform>).layout(<name of layout>)', async () => {
      for (const platform of Theme.platforms) {
        const { layout, layouts } = Theme.platform(platform);
        for await (const l of layouts) {
          await print(`\n\nStyles for ${platform} ${l} are:\n\n`);
          const {
            style,
            styles: { text, fill, bg },
            tints,
            states,
            modes,
          } = layout(l);
          for await (const s of [...text, fill, bg]) {
            await print(`${s}\n`);
          }
          await print(`\n\ntints of ${platform} ${l} are\n\n`);
          for await (const t of tints) {
            await print(`${t}\n`);
          }
          await print(`\n\nstates of ${platform} ${l}are:\n\n`);
          for await (const s of states) {
            await print(`${s}\n`);
          }
          await print(`\n\ncolor modes of ${platform} ${l} are:\n\n`);
          for await (const m of modes) {
            await print(`${m}\n`);
          }
        }
      }
    });
    it('generates the CSS for each of the available styles in each layout, with Platform(<name of platform>).layout(<name of layout>).style(<name of style>,<name of tint>,<name of state>,<name of mode>)', async () => {
      for (const platform of Theme.platforms) {
        const { layout, layouts } = Theme.platform(platform);
        for (const l of layouts) {
          const {
            style,
            styles: { text, fill, bg },
            tints,
            states,
            modes,
          } = layout(l);
          for (const s of [...text, ...fill, ...bg]) {
            for (const tint of tints) {
              for (const state of states) {
                for (const mode of modes) {
                  await print(
                    `\n\nPlatform: ${platform}\n\tlayout: ${l}\n\t\tstyle: ${s}\n\t\t\ttint: ${tint}\n\t\t\tstate: ${state}\n\t\t\tmode: ${mode}\n\n`
                  );
                  const CSSRules = style(s, tint, state, mode);
                  for await (const rule of Object.keys(CSSRules)) {
                    await print(`${rule}: ${CSSRules[rule]}\n`);
                  }
                }
              }
            }
          }
        }
      }
    });
  });
});

const print = (chunk: string) =>
  new Promise<void>((resolve) => {
    if (!process.stdout.write(chunk)) {
      process.stdout.once('drain', resolve);
    } else {
      resolve();
    }
  });
