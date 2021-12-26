/**
 * Theme contains all of the css you need to make your web app look like an iOS, MacOS, tvOS, Android, Windows, GTK (linux), or Bootstrap 5 (web) app.
 * @remarks
 *
 * Use this class to style the components in your web app. In most cases, it can replace the CSS you would otherwise use.
 *
 * * This class has no state. It is literally just a collection of static methods. This significantly improves the performance of `Theme`, because every method in this class is defined on the `Theme` prototype itself.
 *
 * * This class furnishes dozens of accessors, each of which returns an object that contains CSS rules.
 *
 * * This class does not accept any dependencies, because it has no state. However, theme's methods accept a {@link Theme.Platform}, {@link Theme.State}, {@link Theme.Tint}, and 'dark' parameter. It is up to you to keep track of these parameters, and pass them to the methods when you call them.
 *
 * * Extend this class whenever you want to add a static method that isn't already defined.
 *
 * * This class furnishes a tree of nested static methods. To use it:
 *  1. Call Theme.{@link platform} with one of {@link Theme.platforms}, or your own options object.
 *  2. Chain a call to {@link layout} with one of {@link Theme.layouts}, or your own options object.
 *  3. Chain a call to either {@link text} or {@link fill}. Each will return an object containing the available methods for the given platform and layout.
 *  4. Destructure the method you want to call, and then supply it with the {@link theme.states}, {@link Tint} and `true` or `false` for the `dark?` parameter. It will return an object that contains the style.
 *
 * @example
 * ```typescript
 *    const Styles = Theme.platform(Theme.Platform.ios).layout(Theme.Layout.inline).text().body(State.pressed ,Tint.progress, true)
 * ```
 */
export default class Theme {
  // !Static Private Methods

  // !Static Methods
  static platform(
    platform: string | Platform
  ): { [layoutName: string]: Layout } {
    const platformFromString = (
      S: string
    ): { [layoutName: string]: Layout } => {
      if (!Object.values(Theme.platforms).includes(S))
        throw new Error(
          `${S} is not a valid platform. Use one of ${Object.values(
            Theme.platforms
          )}`
        );
      throw new Error('not implemented');
    };
    if (typeof platform === 'string') return platformFromString(platform);
    return platform.layouts;
  }

  // !Private (and/or readonly) Properties
  static readonly platforms = {
    ios: 'ios',
    macos: 'macos',
    tvos: 'tvos',
    android: 'android',
    windows: 'windows',
    gtk: 'gtk',
    web: 'web',
  };
  static readonly layouts = {
    inline: 'inline',
    small: 'small',
    smallVertical: 'smallVertical',
    smallWithInline: 'smallWithItem',
    smallWithItemLeft: 'smallWithItemLeft',
    smallWithItemRight: 'smallWithItemRight',
    medium: 'medium',
    mediumVertical: 'mediumVertical',
    large: 'large',
    massive: 'massive',
  };
  static readonly states = {
    hovered: 'hovered',
    pressed: 'pressed',
    toggled: 'toggled',
    focused: 'focused',
  };
}

/**
 * Platform contains all of the methods needed to generate styles for a particular platform.
 * @remarks
 *
 * Use the setters in this class to set the styles for your own platform. Use the {@link options} getter to generate an options object that you can feed into the {@link platform} static method of the {@link Theme} class.
 *
 * * Don't use this class to make a theme that looks just like iOS, MacOS, tvOS, Android, Windows, GTK (linux), or Bootstrap 5 (web). Those themes are already built into the {@link Theme} class.
 *
 * * This class contains a minimum of two {@link ColorPalette} objects: one for the platform's light mode, and another for the platform's dark mode. It also contains an array of {@link Layout} objects, each of which describes the styles needed to arrange and color the text and fill for a particular layout.
 *
 * * This class relies on dependency injection to do anything meaningful. You need to inject the {@link Layout}s you want to use. This class provides the fonts and colors that are common to all layouts, while the layouts provide the sizes and positions of text and fills.
 *
 * * Don't extend this class. It is tightly coupled to the {@link Layout} class.
 *
 * * How does the code in this class work?
 *
 * @example
 * ```typescript
 *  const P = new Platform()
 *  const L = new Layout(Theme.layouts.small)
 *
 *  //inject a layout into platform
 *  P.addLayout(L);
 * ```
 *
 */
class Platform {
  // !Static Methods

  // !Private (and/or readonly) Properties
  #layouts: Map<string, Layout | null> = new Map();
  #palettes: Map<string, ColorPalette<RGBA>> = new Map();

