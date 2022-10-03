import {
  computed,
    reactive
  } from 'vue';

import { EventInfo } from '@incremental.design/device-input-event-handlers/dist/types/event-handlers/handler-utils';

type FSMEntry = { state: boolean; changedBy: EventInfo<unknown> | null };

export type FiniteStateMachine = {
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
}

// export default () => 

export default () => {
  const FSM: FiniteStateMachine = reactive({
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
  return FSM;
}

