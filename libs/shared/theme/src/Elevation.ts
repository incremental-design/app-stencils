import { BlendMode, isBlendMode, isColor, RGBA, RGBAtoCSS } from "./Color";

type Fill<Color> = {
  color: Color;
  blendMode?: BlendMode /* default to BlendMode.normal */;
  bgBlur?: {
    radius?: number /* in px, defaults to 0px */;
    saturation?: number /* -1 to 1, defaults to 0 */;
  };
};

type InnerShadow<Color> = {
  blur?: number /* in px, defaults to 0px */;
  spread?: number /* in px, defaults to 0px */;
  color: Color;
  blendMode?: BlendMode /* defaults to BlendMode.normal */;
  xOffset?: number /* in px, defaults to 0px */;
  yOffset?: number /* in px, defaults to 0px */;
};

type Stroke<Color> = {
  color: Color;
  width?: number /* in px, defaults to 1px */;
  offset?: "inner" | "outer" | "center" /* defaults to 'center' */;
  blendMode?: BlendMode /* defaults to BlendMode.normal */;
};

type DropShadow<Color> = {
  x?: number /* in px, defaults to 0px */;
  y?: number /* in px, defaults to 0px */;
  blur?: number /* in px, defaults to 0px */;
  spread?: number /* in px, defaults to 0px */;
  color: Color;
  blendMode?: BlendMode /* defaults to BlendMode.normal */;
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
 * @param bgBlur.radius - optional radius of the background blur in pixels. defaults to 0px.
 *
 * @param bgBlur.saturation - optional saturation of the background blur. defaults to 0. Must be a number between -1 (i.e. -100%) and 1 (i.e. 100%).
 *
 * @param innerShadow - array with zero or more inner shadows to apply to a DOM node.
 *
 * @param innerShadow.blur - optional blur of the inner shadow in pixels. defaults to 0px.
 *
 * @param innerShadow.spread - optional spread of the inner shadow in pixels. defaults to 0px.
 *
 * @param innerShadow.color - a color to apply to the inner shadow. This color must contain a `r`, `g`, `b`, and `a` property. This property is required.
 *
 * @param innerShadow.blendMode - optional {@link BlendMode} to apply to the inner shadow. Defaults to {@link BlendMode.normal}.
 *
 * @param innerShadow.xOffset - optional x-offset of the inner shadow in pixels. defaults to 0px.
 *
 * @param innerShadow.yOffset - optional y-offset of the inner shadow in pixels. defaults to 0px.
 *
 * @param stroke - an array with zero or more strokes to apply to a DOM node.
 *
 * @param stroke.color - a color to apply to the stroke. This color must contain a `r`, `g`, `b`, and `a` property. This property is required.
 *
 * @param stroke.width - optional width of the stroke in pixels. defaults to 1px.
 *
 * @param stroke.offset - optional offset of the stroke relative to the edge of the DOM node. can be one of 'inside', 'outside', or 'center'. defaults to 'center'.
 *
 * @param stroke.blendMode - optional {@link BlendMode} to apply to the stroke. Defaults to {@link BlendMode.normal}.
 *
 * @param dropShadow - array of zero or more drop shadows to apply to the DOM node.
 *
 * @param dropShadow.x - optional x-offset of the drop shadow in pixels. defaults to 0px.
 *
 * @param dropShadow.y - optional y-offset of the drop shadow in pixels. defaults to 0px.
 *
 * @param dropShadow.blur - optional blur of the drop shadow in pixels. defaults to 0px.
 *
 * @param dropShadow.spread - optional spread of the drop shadow in pixels. defaults to 0px.
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
  fill: Array<Fill<Color>>;
  innerShadow: Array<InnerShadow<Color>>;
  stroke: Array<Stroke<Color>>;
  dropShadow: Array<DropShadow<Color>>;
};

