<template>
  <div @="EventHandlers">
    <!-- see https://www.vuemastery.com/courses/component-design-patterns/one-object-to-rule-them-all -->
    <!--
      @slot Default Content
        @binding BoundAttributes
        @binding BoundEventHandlers
    -->
    <slot :Pointer="DataAndComputed.pointerInput">
      isPressed: {{ DataAndComputed.pointerInput }}
    </slot>
  </div>
  <!-- todo: add suspense slot: https://v3.vuejs.org/guide/migration/suspense.html -->
</template>

<script lang="ts">
// make sure user select === none so that by default nothing can be selected (unless isEditable)

// needs to emit a stateChange, pointerInput, focusInput, keyboardInput, dragInput, scrollInput (no window resize input or gamepad input bc those are window events)

// needs a default slot and a fallback (ie suspense) slot

// needs to accept following props: isHoverable isPeekable isPressable isToggleable isDraggable isSnappable isSelectable isCopyable isPasteable isReplicable isEditable theme

// fallback slot should have all the same props as regular slot

import {
  defineComponent,
  reactive,
  computed,
  watchEffect,
  UnwrapRef,
} from 'vue';

import {
  // handleDrag,
  // DragInput,
  // handleScroll,
  // ScrollInput,
  // handleFocus,
  // FocusInput,
  // handleGamepad,
  // GamepadInput,
  // handleKeyboard,
  // KeyboardInput,
  handleMouse,
  handleTouch,
  // PointerInput,
  // handleWindowResize,
  // WindowResizeInput,
  /* note: we don't import handleDevice, DeviceInput, handleGamepad, GamepadInput, handleWindowResize, WindowResizeInput because those events are only ever emitted on window */
} from '@incremental.design/device-input-event-handlers'; // need to use setup function to only wire up the events for which affordances are toggled true ... so need event solver code

export default defineComponent({
  components: {
    // see: https://v3.vuejs.org/api/options-assets.html#components
    // List of components that have been imported into this file
  },

  props: {
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
     * isDraggable - whether the component contains a handle that follows the mouse cursor or touch point when the component is pressed.
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
     * ```
     */
    isDraggable: {
      type: Boolean,
      default: false,
    },

    /**
     * isSnappable - whether the component should maintain its appearance when it is pressed and the mouse cursor or touch point is released.
     *
     * @values true | false
     *
     * @example
     * ```vue
     *
     * <template>
     *  <base-component isSnappable>
     *    <template v-slot:default>
     *     <!-- ... -->
     *    </template>
     *  </base-component>
     * </template>
     *
     * ```
     */
    isSnappable: {
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
     * isFocusable - whether the component's contents can be edited with a keyboard, mouse, or touch.
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

    // todo: add theme
  },

  emits: {
    // see: https://v3.vuejs.org/api/options-data.html#emits
    // emit
  },

  setup(props, { attrs, slots, emit }) {
    const DataAndComputed: any = reactive({
      pointerInput: false,
    });

    // !Methods

    // !Event Handlers
    const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
      DataAndComputed.pointerInput = handleMouse(
        E,
        DataAndComputed.pointerInput
      );
    };

    const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
      DataAndComputed.pointerInput = handleTouch(
        E,
        DataAndComputed.pointerInput
      );
    };

    // const HD /* (H)andle (D)rag */

    // const HS /* (H)andle (S)croll */

    // const HF /* (H)andle (F)ocus */

    // const HK /* (H)andle (K)eyboard */

    // const HW /* (H)andle (W)heel */

    const EventHandlers = {
      // drag: HD,
      // dragend: HD,
      // dragenter: HD,
      // dragleave: HD,
      // dragover: HD,
      // dragstart: HD,
      // drop: HD,
      // scroll: HS,
      // blur: HF,
      // focus: HF,
      // focusin: HF,
      // focusout: HF,
      // keydown: HK,
      // keypress: HK,
      // keyup: HK,
      // auxclick: HM,
      // click: HM,
      // contextmenu: HM,
      // dblclick: HM,
      mousedown: HM,
      mouseenter: HM,
      mouseleave: HM,
      mousemove: HM,
      mouseout: HM,
      mouseover: HM,
      mouseup: HM,
      touchcancel: HT,
      touchend: HT,
      touchmove: HT,
      touchstart: HT,
      // wheel: HW,
    };

    // !Lifecycle Hooks

    return { DataAndComputed, EventHandlers };
  },
});
</script>

<style scoped>
/* todo: pointer-events none? user-select none? */
</style>
