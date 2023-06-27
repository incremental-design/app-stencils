import { ButtonStyles, Icon } from "@incremental.design/component-button";
import { PropType } from "vue";
import {
  Font,
  RGBA,
  Shape,
  Elevation,
  validateFont,
  validateShape,
  validateElevation,
} from "@incremental.design/theme";

/**
 * this is the style of the shape that groups the tabs together.
 */
export interface TabGroupStyle {
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
 * @param tabStyle - the style of each tab in the tab group. Must be an object of type {@link ButtonStyles}
 *
 * @param tabGroupStyle - the style of the shape that groups the tabs. Must be an object of type {@link TabGroupStyle}
 *
 * @param multiSelect - whether zero or more tabs can be selected, or only one tab can be selected. If `true`, then zero or more tabs can be selected. Otherwise, only one tab can be selected. Defaults to `false`.
 *
 * @param content - an array of the content for each tab
 *
 * @param content.label - the label of a tab. Must be a string.
 *
 * @param content.iconLeft - the left icon of a tab. Optional. If provided, must be a {@link Icon}
 *
 * @param content.iconRight = the right icon of a tab. Optional. If provided, must  be a {@link Icon}
 */
export interface TabsProps {
  tabStyle: ButtonStyles;
  tabGroupStyle: TabGroupStyle;
  multiSelect: boolean;
  content: Array<{
    label: string;
    iconLeft?: Icon;
    iconRight?: Icon;
  }>;
}

const validate = (o: unknown) => {
  const options = o as TabsProps;

  // todo: validate options
  return true;
};

const props = {
  /**
   * options - the options that tabs can have
   *
   * @values objects of type {@link TabsProps}
   */
  options: {
    type: Object as PropType<TabsProps>,
    required: true,
    validator: (options: unknown): boolean => validate(options),
  },
};

export default props;
