import {
  Tint,
  ColorPalette,
  Element,
  Layout,
  Platform,
  Style,
  RGBA,
  Elevation,
  PlatformInterface,
  ElementInterface,
  StyleInterface,
  ColorPaletteInterface,
} from './utils';

/**
 * Theme generates CSS rules for your components.
 * @remarks
 *
 * Use this class to make your components mimic the look of iOS, macOS, tvOS, Android, Windows or GTK (linux) apps. You can also use it to generate CSS rules for your own themes.
 *
 * * All of the information used to generate the CSS rules for each of the {@link Theme.platforms} is contained within the Theme class's prototype itself. You don't have to instantiate Theme to generate the styles for iOS, macOS, tvOS, Android, Windows or GTK. However, you can instantiate Theme with your own {@link Platform}s. Doing so will add to the list of {@link Theme.Platform}s in that instance of Theme.
 *
 * * Theme furnishes a single static method: {@link platform}. This method returns the {@link layout} function and a list of available layouts you can insert into it. Calling {@link layout} returns the {@link element} function, and a list of elements you can insert into it. Calling the {@link element} function returns the {@link style} function, and lists of tints, states and color modes you can insert into it. Calling the {@link style} function returns an object that contains all of the CSS rules you need to style the element within the layout you chose, so that it matches the visual language of the platform you chose.
 *
 * * You can inject dependencies into each of the functions in the {@link platform} method chain:
 *  | function | Dependency it accepts | What it does |
 *  | :------- | :-------------------- | :----------- |
 *  | {@link platform} | {@link Platform} | Applies Theme's {@link ColorPalette}s to a custom platform. |
 *  | {@link layout} | {@link Layout} | Adds a custom layout to a platform |
 *  | {@link element} | {@link Element} | Adds a custom element to a layout |
 * * You can also instantiate Theme with your own {@link ColorPalette}s to make a a custom color palette to all of the platforms in Theme.
 *
 * * It doesn't make sense to extend this class, because you can achieve complete customization of any preset theme, or even create your own theme, using dependency injection.
 *
 * * Theme is designed to be entirely static. It doesn't even have a constructor.This drastically lowers its memory footprint - especially when it's used to style every component in your web app.
 *
 * @example
 * ```typescript
 *  // 1. choose a platform
 *  const {layout, layouts} = Theme.platform('ios')
 *
 * // 2. choose a layout
 * const {element, elements} = layout('small')
 *
 * // 3. choose an element
 * const {style, tints, states} = element('text-body')
 *
 * // 4. generate CSS rules
 * const CSSRules = style('success', 'pressed')
 *
 * // You can chain these calls together:
 * Theme.platform('ios).layout('small').element('text-body').style('success','pressed')
 *
 * ```
 */
class Theme {
  // !Static Methods

  static platform(
    platform: string | PlatformInterface
  ): {
    layout: layoutFn;
    layouts: Array<string>;
  } {
    if (typeof platform === 'string') {
      if (!Theme.platforms.includes(platform))
        throw new Error(
          `platform must be one of ${Theme.platforms} or an object of type 'Platform'.`
        );
      const layouts = Object.keys(Theme.presets.platforms[platform].layouts);
      const layout = Theme.makeLayoutFn(Theme.presets.platforms[platform]);
      return { layout, layouts };
    } else {
      const layouts = Object.keys(platform.layouts);
      const layout = Theme.makeLayoutFn(platform);
      return { layout, layouts };
    }
  }

  // !Getters and Setters

  private static get presets() {
    const presets: {
      platforms: {
        [platform: string]: PlatformInterface;
      };
    } = {
      platforms: {
        ios: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('ios', 'light'),
            dark: makePresetColorPalette('ios', 'dark'),
          },
        },
        macos: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('macos', 'light'),
            dark: makePresetColorPalette('macos', 'dark'),
          },
        },
        tvos: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('tvos', 'light'),
            dark: makePresetColorPalette('tvos', 'dark'),
          },
        },
        android: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('android', 'light'),
            dark: makePresetColorPalette('android', 'dark'),
          },
        },
        windows: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('windows', 'light'),
            dark: makePresetColorPalette('windows', 'dark'),
          },
        },
        gtk: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('gtk', 'light'),
            dark: makePresetColorPalette('gtk', 'dark'),
          },
        },
        web: {
          layouts: {
            inline: {},
            small: {},
            smallVertical: {},
            smallWithInline: {},
            smallWithItemLeft: {},
            smallWithItemRight: {},
            medium: {},
            mediumVertical: {},
            large: {},
            massive: {},
          },
          colorPalettes: {
            light: makePresetColorPalette('web', 'light'),
            dark: makePresetColorPalette('web', 'dark'),
          },
        },
      },
    };
    return presets;
  }

  static get platforms(): Array<string> {
    return Object.keys(Theme.presets.platforms);
  }

  // !Private Subroutines

  private static makeLayoutFn(P: PlatformInterface): layoutFn {
    throw new Error('not implemented');
  }

  private static makeElementFn(
    E: ElementInterface,
    C: ColorPaletteInterface<RGBA>
  ): elementFn {
    throw new Error('not implemented');
  }

  private static makeStyleFn(
    S: StyleInterface,
    C: ColorPaletteInterface<RGBA>
  ): styleFn {
    throw new Error('not implemented');
  }
}

type layoutFn = (
  layout: string | Layout
) => {
  element: elementFn;
  elements: Array<string>;
};

type elementFn = (
  element: string | Element
) => {
  style: styleFn;
  tints: Array<string>;
  states: Array<string>;
  modes: Array<string>;
};

type styleFn = (
  tint?: string | Tint<RGBA | Elevation<RGBA>>,
  state?: string,
  dark?: boolean | string
) => { [cssRule: string]: number | string };

function makePresetColorPalette(
  platform: string,
  mode: string
): ColorPaletteInterface<RGBA> {
  throw new Error('not implemented');
}
