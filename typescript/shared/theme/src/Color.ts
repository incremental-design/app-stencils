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

export const enum BlendMode {
  normal = "normal",
  multiply = "multiply",
  screen = "screen",
  overlay = "overlay",
  darken = "darken",
  lighten = "lighten",
  colorDodge = "color-dodge",
  colorBurn = "color-burn",
  hardLight = "hard-light",
  softLight = "soft-light",
  difference = "difference",
  exclusion = "exclusion",
  hue = "hue",
  saturation = "saturation",
  color = "color",
  luminosity = "luminosity",
}

const blendModeStrings = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "darken",
  "lighten",
  "color-dodge",
  "color-burn",
  "hard-light",
  "soft-light",
  "difference",
  "exclusion",
  "hue",
  "saturation",
  "color",
  "luminosity",
];

export const isBlendMode = (b: string) => blendModeStrings.includes(b);

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
    throw new Error("alpha should be between 0 and 1");
  let H = hex;
  if (hex.startsWith("#")) H = H.slice(1);
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

export function RGBAtoCSS(R: RGBA) {
  return `rgba(${R.r}, ${R.g}, ${R.b}, ${R.a})`;
}

export function isColor(c: unknown) {
  const cR = c as RGBA;
  const { r, g, b, a } = cR;
  if (
    typeof r === "number" &&
    typeof g === "number" &&
    typeof b === "number" &&
    typeof a === "number"
  )
    return true;
  return false;
  // todo: test other color formats
}
