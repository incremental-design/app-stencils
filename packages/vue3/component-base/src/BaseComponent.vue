<template>
  <div
    v-on="eventHandlers.notPassive"
    v-on:touchstart.passive="eventHandlers.passive.touch.touchstart"
    v-on:touchmove.passive="eventHandlers.passive.touch.touchmove"
    v-on:touchend.passive="eventHandlers.passive.touch.touchend"
    v-on:touchcancel.passive="eventHandlers.passive.touch.touchcancel"
    v-on:wheel.passive="eventHandlers.passive.wheel.wheel"
    :style="componentStyles"
    ref="BCR"
    :tabindex="isFocusable ? '-1' : ''"
  >
    <div :style="isFocusable ? '' : 'pointer-events: none'">
      <slot :layout="layout" :layouts="layouts">
        isPressed: {{ pointerInput }}
      </slot>
    </div>
  </div>
  <!-- todo: add suspense slot: https://v3.vuejs.org/guide/migration/suspense.html -->
</template>

<script lang="ts">
// needs to emit a stateChange, pointerInput, focusInput, keyboardInput, dragInput, scrollInput (no window resize input or gamepad input bc those are window events)

// needs a default slot and a fallback (ie suspense) slot

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
  // handleWindowResize,
  WindowResizeInput,
  /* note: we don't import handleDevice, DeviceInput, handleGamepad, GamepadInput, handleWindowResize, WindowResizeInput because those events are only ever emitted on window */
} from '@incremental.design/device-input-event-handlers';
import { EventInfo } from '@incremental.design/device-input-event-handlers/dist/types/event-handlers/handler-utils';
import Theme from '@incremental.design/theme';
import {
  PlatformInterface,
  State as ThemeState,
} from '@incremental.design/theme';

