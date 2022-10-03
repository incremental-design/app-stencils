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

<script lang="ts" setup>
// needs to emit a stateChange, pointerInput, focusInput, keyboardInput, dragInput, scrollInput (no window resize input or gamepad input bc those are window events)

import {
  reactive,
  computed,
  watch,
  ref,
  Ref,
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

import e, { State } from './useEmits'
import p from './useProps'
import useMakeEventHandlers from './useMakeEventHandlers'
import useMakeFiniteStateMachine from './useMakeFiniteStateMachine';

const emit = defineEmits(e)
const props = defineProps(p)

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

const pointerInput: Ref<false | EventInfo<PointerInput>> = ref(false)

const FSM = useMakeFiniteStateMachine()

const makeEventHandlers = useMakeEventHandlers(pointerInput, FSM)

const eventHandlers = computed(() => makeEventHandlers(
  props.isHoverable,
    props.isPeekable,
    props.isPressable,
    props.isToggleable,
    props.isSlideable,
    props.isSelectable,
    props.isFocusable
))

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

watch(
  () => pointerInput.value,
  (current) => {
    if (!current) return;
    const P = current;
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