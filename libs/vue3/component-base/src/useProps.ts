/**
 * Use base component's props to set its **affordances**.
 *
 * Affordances are the inputs to which base component will respond:
 *
 * You can add any of the following 10 affordances to base component:
 *
 * | Affordance     | What it does                                                                                          | Mouse Inputs                                                            | Touch Inputs                                                  |Keyboard Inputs                                                                          |
 * |:---------------|:------------------------------------------------------------------------------------------------------|:------------------------------------------------------------------------|:--------------------------------------------------------------|:----------------------------------------------------------------------------------------|
 * |`isHoverable`   | Makes base component detect pointer                                                                   | Mouseover                                                               |                                                               |                                                                                         |
 * |`isPressable`   | Makes base component change appearance when a pointer depresses it                                    | Mousedown                                                               | Touchstart                                                    | *When focused:* Enter                                                                   |
 * |`isPeekable`    | Makes base component grow in size, so as to reveal content, when it detects a pointer                 | Mouseover                                                               | Touchstart                                                    |                                                                                         |
 * |`isScrollable`  | Makes base component's contents track pointer or wheel movement                                       | Wheel, Mousedown → Mousemove                                            | Touchstart → Touchmove                                        | Page Up, Page Down, Up Arrow, Down Arrow                                                |
 * |`isSwipeable`   | Makes base component's contents track pointer movement separately from wheel movement                 | Mousedown → Mousemove **(overrides scrollable)**                        | Touchstart → Touchmove **(overrides scrollable)**             |                                                                                         |
 * |`isToggleable`  | Makes base component switch between two (or more) appearances, whenever a pointer releases it         | Mousedown → Mouseup                                                     | Touchstart → Touchend                                         | *When focused:* Enter **(overrides pressable)**                                         |
 * |`isDraggable`   | Makes base component move from one location in a user interface to another                            | Mousedown → Mousemove **(overrides scrollable, swipeable)**             | Touchstart → wait 200ms → Touchmove                           |                                                                                         |
 * |`isSelectable`  | Makes base component's contents available to be copied to the clipboard                               | Mousedown → Mousemove **(overrides scrollable, swipeable, draggable)**  | Touchstart → wait 200ms → Touchmove **(overrides draggable)** | Command + C to copy to clipboard, *When focused:* Shift + Arrow, Shift + Option + Arrow |
 * |`isFocusable`   | Makes base component detect keyboard and game controller input                                        | Mousedown → Mouseup **(overrides pressable, toggleable)**               | Touchstart → Touchend **(overrides pressable)**               | Tab                                                                                     |
 * |`isEditable`    | Makes base component's content change in response to character input *when base component is focused* |                                                                         |                                                               | Keypresses, Command + V to paste from clipboard                                         |
 *
 * @example
 * ```vue
 * <template>
 *    <!-- makes an instance of base component that `isHoverable`, `isPressable` and `isPeekable` -->
 *    <component-base isHoverable isPressable isPeekable/>
 * </template>
 * ```
 *
 * Some affordances have inputs that override the inputs of other affordances. This means that if you apply both affordances, the overriding inputs will trigger their respective affordance.
 * - For example, if you make an instance of base component both `isScrollable` and `isSwipeable`, then `Mousedown → Mousemove` and `Touchstart → Touchmove` will trigger `isSwipeable`, rather than the `isScrollable`. However, `Wheel` will still trigger `isScrollable`.
 * @example
 * ```vue
 * <template>
 *    <!-- the following instance of base component scrolls when it recieves `Wheel` input, and when it receives `Mousedown → Mousemove` and `Touchstart → Touchmove` input -->
 *    <component-base isScrollable/>
 *
 *    <!-- the following instance of base component scrolls when it recieves `Wheel` input, but swipes when it receives `Mousedown → Mousemove` and `Touchstart → Touchmove` input -->
 *    <component-base isScrollable isSwipeable/>
 * </template>
 * ```
 *
 * Note that some affordances' inputs entirely override the inputs of other affordances. In such a case, applying both affordances is identical to applying just the affordance with the overriding inputs.
 * - For example, the inputs for `isSelectable` entirely override the inputs for `isDraggable`. Therefore, applying both `isSelectable` and `isDraggable` to an instance of base component is identical to applying only `isSelectable`. This is because all of `isDraggable`s inputs are overriden by `isSelectable`s inputs.
 * @example
 * ```vue
 * <template>
 *    <!-- the following instances of base component are identical, isSelectable's inputs completely override isDraggable's inputs -->
 *    <component-base isDraggable isSelectable/>
 *    <component-base isSelectable/>
 * </template>
 * ```
 *
 * Several affordances respond to keypresses when base component is focused. This means that if you apply *both* the `isFocusable` affordance to an instance of base component, and an affordance that responds to keypresses, then the other affordance will be triggered by its respective keypress if and only if the instance of base component is focused.
 * - for example: if you make an instance of base component that `isFocusable` and `isPressable`, then `Mousedown → Mousemove` will trigger `isFocusable`, and `Enter` will trigger `isPressable` once the instance of base component gains focus.
 * @example
 * ```vue
 * <template>
 *    <!-- the following instance of base component depresses when it is focused, and receives 'Enter' key input -->
 *    <component-base isFocusable isPressable/>
 * </template>
 * ```
 *
 * Applying the `isEditable` affordance to an instance of base component automatically applies the `isFocusable` affordance, because it's impossible
 * @example
 * ```vue
 * <template>
 *    <!-- the following instances of base component are identical, because isEditable automatically applies isFocusable -->
 *    <component-base isFocusable isEditable/>
 *    <component-base isEditable/>
 *
 *    <!-- the following instances of base component are NOT identical, because isFocusable does NOT automatically apply isEditable -->
 *    <component-base isFocusable isEditable/>
 *    <component-base isFocusable /> <!-- this instance is NOT editable -->
 * </template>
 * ```
 *
 * If a component `isDraggable`, then it can be dragged if it receives `Touchstart → wait 200ms → Touchmove`. Likewise, if it `isSelectable`, This delay can be adjusted, by changing the value of dragDelay.
 * - if a component `isSelectable` then its contents can be selected if it receives this same input. Adjusting the value of dragDelay also adjusts the delay for the `isSelectable` input.
 * - while you can technically set `dragDelay` to zero, doing so will cause `isDraggable` touch input to override `isSwipeable`. The same goes for setting `dragDelay` to <20ms.
 *
 * @example
 * ```vue
 * <template>
 *  <!-- change `dragDelay` to 50ms` -->
 * <component-base isDraggable dragDelay="50">
 *
 * <!-- this does nothing, because the instance of component-base does not have the `isDraggable` or `isSelectable` affordances -->
 * <component-base dragDelay="50">
 * </template>
 * ```
 */
const props = {
  isHoverable: {
    type: Boolean,
    default: false,
  },
  isPressable: {
    type: Boolean,
    default: false,
  },
  isPeekable: {
    type: Boolean,
    default: false,
  },
  isScrollable: {
    type: Boolean,
    default: false,
  },
  isSwipeable: {
    type: Boolean,
    default: false,
  },
  isToggleable: {
    type: Boolean,
    default: false,
  },
  isDraggable: {
    type: Boolean,
    default: false,
  },
  isSelectable: {
    type: Boolean,
    default: false,
  },
  isFocusable: {
    type: Boolean,
    default: false,
  },
  isEditable: {
    type: Boolean,
    default: false,
  },
  dragDelay: {
    type: Number,
    default: 200,
    required: false,
    validator: (value: number): boolean => value >= 0,
  },
};

export default props;

export interface Affordances {
  isHoverable: boolean;
  isPressable: boolean;
  isPeekable: boolean;
  isScrollable: boolean;
  isSwipeable: boolean;
  isToggleable: boolean;
  isDraggable: boolean;
  isSelectable: boolean;
  isFocusable: boolean;
  isEditable: boolean;
}