export enum State {
  hovered = 'hovered',
  peeked = 'peeked',
  pressed = 'pressed',
  toggled = 'toggled',
  sliding = 'sliding',
  selected = 'selected',
  focused = 'focused',
}

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
    theme: {
      type: [String, Object], // todo: make a Platform constructor when making the helper classes
      required: false,
      validator: (value: string | PlatformInterface): boolean => {
        if (typeof value === 'string') return Theme.platforms.includes(value);
        return true; /* note that we are just going to assume that whatever PlatformInterface you pass into theme is valid. That's because it's too expensive to check if the platform interface is valid every time Vue makes a component with base component. */
      },
    },
  },

  emits: {
    /**
     * stateChange is emitted whenever the {@link State} of this component changes. For example, if this component `isPressable`, then a state change event will be emitted whenever the component is pressed, and whenever it is released.
     *
     * @param payload - an object that contains:
     *  * newState: an array that is one of {@link State}
     *  * oldState: an array that is one of {@link State}
     *  * inputEvents: an array of {@link EventInfo} that contains the events that caused the state change
     *  * flags: an array of strings which convey additional information about the state change.
     */
    stateChange: (payload: {
      newState: Array<State>;
      oldState: Array<State>;
      inputEvents: Array<EventInfo<unknown>>;
      flags: Array<'pointerReleasedInTarget'>;
    }) => {
      return true; /* there is no actual need to validate emit logic because it will always be valid ... this is just here for posterity */
    },
    /**
     * pointerInput is emitted whenever an {@link mousedown}, {@link mousemove}, {@link mouseup}, {@link mouseleave}, {@link touchcancel}, {@link touchstart}, {@link touchmove}, or {@link touchend} event occurs on the component.
     *
     * @param payload - a {@link EventInfo<PointerInput>} object.
     */
    pointerInput: (payload: EventInfo<PointerInput>) => {
      return true; /* once again, there is no actual need to validate emit logic because it will always be valid ... this is just here for posterity */
    },
    // todo: make a focusInput event
    // todo: make a keyboardInput event
    // todo: make a dragInput event
    // todo; make a scrollInput event
  },

  setup(props, { attrs, slots, emit }) {
    const BCR: Ref<null | Node> /*(B)ase (C)omponent (R)oot */ = ref(null);

    const makeLayouts = (
      themeProp?: PlatformInterface | string
    ):
      | ReturnType<typeof Theme.platform>
      | { layout: false; layouts: false } => {
      const None: { layout: false; layouts: false } = {
        layout: false,
        layouts: false,
      };

      if (!themeProp) return None;
      try {
        return Theme.platform(
          themeProp
        ); /* it is too expensive to actually check props.theme on EVERY instance of base component. Best to just let Theme error if it isn't */
      } catch (e) {
        console.warn(e);
        return None;
      }
    };

    const LL: /* (L)ayout (L)ayouts */
    | ReturnType<typeof Theme.platform>
      | {
          layout: false;
          layouts: false;
        } = reactive(
      makeLayouts(props.theme as string | PlatformInterface | undefined)
    );

    const DataAndComputed: {
      pointerInput: false | EventInfo<PointerInput>;
      eventHandlers: {
        notPassive: {
        [eventType: string]:
          | ((E: MouseEvent) => void)
          | ((E: DragEvent) => void)
          | ((E: Event) => void)
          | ((E: FocusEvent) => void)
          | ((E: KeyboardEvent) => void)
          | ((E: TouchEvent) => void)
          | ((E: WheelEvent) => void)
        },
        passive: {
          touch: {
          [eventType: string]: ((E: TouchEvent) => void)
          }
          wheel: {
          [eventType: string]: ((E: WheelEvent) => void);
          }
        },

      };
      componentStyles: {
        [styleName: string]: string;
      };
      layout:
        | ((
            layoutName: string
          ) => {
            style: (
              styleName: string,
              tint?: string,
              darkMode?: boolean | string
            ) => { [cssRule: string]: string | number };
            styles: {
              text: Array<string>;
              fill: Array<string>;
              bg: Array<string>;
            };
            tints: Array<string>;
            modes: Array<string>;
          })
        | false;
      layouts: Array<string> | false;
    } = reactive({
      pointerInput: false,
      /**
       * eventHandlers - object that binds events to handler functions.
       */
      eventHandlers: computed(() => {
        return makeEventHandlers(
          props.isHoverable,
          props.isPeekable,
          props.isPressable,
          props.isToggleable,
          props.isSlideable,
          props.isSelectable,
          props.isFocusable
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
      /**
       * layout - a wrapper of the @incremental.design/theme Theme.platform(...).layout
       */
      layout: computed(() => {
        if (!LL.layout) return false;

        const Hovered = FSM.hovered.state;
        const Pressed = FSM.pressed.state;
        const Toggled = FSM.toggled.state;
        const ToggledHovered = Toggled && Hovered;
        const ToggledPressed = Toggled && Pressed;
        const Focused = FSM.focused.state;

        const LW /* (L)ayout (W)rapper */ = (layoutName: string) => {
          const { style, styles, states, tints, modes } = LL.layout(layoutName);

          const S /* (S)tate */ = (() => {
            if (Focused) return ThemeState.focused;
            if (ToggledPressed) return ThemeState.toggledPressed;
            if (ToggledHovered) return ThemeState.toggledPressed;
            if (Toggled) return ThemeState.toggled;
            if (Pressed) return ThemeState.pressed;
            if (Hovered) return ThemeState.hovered;
          })();

          const SW /* (S)tyle (W)rapper */ = (
            styleName: string,
            tint?: string,
            mode?: string | boolean
          ) => {
            return style(styleName, tint, S, mode);
          };

          return {
            style: SW,
            styles,
            tints,
            modes,
          };
        };
        return LW;
      }),
      /**
       * layouts - a list of layouts that the layout function accepts
       */
      layouts: computed(() => {
        return LL.layouts;
      }),
    });

    type FSMEntry = { state: boolean; changedBy: EventInfo<unknown> | null };

    const FSM: /* (F)inite (S)tate (M)achine */ {
      data: {
        [data: string]: FSMEntry;
      };
      hovered: FSMEntry;
      peeked: FSMEntry;
      pressed: FSMEntry;
      toggled: FSMEntry;
      sliding: FSMEntry;
      selected: FSMEntry;
      focused: FSMEntry;
    } = reactive({
      data: {
        hovered: { state: false, changedBy: null },
        peeked: { state: false, changedBy: null },
        pressed: { state: false, changedBy: null },
        toggled: { state: false, changedBy: null },
        sliding: { state: false, changedBy: null },
        selected: { state: false, changedBy: null },
        focused: { state: false, changedBy: null },
      },
      /**
       * hovered - whether a mouse cursor is currently occluding the component
       */
      hovered: computed({
        get: (): FSMEntry => {
          return FSM.data.hovered;
        },
        set: (value: FSMEntry) => {
          FSM.data.hovered =
            FSM.data.hovered.state !== value.state ? value : FSM.data.hovered;
        },
      }),
      /**
       * peeked - whether the component is growing in size to reveal its contents
       */
      peeked: computed({
        get: (): FSMEntry => {
          return FSM.data.peeked;
        },
        set: (value: FSMEntry) => {
          FSM.data.peeked =
            FSM.data.peeked.state !== value.state ? value : FSM.data.peeked;
        },
      }),
      /**
       * pressed - whether a mouse cursor or touch point is currently depressing the component
       */
      pressed: computed({
        get: (): FSMEntry => {
          return FSM.data.pressed;
        },
        set: (value: FSMEntry) => {
          FSM.data.pressed =
            FSM.data.pressed.state !== value.state ? value : FSM.data.pressed;
        },
      }),
      /**
       * toggled - whether the component appears to be depressed after it has been pressed and released
       */
      toggled: computed({
        get: (): FSMEntry => {
          return FSM.data.toggled;
        },
        set: (value: FSMEntry) => {
          FSM.data.toggled =
            FSM.data.toggled.state !== value.state ? value : FSM.data.toggled;
        },
      }),
      /**
       * sliding - whether the component's handle is currently following the mouse cursor or touch point
       */
      sliding: computed({
        get: (): FSMEntry => {
          return FSM.data.sliding;
        },
        set: (value: FSMEntry) => {
          const ValueToSet = {
            state: FSM.pressed.state && value.state,
            changedBy: value.changedBy,
          }; /* we have to check if pressed is true because the event listeners for sliding won't bother checking */
          FSM.data.sliding =
            FSM.data.sliding.state !== ValueToSet.state
              ? ValueToSet
              : FSM.data.sliding;
        },
      }),
      /**
       * selected - whether all of the component's contents have been highlighted with a cursor, and can be copied to the clipboard.
       */
      selected: computed({
        get: (): FSMEntry => {
          return FSM.data.selected;
        },
        set: (value: FSMEntry) => {
          FSM.data.selected =
            FSM.data.selected.state !== value.state ? value : FSM.data.selected;
        },
      }),
      /**
       * focused - whether the component's content are being modified with a keyboard, mouse, or touch
       */
      focused: computed({
        get: (): FSMEntry => {
          return FSM.data.focused;
        },
        set: (value: FSMEntry) => {
          FSM.data.focused =
            FSM.data.focused.state !== value.state ? value : FSM.data.focused;
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
      if(props.isPressable) E.preventDefault();
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
          FSM.focused = {
            state: false,
            changedBy: {
              type: E.type,
              timestamp: E.timeStamp,
              input: E /* this is technically incorrect, but works as a placeholder */,
            },
          };
          break;
        case 'focus':
          FSM.focused = {
            state: true,
            changedBy: {
              type: E.type,
              timestamp: E.timeStamp,
              input: E /* this is technically incorrect, but works as a placeholder */,
            },
          };
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
        notPassive: {
         [eventType: string]:
          | ((E: MouseEvent) => void)
          | ((E: DragEvent) => void)
          | ((E: Event) => void)
          | ((E: FocusEvent) => void)
          | ((E: KeyboardEvent) => void)
          | ((E: TouchEvent) => void)
          | ((E: WheelEvent) => void)
        },
        passive: {
          touch: {
         [eventType: string]: ((E: TouchEvent) => void)
          },
          wheel: {
         [eventType: string]: ((E: WheelEvent) => void);
          }
        },
      } = {
        passive: {
          touch: {},
          wheel: {},
        },
        notPassive: {},
      };

      const listenForHover = (): void => {
        if (!EH.notPassive.mousemove) EH.notPassive.mousemove = HM;
        if (!EH.notPassive.mouseleave) EH.notPassive.mouseleave = HM;
      };
      const listenForPeek = (): void => {
        listenForHover();
        if (!EH.passive.touch.touchstart) EH.passive.touch.touchstart = HT;
        if (!EH.passive.touch.touchmove) EH.passive.touch.touchmove = HT;
        if (!EH.passive.touch.touchend) EH.passive.touch.touchend = HT;
        if (!EH.passive.touch.touchcancel) EH.passive.touch.touchcancel = HT;
      };
      const listenForPress = (): void => {
        listenForHover();
        if (!EH.notPassive.mousedown) EH.notPassive.mousedown = HM;
        if (!EH.notPassive.mouseup) EH.notPassive.mouseup = HM;
        if (!EH.notPassive.touchstart)
          EH.notPassive.touchstart = HT;

         
        if (!EH.notPassive.touchmove)
          EH.notPassive.touchmove = HT;

        
        if (!EH.notPassive.touchend) 
          EH.notPassive.touchend = HT;

        
        if (!EH.notPassive.touchcancel) 
          EH.notPassive.touchcancel = HT;

        
      };
      const listenForToggle = (): void => {
        listenForPress();
      };
      const listenForSlide = (): void => {
        listenForPress();
        if (!EH.passive.touch.touchmove) EH.passive.touch.touchmove = HT;
      };
      const listenForSelect = (): void => {
        listenForPress();
      };
      const listenForFocus = (): void => {
        listenForPress();
        if (!EH.notPassive.blur) EH.notPassive.blur = HF;
        if (!EH.notPassive.focus) EH.notPassive.focus = HF;
      };

      const disableContextMenu = (): void => {
        if (!EH.notPassive.contextmenu) EH.notPassive.contextmenu = DCM;
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
      () => DataAndComputed.pointerInput,
      (current, previous) => {
        if (!DataAndComputed.pointerInput) return;
        const P = DataAndComputed.pointerInput;
        emit('pointerInput', P);
        const XP = P.input.relative.xPercent;
        const YP = P.input.relative.yPercent;
        const XPOutOfBounds = XP ? XP < 0 || XP > 1 : false;
        const YPOutOfBounds = YP ? YP < 0 || YP > 1 : false;
        const PointerInBounds = !XPOutOfBounds && !YPOutOfBounds;

        // do something with P

        const updateHovered = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.hovered = { state: true, changedBy: P };
              break;
            case 'mouseleave':
              FSM.hovered = { state: false, changedBy: P };
              break;
          }
        };
        const updatePeeked = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.peeked = { state: true, changedBy: P };
              break;
            case 'mouseleave':
              FSM.peeked = { state: false, changedBy: P };
              break;
            case 'touchstart':
              FSM.peeked = { state: true, changedBy: P };
              break;
            case 'touchend':
              FSM.peeked = { state: false, changedBy: P };
              break;
            case 'touchcancel':
              FSM.peeked = { state: false, changedBy: P };
              break;
          }
        };
        const updatePressed = () => {
          switch (P.type) {
            case 'mousedown':
              FSM.pressed = { state: true, changedBy: P };
              break;
            case 'touchstart':
              FSM.pressed = { state: true, changedBy: P };
              break;
            case 'mouseup':
              FSM.pressed = { state: false, changedBy: P };
              break;
            case 'mouseleave':
              FSM.pressed = { state: false, changedBy: P };
              break;
            case 'touchcancel':
              FSM.pressed = { state: false, changedBy: P };
              break;
            case 'touchend':
              FSM.pressed = { state: false, changedBy: P };
              break;
            case 'touchmove':
              FSM.pressed = { state: PointerInBounds, changedBy: P };
              break;
          }
        };
        const updateToggled = () => {
          switch (P.type) {
            case 'mouseup':
              FSM.toggled = { state: !FSM.toggled.state, changedBy: P };
              break;
            case 'touchend':
              if (PointerInBounds)
                FSM.toggled = { state: !FSM.toggled.state, changedBy: P };
              break;
          }
        };
        const updateSliding = () => {
          switch (P.type) {
            case 'mousemove':
              FSM.sliding = { state: true, changedBy: P };
              break;
            case 'touchmove':
              FSM.sliding = { state: PointerInBounds, changedBy: P };
              break;
            case 'touchend':
              FSM.sliding = { state: false, changedBy: P };
              break;
            case 'mouseleave':
              FSM.sliding = { state: false, changedBy: P };
              break;
            case 'mouseup':
              FSM.sliding = { state: false, changedBy: P };
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
                  E => {
                    const DS = document.getSelection();
                    FSM.selected = {
                      state:
                        !!DS &&
                        DS.anchorNode === current &&
                        DS.focusNode === current &&
                        !DS.isCollapsed &&
                        DS.type === 'Range',
                      changedBy: {
                        type: E.type,
                        timestamp: E.timeStamp,
                        input: E,
                      },
                    };
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
                FSM.selected = { state: true, changedBy: P };
                listenForDeselect(BCR.value);
              }
              break;
            case 'touchend':
              if (PointerInBounds && BCR.value && selectThisEl()) {
                FSM.selected = { state: true, changedBy: P };
                listenForDeselect(BCR.value);
              }
              break;
          }
        };
        const updateFocused = () => {
          // see: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
          switch (P.type) {
            case 'mousedown':
              FSM.focused = { state: focusThisEl(), changedBy: P };
              break;
            case 'touchstart':
              FSM.focused = { state: focusThisEl(), changedBy: P };
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

    watch(
      () => [
        FSM.hovered.state,
        FSM.peeked.state,
        FSM.pressed.state,
        FSM.toggled.state,
        FSM.sliding.state,
        FSM.selected.state,
        FSM.focused.state,
      ] /* see: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-reactive-objects */,
      (current, previous) => {
        const makeStateArrays = () => {
          const newState = [];
          const oldState = [];
          const IES /* (I)nput (E)vent (S)et */ = new Set();
          const flags: Array<'pointerReleasedInTarget'> = [];

          if (current[0] /* FSM.hovered.state */) newState.push(State.hovered);
          if (current[1] /* FSM.peeked.state */) newState.push(State.peeked);
          if (current[2] /* FSM.pressed.state */) newState.push(State.pressed);
          if (current[3] /* FSM.toggled.state */) newState.push(State.toggled);
          if (current[4] /* FSM.sliding.state */) newState.push(State.sliding);
          if (current[5] /* FSM.selected.state */)
            newState.push(State.selected);
          if (current[6] /* FSM.focused.state */) newState.push(State.focused);

          if (previous[0] /* FSM.hovered.state */) oldState.push(State.hovered);
          if (previous[1] /* FSM.peeked.state */) oldState.push(State.peeked);
          if (previous[2] /* FSM.pressed.state */) oldState.push(State.pressed);
          if (previous[3] /* FSM.toggled.state */) oldState.push(State.toggled);
          if (previous[4] /* FSM.sliding.state */) oldState.push(State.sliding);
          if (previous[5] /* FSM.selected.state */)
            oldState.push(State.selected);
          if (previous[6] /* FSM.focused.state */) oldState.push(State.focused);

          if (current[0] !== previous[0]) IES.add(FSM.hovered.changedBy);
          if (current[1] !== previous[1]) IES.add(FSM.peeked.changedBy);
          if (current[2] !== previous[2]) IES.add(FSM.pressed.changedBy);
          if (current[3] !== previous[3]) IES.add(FSM.toggled.changedBy);
          if (current[4] !== previous[4]) IES.add(FSM.sliding.changedBy);
          if (current[5] !== previous[5]) IES.add(FSM.selected.changedBy);
          if (current[6] !== previous[6]) IES.add(FSM.focused.changedBy);

          const inputEvents = Array.from(IES) as Array<EventInfo<unknown>>;

          /* Check if the pointer released the target when it was in the target. */
          if (
            !newState.includes(State.pressed) &&
            oldState.includes(State.pressed)
          ) {
            let didReleaseInTarget = false;
            const ietype = inputEvents.map(e => e.type);

            if (ietype.includes('touchend')) {
              const touchEndedEvents = inputEvents.filter(
                e => e.type === 'touchend'
              ) as Array<{
                input: { relative: { xPercent: number; yPercent: number } };
              }>;
              if (
                touchEndedEvents.every(
                  e =>
                    e.input.relative.xPercent >= 0 ||
                    e.input.relative.xPercent <= 1 ||
                    e.input.relative.yPercent >= 0 ||
                    e.input.relative.yPercent <= 1
                )
              )
                didReleaseInTarget = true;
            } else if (ietype.includes('mouseup')) {
              didReleaseInTarget = true;
            }
            if (didReleaseInTarget) {
              flags.push('pointerReleasedInTarget');
            }
          }

          return { newState, oldState, inputEvents, flags };
        };

        emit('stateChange', makeStateArrays());
      },
      {
        deep: false,
        immediate: false,
      }
    );

    // !Lifecycle Hooks

    return { ...toRefs(DataAndComputed), FSM, BCR };
  },
});
</script>