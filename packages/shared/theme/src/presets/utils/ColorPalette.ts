import { Font } from '.';

// todo - maybe make a helper class called 'ColorPalette' which implements ColorPaletteInterface.

/**
 * ColorPaletteInterface contains ALL of the colors used in ALL of the layouts in a given {@link Platform}'s styles.
 *
 * @remarks
 *
 * Each of the {@link StyleFactory} functions you add to a {@link Layout} will use some or all of these colors.
 *
 */

export interface ColorPaletteInterface<T> {
  fill: {
    background: {
      modal: Tint<Elevation<T>> /* same as popover on iOS */;
      floating: Tint<Elevation<T>>;
      primary: Tint<Elevation<T>>;
      secondary: Tint<Elevation<T>>;
      tertiary: Tint<Elevation<T>>;
      [fillTreatmentName: string]: Tint<Elevation<T>> | undefined;
    };
    foreground: {
      primary: Tint<Elevation<T>>;
      secondary: Tint<Elevation<T>>;
      [fillTreatmentName: string]: Tint<Elevation<T>> | undefined;
    };
  };
  text: {
    // todo: make a way to handle icon fonts inline with text
    primary: {
      title: Tint<Font<T>>;
      headline: Tint<Font<T>>;
      subhead: Tint<Font<T>>;
      body: Tint<Font<T>>;
      footnote?: Tint<Font<T>>;
      [typeTreatmentName: string]: Tint<Font<T>> | undefined;
    };
    secondary: {
      title?: Tint<Font<T>>;
      headline?: Tint<Font<T>>;
      subhead?: Tint<Font<T>>;
      body?: Tint<Font<T>>;
      footnote?: Tint<Font<T>>;
      [typeTreatmentName: string]: Tint<Font<T>> | undefined;
    };
  };
}

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
export type Tint<T> = {
  none: T;
  active?: T;
  progress?: T;
  success?: T;
  warn?: T;
  fail?: T;
  [tintName: string]: T | undefined;
};

/**
 * Color, defined with a red, green, blue, and alpha value.
 * @param r - number between 0 and 255
 * @param g - number between 0 and 255
 * @param b - number between 0 and 255
 * @param a - number between 0 and 1
 */
export type RGBA = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export enum BlendMode {
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

export function RGBAtoCSS(R: RGBA) {
  return `rgba(${R.r}, ${R.g}, ${R.b}, ${R.a})`;
}

/**
 * Converts a hex string with alpha to {@link RGBA}
 *
 * @param hex - a hex string formatted as 'FFFFFF' or '#FFFFF'.
 *
 * @param alpha - number between 0 and 1
 *
 * @returns a {@link RGBA}
 */
export function hexAlphaToRGBA(hex: string, alpha: number) {
  if (alpha < 0 || alpha > 1)
    throw new Error('alpha should be between 0 and 1');
  let H = hex;
  if (hex.startsWith('#')) H = H.slice(1);
  if (H.length !== 6)
    throw new Error(
      `'${hex}' is not a valid hex code because it doesn't contain 3 hexadecimals`
    );
  if (H.match(/[^A-Fa-f0-9]/))
    throw new Error(
      `'${hex}' is not a valid hex code because it contains characters other than 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C,D, E, F`
    );
  H.toUpperCase();
  const HR /* (H)ex (R)ed*/ = H.slice(0, 2);
  const HG /* (H)ex (G)reen */ = H.slice(2, 4);
  const HB /* (H)ex (B)lue */ = H.slice(4, 6);
  const CHD /* (C)onvert (H)ex to (D)ecimal */ = (H: string) => parseInt(H, 16);
  return {
    r: CHD(HR),
    g: CHD(HG),
    b: CHD(HB),
    a: alpha,
  };
}

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
export type Elevation<Color> = {
  fill: Array<{
    color: Color;
    blendMode?: BlendMode /* default to BlendMode.normal */;
    bgBlur?: {
      radius?: number /* in pt, defaults to 0pt */;
      saturation?: number /* -1 to 1, defaults to 0 */;
    };
  }>;
  innerShadow: Array<{
    blur?: number /* in pt, defaults to 0pt */;
    spread?: number /* in pt, defaults to 0pt */;
    color: Color;
    blendMode?: BlendMode /* defaults to BlendMode.normal */;
    xOffset?: number /* in pt, defaults to 0pt */;
    yOffset?: number /* in pt, defaults to 0pt */;
  }>;
  stroke: Array<{
    color: Color;
    width?: number /* in pt, defaults to 1pt */;
    offset?: 'inner' | 'outer' | 'center' /* defaults to 'center' */;
    blendMode?: BlendMode /* defaults to BlendMode.normal */;
  }>;
  dropShadow: Array<{
    x?: number /* in pt, defaults to 0pt */;
    y?: number /* in pt, defaults to 0pt */;
    blur?: number /* in pt, defaults to 0pt */;
    spread?: number /* in pt, defaults to 0pt */;
    color: Color;
    blendMode?: BlendMode /* defaults to BlendMode.normal */;
  }>;
};
