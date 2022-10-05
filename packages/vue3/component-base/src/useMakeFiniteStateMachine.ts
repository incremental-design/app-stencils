import { computed, reactive } from "vue";

import { EventInfo } from "@incremental.design/device-input-event-handlers/dist/types/event-handlers/handler-utils";

type FSMEntry = { state: boolean; changedBy: EventInfo<unknown> | null };

export type FiniteStateMachine = {
  data: {
    [data: string]: FSMEntry;
  };
  hovering: FSMEntry;
  pressing: FSMEntry;
  peeking: FSMEntry;
  toggled: FSMEntry;
  dragging: FSMEntry;
  selected: FSMEntry;
  focused: FSMEntry;
  editing: FSMEntry;
  scrolling: FSMEntry;
};

// export default () =>

export default () => {
  const FSM: FiniteStateMachine = reactive({
    data: {
      hovering: { state: false, changedBy: null },
      pressing: { state: false, changedBy: null },
      peeking: { state: false, changedBy: null },
      toggled: { state: false, changedBy: null },
      dragging: { state: false, changedBy: null },
      selected: { state: false, changedBy: null },
      focused: { state: false, changedBy: null },
      editing: { state: false, changedBy: null },
      scrolling: { state: false, changedBy: null },
    },
    /**
     * hovering - whether a mouse cursor is currently occluding the component
     */
    hovering: computed({
      get: (): FSMEntry => {
        return FSM.data.hovering;
      },
      set: (value: FSMEntry) => {
        FSM.data.hovering =
          FSM.data.hovering.state !== value.state ? value : FSM.data.hovering;
      },
    }),
    /**
     * pressing - whether a pointer is currently depressing the component, or if the component is focused, whether the enter key is depressed.
     */
    pressing: computed({
      get: (): FSMEntry => {
        return FSM.data.pressing;
      },
      set: (value: FSMEntry) => {
        FSM.data.pressing =
          FSM.data.pressing.state !== value.state ? value : FSM.data.pressing;
      },
    }),
    /**
     * peeking - whether the component has grown in size to reveal or otherwise magnify its contents
     */
    peeking: computed({
      get: (): FSMEntry => {
        return FSM.data.peeking;
      },
      set: (value: FSMEntry) => {
        FSM.data.peeking =
          FSM.data.peeking.state !== value.state ? value : FSM.data.peeking;
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
     * dragging - whether a pointer is moving a component from one location to another.
     */
    dragging: computed({
      get: (): FSMEntry => {
        return FSM.data.dragging;
      },
      set: (value: FSMEntry) => {
        FSM.data.dragging =
          FSM.data.dragging.state !== value.state ? value : FSM.data.dragging;
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
    /**
     * editing - whether the component's content are being modified with a keyboard, mouse, or touch
     */
    editing: computed({
      get: (): FSMEntry => {
        return FSM.data.editing;
      },
      set: (value: FSMEntry) => {
        FSM.data.editing =
          FSM.data.editing.state !== value.state ? value : FSM.data.focused;
        /* if editing is true, then the component is necessarily focused */
        if (value.state && !FSM.data.focused.state) FSM.data.focused = value;
      },
    }),
    /**
     * scrolling - whether the component's contents are tracking or otherwise responding to pointer or wheel input
     */
    scrolling: computed({
      get: (): FSMEntry => {
        return FSM.data.scrolling;
      },
      set: (value: FSMEntry) => {
        const valueToSet = {
          state: FSM.pressing.state && value.state,
          changedBy: value.changedBy,
        }; /* we have to check if pressed is true because the event listeners for sliding won't bother checking */
        FSM.data.scrolling =
          FSM.data.scrolling.state !== valueToSet.state
            ? valueToSet
            : FSM.data.scrolling;
      },
    }),
  });
  return FSM;
};
