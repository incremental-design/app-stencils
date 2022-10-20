/**
 * A shape to apply to a DOM node
 *
 * @param minWidth - the minimum width of the shape in pixels (px) This must be a value greater than 0. this is required.
 *
 * @param maxWidth - the optional maximum width of the shape in pixels (px). Defaults to the minWidth.
 *
 * @param minHeight - the minimum height of the shape in pixels (px) This must be a value greater than 0. this is required.
 *
 * @param maxHeight - the optional maximum height of the shape in pixels (px). Defaults to the minHeight.
 *
 * @param borderRadius - the radius of the shape in pixels (px) This must be a value greater than 0. This is required.
 *
 */
export type Shape = {
  minWidth: number /* in px */;
  maxWidth?: number /* in px */;
  minHeight: number /* in px */;
  maxHeight?: number /* in px */;
  borderRadius: number /* in px*/;
};

export function makeShapeCSSRules(s: Shape) {
  const { minWidth, maxWidth, minHeight, maxHeight, borderRadius } = s;
  return {
    display: "flex",
    "flex-direction": "row",
    "min-width": `${minWidth}px`,
    "max-width": `${maxWidth ? maxWidth : minWidth}px`,
    "min-height": `${minHeight}px`,
    "max-height": `${maxHeight ? maxHeight : minHeight}px`,
    "border-radius": `${borderRadius}px`,
  };
}
