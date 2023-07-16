/**
 * A shape to apply to a DOM node
 *
 * @param minWidth - the minimum width of the shape in root-ephemeral-units (rem) This must be a value greater than 0. this is required.
 *
 * @param maxWidth - the optional maximum width of the shape in root-ephemeral-units (rem). Defaults to the minWidth.
 *
 * @param minHeight - the minimum height of the shape in root-ephemeral-units (rem) This must be a value greater than 0. this is required.
 *
 * @param maxHeight - the optional maximum height of the shape in root-ephemeral-units (rem). Defaults to the minHeight.
 *
 * @param borderRadius - the radius of the shape in root-ephemeral-units (rem) This must be a value greater than 0. This is required.
 *
 */
export type Shape = {
  minWidth: number /* in rem */;
  maxWidth?: number /* in rem */;
  minHeight: number /* in rem */;
  maxHeight?: number /* in rem */;
  borderRadius: {
    top: {
      left: number /* in rem*/;
      right: number /* in rem*/;
    };
    bottom: {
      left: number /* in rem*/;
      right: number /* in rem*/;
    };
  };
};

export function makeShapeCSSRules(s: Shape) {
  const { minWidth, maxWidth, minHeight, maxHeight, borderRadius } = s;

  const mwh = {};
  if (maxHeight) Object.assign(mwh, { "max-height": `${maxHeight}rem` });
  if (maxWidth) Object.assign(mwh, { "max-width": `${maxWidth}rem` });

  return {
    display: "flex",
    "flex-direction": "row",
    "min-width": `${minWidth}rem`,
    "min-height": `${minHeight}rem`,
    "border-radius": `${borderRadius.top.left}rem ${borderRadius.top.right}rem ${borderRadius.bottom.right}rem ${borderRadius.bottom.left}rem`,
    ...mwh,
  };
}

const validateBorderRadius = (r: unknown) => {
  const borderRadius = r as Shape["borderRadius"];
  const { top, bottom } = borderRadius;
  return [top, bottom].every((d) => {
    return typeof d.left === "number" && typeof d.right === "number";
  });
};

export const validateShape = (s: unknown) => {
  const { minWidth, minHeight, borderRadius, maxWidth, maxHeight } = s as Shape;
  if (typeof minWidth !== "number") return false;
  if (typeof minHeight !== "number") return false;
  if (!validateBorderRadius(borderRadius)) return false;
  if (maxWidth && typeof maxWidth !== "number") return false;
  if (maxHeight && typeof maxHeight !== "number") return false;
  return true;
};
