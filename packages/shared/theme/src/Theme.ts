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
 *  2. Chain a call to {@link layout} with one of {@link Theme.layouts}, or your own options object. It will return an object that contains a 'text', 'fill.foreground', and 'fill.background' entry. Eahc entry is an object containing the available {@link StyleGenerator}s for the given platform and layout.
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
  #textStyleGenerators: Map<string, StyleGenerator> = new Map();
  #foregroundStyleGenerators: Map<string, StyleGenerator> = new Map();
  #backgroundStyleGenerators: Map<string, StyleGenerator> = new Map();

  // !Constructor Function
  constructor(nameOfLayout: string) {
    this.#name = nameOfLayout;
  }

  // !Getters and Setters
  get name(): string {
    return this.#name;
  }

  get text(): { [textStyleName: string]: StyleGenerator } {
    return Object.fromEntries(this.#textStyleGenerators);
  }

  get fill(): {
    foreground: { [fillName: string]: StyleGenerator };
    background: { [fillName: string]: StyleGenerator };
  } {
    return {
      foreground: Object.fromEntries(this.#foregroundStyleGenerators),
      background: Object.fromEntries(this.#backgroundStyleGenerators),
    };
  }

  // !Public Instance Methods
  addText(): void {
    throw new Error('not implemented');
  }

  addFG(): void {}

  addBG(): void {}

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
) => { SO: /* (S)tyle (O)bject */ { [cssRule: string]: string } };

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
    title: Tint<Font<T>>;
    headline: Tint<Font<T>>;
    subhead: Tint<Font<T>>;
    icon: Tint<Font<T>>;
    body: Tint<Font<T>>;
    footnote: Tint<Font<T>> | undefined;
    [typeTreatmentName: string]: Tint<Font<T>> | undefined;
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
 * Color, defined with a red, green, blue, and alpha value.
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
 * A set of fills, inner shadows, strokes, and drop shadows to apply to a DOM node.
 *
 * @param fill - An array of zero or more fills to apply to a DOM node.
 *
 * @param fill.color - a color to apply to the fill. This color must contain a `r`, `g`, `b`, and `a` property. This property is required.
 *
 * @param fill.blendMode - optional {@link BlendMode} to apply to the fill. Defaults to {@link BlendMode.normal}
 *
 * @param bgBlur - optional gaussian blur applied to the contents behind the fill.
 *
 * @param bgBlur.radius - optional radius of the background blur in device-independent points (pt). defaults to 0.
 *
 * @param bgBlur.saturation - optional saturation of the background blur. defaults to 0. Must be a number between -1 (i.e. -100%) and 1 (i.e. 100%).
 *
 * @param innerShadow - array with zero or more inner shadows to apply to a DOM node.
 *
 * @param innerShadow.blur - optional blur of the inner shadow in device-independent points (pt). defaults to 0.
 *
 * @param innerShadow.spread - optional spread of the inner shadow in device-independent points (pt). defaults to 0.
 *
 * @param innerShadow.color - a color to apply to the inner shadow. This color must contain a `r`, `g`, `b`, and `a` property. This property is required.
 *
 * @param innerShadow.blendMode - optional {@link BlendMode} to apply to the inner shadow. Defaults to {@link BlendMode.normal}.
 *
 * @param innerShadow.xOffset - optional x-offset of the inner shadow in device-independent points (pt). defaults to 0.
 *
 * @param innerShadow.yOffset - optional y-offset of the inner shadow in device-independent points (pt). defaults to 0.
 *
 * @param stroke - an array with zero or more strokes to apply to a DOM node.
 *
 * @param stroke.color - a color to apply to the stroke. This color must contain a `r`, `g`, `b`, and `a` property. This property is required.
 *
 * @param stroke.width - optional width of the stroke in device-independent points (pt). defaults to 1.
 *
 * @param stroke.offset - optional offset of the stroke relative to the edge of the DOM node. can be one of 'inside', 'outside', or 'center'. defaults to 'center'.
 *
 * @param stroke.blendMode - optional {@link BlendMode} to apply to the stroke. Defaults to {@link BlendMode.normal}.
 *
 * @param dropShadow - array of zero or more drop shadows to apply to the DOM node.
 *
 * @param dropShadow.x - optional x-offset of the drop shadow in device-independent points (pt). defaults to 0.
 *
 * @param dropShadow.y - optional y-offset of the drop shadow in device-independent points (pt). defaults to 0.
 *
 * @param dropShadow.blur - optional blur of the drop shadow in device-independent points (pt). defaults to 0.
 *
 * @param dropShadow.spread - optional spread of the drop shadow in device-independent points (pt). defaults to 0.
 *
 * @param dropShadow.color - a color to apply to the drop shadow. This color must contain a `r`, `g`, `b`, and `a` property. This property is required.
 *
 * @param dropShadow.blendMode - optional {@link BlendMode} to apply to the drop shadow. Defaults to {@link BlendMode.normal}.
 *
 * @remarks
 *
 * The predefined {@link Theme.platforms} only ever use at most ONE fill, ONE stroke, and ONE inner shadow to define any given elevation. This is because CSS doesn't support multiple fills or strokes. Although CSS supports multiple inner shadows, it's usually unncessary to use more than one to mimic the appearance of elements in any of the {@link Theme.platforms} visual languages.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/background-color
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/border
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow
 *
 */
type Elevation<T> = {
  fill: Array<{
    color: T;
    blendMode?: BlendMode /* default to BlendMode.normal */;
    bgBlur?: {
      radius?: number /* in pt, defaults to 0pt */;
      saturation?: number /* -1 to 1, defaults to 0 */;
    };
  }>;
  innerShadow: Array<{
    blur?: number /* in pt, defaults to 0pt */;
    spread?: number /* in pt, defaults to 0pt */;
    color: T;
    blendMode?: BlendMode /* defaults to BlendMode.normal */;
    xOffset?: number /* in pt, defaults to 0pt */;
    yOffset?: number /* in pt, defaults to 0pt */;
  }>;
  stroke: Array<{
    color: T;
    width?: number /* in pt, defaults to 1pt */;
    offset?: 'inner' | 'outer' | 'center' /* defaults to 'center' */;
    blendMode?: BlendMode /* defaults to BlendMode.normal */;
  }>;
  dropShadow: Array<{
    x?: number /* in pt, defaults to 0pt */;
    y?: number /* in pt, defaults to 0pt */;
    blur?: number /* in pt, defaults to 0pt */;
    spread?: number /* in pt, defaults to 0pt */;
    color: T;
    blendMode?: BlendMode /* defaults to BlendMode.normal */;
  }>;
};

function makeElevationCSSRules(E: Elevation<RGBA>) {
  const { fill, innerShadow, stroke, dropShadow } = E;

  const rules = {};

  /* notice that right now we are literally discarding any fills other than fill[0] ... in fact the fill array is literally only included for future-proofing. Perhaps at some point we will use pseudo elements or maybe box shadows to hold the extra fills */
  if (fill[0])
    Object.assign(rules, {
      'background-color': RGBAtoCSS(fill[0].color),
      'background-blend-mode': fill[0].blendMode || BlendMode.normal,
    });

  if (fill[0].bgBlur)
    Object.assign(rules, {
      'backdrop-filter': `blur(${fill[0].bgBlur.radius || 0}pt) saturate(${
        (fill[0].bgBlur.saturation || 0) * 100
      }%)`,
    });

  /* notice that we are discarding everything other than the first stroke for the same reason as we are discarding any fills other than the first fill */
  if (stroke[0])
    Object.assign(rules, {
      'border-color': RGBAtoCSS(stroke[0].color),
      'border-width': `${stroke[0].width || 1}pt`,
      'border-style': 'solid',
      /* right now we discard offset and blend mode ... later on we can test using box shadow to achieve the same result */
    });

  const BoxShadows = [];
  /* notice that right now we are only using the first inner shadow value. This isn't because of any intrinsic limitation in css box-shadow. It's just because we don't need to supply multiple inner shadows (for now) */
  if (innerShadow[0]) {
    const { xOffset, yOffset, blur, spread, color, blendMode } = innerShadow[0];
    const x = xOffset || 0;
    const y = yOffset || 0;
    const b = blur || 0;
    const s = spread || 0;
    const c = RGBAtoCSS(color);
    // const bm = blendMode || BlendMode.normal; /* for right now, no blend mode support */
    BoxShadows.push(`inset ${x}pt ${y}pt ${b}pt ${s}pt ${c}`);
  }

  dropShadow.forEach(({ x, y, blur, spread, color, blendMode }) => {
    const xOffset = x || 0;
    const yOffset = y || 0;
    const blurOffset = blur || 0;
    const spreadOffset = spread || 0;
    const c = RGBAtoCSS(color);
    // const bm = blendMode || BlendMode.normal; /* for right now, no blend mode support */
    BoxShadows.push(
      `${xOffset}pt ${yOffset}pt ${blurOffset}pt ${spreadOffset}px ${c}`
    );
  });

  if (BoxShadows.length > 0)
    Object.assign(rules, { 'box-shadow': BoxShadows.join(', ') });

  return rules;
}

enum BlendMode {
  normal = 'normal',
  multiply = 'multiply',
  screen = 'screen',
  overlay = 'overlay',
  darken = 'darken',
  lighten = 'lighten',
  colorDodge = 'color-dodge',
  colorBurn = 'color-burn',
  hardLight = 'hard-light',
  softLight = 'soft-light',
  difference = 'difference',
  exclusion = 'exclusion',
  hue = 'hue',
  saturation = 'saturation',
  color = 'color',
  luminosity = 'luminosity',
}

/**
 * A font to apply to a DOM node's text.
 *
 * @param typeface - the name of the typeface to apply (e.g. 'Helvetica'). This is required.
 *
 * @param size - the size of the font in device-independent points (pt). This is required.
 *
 * @param weight - a number between 100 and 900, inclusive, where 100 is the lightest and 900 is the heaviest. This is required.
 *
 * @param color - a color to apply to the font, which must contain a `r`, `g`, `b`, and `a` property. This is required.
 *
 * @param blendMode - optional {@link BlendMode} to apply to the font. Defaults to {@link BlendMode.normal}.
 *
 * @param tracking - optional tracking of the font in device-independent points (pt). defaults to 0. Corresponds to {@link https://developer.mozilla.org/en-US/docs/Web/CSS/letter-spacing}
 *
 * @param leading - optional leading of the font in device-independent points (pt). defaults to 0. Corresponds to {@link https://developer.mozilla.org/en-US/docs/Web/CSS/line-height}
 *
 * @param align - optional alignment of the font. Defaults to 'left'. Corresponds to {@link https://developer.mozilla.org/en-US/docs/Web/CSS/text-align}
 *
 * @param verticalAlign - optional vertical alignment of the font within a flex container. Defaults to 'top'. Corresponds to {@link https://developer.mozilla.org/en-US/docs/Web/CSS/align-self}
 *
 * @remarks
 *
 * If you want your fonts to use em instead of pt, you need to apply your own font-size to the DOM node.
 *
 */
type Font<T> = {
  typeface: string;
  size: number;
  weight: number;
  color: T;
  blendMode?: BlendMode /* defaults to BlendMode.normal */;
  tracking?: number /* in pt, omitted if not specified */;
  leading?: number /* in pt, also known as line height */;
  align?: 'left' | 'right' | 'center' | 'justify' /* defaults to 'left' */;
  verticalAlign?: 'top' | 'bottom' | 'middle' /* defaults to 'top' */;
};

function makeFontCSSRules(F: Font<RGBA>) {
  const {
    typeface,
    size,
    weight,
    color,
    blendMode,
    tracking,
    leading,
    align,
    verticalAlign,
  } = F;

  const rules = {
    fontFamily: typeface,
    fontSize: `${size}pt`,
    fontWeight: weight,
    color: RGBAtoCSS(color),
    'mix-blend-mode': blendMode ? blendMode : 'normal',
  };
  if (tracking) Object.assign(rules, { 'letter-spacing': `${tracking}pt` });
  if (leading) Object.assign(rules, { 'line-height': `${leading}pt` });
  if (align) Object.assign(rules, { 'text-align': align });
  if (verticalAlign)
    Object.assign(rules, {
      'align-self':
        verticalAlign === 'top'
          ? 'start'
          : verticalAlign === 'bottom'
          ? 'end'
          : 'center',
    });
  return rules;
}

/**
 * A shape to apply to a DOM node
 *
 * @param minWidth - the minimum width of the shape in device-independent points (pt) This must be a value greater than 0. this is required.
 *
 * @param maxWidth - the optional maximum width of the shape in device-independent points (pt). Defaults to the minWidth.
 *
 * @param minHeight - the minimum height of the shape in device-independent points (pt) This must be a value greater than 0. this is required.
 *
 * @param maxHeight - the optional maximum height of the shape in device-independent points (pt). Defaults to the minHeight.
 *
 * @param borderRadius - the radius of the shape in device-independent points (pt) This must be a value greater than 0. This is required.
 *
 */
type Shape = {
  minWidth: number /* in pt */;
  maxWidth?: number /* in pt */;
  minHeight: number /* in pt */;
  maxHeight?: number /* in pt */;
  borderRadius: number /* in pt*/;
};

function makeShapeCSSRules(S: Shape) {
  const { minWidth, maxWidth, minHeight, maxHeight, borderRadius } = S;
  return {
    display: 'flex',
    'flex-direction': 'row',
    'min-width': `${minWidth}pt`,
    'max-width': `${maxWidth ? maxWidth : minWidth}pt`,
    'min-height': `${minHeight}pt`,
    'max-height': `${maxHeight ? maxHeight : minHeight}pt`,
    'border-radius': `${borderRadius}pt`,
  };
}

function RGBAtoCSS(R: RGBA) {
  return `rgba(${R.r}, ${R.g}, ${R.b}, ${R.a})`;
}
