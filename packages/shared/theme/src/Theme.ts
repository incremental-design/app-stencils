import {
  RGBA,
  PlatformInterface,
  StyleFactory,
  ColorPaletteInterface,
  LayoutInterface,
  IOS,
  State,
} from './presets';

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
 * const {style, styles, tints, states, modes} = layout('small')
 *
 * // 3. generate CSS rules
 * const CSSRules = style('textBody','success', 'pressed')
 *
 * // You can chain these calls together:
 * Theme.platform('ios).layout('small').style('textBody','success','pressed')
 *
 * ```
 */
export default class Theme {
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
          layouts: this.makePresetLayouts('ios'),
          colorPalettes: {
            light: this.makePresetColorPalette('ios', 'light'),
            dark: this.makePresetColorPalette('ios', 'dark'),
          },
        },
        macos: {
          layouts: this.makePresetLayouts('macos'),
          colorPalettes: {
            light: this.makePresetColorPalette('macos', 'light'),
            dark: this.makePresetColorPalette('macos', 'dark'),
          },
        },
        tvos: {
          layouts: this.makePresetLayouts('tvos'),
          colorPalettes: {
            light: this.makePresetColorPalette('tvos', 'light'),
            dark: this.makePresetColorPalette('tvos', 'dark'),
          },
        },
        android: {
          layouts: this.makePresetLayouts('android'),
          colorPalettes: {
            light: this.makePresetColorPalette('android', 'light'),
            dark: this.makePresetColorPalette('android', 'dark'),
          },
        },
        windows: {
          layouts: this.makePresetLayouts('windows'),
          colorPalettes: {
            light: this.makePresetColorPalette('windows', 'light'),
            dark: this.makePresetColorPalette('windows', 'dark'),
          },
        },
        gtk: {
          layouts: this.makePresetLayouts('gtk'),
          colorPalettes: {
            light: this.makePresetColorPalette('gtk', 'light'),
            dark: this.makePresetColorPalette('gtk', 'dark'),
          },
        },
        web: {
          layouts: this.makePresetLayouts('web'),
          colorPalettes: {
            light: this.makePresetColorPalette('web', 'light'),
            dark: this.makePresetColorPalette('web', 'dark'),
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

  private static prefixStyleFactories(L: LayoutInterface) {
    const throwIfNotLowercase = (name: string) => {
      if (name.slice(0, 1).toUpperCase() === name.slice(0, 1))
        throw new Error(`${name} must be camelCased.`);
      return name;
    };
    const TK /* (T)ext (K)eys */ = Object.keys(L.text)
      .map((t) => throwIfNotLowercase(t))
      .map(
        (t) => `text${t.slice(0, 1).toUpperCase()}${t.slice(1)}`
      ); /* e.g. text.input becomes textInput */
    const FK /* (F)ill (K)eys */ = Object.keys(L.fill)
      .map((t) => throwIfNotLowercase(t))
      .map(
        (t) => `fill${t.slice(0, 1).toUpperCase()}${t.slice(1)}`
      ); /* e.g. fill.input becomes fillInput */
    const BK /* (B)ackground (K)eys */ = Object.keys(L.bg)
      .map((t) => throwIfNotLowercase(t))
      .map(
        (t) => `bg${t.slice(0, 1).toUpperCase()}${t.slice(1)}`
      ); /* e.g. background.normal becomes bgNormal */
    return { TK, FK, BK };
  }

  private static unprefix(key: string) {
    let U /* (U)nprefixed */ = '';
    let S /* (S)tarts with */ = '';
    if (key.startsWith('text') || key.startsWith('fill')) {
      U = key.slice(4);
      S = key.slice(0, 4);
    } else if (key.startsWith('bg')) {
      U = key.slice(2);
      S = 'bg';
    } else throw new Error(`key must start with 'text', 'fill' or 'bg'.`);
    if (U.length === 0)
      throw new Error(
        `key must not be blank.`
      ); /* this should literally never happen */
    return {
      startsWith: S,
      unprefixed: `${U.slice(0, 1).toLowerCase()}${U.slice(1)}`,
    };
  }

  private static makeLayoutFn(P: PlatformInterface): layoutFn {
    const layouts = Object.keys(P.layouts);
    return (layout: string | LayoutInterface) => {
      const layoutFromString = (layout: string) => {
        if (!layouts.includes(layout))
          throw new Error(
            `layout must be one of ${layouts}or an object of type 'Layout'.`
          );
        return P.layouts[layout];
      };

      const L = typeof layout === 'string' ? layoutFromString(layout) : layout;
      const { TK, FK, BK } = Theme.prefixStyleFactories(L);

      return {
        style: this.makeStyleFn(L, P.colorPalettes),
        styles: {
          text: TK /* e.g. text.primary becomes textPrimary */,
          fill: FK /* e.g. fill.foreground.primary becomes fgPrimary */,
          bg: BK /* e.g. fill.background.primary becomes bgPrimary */,
        },
        tints: L.tints,
        states: L.states,
        modes: Object.keys(P.colorPalettes),
      };
    };
  }

  private static makeStyleFn(
    L: LayoutInterface,
    P: {
      light: ColorPaletteInterface<RGBA>;
      dark: ColorPaletteInterface<RGBA>;
      [colorPalette: string]: ColorPaletteInterface<RGBA>;
    }
  ): styleFn {
    return (
      style: string | StyleFactory,
      tint?: string,
      state?: string,
      darkMode?: boolean | string
    ) => {
      const styleFactoryFromString = (style: string) => {
        let SFG: {
          [style: string]: StyleFactory;
        } /* (S)tyle (F)actory (G)roup */ = {};

        const { startsWith, unprefixed } = Theme.unprefix(style);

        switch (startsWith) {
          case 'text':
            SFG = L.text;
            break;
          case 'fill':
            SFG = L.fill;
            break;
          case 'bg':
            SFG = L.bg;
            break;
          default:
            throw new Error(`'${style}' must start with 'text', 'fg' or 'bg'.`);
        }
        if (!Object.keys(SFG).includes(unprefixed))
          throw new Error(`${unprefixed} should be one of ${Object.keys(SFG)}`);
        if (!SFG[unprefixed]) throw new Error(`${unprefixed} is undefined`);
        return SFG[unprefixed];
      };
      const SF =
        typeof style === 'string' ? styleFactoryFromString(style) : style;

      const getPalette = () => {
        if (typeof darkMode === 'string') {
          return P[darkMode];
        } else {
          if (darkMode) {
            return P.dark;
          } else if (window) {
            return window.matchMedia('(prefers-color-scheme: dark)').matches
              ? P.dark
              : P.light; /* I might want to move this out of here later on, because I don't want to call window every time I recalculate a single style */
          } else {
            return P.light; /* server-side render will default to light because window is undefined */
          }
        }
      };

      const getState = () => {
        if (!state) return State.none;
        switch (
          state /* yes, I know that I shouldn't hardcode this ... but I don't have a better way to unwrap the State enum rn*/
        ) {
          case 'none':
            return State.none;
          case 'hovered':
            return State.hovered;
          case 'pressed':
            return State.pressed;
          case 'toggled':
            return State.toggled;
          case 'focused':
            return State.focused;
          default:
            throw new Error(
              `${state} must be one of 'none', 'hovered', 'pressed', 'toggled', or 'focused'.`
            );
        }
      };

      // todo: actually validate tint

      return SF(getPalette(), tint, getState());
    };
  }

  private static makePresetColorPalette(
    platform: string,
    mode: string
  ): ColorPaletteInterface<RGBA> {
    if (mode !== 'light' && mode !== 'dark')
      throw new Error(`mode must be one of 'light' or 'dark'... for now`);
    switch (platform) {
      case 'ios':
        return IOS.colorPalettes[mode];
      default:
        // throw new Error('not implemented');
        console.warn(
          `${platform} hasn't actually been implemented, so using 'ios' as platform instead`
        );
        return IOS.colorPalettes[mode];
    }
  }

  private static makePresetLayouts(
    platform: string
  ): {
    inline: LayoutInterface;
    small: LayoutInterface;
    smallVertical: LayoutInterface;
    smallWithItemLeft: LayoutInterface;
    smallWithItemRight: LayoutInterface;
    medium: LayoutInterface;
    mediumVertical: LayoutInterface;
    large: LayoutInterface;
    massive: LayoutInterface;
    [layout: string]: LayoutInterface;
  } {
    switch (platform) {
      case 'ios':
        return IOS.layouts;
      default:
        console.warn(
          `${platform} hasn't actually been implemented, so using 'ios' as platform instead.`
        );
        return IOS.layouts;
    }
  }
}

