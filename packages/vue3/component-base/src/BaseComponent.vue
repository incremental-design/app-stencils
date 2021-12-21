<template>
  <div v-on="eventHandlers" :style="componentStyles">
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
  unref,
} from 'vue';

import {
  // handleDrag,
  DragInput,
  // handleScroll,
  ScrollInput,
  // handleFocus,
  FocusInput,
  // handleKeyboard,
  KeyboardInput,
  handleMouse,
  handleTouch,
  PointerInput,
  // PointerInput,
  // handleWindowResize,
  WindowResizeInput,
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
      componentStyles: {
        [styleName: string]: string;
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
      /**
       * componentStyles - styles that have to be applied to the root of the component to make it work.
       */
      componentStyles: computed(() => {
        return props.isSelectable || props.isFocusable
          ? {
              userSelect: 'text',
              WebkitUserSelect: 'text',
              MozUserSelect: 'text',
              MsUserSelect: 'text',
              webkitTouchCallout: 'none',
            }
          : {
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              MsUserSelect: 'none',
              webkitTouchCallout: 'none',
            };
      }),
    });

    const FSM /* (F)inite (S)tate (M)achine */ = reactive({
      /**
       * hovered - whether a mouse cursor is currently occluding the component
       */
      hovered: false,
      /**
       * peeked - whether the component is growing in size to reveal its contents
       */
      peeked: false,
      _pressed: false,
      /**
       * pressed - whether a mouse cursor or touch point is currently depressing the component
       */
      pressed: computed({
        get: (): boolean => {
          return FSM._pressed;
        },
        set: (value: boolean) => {
          FSM._pressed = value;
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
    // const shouldThrottleEvent = (
    //   eventType: string,
    //   E: Event,
    //   P: false | EventInfo<unknown>,
    //   minTimeMs = 33
    // ): boolean => {
    //   if (
    //     E.type === eventType &&
    //     P &&
    //     P.type === eventType &&
    //     E.timeStamp - P.timestamp < minTimeMs
    //   )
    //     return true;
    //   return false;
    // };

    let DropMouseMove: boolean = false;
    let DropTouchMove: boolean = false;

    const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
      /* don't process mousemove events that are closer than 100ms together because it gums up the reactivity system */
      // if (shouldThrottleEvent('mousemove', E, DataAndComputed.pointerInput))
      //   return;
      const ProcessEvent = (EP: MouseEvent /* (E)vent to (P)rocess */) => {
        DataAndComputed.pointerInput = DataAndComputed.pointerInput
          ? handleMouse(EP, DataAndComputed.pointerInput)
          : handleMouse(EP);
      };

      if (E.type === 'mousemove' && !DropMouseMove) {
        DropMouseMove = true;
        window.requestAnimationFrame(() => {
          /* this throttles the number of mousemove events that Vue will process so that only ONE mousemove event will be processed per animation frame */
          ProcessEvent(E);
          DropMouseMove = false;
        });
      } else {
        ProcessEvent(E);
      }
    };

    const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
      E.preventDefault(); /* this stops the browser from 'helpfully' interpreting touch events as mouse events */
      // if (shouldThrottleEvent('touchmove', E, DataAndComputed.pointerInput))
      //   return;
      const ProcessEvent = (EP: TouchEvent /* (E)vent to (P)rocess */) => {
        DataAndComputed.pointerInput = DataAndComputed.pointerInput
          ? handleTouch(EP, DataAndComputed.pointerInput)
          : handleTouch(EP);
      };

      if (E.type === 'touchmove' && !DropTouchMove) {
        DropTouchMove = true;
        window.requestAnimationFrame(() => {
          /* this throttles the number of touchmove events that Vue will process so that only ONE touchmove event will be processed per animation frame */
          ProcessEvent(E);
          DropTouchMove = false;
        });
      }
    };

    const DCM /* (D)isable (C)ontext (M)enu */ = (E: Event) => {
      E.preventDefault();
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
        if (!EH.mousemove) EH.mousemove = HM;
        if (!EH.mouseleave) EH.mouseleave = HM;
      };
      const listenForPeek = (): void => {
        listenForHover();
        if (!EH.touchstart) EH.touchstart = HT;
        if (!EH.touchmove) EH.touchmove = HT;
        if (!EH.touchend) EH.touchend = HT;
        if (!EH.touchcancel) EH.touchcancel = HT;
      };
      const listenForPress = (): void => {
        listenForHover();
        if (!EH.mousedown) EH.mousedown = HM;
        if (!EH.mouseup) EH.mouseup = HM;
        if (!EH.touchstart) EH.touchstart = HT;
        if (!EH.touchmove) EH.touchmove = HT;
        if (!EH.touchend) EH.touchend = HT;
        if (!EH.touchcancel) EH.touchcancel = HT;
      };
      const listenForToggle = (): void => {
        listenForPress();
      };
      const listenForDrag = (): void => {
        listenForPress();
        if (!EH.touchmove) EH.touchmove = HT;
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

      const disableContextMenu = (): void => {
        if (!EH.contextmenu) EH.contextmenu = DCM;
      };

      if (isHoverable) listenForHover();
      if (isPeekable) listenForPeek();
      if (isPressable) listenForPress();
      if (isToggleable) listenForToggle();
      if (isDraggable) listenForDrag();
      if (isSnappable) listenForSnap();
      if (isSelectable) listenForSelect();
      if (isFocusable) listenForFocus();
      if (!isSelectable) disableContextMenu();

      return EH;
    };

    watch(
      DataAndComputed /* we have to watch ALL of DataAndComputed because if we jsut watch pointerInput, Vue complains that it can't be watched if its value is 'false' */,
      (current, previous) => {
        if (!DataAndComputed.pointerInput) return;
        const P = DataAndComputed.pointerInput;
        const XP = P.input.relative.xPercent;
        const YP = P.input.relative.yPercent;
        const XPOutOfBounds = XP ? XP < 0 || XP > 1 : false;
        const YPOutOfBounds = YP ? YP < 0 || YP > 1 : false;
        const PointerInBounds = !XPOutOfBounds && !YPOutOfBounds;

        // do something with P

        const updateHovered = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.hovered = true;
              break;
            case 'mouseleave':
              FSM.hovered = false;
              break;
          }
        };
        const updatePeeked = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.peeked = true;
              break;
            case 'mouseleave':
              FSM.peeked = false;
              break;
            case 'touchstart':
              FSM.peeked = true;
              break;
            case 'touchend':
              FSM.peeked = false;
              break;
            case 'touchcancel':
              FSM.peeked = false;
              break;
          }
        };
        const updatePressed = () => {
          switch (P.type) {
            case 'mousedown':
              FSM.pressed = true;
              break;
            case 'touchstart':
              FSM.pressed = true;
              break;
            case 'mouseup':
              FSM.pressed = false;
              break;
            case 'mouseleave':
              FSM.pressed = false;
              break;
            case 'touchcancel':
              FSM.pressed = false;
              break;
            case 'touchend':
              FSM.pressed = false;
              break;
            case 'touchmove':
              FSM.pressed = PointerInBounds;
              break;
          }
        };
        const updateToggled = () => {
          switch (P.type) {
            case 'mouseup':
              FSM.toggled = !FSM.toggled;
              break;
            case 'touchend':
              if (!XPOutOfBounds && !YPOutOfBounds) FSM.toggled = !FSM.toggled;
              break;
          }
        };
        const updateDragged = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.dragged = true;
              break;
            case 'touchmove':
              FSM.dragged = !XPOutOfBounds && !YPOutOfBounds;
              break;
            case 'touchend':
              FSM.dragged = false;
              break;
            case 'mouseleave':
              FSM.dragged = false;
              break;
            case 'mouseup':
              FSM.dragged = false;
              break;
          }
        };
        const updateSnapped = () => {};
        const updateSelected = () => {};
        const updateFocused = () => {};

        if (
          props.isHoverable ||
          props.isPeekable ||
          props.isPressable ||
          props.isToggleable ||
          props.isDraggable ||
          props.isSnappable ||
          props.isSelectable ||
          props.isFocusable
        )
          updateHovered();
        if (props.isPeekable) updatePeeked();
        if (
          props.isPressable ||
          props.isToggleable ||
          props.isDraggable ||
          props.isSnappable ||
          props.isSelectable ||
          props.isFocusable
        )
          updatePressed();
        if (props.isToggleable) updateToggled();
        if (props.isDraggable || props.isSnappable) updateDragged();
        if (props.isSnappable) updateSnapped();
        if (props.isSelectable) updateSelected();
        if (props.isFocusable) updateFocused();
      },
      {
        deep: true,
        immediate: false,
      }
    );

    // !Lifecycle Hooks

    return { ...toRefs(DataAndComputed), FSM };
  },
});
</script>

<style scoped>
/* todo: pointer-events none? user-select none? */
</style>
