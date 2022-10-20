import { RGBA, BlendMode, RGBAtoCSS } from "./Color";

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

export enum FontAlign {
  left = "left",
  right = "right",
  center = "center",
  justify = "justify",
}

export enum FontVerticalAlign {
  top = "top",
  bottom = "bottom",
  middle = "middle",
}

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
