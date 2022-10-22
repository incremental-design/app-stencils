import { RGBA, BlendMode, RGBAtoCSS, isColor, isBlendMode } from "./Color";

export type Font<Color> = {
  typeface: Array<string>;
  size: number;
  weight: number;
  color: Color;
  blendMode?: BlendMode /* defaults to BlendMode.normal */;
  tracking?: number /* in px, omitted if not specified */;
  leading?: number /* in px, also known as line height. Omitted if not specified */;
  align?: FontAlign /* defaults to 'left' */;
  verticalAlign?: FontVerticalAlign /* defaults to 'top' */;
};

export const enum FontAlign {
  left = "left",
  right = "right",
  center = "center",
  justify = "justify",
}

export const fontAlignStrings = ["left", "right", "center", "justify"];

export const enum FontVerticalAlign {
  top = "top",
  bottom = "bottom",
  middle = "middle",
}

export const FontVerticalAlignStrings = ["top", "bottom", "middle"];

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
    "font-family": typeface.join(", "),
    "font-size": `${size}px` /* should we append px here? what if we need to change units elsewhere? */,
    "font-weight": weight,
    color: RGBAtoCSS(color),
    "mix-blend-mode": blendMode ? blendMode : "normal",
  };
  if (tracking) Object.assign(rules, { "letter-spacing": `${tracking}px` });
  if (leading) Object.assign(rules, { "line-height": `${leading}px` });
  if (align) Object.assign(rules, { "text-align": align });
  if (verticalAlign)
    Object.assign(rules, {
      "align-self":
        verticalAlign === "top"
          ? "start"
          : verticalAlign === "bottom"
          ? "end"
          : "center",
    });
  return rules;
}

export const validateFont = (f: unknown) => {
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
  } = f as Font<unknown>;
  if (
    !(Array.isArray(typeface) && typeface.every((t) => typeof t === "string"))
  )
    return false;
  if (!(typeof size === "number") && size > 0) return false;
  if (!(typeof weight === "number") && weight > 0) return false;
  if (!isColor(color)) return false;
  if (blendMode && isBlendMode(blendMode)) return false;
  if (tracking && !(typeof tracking === "number")) return false;
  if (leading && !(typeof leading === "number")) return false;
  if (align && !fontAlignStrings.includes(align as string)) return false;
  if (
    verticalAlign &&
    !FontVerticalAlignStrings.includes(verticalAlign as string)
  )
    return false;
  return true;
};
