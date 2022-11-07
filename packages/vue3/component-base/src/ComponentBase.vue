<template>
  <div ref="BCR" :style="container">
    <slot> isPressed: {{ prev.pointerInput }} </slot>
  </div>
  <!-- <div ref="BCR" :style="pointerDetector" /> -->
</template>

<script lang="ts" setup>
// needs to emit a stateChange, pointerInput, focusInput, keyboardInput, dragInput, scrollInput (no window resize input or gamepad input bc those are window events)

import {
  computed,
  watch,
  ref,
  Ref,
  reactive,
  CSSProperties,
  ComputedRef,
} from "vue";

import { EventInfo } from "@incremental.design/device-input-event-handlers";

import e, { State } from "./useEmits";
import p, { Affordances } from "./useProps";
// import useMakeEventHandlers, { PreviousInputs } from "./useMakeEventHandlers";
import useMakeFiniteStateMachine from "./useMakeFiniteStateMachine";

import listeners, { PreviousInputs } from "./useEventListeners";

const props = defineProps(p);

const emit = defineEmits(e);

const BCR: Ref<null | HTMLElement> /*(B)ase (C)omponent (R)oot */ = ref(null);

/* set tabIndex if component is focusable or editable */
watch(
  [() => BCR.value, () => props.isFocusable, () => props.isEditable],
  (current) => {
    const [el, focusable, editable] = current;

    if (!el) return;
    if (focusable || editable) return (el.tabIndex = 0);
    return (el.tabIndex = -1);
  },
  { immediate: true }
);

/* keep track of previous inputs */
const prev: PreviousInputs = reactive({
  dragInput: false,
  scrollInput: false,
  focusInput: false,
  keyboardInput: false,
  pointerInput: false,
});

const FSM = useMakeFiniteStateMachine();

/* add and remove event listeners whenever affordances change */

const a: ComputedRef<Affordances> = computed(() => ({
  isHoverable: props.isHoverable,
  isPressable: props.isPressable,
  isPeekable: props.isPeekable,
  isScrollable: props.isScrollable,
  isSwipeable: props.isSwipeable,
  isToggleable: props.isToggleable,
  isDraggable: props.isDraggable,
  isSelectable: props.isSelectable,
  isFocusable: props.isFocusable,
  isEditable: props.isEditable,
}));

