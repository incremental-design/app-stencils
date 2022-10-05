import { EventInfo } from "@incremental.design/device-input-event-handlers/dist/types/event-handlers/handler-utils";

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
  /* note: we don't import handleDevice, DeviceInput, handleGamepad, GamepadInput, handleWindowResize, WindowResizeInput because those events are only ever emitted on window */
} from "@incremental.design/device-input-event-handlers";

import { FiniteStateMachine } from "./useMakeFiniteStateMachine";

interface EventHandlers {
  notPassive: {
    mouse: {
      [eventType: string]: (E: MouseEvent) => void;
    };
    other: {
      [eventType: string]:
        | ((E: DragEvent) => void)
        | ((E: Event) => void)
        | ((E: FocusEvent) => void)
        | ((E: KeyboardEvent) => void)
        | ((E: WheelEvent) => void);
    };
  };
  passive: {
    touch: {
      [eventType: string]: (E: TouchEvent) => void;
    };
    wheel: {
      [eventType: string]: (E: WheelEvent) => void;
    };
  };
}

export interface PreviousInputs {
  dragInput: false | EventInfo<DragInput>;
  scrollInput: false | EventInfo<ScrollInput>;
  focusInput: false | EventInfo<FocusInput>;
  keyboardInput: false | EventInfo<KeyboardInput>;
  pointerInput: false | EventInfo<PointerInput>;
}

export default (prev: PreviousInputs, FSM: FiniteStateMachine) => {
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
    if (!prev.pointerInput) return false;
    const prevIsTouch = [
      "touchstart",
      "touchend",
      "touchmove",
      "touchcancel",
    ].includes(prev.pointerInput.type);
    const sameTimeframe =
      e.timeStamp - prev.pointerInput.timestamp <=
      250; /* discard mouse events that happen up to 250 ms after a preceding touch event - this is important for safari, because it lags when dispatching default event. I know this is clumsy and could be annoying for someone who is using both mouse and touch ... but I don't have a better solution at the moment */
    if (sameTimeframe && prevIsTouch) return true;
    return false;
  };

  const HM /* (H)andle (M)ouse */ = (E: MouseEvent) => {
    if (shouldDiscardMouseEvent(E)) return;
    /* don't process mousemove events that are closer than 100ms together because it gums up the reactivity system */
    if (shouldThrottleEvent("mousemove", E, prev.pointerInput)) return;
    prev.pointerInput = prev.pointerInput
      ? handleMouse(E, prev.pointerInput)
      : handleMouse(E);
  };

  const HT /* (H)andle (T)ouch */ = (E: TouchEvent) => {
    if (shouldThrottleEvent("touchmove", E, prev.pointerInput)) return;
    prev.pointerInput = prev.pointerInput
      ? handleTouch(E, prev.pointerInput)
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
      case "blur":
        FSM.focused = {
          state: false,
          changedBy: {
            type: E.type,
            timestamp: E.timeStamp,
            input:
              E /* this is technically incorrect, but works as a placeholder */,
          },
        };
        break;
      case "focus":
        FSM.focused = {
          state: true,
          changedBy: {
            type: E.type,
            timestamp: E.timeStamp,
            input:
              E /* this is technically incorrect, but works as a placeholder */,
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
    const EH: /* (E)vent (H)andler */ EventHandlers = {
      passive: {
        touch: {},
        wheel: {},
      },
      notPassive: {
        mouse: {},
        other: {},
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
      if (!EH.notPassive.other.contextmenu)
        EH.notPassive.other.contextmenu = DCM;
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
};
