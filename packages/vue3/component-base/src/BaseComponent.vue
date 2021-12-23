<template>
  <div
    v-on="eventHandlers"
    :style="componentStyles"
    ref="BCR"
    :tabindex="isFocusable ? '-1' : ''"
  >
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

// needs to accept following props: isHoverable isPeekable isPressable isToggleable isSlideable isSnappable isSelectable isCopyable isPasteable isReplicable isEditable theme

// fallback slot should have all the same props as regular slot

import {
  defineComponent,
  reactive,
  computed,
  watch,
  watchEffect,
  ref,
  Ref,
  toRefs,
  unref,
  VNode,
  onMounted,
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

    // todo: add theme
  },

  emits: {
    // see: https://v3.vuejs.org/api/options-data.html#emits
    // emit
  },

  setup(props, { attrs, slots, emit }) {
    const BCR: Ref<null | Node> /*(B)ase (C)omponent (R)oot */ = ref(null);

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
        const isSlideable = props.isSlideable;
        const isSelectable = props.isSelectable;
        const isFocusable = props.isFocusable;
        return makeEventHandlers(
          isHoverable,
          isPeekable,
          isPressable,
          isToggleable,
          isSlideable,
          isSelectable,
          isFocusable
        );
      }),
      /**
       * componentStyles - styles that have to be applied to the root of the component to make it work.
       */
      componentStyles: computed(() => {
        // need to add touch-action: https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action

        const S: /* (S)tyles */ { [cssRule: string]: string } = {
          'touch-action': 'manipulation',
        };
        if (props.isSelectable) {
          Object.assign(S, {
            userSelect: 'all',
            WebkitUserSelect: 'all',
            MozUserSelect: 'all',
            MsUserSelect: 'all',
          });
        } else {
          Object.assign(S, {
            userSelect: 'none',
            WebkitUserSelect: 'none',
            MozUserSelect: 'none',
            MsUserSelect: 'none',
            webkitTouchCallout: 'none',
          });
        }
        return S;
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
      _sliding: false,
      /**
       * dragged - whether the component's handle is currently following the mouse cursor or touch point
       */
      sliding: computed({
        get: (): boolean => {
          return FSM.pressed && FSM._sliding;
        },
        set: (value: boolean) => {
          FSM._sliding = value;
        },
      }),
      _selected: false,
      /**
       * selected - whether all of the component's contents have been highlighted with a cursor, and can be copied to the clipboard.
       */
      selected: computed({
        get: (): boolean => {
          return FSM._selected;
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
    const selectThisEl = () => {
      const El = BCR.value ? BCR.value : false;
      if (El && window) {
        const R = new Range();
        const WS = window.getSelection();
        R.selectNode(El);
        WS?.addRange(R);
        return true;
      } else {
        return false;
      }
    };

    const focusThisEl = () => {
      const El = BCR.value ? BCR.value : false;
      if (El) {
        (El as HTMLElement).focus();
        return true;
      } else {
        return false;
      }
    };

    const shouldThrottleEvent = (
      eventType: string,
      E: Event,
      P: false | EventInfo<unknown>,
      minTimeMs = 33 /* sample AT MOST 30 times per second */
    ): boolean => {
      if (
        E.type === eventType &&
        P &&
        P.type === eventType &&
        E.timeStamp - P.timestamp < minTimeMs
      )
        return true;
      return false;
    };

    const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
      /* don't process mousemove events that are closer than 100ms together because it gums up the reactivity system */
      if (shouldThrottleEvent('mousemove', E, DataAndComputed.pointerInput))
        return;
      DataAndComputed.pointerInput = DataAndComputed.pointerInput
        ? handleMouse(E, DataAndComputed.pointerInput)
        : handleMouse(E);
    };

    const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
      E.preventDefault(); /* this stops the browser from 'helpfully' interpreting touch events as mouse events */
      if (shouldThrottleEvent('touchmove', E, DataAndComputed.pointerInput))
        return;
      DataAndComputed.pointerInput = DataAndComputed.pointerInput
        ? handleTouch(E, DataAndComputed.pointerInput)
        : handleTouch(E);
    };

    const DCM /* (D)isable (C)ontext (M)enu */ = (E: Event) => {
      E.preventDefault();
    };

    // const HD /* (H)andle (D)rag */

    // const HS /* (H)andle (S)croll */

    const HF /* (H)andle (F)ocus */ = (E: FocusEvent) => {
      // todo: implement focus input handler ... perhaps something that keeps track of the previous thing that was focused?
      switch (E.type) {
        case 'blur':
          FSM.focused = false;
          break;
        case 'focus':
          FSM.focused = true;
          break;
      }
    };

    // const HK /* (H)andle (K)eyboard */

    // const HW /* (H)andle (W)heel */

    const makeEventHandlers = (
      isHoverable: boolean,
      isPeekable: boolean,
      isPressable: boolean,
      isToggleable: boolean,
      isSlideable: boolean,
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
      const listenForSlide = (): void => {
        listenForPress();
        if (!EH.touchmove) EH.touchmove = HT;
      };
      const listenForSelect = (): void => {
        listenForPress();
      };
      const listenForFocus = (): void => {
        listenForPress();
        if (!EH.blur) EH.blur = HF;
        if (!EH.focus) EH.focus = HF;
      };

      const disableContextMenu = (): void => {
        if (!EH.contextmenu) EH.contextmenu = DCM;
      };

      if (isHoverable) listenForHover();
      if (isPeekable) listenForPeek();
      if (isPressable) listenForPress();
      if (isToggleable) listenForToggle();
      if (isSlideable) listenForSlide();
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
              if (PointerInBounds) FSM.toggled = !FSM.toggled;
              break;
          }
        };
        const updateSliding = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.sliding = true;
              break;
            case 'touchmove':
              FSM.sliding = PointerInBounds;
              break;
            case 'touchend':
              FSM.sliding = false;
              break;
            case 'mouseleave':
              FSM.sliding = false;
              break;
            case 'mouseup':
              FSM.sliding = false;
              break;
          }
        };
        const updateSelected = () => {
          const listenForDeselect = (current: Node) => {
            if (document) {
              const DE /* (D)eselect (E)vents */ = ['pointerup'];
              for (const E of DE) {
                document.addEventListener(
                  E,
                  () => {
                    const DS = document.getSelection();
                    FSM.selected =
                      !!DS &&
                      DS.anchorNode === current &&
                      DS.focusNode === current &&
                      !DS.isCollapsed &&
                      DS.type === 'Range';
                  },
                  { once: true }
                );
              }
              return true;
            } else {
              return false;
            }
          };
          switch (P.type) {
            case 'mouseup':
              if (BCR.value && selectThisEl()) {
                FSM.selected = true;
                listenForDeselect(BCR.value);
              }
              break;
            case 'touchend':
              if (PointerInBounds && BCR.value && selectThisEl()) {
                FSM.selected = true;
                listenForDeselect(BCR.value);
              }
              break;
          }
        };
        const updateFocused = () => {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
          switch (P.type) {
            case 'mousedown':
              FSM.focused = focusThisEl();
              break;
            case 'touchstart':
              FSM.focused = focusThisEl();
              break;
          }
          // todo: implement focus event input listener, and then handle it here
        };

        if (
          props.isHoverable ||
          props.isPeekable ||
          props.isPressable ||
          props.isToggleable ||
          props.isSlideable ||
          props.isSelectable ||
          props.isFocusable
        )
          updateHovered();
        if (props.isPeekable) updatePeeked();
        if (
          props.isPressable ||
          props.isToggleable ||
          props.isSlideable ||
          props.isSelectable ||
          props.isFocusable
        )
          updatePressed();
        if (props.isToggleable) updateToggled();
        if (props.isSlideable) updateSliding();
        if (props.isSelectable) updateSelected();
        if (props.isFocusable) updateFocused();
      },
      {
        deep: true,
        immediate: false,
      }
    );

    // !Lifecycle Hooks

    return { ...toRefs(DataAndComputed), FSM, BCR };
  },
});
</script>

<style scoped>
/* todo: pointer-events none? user-select none? */
</style>
