import { computed, reactive } from "vue";

import { EventInfo } from "@incremental.design/device-input-event-handlers";

type FSMEntry = { state: boolean; changedBy: EventInfo<unknown> | null };

export type FiniteStateMachine = {
  data: {
    [data: string]: FSMEntry;
  };
  hovering: FSMEntry;
  pressing: FSMEntry;
  peeking: FSMEntry;
  scrolling: FSMEntry;
  swiping: FSMEntry;
  toggled: FSMEntry;
  dragging: FSMEntry;
  selected: FSMEntry;
  focused: FSMEntry;
  editing: FSMEntry;
};

export default () => {
  const FSM: FiniteStateMachine = reactive({
    data: {
      hovering: { state: false, changedBy: null },
      pressing: { state: false, changedBy: null },
      peeking: { state: false, changedBy: null },
      scrolling: { state: false, changedBy: null },
      swiping: { state: false, changedBy: null },
      toggled: { state: false, changedBy: null },
      dragging: { state: false, changedBy: null },
      selected: { state: false, changedBy: null },
      focused: { state: false, changedBy: null },
      editing: { state: false, changedBy: null },
    },
    hovering: computed({
      get: (): FSMEntry => {
        return FSM.data.hovering;
      },
      set: (value: FSMEntry) => {
        FSM.data.hovering =
          FSM.data.hovering.state !== value.state ? value : FSM.data.hovering;
      },
    }),
    pressing: computed({
      get: (): FSMEntry => {
        return FSM.data.pressing;
      },
      set: (value: FSMEntry) => {
        FSM.data.pressing =
          FSM.data.pressing.state !== value.state ? value : FSM.data.pressing;
      },
    }),
    peeking: computed({
      get: (): FSMEntry => {
        return FSM.data.peeking;
      },
      set: (value: FSMEntry) => {
        FSM.data.peeking =
          FSM.data.peeking.state !== value.state ? value : FSM.data.peeking;
      },
    }),
    scrolling: computed({
      get: (): FSMEntry => {
        return FSM.data.scrolling;
      },
      set: (value: FSMEntry) => {
        FSM.data.scrolling =
          FSM.data.scrolling.state !== value.state ? value : FSM.data.scrolling;
      },
    }),
    swiping: computed({
      get: (): FSMEntry => {
        return FSM.data.swiping;
      },
      set: (value: FSMEntry) => {
        FSM.data.swiping =
          FSM.data.swiping.state !== value.state ? value : FSM.data.swiping;

        if (value.state && !FSM.data.pressing.state)
          FSM.data.pressing =
            value; /* because you can't swipe something without pressing it */
      },
    }),
    toggled: computed({
      get: (): FSMEntry => {
        return FSM.data.toggled;
      },
      set: (value: FSMEntry) => {
        FSM.data.toggled =
          FSM.data.toggled.state !== value.state ? value : FSM.data.toggled;
      },
    }),
    dragging: computed({
      get: (): FSMEntry => {
        return FSM.data.dragging;
      },
      set: (value: FSMEntry) => {
        FSM.data.dragging =
          FSM.data.dragging.state !== value.state ? value : FSM.data.dragging;
        if (value.state && !FSM.data.pressing.state)
          FSM.data.pressing =
            value; /* because you can't drag something without pressing it */
      },
    }),
    selected: computed({
      get: (): FSMEntry => {
        return FSM.data.selected;
      },
      set: (value: FSMEntry) => {
        FSM.data.selected =
          FSM.data.selected.state !== value.state ? value : FSM.data.selected;
      },
    }),
    focused: computed({
      get: (): FSMEntry => {
        return FSM.data.focused;
      },
      set: (value: FSMEntry) => {
        FSM.data.focused =
          FSM.data.focused.state !== value.state ? value : FSM.data.focused;
      },
    }),
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
  });
  return FSM;
};
