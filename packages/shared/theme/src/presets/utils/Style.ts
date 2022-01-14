import {
  RGBA,
  BlendMode,
  RGBAtoCSS,
  Elevation,
  ColorPaletteInterface,
  Tint,
} from '.';

/**
 * StyleFactory applies a {@link Platform}'s {@link ColorPalette}s to its own positioning rules to produce a set of CSS rules. It varies the specific rules it accesses based on the parameters it receives.
 *
 * @param palette - the {@link Platform}'s {@link ColorPalette} to use.
 *
 * @param tint - the tint to apply to the colors. This will always be one of the {@link Theme.} values.
 *
 * @param state - a {@link State} value.
 *
 * @returns an object that contains CSS rules. These rules aren't stringified to valid CSS, but they can be applied to a Vue or React component, or be fed into autoprefixer.
 *
 * @remarks
 *
 */
export type StyleFactory = (
  palette: ColorPaletteInterface<RGBA>,
  tint?: string /* technically keyof Tint */,
  state?: State
) => { [cssRule: string]: string | number };

export function makeFontCSSRules(F: Font<RGBA>) {
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
    fontFamily: typeface.join(', '),
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

export function makeElevationCSSRules(E: Elevation<RGBA>) {
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
export type Shape = {
  minWidth: number /* in pt */;
  maxWidth?: number /* in pt */;
  minHeight: number /* in pt */;
  maxHeight?: number /* in pt */;
  borderRadius: number /* in pt*/;
};

export function makeShapeCSSRules(S: Shape) {
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
export type Font<Color> = {
  typeface: Array<string>;
  size: number;
  weight: number;
  color: Color;
  blendMode?: BlendMode /* defaults to BlendMode.normal */;
  tracking?: number /* in pt, omitted if not specified */;
  leading?: number /* in pt, also known as line height. Omitted if not specified */;
  align?: FontAlign /* defaults to 'left' */;
  verticalAlign?: FontVerticalAlign /* defaults to 'top' */;
};

export enum FontAlign {
  left = 'left',
  right = 'right',
  center = 'center',
  justify = 'justify',
}

export enum FontVerticalAlign {
  top = 'top',
  bottom = 'bottom',
  middle = 'middle',
}

/**
 * State describes all of the different appearances a component can adopt in response to user interaction.
 *
 * @param none - the element is not being interacted with.
 * @param hover - the element is being occluded by a pointer.
 * @param pressed - the element is being depressed by a pointer.
 * @param toggled - the element was released by a pointer.
 * @param toggledHovered - the element was toggled, and is being occluded by a pointer. If the pointer depresses the element, it will enter the toggledPressed state
 * @param toggledPressed - the element was toggled, and is beign pressed by a pointer. Once the element is released, it will enter the none state
 * @param focused - the element's contents can receive input from a keyboard or pointer.
 */
export enum State {
  none,
  hovered,
  pressed,
  toggled,
  toggledHovered,
  toggledPressed,
  focused,
}