watch(
  [a, () => !!BCR.value],
  (current, previous) => {
    const isMounted = current[1];
    const wasMounted = previous[1];

    if (!isMounted) return;

    const c = current[0];
    const p =
      !wasMounted /* we HAVE to discard previous[0] if the component wasn't mounted, because the affordances are set BEFORE the component is mounted */ ||
      !previous[0]
        ? {
            isHoverable: false,
            isPressable: false,
            isPeekable: false,
            isScrollable: false,
            isSwipeable: false,
            isToggleable: false,
            isDraggable: false,
            isSelectable: false,
            isFocusable: false,
            isEditable: false,
          }
        : previous[0];

    const listenersToAdd: Set<string> = new Set();

    const listenersToRemove: Set<string> = new Set();

    const affordances = Object.keys(c);

    affordances.forEach((affordance) => {
      if (c[affordance] && !p[affordance]) {
        listenersToAdd.add(affordance);
      } else if (!c[affordance] && p[affordance]) {
        listenersToRemove.add(affordance);
      }
    });

    /* now, add and remove depdendent affordances */
    [listenersToAdd, listenersToRemove].forEach((set) => {
      // if(set.has('isEditable')) => set.add('') // what do we add for isEditable??
      if (set.has("isFocusable")) set.add("isPressable");
      if (set.has("isSelectable")) set.add("isPressable");
      // if(set.has("isDraggable")) set.add("") // what do we add for isDraggable??
      // if(set.has("isSwipeable")) set.add("") // what do we add for isSwipeable??
      // if (set.has("isScrollable")) set.add("") // what do we add for isScrollable??
      if (set.has("isPeekable")) set.add("isPressable");
      if (set.has("isPressable")) set.add("isHoverable");
    });

    /* finally, if an affordance is to be removed, just to be added back again, don't do anything */
    affordances.forEach((affordance) => {
      if (listenersToAdd.has(affordance) && listenersToRemove.has(affordance)) {
        listenersToAdd.delete(affordance);
        listenersToRemove.delete(affordance);
      }
    });

    const el = BCR.value as HTMLElement;

    affordances.forEach((affordance) => {
      if (listenersToRemove.has(affordance))
        listeners[affordance](false, el, prev);
      if (listenersToAdd.has(affordance)) listeners[affordance](true, el, prev);
    });
  },
  { deep: true }
);

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
  () => prev.pointerInput,
  (current) => {
    if (!current) return;
    const P = current;
    emit("pointerInput", P);
    const XP = P.input.relative.xPercent;
    const YP = P.input.relative.yPercent;
    const XPOutOfBounds = XP ? XP < 0 || XP > 1 : false;
    const YPOutOfBounds = YP ? YP < 0 || YP > 1 : false;
    const PointerInBounds = !XPOutOfBounds && !YPOutOfBounds;

    // do something with P

    const updateHovering = () => {
      switch (P.type) {
        case "mousemove":
          FSM.hovering = { state: true, changedBy: P };
          break;
        case "mouseleave":
          FSM.hovering = { state: false, changedBy: P };
          break;
      }
    };
    const updatePressing = () => {
      switch (P.type) {
        case "mousedown":
          FSM.pressing = { state: true, changedBy: P };
          break;
        case "touchstart":
          FSM.pressing = { state: true, changedBy: P };
          break;
        case "mouseup":
          FSM.pressing = { state: false, changedBy: P };
          break;
        case "mouseleave":
          FSM.pressing = { state: false, changedBy: P };
          break;
        case "touchcancel":
          FSM.pressing = { state: false, changedBy: P };
          break;
        case "touchend":
          FSM.pressing = { state: false, changedBy: P };
          break;
        case "touchmove":
          FSM.pressing = { state: PointerInBounds, changedBy: P };
          break;
      }
    };
    const updatePeeking = () => {
      switch (P.type) {
        case "mousemove":
          FSM.peeking = { state: true, changedBy: P };
          break;
        case "mouseleave":
          FSM.peeking = { state: false, changedBy: P };
          break;
        case "touchstart":
          FSM.peeking = { state: true, changedBy: P };
          break;
        case "touchend":
          FSM.peeking = { state: false, changedBy: P };
          break;
        case "touchcancel":
          FSM.peeking = { state: false, changedBy: P };
          break;
      }
    };
    const updateToggled = () => {
      switch (P.type) {
        case "mouseup":
          FSM.toggled = { state: !FSM.toggled.state, changedBy: P };
          break;
        case "touchend":
          if (PointerInBounds)
            FSM.toggled = { state: !FSM.toggled.state, changedBy: P };
          break;
      }
    };
    // const updateDragging = () => {}
    const updateSelected = () => {
      const listenForDeselect = (current: Node) => {
        if (document) {
          const DE /* (D)eselect (E)vents */ = ["pointerup"];
          for (const E of DE) {
            document.addEventListener(
              E,
              (E) => {
                const DS = document.getSelection();
                FSM.selected = {
                  state:
                    !!DS &&
                    DS.anchorNode === current &&
                    DS.focusNode === current &&
                    !DS.isCollapsed &&
                    DS.type === "Range",
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
        case "mouseup":
          if (BCR.value && selectThisEl()) {
            FSM.selected = { state: true, changedBy: P };
            listenForDeselect(BCR.value);
          }
          break;
        case "touchend":
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
        case "mousedown":
          FSM.focused = { state: focusThisEl(), changedBy: P };
          break;
        case "touchstart":
          FSM.focused = { state: focusThisEl(), changedBy: P };
          break;
      }
      // todo: implement focus event input listener, and then handle it here
    };
    // const updateEditing = () => {}
    const updateScrolling = () => {
      switch (P.type) {
        case "mousemove":
          FSM.scrolling = { state: true, changedBy: P };
          break;
        case "touchmove":
          FSM.scrolling = { state: PointerInBounds, changedBy: P };
          break;
        case "touchend":
          FSM.scrolling = { state: false, changedBy: P };
          break;
        case "mouseleave":
          FSM.scrolling = { state: false, changedBy: P };
          break;
        case "mouseup":
          FSM.scrolling = { state: false, changedBy: P };
          break;
      }
    };

    if (
      props.isHoverable ||
      props.isPeekable ||
      props.isPressable ||
      props.isToggleable ||
      props.isScrollable ||
      props.isSelectable ||
      props.isFocusable
    )
      updateHovering();
    if (
      props.isPressable ||
      props.isToggleable ||
      props.isScrollable ||
      props.isSelectable ||
      props.isFocusable
    )
      updatePressing();
    if (props.isPeekable) updatePeeking();
    if (props.isToggleable) updateToggled();
    // if (props.isDraggable) updateDragging();
    if (props.isSelectable) updateSelected();
    if (props.isFocusable) updateFocused();
    // if (props.isEditable) updateEditing();
    if (props.isScrollable) updateScrolling();
  },
  {
    deep: true,
    immediate: false,
  }
);

watch(
  () => [
    FSM.hovering.state,
    FSM.pressing.state,
    FSM.peeking.state,
    FSM.toggled.state,
    // FSM.dragging.state,
    FSM.selected.state,
    // FSM.editing.state,
    FSM.focused.state,
    FSM.scrolling.state,
  ] /* see: https://v3.vuejs.org/guide/reactivity-computed-watchers.html#watching-reactive-objects */,
  (current, previous) => {
    const makeStateArrays = () => {
      const newState: Array<State> = [];
      const oldState: Array<State> = [];
      const IES /* (I)nput (E)vent (S)et */ = new Set();
      const flags: Array<"pointerReleasedInTarget"> = [];

      if (current[0] /* FSM.hovered.state */) newState.push(State.hovering);
      if (current[1] /* FSM.pressed.state */) newState.push(State.pressing);
      if (current[2] /* FSM.peeked.state */) newState.push(State.peeking);
      if (current[3] /* FSM.toggled.state */) newState.push(State.toggled);
      // add dragging support
      if (current[4] /* FSM.selected.state */) newState.push(State.selected);
      if (current[5] /* FSM.focused.state */) newState.push(State.focused);
      // add editing support
      if (current[6] /* FSM.scrolling.state */) newState.push(State.scrolling);

      if (previous[0] /* FSM.hovered.state */) oldState.push(State.hovering);
      if (previous[1] /* FSM.pressed.state */) oldState.push(State.pressing);
      if (previous[2] /* FSM.peeked.state */) oldState.push(State.peeking);
      if (previous[3] /* FSM.toggled.state */) oldState.push(State.toggled);
      // add dragging support
      if (previous[4] /* FSM.selected.state */) oldState.push(State.selected);
      if (previous[5] /* FSM.focused.state */) oldState.push(State.focused);
      // add editing support
      if (previous[6] /* FSM.scrolling.state */) oldState.push(State.scrolling);

      if (current[0] !== previous[0]) IES.add(FSM.hovering.changedBy);
      if (current[1] !== previous[1]) IES.add(FSM.pressing.changedBy);
      if (current[2] !== previous[2]) IES.add(FSM.peeking.changedBy);
      if (current[3] !== previous[3]) IES.add(FSM.toggled.changedBy);
      // add dragging support
      if (current[4] !== previous[5]) IES.add(FSM.selected.changedBy);
      if (current[5] !== previous[6]) IES.add(FSM.focused.changedBy);
      // add editing support
      if (current[6] !== previous[4]) IES.add(FSM.scrolling.changedBy);

      const inputEvents = Array.from(IES) as Array<EventInfo<unknown>>;

      /* Check if the pointer released the target when it was in the target. */
      if (
        !newState.includes(State.pressing) &&
        oldState.includes(State.pressing)
      ) {
        let didReleaseInTarget = false;
        const ietype = inputEvents.map((e) => e.type);

        if (ietype.includes("touchend")) {
          const touchEndedEvents = inputEvents.filter(
            (e) => e.type === "touchend"
          ) as Array<{
            input: { relative: { xPercent: number; yPercent: number } };
          }>;
          if (
            touchEndedEvents.every(
              (e) =>
                e.input.relative.xPercent >= 0 ||
                e.input.relative.xPercent <= 1 ||
                e.input.relative.yPercent >= 0 ||
                e.input.relative.yPercent <= 1
            )
          )
            didReleaseInTarget = true;
        } else if (ietype.includes("mouseup")) {
          didReleaseInTarget = true;
        }
        if (didReleaseInTarget) {
          flags.push("pointerReleasedInTarget");
        }
      }

      return { newState, oldState, inputEvents, flags };
    };

    emit("stateChange", makeStateArrays());
  },
  {
    deep: false,
    immediate: false,
  }
);

const userSelect = computed(() => (props.isSelectable ? "all" : "none"));
// const pointerEvents = computed(() => (props.isFocusable ? "auto" : "none"));

/* inline CSS */

const container: ComputedRef<CSSProperties> = computed(() => ({
  // pointerEvents: pointerEvents.value,
  userSelect: userSelect.value,
  position: "relative",
}));
</script>
