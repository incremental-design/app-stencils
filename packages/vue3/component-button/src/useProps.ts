import {
  Font,
  RGBA,
  Shape,
  Elevation,
  validateFont,
  validateShape,
  validateElevation,
} from "@incremental.design/theme";
import { PropType } from "vue";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
/**
 * A button has three types of styles: font, shape, and elevation. All three styles vary based on whether the button is in the 'hovering' or 'pressing' state.
 */
export interface ButtonStyles {
  font: {
    none: Font<RGBA>;
    hovering: Font<RGBA>;
    pressing: Font<RGBA>;
  };
  shape: {
    none: Shape;
    hovering: Shape;
    pressing: Shape;
  };
  elevation: {
    none: Elevation<RGBA>;
    hovering: Elevation<RGBA>;
    pressing: Elevation<RGBA>;
  };
}

/**
 *
 * @param icon - an object of type {@link IconDefinition}
 *
 * @param animateOnPress - whether the icon should show or hide when the button is pressed
 *
 * To import an object of type IconDefinition, see: {@link https://fontawesome.com/docs/web/use-with/vue/dig-deeper#computed-property}
 */
export interface Icon {
  icon: IconDefinition;
  animateOnPress?: "show" | "hide";
}

/**
 * An instance of button
 * @param style - an object of type {@link ButtonStyles}
 *
 * @param content.label - the button text
 *
 * @param content.iconLeft - an object of type {@link Icon}
 *
 * @param content.iconRight - an object of type {@link Icon}
 *
 */
export interface ButtonProps {
  style: ButtonStyles;
  content: {
    label: string;
    iconLeft?: Icon;
    iconRight?: Icon;
  };
}

const validateStyle = (s: unknown) => {
  const style = s as ButtonStyles;
  if (!style.font || !style.shape || !style.elevation) return false;
  if (!Object.values(style.font).every((f) => validateFont(f))) return false;
  if (!Object.values(style.shape).every((s) => validateShape(s))) return false;
  if (!Object.values(style.elevation).every((e) => validateElevation(e)))
    return false;
  return true;
};

const validateIcon = (i: unknown) => {
  const icon = i as Icon;
  if (!["show", "hide", undefined].includes(icon.animateOnPress)) return false;
  // todo: validate icon definition
  return true; /* we can't check if the icon name is part of the font awesome collection bc we can't string-enumerate 6k+ names */
};

const validateContent = (c: unknown) => {
  const content = c as ButtonProps["content"];
  if (typeof content.label !== "string") return false;
  if (!validateIcon(content.iconLeft) || !validateIcon(content.iconRight))
    return false;
  return true;
};

const validate = (o: unknown) => {
  const options = o as ButtonProps;
  if (!options.style || !options.content) return false;
  if (!validateContent(options.content) || !validateStyle(options.style))
    return false;
  return true;
};

const props = {
  /**
   * options - the options a button can have
   *
   * @values object of type {@link ButtonProps}
   */
  options: {
    type: Object as PropType<ButtonProps>,
    required: true,
    validator: (options: any): boolean => validate(options),
  },
};

export default props;
