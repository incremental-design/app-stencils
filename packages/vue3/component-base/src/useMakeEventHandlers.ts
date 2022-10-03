import {
  Ref,
  computed,
  reactive
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

type FSMEntry = { state: boolean; changedBy: EventInfo<unknown> | null };

export default (
  pointerInput: Ref<false | EventInfo<PointerInput>>,
  ) => {

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
    if(!pointerInput.value) return false;
    const prevIsTouch = ['touchstart','touchend','touchmove','touchcancel'].includes(pointerInput.value.type)
    const sameTimeframe = e.timeStamp - pointerInput.value.timestamp <= 250 /* discard mouse events that happen up to 250 ms after a preceding touch event - this is important for safari, because it lags when dispatching default event. I know this is clumsy and could be annoying for someone who is using both mouse and touch ... but I don't have a better solution at the moment */
    if(sameTimeframe && prevIsTouch) return true;
    return false
  }

  const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
      if(shouldDiscardMouseEvent(E)) return;
      /* don't process mousemove events that are closer than 100ms together because it gums up the reactivity system */
      if (shouldThrottleEvent('mousemove', E, pointerInput.value))
        return;
      pointerInput.value = pointerInput.value
        ? handleMouse(E, pointerInput.value)
        : handleMouse(E);
    };
    
    const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
      if (shouldThrottleEvent('touchmove', E, pointerInput.value))
        return;
      pointerInput.value = pointerInput.value
        ? handleTouch(E, pointerInput.value)
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

    return makeEventHandlers;
}