  // !Constructor Function
  constructor(
    colorPalettes: {
      dark: ColorPalette<RGBA>;
      light: ColorPalette<RGBA>;
      [paletteName: string]: ColorPalette<RGBA>;
    },
    layouts: Layout[]
  ) {
    /* at a minimum, ALL platform objects MUST contain a layout for each of Theme.Layouts */
    for (const L of Object.values(Theme.layouts)) {
      this.#layouts.set(L, null); /* stub an empty layout */
    }
    for (const layout of layouts) {
      const L = layout.name;
      this.#layouts.set(L, layout);
    }
    for (const paletteName in Object.keys(colorPalettes)) {
      this.#palettes.set(paletteName, colorPalettes[paletteName]);
    }
    if (this.#palettes.get('dark') === undefined) {
      throw new Error('dark palette is undefined');
    }
    if (this.#palettes.get('light') === undefined) {
      throw new Error('light palette is undefined');
    }
    /* at a minimum, ALL platform objects MUST contain a dark ColorPalette and a light ColorPalette */
  }

  // !Getters and Setters
  get layouts(): { [layoutName: string]: Layout } {
    const L = Object.fromEntries(this.#layouts);
    const MissingKeys = [];
    for (const key of Object.keys(L)) {
      if (L[key] === null) MissingKeys.push(key);
    }
    if (MissingKeys.length > 0)
      throw new Error(
        `The following layouts are missing from this platform: ${MissingKeys.join(
          ', '
        )}`
      );
    return L as { [layoutName: string]: Layout };
  }

  get colorPalettes(): {
    dark: ColorPalette<RGBA>;
    light: ColorPalette<RGBA>;
    [paletteName: string]: ColorPalette<RGBA>;
  } {
    return Object.fromEntries(this.#palettes) as {
      dark: ColorPalette<RGBA>;
      light: ColorPalette<RGBA>;
      [paletteName: string]: ColorPalette<RGBA>;
    }; /* the constructor WILL enforce this type cast */
  }

  // !Public Instance Methods
  addLayout(layout: Layout): void {
    this.#layouts.set(layout.name, layout);
  }

  // !Private Subroutines
}

/**
 * Layout contains the {@link StyleGenerator}s needed to define a layout within a {@link Platform}
 * @remarks
 *
 * Use this class to hold the {@link StyleGenerator}s for the text, foreground fill and background fill of a layout.
 *
 * * Don't use this class to generate styles. It only does anything meaningful when it is injected into the {@link Layout} class.
 *
 * * This class keeps track of all of the {@link StyleGenerator} methods you supply it.
 *
 * * This class doesn't have any meaningful behaviors of its own. All it really does is pass the {@link ColorPalette} objects from the {@link Platform} class into each of the {@link StyleGenerator} functions that it contains. This class doesn't do anything until you plug it into the {@link Platform} class, which will in turn generate an object that you need to plug into the {@link platform} method of the {@link Theme} class.
 *
 * * Don't extend this class, because its current implementation is tightly coupled to the {@link Platform} class.
 *
 * * When you plug Layout into {@link Platform}, {@link Platform} inserts a set of {@link ColorPalette}s into it. Layout will appply the colors that you select from the palette.
 *
 * @example
 * ```typescript
 * const L = new Layout('layoutMediumWithItem');
 *
 * // define a text style generator for the layout
 * L.addText('body' (P: ColorPalette, tint?: string) => {
 *  return {
 *    'font-size': 1rem,
 *    'font-family': 'Proxima Nova',
 *    'color': P.text.body,
 *  }
 * });
 *
 * // define a foreground style generator for the layout
 * L.addFG('floating', (P: ColorPalette, tint?: string)=>{
 *  return {
 *    'background-color': P.fill.floating[tint] ? P.fill.floating[tint].fill : P.fill.floating.default.fill,
 *    'border-radius': P.fill.floating[tint] ? P.fill.floating[tint].borderRadius : P.fill.floating.default.borderRadius,
 *    'border-width': P.fill.floating[tint] ? P.fill.floating[tint].borderWidth : P.fill.floating.default.borderWidth,
 *    'min-width': 6rem,
 *    'min-height': 4rem,
 *    'display': 'flex',
 *  }
 * });
 * ```
 */
class Layout {
  // !Static Methods

  // !Private (and/or readonly) Properties
  #name: string;

  // !Constructor Function
  constructor(nameOfLayout: string) {
    this.#name = nameOfLayout;
  }

