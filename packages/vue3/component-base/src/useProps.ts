/**
 * isHoverable - whether the component's appearance should change when a mouse cursor occludes it.
 *
 * isHoverable cannot be triggered by a touch point.
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
const isHoverable = {
  type: Boolean,
  default: false,
};

/**
 * isPressable - whether the component's appearance should change when it is depressed by a pointer.
 *
 * @values true | false
 *
 * @example
 * ```vue
 *
 * <template>
 *  <base-component isPressable>
 *    <template v-slot:default>
 *     <!-- ... -->
 *    </template>
 *  </base-component>
 * </template>
 *
 * ```
 */
const isPressable = {
  type: Boolean,
  default: false,
};

/**
 * isPeekable - whether the component should increase in size and reveal its contents when:
 * - a mouse cursor hovers on it
 * - a touch point depresses it
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
const isPeekable = {
  type: Boolean,
  default: false,
};

/**
 * isToggleable - whether the component should change its appearance when a pointer presses-and-releases it
 *
 * if both isToggleable and {@link isDraggable} are set to true, then:
 * - the component will be toggled when:
 *  - a mouse cursor or depresses and releases it, without dragging it.
 *  - a touch point depresses and releases it under {@link dragDelay} milliseconds.
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link dragDelay} milliseconds, before it drags it.
 *
 * if both isToggleable and {@link isScrollable} are set to true, then:
 * - the component will be toggled when:
 *  - a mouse cursor depresses and releases it, withoug dragging it.
 *  - a touch point depresses and releases it in under {@link dragDelay} milliseconds, without dragging it.
 * - the component will be scrolled when:
 *  - it receives wheel input.
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses and begins to drag it in under {@link dragDelay} milliseconds.
 *
 * if isToggleable, {@link isDraggable} and {@link isScrollable} are set to true, then:
 * - the component will be toggled when:
 *  - a mouse cursor depresses and releases it, without dragging it.
 *  - a touch point depresses and releases it in under {@link dragDelay} milliseconds, without dragging it.
 * - the component will be scrolled when:
 *  - it receives wheel input
 *  - a touch point depresses and begins dragging it in under {@link dragDelay} milliseconds.
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link DragDelay} milliseconds before dragging it.
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
const isToggleable = {
  type: Boolean,
  default: false,
};

/**
 * isDraggable - whether a pointer can move the component from one location to another, by pressing and dragging it.
 *
 * if both isDraggable and {@link isToggleable} are set to true, then:
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link dragDelay} milliseconds, before it drags it.
 * - the component will be toggled when:
 *  - a mouse cursor or depresses and releases it, without dragging it.
 *  - a touch point depresses and releases it under {@link dragDelay} milliseconds.
 *
 * if both isDraggable and {@link isScrollable} are set to true, then:
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link DragDelay} milliseconds before dragging it.
 * - the component will be scrolled when:
 *  - it receives wheel input.
 *  - a touch point depresses and begins dragging it in under {@link dragDelay} milliseconds.
 *
 * if isDraggable, {@link isToggleable}, and {@link isScrollable} are set to true, then:
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link DragDelay} milliseconds before dragging it.
 * - the component will be toggled when:
 *  - a mouse cursor depresses and releases it, without dragging it.
 *  - a touch point depresses and releases it in under {@link dragDelay} milliseconds, without dragging it.
 * - the component will be scrolled when:
 *  - it receives wheel input
 *  - a touch point depresses and begins dragging it in under {@link dragDelay} milliseconds.
 *
 * @values true | false
 *
 * @example
 * ```vue
 *
 * <template>
 *  <base-component isDraggable>
 *    <template v-slot:default>
 *     <!-- ... -->
 *    </template>
 *  </base-component>
 * </template>
 *
 */
const isDraggable = {
  type: Boolean,
  default: false,
};

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
const isSelectable = {
  type: Boolean,
  default: false,
};