export function makeElevationCSSRules(E: Elevation<RGBA>): Partial<{
  "background-color": string;
  "background-blend-mode": string;
  "backdrop-filter": string;
  "border-color": string;
  "border-width": string;
  "border-style": string;
  "box-shadow": string;
}> {
  const { fill, innerShadow, stroke, dropShadow } = E;

  const rules = {};

  /* notice that right now we are literally discarding any fills other than fill[0] ... in fact the fill array is literally only included for future-proofing. Perhaps at some point we will use pseudo elements or maybe box shadows to hold the extra fills */
  if (fill[0])
    Object.assign(rules, {
      "background-color": RGBAtoCSS(fill[0].color),
      "background-blend-mode": fill[0].blendMode || BlendMode.normal,
    });

  if (fill[0].bgBlur)
    Object.assign(rules, {
      "backdrop-filter": `blur(${fill[0].bgBlur.radius || 0}px) saturate(${
        (fill[0].bgBlur.saturation || 0) * 100
      }%)`,
    });

  /* notice that we are discarding everything other than the first stroke for the same reason as we are discarding any fills other than the first fill */
  if (stroke[0])
    Object.assign(rules, {
      "border-color": RGBAtoCSS(stroke[0].color),
      "border-width": `${stroke[0].width || 1}px`,
      "border-style": "solid",
      /* right now we discard offset and blend mode ... later on we can test using box shadow to achieve the same result */
    });

  const BoxShadows: Array<string> = [];
  /* notice that right now we are only using the first inner shadow value. This isn't because of any intrinsic limitation in css box-shadow. It's just because we don't need to supply multiple inner shadows (for now) */
  if (innerShadow[0]) {
    const { xOffset, yOffset, blur, spread, color, blendMode } = innerShadow[0];
    const x = xOffset || 0;
    const y = yOffset || 0;
    const b = blur || 0;
    const s = spread || 0;
    const c = RGBAtoCSS(color);
    // const bm = blendMode || BlendMode.normal; /* for right now, no blend mode support */
    BoxShadows.push(`inset ${x}px ${y}px ${b}px ${s}px ${c}`);
  }

  dropShadow.forEach(({ x, y, blur, spread, color, blendMode }) => {
    const xOffset = x || 0;
    const yOffset = y || 0;
    const blurOffset = blur || 0;
    const spreadOffset = spread || 0;
    const c = RGBAtoCSS(color);
    // const bm = blendMode || BlendMode.normal; /* for right now, no blend mode support */
    BoxShadows.push(
      `${xOffset}px ${yOffset}px ${blurOffset}px ${spreadOffset}px ${c}`
    );
  });

  if (BoxShadows.length > 0)
    Object.assign(rules, { "box-shadow": BoxShadows.join(", ") });

  return rules;
}

const isUndefinedOrNumber = (a: Array<undefined | number>) => {
  return a.every((n) => {
    if (!n) return true;
    if (typeof n === "number") return true;
    return false;
  });
};

const isDropShadow = (d: unknown) => {
  const { x, y, blur, spread, color, blendMode } = d as DropShadow<unknown>;
  if (!isUndefinedOrNumber([x, y, blur, spread])) return false;
  if (!isColor(color)) return false;
  if (blendMode && !isBlendMode(blendMode)) return false;
  return true;
};

const isInnerShadow = (i: unknown) => {
  const { xOffset, yOffset, blur, spread, color, blendMode } =
    i as InnerShadow<unknown>;
  if (!isUndefinedOrNumber([xOffset, yOffset, blur, spread])) return false;
  if (!isColor(color)) return false;
  if (blendMode && !isBlendMode(blendMode)) return false;
  return true;
};

const isFill = (f: unknown) => {
  const { color, blendMode, bgBlur } = f as Fill<unknown>;
  if (!isColor(color)) return false;
  if (blendMode && !isBlendMode(blendMode)) return false;
  if (bgBlur) return isUndefinedOrNumber([bgBlur.radius, bgBlur.saturation]);
  return true;
};

const isStroke = (s: unknown) => {
  const { color, width, offset, blendMode } = s as Stroke<unknown>;
  if (!isColor(color)) return false;
  if (width && typeof width !== "number") return false;
  if (offset && !["inner", "outer", "center"].includes(offset)) return false;
  if (blendMode && !isBlendMode(blendMode)) return false;
  return true;
};

export const validateElevation = (e: unknown) => {
  const elevation = e as Elevation<unknown>;
  if (!elevation.dropShadow.every((d) => isDropShadow(d))) return false;
  if (!elevation.fill.every((f) => isFill(f))) return false;
  if (!elevation.innerShadow.every((i) => isInnerShadow(i))) return false;
  if (!elevation.stroke.every((s) => isStroke(s))) return false;
  return true;
};
