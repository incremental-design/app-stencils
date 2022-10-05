export default {
  /**
   * isHoverable - whether the component's appearance should change when a mouse cursor occludes it.
   *
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isHoverable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isHoverable: {
    type: Boolean,
    default: false,
  },

  /**
   * isPeekable - whether the component should increase in size and reveal its contents when it is hovered.
   *
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isPeekable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isPeekable: {
    type: Boolean,
    default: false,
  },

  /**
   * isPressable - whether the component's appearance should change when it is clicked or tapped.
   *
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isPeekable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isPressable: {
    type: Boolean,
    default: false,
  },

  /**
   * isToggleable - whether the component should maintain its appearance when it is pressed and the mouse cursor or touch point is released.
   *
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isToggleable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isToggleable: {
    type: Boolean,
    default: false,
  },

  /**
   * isSlideable - whether the components' contents follow (or otherwise respond to) the mouse cursor or touch point when the component is pressed.
   *
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isSlideable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isSlideable: {
    type: Boolean,
    default: false,
  },

  /**
   * isSelectable - whether the component's contents can be copied to the clipboard.
   *
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isSelectable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isSelectable: {
    type: Boolean,
    default: false,
  },

  /**
   * isFocusable - whether the component can receive keypresses. Note that this does NOT mean that the component's contents can be edited.
   * @values true | false
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component isToggleable>
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   */
  isFocusable: {
    type: Boolean,
    default: false,
  },

  /**
   * theme - whether the component should calculate the CSS rules needed to make the template match the visual language of iOS, macOS, tvOS, android, windows, or gtk (linux)
   *
   * @values 'ios', 'macos', 'tvos', 'android', 'windows', 'gtk' or a {@link PlatformInterface} object.
   *
   * @example
   * ```vue
   *
   * <template>
   *  <base-component theme="ios">
   *    <template v-slot:default>
   *     <!-- ... -->
   *    </template>
   *  </base-component>
   * </template>
   *
   * ```
   * @ignore
   */
};