/**
 * isFocusable - whether the component can receive keypresses. Note that this does NOT mean that the component's contents can be edited.
 *
 * - if isFocusable is set to true, and {@link isEditable} is set to false, then:
 *  - pressing the tab key will move focus from this component to the next focusable component.
 *  - if {@link isPressable} is set to true, then pressing the enter key while this component is focused will press it.
 *  - if {@link isToggleable} is set to true, then pressing the enter key while this component is focused will toggle it.
 *
 * - if isFocusable is set to false, and {@link isEditable} is set to false, then this component will not listen to keyboard events.
 *
 * @values true | false
 *
 * @example
 * ```vue
 *
 * <template>
 *  <base-component isFocusable>
 *    <template v-slot:default>
 *     <!-- ... -->
 *    </template>
 *  </base-component>
 * </template>
 *
 * ```
 */
const isFocusable = {
  type: Boolean,
  default: false,
};

/**
 * isEditable - whether the component's contents change when it receives keypresses. If isEditable is set to true, it automatically sets isFocusable to true as well. If isFocusable is set to false, and isEditable is set to true, then isEditable forces isFocusable to true, and the component will throw a warning.
 *
 * - if isEditable is set to false and {@link isFocusable} is set to false, then this component will not listen to keyboard inputs.
 *
 * @values true | false
 *
 * @example
 * ```vue
 *
 * <template>
 *  <base-component isEditable>
 *    <template v-slot:default>
 *     <!-- ... -->
 *    </template>
 *  </base-component>
 * </template>
 *
 * ```
 */
const isEditable = {
  type: Boolean,
  default: false,
};

/**
 * isScrollable - whether the components' contents track:
 * - wheel input
 * - pointer movement when the component pressed
 *
 * if both isScrollable and {@link isDraggable} are set to true, then:
 * - the component will be scrolled when:
 *  - it receives wheel input.
 *  - a touch point depresses and begins dragging it in under {@link dragDelay} milliseconds.
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link DragDelay} milliseconds before dragging it.
 *
 * if both isScrollable and {@link isToggleable} are set to true, then:
 *  - the component will be scrolled when:
 *      - it receives wheel input.
 *      - a mouse cursor depresses and drags it.
 *      - a touch point depressed and drags it.
 *  - the component will be toggled when:
 *      - a mouse cursor depresses and releases it, without dragging it.
 *      - a touch point depresses and releases it, without dragging it.
 *
 * if isScrollable, {@link isToggleable}, and {@link isDraggable} are set to true, then:
 * - the component will be dragged when:
 *  - a mouse cursor depresses and drags it.
 *  - a touch point depresses it for at least {@link DragDelay} milliseconds before dragging it.
 * - the component will be toggled when:
 *  - a mouse cursor depresses and releases it, without dragging it.
 *  - a touch point depresses and releases it in under {@link dragDelay} milliseconds, without dragging it.
 * - the component will be scrolled when:
 *  - it receives wheel input
 *  - a touch point depresses and begins dragging it in under {@link dragDelay} milliseconds.
 *
 *
 * @values true | false
 *
 * @example
 * ```vue
 *
 * <template>
 *  <base-component isScrollable>
 *    <template v-slot:default>
 *     <!-- ... -->
 *    </template>
 *  </base-component>
 * </template>
 *
 * ```
 */
const isScrollable = {
  type: Boolean,
  default: false,
};

/**
 * dragDelay - the number of milliseconds to wait before dragging a component, when it is depressed by a touch point. Defaults to 200ms
 *
 * @values any nonzero number
 *
 * @example
 * ```vue
 *
 * <template>
 *  <base-component dragDelay="150">
 *      <template v-slot="default">
 *          <!-- ... -->
 *      </template>
 *  </base-component>
 * </template>
 *
 * ```
 * @ignore
 */
const dragDelay = {
  type: Number,
  default: 200,
  required: false,
  validator: (value: number): boolean => value >= 0,
};

export default {
  isHoverable,
  isPressable,
  isPeekable,
  isToggleable,
  isDraggable,
  isSelectable,
  isFocusable,
  isEditable,
  isScrollable,
  dragDelay,
};
