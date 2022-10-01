<template>
  <div
    v-on="eventHandlers.notPassive.other"
    v-on:mousedown="eventHandlers.notPassive.mouse.mousedown"
    v-on:mouseup="eventHandlers.notPassive.mouse.mouseup"
    v-on:mousemove="eventHandlers.notPassive.mouse.mousemove"
    v-on:mouseleave="eventHandlers.notPassive.mouse.mouseleave"
    v-on:touchstart.passive="eventHandlers.passive.touch.touchstart"
    v-on:touchmove.passive="eventHandlers.passive.touch.touchmove"
    v-on:touchend.passive="eventHandlers.passive.touch.touchend"
    v-on:touchcancel.passive="eventHandlers.passive.touch.touchcancel"
    v-on:wheel.passive="eventHandlers.passive.wheel.wheel"
    :class="$style.outer"
    ref="BCR"
  >
    <div :class="$style.inner">
      <slot>
        isPressed: {{ pointerInput }}
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
// needs to emit a stateChange, pointerInput, focusInput, keyboardInput, dragInput, scrollInput (no window resize input or gamepad input bc those are window events)

import {
  defineComponent,
  reactive,
  computed,
  watch,
  ref,
  Ref,
  toRefs,
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

import emits, { State } from './useEmits'
import props from './useProps'

interface EventHandlers {
  notPassive: {
    mouse: {
      [eventType: string]:
      ((E: MouseEvent) => void)
    },
    other: {
      [eventType: string]:
        | ((E: DragEvent) => void)
        | ((E: Event) => void)
        | ((E: FocusEvent) => void)
        | ((E: KeyboardEvent) => void)
        | ((E: WheelEvent) => void)
    }
  },
  passive: {
    touch: {
    [eventType: string]: ((E: TouchEvent) => void)
    },
    wheel: {
    [eventType: string]: ((E: WheelEvent) => void);
    }
  },
}

export default defineComponent({

  props,

  emits,

  setup(props, { emit }) {
    const BCR: Ref<null | HTMLElement> /*(B)ase (C)omponent (R)oot */ = ref(null);

    watch(
      [() => BCR.value, () => props.isFocusable],
      (current) => {
        const [el, focusable] = current;
        
        if(!el) return;
        if(focusable) return el.tabIndex = 0
        return el.tabIndex = -1
      },
      {immediate: true}
      )

    const DataAndComputed: {
      pointerInput: false | EventInfo<PointerInput>;
      eventHandlers: EventHandlers;
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

    const shouldDiscardMouseEvent = (e: MouseEvent) => {
      /* since we aren't preventing default events, the browser will resolve touchstart, touchend, touchmove, and touchcancel to mousevents. Discard mousevents that are directly preceded by a touchevent */
      if(!DataAndComputed.pointerInput) return false;
      const prevIsTouch = ['touchstart','touchend','touchmove','touchcancel'].includes(DataAndComputed.pointerInput.type)
      const sameTimeframe = e.timeStamp - DataAndComputed.pointerInput.timestamp <= 250 /* discard mouse events that happen up to 250 ms after a preceding touch event - this is important for safari, because it lags when dispatching default event. I know this is clumsy and could be annoying for someone who is using both mouse and touch ... but I don't have a better solution at the moment */
      if(sameTimeframe && prevIsTouch) return true;
      return false
    }

    const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
      if(shouldDiscardMouseEvent(E)) return;
      /* don't process mousemove events that are closer than 100ms together because it gums up the reactivity system */
      if (shouldThrottleEvent('mousemove', E, DataAndComputed.pointerInput))
        return;
      DataAndComputed.pointerInput = DataAndComputed.pointerInput
        ? handleMouse(E, DataAndComputed.pointerInput)
        : handleMouse(E);
    };

    const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
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
      let EH: /* (E)vent (H)andler */ EventHandlers = {
        passive: {
          touch: {},
          wheel: {},
        },
        notPassive: {
          mouse:{},
          other:{}
        },
      };

      const listenForHover = (): void => {
        if (!EH.passive.touch.touchmove) EH.passive.touch.touchmove = HT;
        if (!EH.passive.touch.touchstart) EH.passive.touch.touchstart = HT;
        if (!EH.passive.touch.touchend) EH.passive.touch.touchend = HT;
        if (!EH.passive.touch.touchcancel) EH.passive.touch.touchcancel = HT;
        if (!EH.notPassive.mouse.mousemove) EH.notPassive.mouse.mousemove = HM;
        if (!EH.notPassive.mouse.mouseleave) EH.notPassive.mouse.mouseleave = HM;
      };
      const listenForPeek = (): void => {
        listenForHover();
      };
      const listenForPress = (): void => {
        listenForHover();
        if (!EH.notPassive.mouse.mousedown) EH.notPassive.mouse.mousedown = HM;
        if (!EH.notPassive.mouse.mouseup) EH.notPassive.mouse.mouseup = HM;
        if (!EH.passive.touch.touchstart) EH.passive.touch.touchstart = HT;
        if (!EH.passive.touch.touchmove) EH.passive.touch.touchmove = HT;
        if (!EH.passive.touch.touchend) EH.passive.touch.touchend = HT;
        if (!EH.passive.touch.touchcancel) EH.passive.touch.touchcancel = HT;
      };
      const listenForToggle = (): void => {
        listenForPress();
      };
      const listenForSlide = (): void => {
        listenForPress();
      };
      const listenForSelect = (): void => {
        listenForPress();
      };
      const listenForFocus = (): void => {
        listenForPress();
        if (!EH.notPassive.other.blur) EH.notPassive.other.blur = HF;
        if (!EH.notPassive.other.focus) EH.notPassive.other.focus = HF;
      };

      const disableContextMenu = (): void => {
        if (!EH.notPassive.other.contextmenu) EH.notPassive.other.contextmenu = DCM;
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
          const newState: Array<State> = [];
          const oldState: Array<State> = [];
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

    const userSelect = computed(() => props.isSelectable ? 'all' : 'none')
    const pointerEvents = computed(() => props.isFocusable ? 'auto' : 'none')

    return { ...toRefs(DataAndComputed), FSM, BCR, userSelect, pointerEvents };
  },
});
</script>

<style module>
  .outer {
    touch-action: manipulation;
    position: relative;
    user-select: v-bind(userSelect);
  }

  .inner {
    pointer-events: v-bind(pointerEvents);
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>