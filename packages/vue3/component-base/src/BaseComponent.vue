<template>
  <div v-on="eventHandlers">
    <!-- see https://www.vuemastery.com/courses/component-design-patterns/one-object-to-rule-them-all -->
    <!--
      @slot Default Content
        @binding BoundAttributes
        @binding BoundEventHandlers
    -->
    <slot :Pointer="pointerInput"> isPressed: {{ pointerInput }} </slot>
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
  watch,
  watchEffect,
  toRefs,
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
  PointerInput,
  // PointerInput,
  // handleWindowResize,
  // WindowResizeInput,
  /* note: we don't import handleDevice, DeviceInput, handleGamepad, GamepadInput, handleWindowResize, WindowResizeInput because those events are only ever emitted on window */
} from '@incremental.design/device-input-event-handlers';
import { EventInfo } from '@incremental.design/device-input-event-handlers/dist/types/event-handlers/handler-utils';

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
    const DataAndComputed: {
      pointerInput: false | EventInfo<PointerInput>;
      eventHandlers: {
        [eventType: string]:
          | ((E: MouseEvent) => void)
          | ((E: TouchEvent) => void)
          | ((E: DragEvent) => void)
          | ((E: Event) => void)
          | ((E: FocusEvent) => void)
          | ((E: KeyboardEvent) => void)
          | ((E: WheelEvent) => void);
      };
    } = reactive({
      pointerInput: false,
      /**
       * eventHandlers - object that binds events to handler functions.
       */
      eventHandlers: computed(() => {
        const isHoverable = props.isHoverable;
        const isPeekable = props.isPeekable;
        const isPressable = props.isPressable;
        const isToggleable = props.isToggleable;
        const isDraggable = props.isDraggable;
        const isSnappable = props.isSnappable;
        const isSelectable = props.isSelectable;
        const isFocusable = props.isFocusable;
        return makeEventHandlers(
          isHoverable,
          isPeekable,
          isPressable,
          isToggleable,
          isDraggable,
          isSnappable,
          isSelectable,
          isFocusable
        );
      }),
    });

    const FSM /* (F)inite (S)tate (M)achine */ = reactive({
      /**
       * hovered - whether a mouse cursor is currently occluding the component
       */
      hovered: false,
      _peeked: false,
      /**
       * peeked - whether the component is growing in size to reveal its contents
       */
      peeked: computed({
        get: (): boolean => {
          return FSM.hovered && FSM._peeked;
        },
        set: (value: boolean) => {
          FSM._peeked = value;
        },
      }),
      _pressed: false,
      /**
       * pressed - whether a mouse cursor or touch point is currently depressing the component
       */
      pressed: computed({
        get: (): boolean => {
          return FSM.hovered && FSM._pressed;
        },
        set: (value: boolean) => {
          FSM._pressed = value;
          FSM.toggled = !FSM.toggled;
        },
      }),
      _toggled: false,
      /**
       * toggled - whether the component appears to be depressed after it has been pressed and released
       */
      toggled: computed({
        get: (): boolean => {
          return FSM._toggled;
        },
        set: (value: boolean) => {
          FSM._toggled = value;
        },
      }),
      _dragged: false,
      /**
       * dragged - whether the component's handle is currently following the mouse cursor or touch point
       */
      dragged: computed({
        get: (): boolean => {
          return FSM.pressed && FSM._dragged;
        },
        set: (value: boolean) => {
          FSM._dragged = value;
        },
      }),
      _snapped: false,
      /**
       * snapped - whether the component's handle has stuck to a point as it is being dragged
       */
      snapped: computed({
        get: (): boolean => {
          return FSM.dragged && FSM._snapped;
        },
        set: (value: boolean) => {
          FSM._snapped = value;
        },
      }),
      _selected: false,
      /**
       * selected - whether some or all of the component's contents have been highlighted with a cursor, and can be copied to the clipboard.
       */
      selected: computed({
        get: (): boolean => {
          return FSM.pressed && FSM._selected;
        },
        set: (value: boolean) => {
          FSM._selected = value;
        },
      }),
      _focused: false,
      /**
       * focused - whether the component's content are being modified with a keyboard, mouse, or touch
       */
      focused: computed({
        get: (): boolean => {
          return FSM.pressed && FSM._focused;
        },
        set: (value: boolean) => {
          FSM._focused = value;
        },
      }),
    });

    // !Methods

    // !Event Handlers
    const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
      DataAndComputed.pointerInput = DataAndComputed.pointerInput
        ? handleMouse(E, DataAndComputed.pointerInput)
        : handleMouse(E);
    };

    const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
      DataAndComputed.pointerInput = DataAndComputed.pointerInput
        ? handleTouch(E, DataAndComputed.pointerInput)
        : handleTouch(E);
    };

    // const HD /* (H)andle (D)rag */

    // const HS /* (H)andle (S)croll */

    // const HF /* (H)andle (F)ocus */

    // const HK /* (H)andle (K)eyboard */

    // const HW /* (H)andle (W)heel */

    const makeEventHandlers = (
      isHoverable: boolean,
      isPeekable: boolean,
      isPressable: boolean,
      isToggleable: boolean,
      isDraggable: boolean,
      isSnappable: boolean,
      isSelectable: boolean,
      isFocusable: boolean
    ) => {
      let EH: /* (E)vent (H)andler */ {
        [eventType: string]:
          | ((E: MouseEvent) => void)
          | ((E: TouchEvent) => void)
          | ((E: DragEvent) => void)
          | ((E: Event) => void)
          | ((E: FocusEvent) => void)
          | ((E: KeyboardEvent) => void)
          | ((E: WheelEvent) => void);
      } = {};

      const listenForHover = (): void => {
        if (EH.mouseover) return;
        EH.mouseover = HM;
      };
      const listenForPeek = (): void => {
        listenForHover();
        if (EH.touchstart) return;
        EH.touchstart = HT;
        if (EH.touchend) return;
        EH.touchend = HT;
      };
      const listenForPress = (): void => {
        listenForHover();
        if (EH.mousedown) return;
        EH.mousedown = HM;
        if (EH.mouseup) return;
        EH.mouseup = HM;
        if (EH.mouseleave) return;
        EH.mouseleave = HM; /* mousedown -> mouseup is equivalent to mousedown -> mouseleave */
        if (EH.touchstart) return;
        EH.touchstart = HT;
        if (EH.touchend) return;
        EH.touchend = HT;
      };
      const listenForToggle = (): void => {
        listenForPress();
      };
      const listenForDrag = (): void => {
        listenForPress();
        if (EH.mousemove) return;
        EH.mousemove = HM;
        if (EH.touchmove) return;
        EH.touchmove = HT;
      };
      const listenForSnap = (): void => {
        listenForDrag();
      };
      const listenForSelect = (): void => {
        listenForPress();
      };
      const listenForFocus = (): void => {
        listenForPress();
      };

      if (isHoverable) listenForHover();
      if (isPeekable) listenForPeek();
      if (isPressable) listenForPress();
      if (isToggleable) listenForToggle();
      if (isDraggable) listenForDrag();
      if (isSnappable) listenForSnap();
      if (isSelectable) listenForSelect();
      if (isFocusable) listenForFocus();

      return EH;
    };

    // const stopWatchingAffordanceProps = watch(
    //   props,
    //   (c, p) => {
    //     if (
    //       c.isHoverable === p?.isHoverable &&
    //       c.isPeekable === p?.isPeekable &&
    //       c.isPressable === p?.isPressable &&
    //       c.isToggleable === p?.isToggleable &&
    //       c.isDraggable === p?.isDraggable &&
    //       c.isSnappable === p?.isSnappable &&
    //       c.isSelectable === p?.isSelectable &&
    //       c.isFocusable === p?.isFocusable
    //     )
    //       return;
    //     console.log('triggered');
    //     DataAndComputed.eventHandlers = makeEventHandlers();
    //   },
    //   {
    //     deep: true,
    //     immediate: true,
    //   }
    // );

    // watch(
    //   [DataAndComputed.pointerInput],
    //   (current, previous) => {
    //     if (!current) return;

    //     const updateHovered = () => {};
    //     const updatePeeked = () => {};
    //     const updatePressed = () => {};
    //     const updateToggled = () => {};
    //     const updateDragged = () => {};
    //     const updateSnapped = () => {};
    //     const updateSelected = () => {};
    //     const updateFocused = () => {};
    //   },
    //   {
    //     deep: true,
    //     immediate: false,
    //   }
    // );

    // !Lifecycle Hooks

    return { ...toRefs(DataAndComputed) };
  },
});
</script>

<style scoped>
/* todo: pointer-events none? user-select none? */
</style>