/**
 * Generates a {@link styleFn} from a given {@link LayoutInterface}'s {@link StyleFactory} functions.
 *
 * @param layout - a string that is one of the keys in {@link PlatformInterface.layouts} or a {@link LayoutInterface}
 *
 * @returns a {@link styleFn} that accepts any of the styles, tints, states, and modes in the return object.
 *
 */
type layoutFn = (
  layout: string | LayoutInterface
) => {
  style: styleFn;
  styles: {
    text: Array<string>;
    fill: Array<string>;
    bg: Array<string>;
  };
  tints: Array<string>;
  states: Array<string>;
  modes: Array<string>;
};

/**
 * conditionally executes the {@link StyleFactory} function that matches a given {@link LayoutInterface}.style
 *
 * @param style - a string that is one of the keys in {@link LayoutInterface.text}, {@link LayoutInterface.fill}.foreground or {@link LayoutInterface.fill}.background
 *
 * @param tint - a string that is one of the keys in {@link LayoutInterface.tints}
 *
 * @param state - a string that is one of the keys in {@link LayoutInterface.states}
 *
 * @param darkMode - 'true' to force dark mode, 'false' to force light mode, or one of 'light', 'dark', or any of the other keys in {@link LayoutInterface.modes}
 *
 * @returns a list of CSS rules that correspond to the given parameters.
 *
 */
type styleFn = (
  style: string | StyleFactory,
  tint?: string,
  state?: string,
  darkMode?: boolean | string
) => { [cssRule: string]: number | string };