  // !Getters and Setters
  get name(): string {
    return this.#name;
  }

  // !Public Instance Methods

  // !Private Subroutines
}

/**
 *
 * @param palettes- an object that contains, at a minimum, a light and a dark {@link ColorPalette} object. This will always be supplied by the {@link Platform} class.
 *
 * @param tint - the tint to apply to the colors. This will always be one of the {@link Theme.} values.
 *
 * @param dark - a boolean that determines whether the dark palette should be applied. Defaults to `false`. In the case that palettes other than a light and dark are supplied by the {@link Platform} object, then the palette to use canbe selected by supplying the string that matches the key of the palette.
 *
 *
 * @returns an object that contains CSS rules. These rules aren't stringified to valid CSS, but they can be applied to a Vue or React component, or be fed into autoprefixer.
 *
 */
type StyleGenerator = (
  palettes: {
    light: ColorPalette<RGBA>;
    dark: ColorPalette<RGBA>;
    [paletteName: string]: ColorPalette<RGBA>;
  },
  tint?: string,
  dark?: boolean | string
) => { SO: /* (S)tyle (O)bject */ object };

/**
 * ColorPalette contains ALL of the colors used in ALL of the layouts in a given {@link Platform}'s styles.
 *
 * @remarks
 *
 * Each of the {@link StyleGenerator}s you add to a {@link Layout} will use some or all of these colors.
 *
 */
type ColorPalette<T> = {
  fill: {
    background:
      | {
          modal: Tint<Elevation<T>> /* same as popover on iOS */;
          floating: Tint<Elevation<T>>;
          primary: Tint<Elevation<T>>;
          secondary: Tint<Elevation<T>>;
          tertiary: Tint<Elevation<T>>;
          [fillTreatmentName: string]: Tint<Elevation<T>> | undefined;
        }
      | undefined;
    foreground: {
      primary: Tint<Elevation<T>>;
      secondary: Tint<Elevation<T>>;
      [fillTreatmentName: string]: Tint<Elevation<T>> | undefined;
    };
  };
  text: {
    title: Tint<T>;
    headline: Tint<T>;
    subhead: Tint<T>;
    icon: Tint<T>;
    body: Tint<T>;
    footnote: Tint<T> | undefined;
    [typeTreatmentName: string]: Tint<T> | undefined;
  };
};

/**
 *
 * @param default - the color that will be used if no other color is supplied, or if no other tint is requested by {@link StyleGenerator}
 *
 * @param active - the color that will be used when the component is being manipulated by the user.
 *
 * @param progress - the color that will be used when the component indicates that it has launched an ongoing operation.
 *
 * @param success - the color that will be used when the component indicates that it has finished an operation.
 *
 * @param warn - the color that will be used when the component indicates that it might not finish the operation, or that initiating the operation could have irreversible consequences.
 *
 * @param fail - the color that will be used whe nthe component indicates that the operation has errored, rather than completed.
 *
 *
 * @remarks
 *
 * you can add any other tint you want to the Tint object.
 *
 */
type Tint<T> = {
  default: T;
  active: T | undefined;
  progress: T | undefined;
  success: T | undefined;
  warn: T | undefined;
  fail: T | undefined;
  [tintName: string]: T | undefined;
};

/**
 * @param r - number between 0 and 255
 * @param g - number between 0 and 255
 * @param b - number between 0 and 255
 * @param a - number between 0 and 1
 */
type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

/**
 * @param fill - the fill color
 *
 * @param stroke.color  - the stroke color
 *
 * @param stroke.width - the width of the stroke in pixels
 *
 * @param stroke.offset - whether the stroke is on the inside, center or outside of the shape
 *
 * @param stroke.borderRadius - the radius of the corners of the stroke in pixels
 *
 * @param shadow - an array of one or more box shadows.
 *
 * @param shadow.x - the x offset of the shadow in pixels
 *
 * @param shadow.y - the y offset of the shadow in pixels
 *
 * @param shadow.blur - the blur of the shadow in pixels
 *
 * @param shadow.spread - the spread of the shadow in pixels
 *
 * @param shadow.color - the color of the shadow
 */
type Elevation<T> = {
  fill: T /* yes, I now that this doesn't support gradients ... but it doesn't have to for now. Also, this is a generic type, so <T> can be adjusted to be a gradient */;
  stroke: {
    color: T;
    width: number;
    offset: 'inner' | 'outer' | 'center';
    borderRadius: number;
  };
  shadow: Array<{
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: T;
  }>;
};
