import {
  EventInfo,
  PointerInput,
  FocusInput,
  KeyboardInput,
  ScrollInput,
  DragInput,
  handleMouse,
  handleTouch,
  //   handleDrag,
  //   handleScroll,
  //   handleFocus,
} from "@incremental.design/device-input-event-handlers";

const addListener = (
  element: HTMLElement,
  listener: (e: Event) => void,
  event: string,
  options?: { passive?: boolean; capture?: boolean }
) => {
  element.addEventListener(event, listener, options);
};

const removeListener = (
  element: HTMLElement,
  listener: (e: Event) => void,
  event: string,
  options?: { capture?: boolean }
) => {
  element.removeEventListener(event, listener, options);
};

export interface PreviousInputs {
  dragInput: false | EventInfo<DragInput>;
  scrollInput: false | EventInfo<ScrollInput>;
  focusInput: false | EventInfo<FocusInput>;
  keyboardInput: false | EventInfo<KeyboardInput>;
  pointerInput: false | EventInfo<PointerInput>;
}

const HM = (e: Event, prev: PreviousInputs, el: HTMLElement) => {
  const { pointerInput } = prev;
  const p = handleMouse(e as MouseEvent, pointerInput || undefined);
  /* we have to modify the relative coords because of the way that mouse events bubble */
  const targetEl = p.input.event.target;
  if (targetEl === el || !targetEl) return (prev.pointerInput = p);

  const { x, y } = p.input
    .event as MouseEvent; /* absolute coords relative to screen */

  const { top, bottom, left, right } = el.getBoundingClientRect();

  const relX = x - left;
  const relY = y - top;

  p.input.relative.x = relX;
  p.input.relative.y = relY;
  p.input.relative.xPercent = relX / (right - left);
  p.input.relative.yPercent = relY / (bottom - top);

  return (prev.pointerInput = p);
};

const HT = (e: Event, prev: PreviousInputs) => {
  const { pointerInput } = prev;
  e.preventDefault(); /* to keep mouse events from firing */
  prev.pointerInput = handleTouch(e as TouchEvent, pointerInput || undefined);
};

// const HD /* (H)andle (D)rag */

// const HS /* (H)andle (S)croll */

// const HF /* (H)andle (F)ocus */

// const HK /* (H)andle (K)eyboard */

// const HW /* (H)andle (W)heel */

const listenForHover = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  ["mousemove", "mouseleave"].forEach((eventName) => {
    return enable
      ? addListener(element, (e) => HM(e, prev, element), eventName)
      : removeListener(element, (e) => HM(e, prev, element), eventName);
  });
};

const listenForPress = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  ["touchstart", "touchend", "touchmove", "touchcancel"].forEach(
    (eventName) => {
      return enable
        ? addListener(element, (e) => HT(e, prev), eventName)
        : removeListener(element, (e) => HT(e, prev), eventName);
    }
  );
  ["mouseup", "mousedown"].forEach((eventName) => {
    return enable
      ? addListener(element, (e) => HM(e, prev, element), eventName)
      : removeListener(element, (e) => HM(e, prev, element), eventName);
  });
};

const listenForPeek = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

const listenForScroll = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

const listenForSwipe = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

const listenForDrag = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

const listenForSelect = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

const listenForFocus = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

const listenForEdit = (
  enable: boolean,
  element: HTMLElement,
  prev: PreviousInputs
) => {
  return; // currently this is a no-op
};

export default {
  isHoverable: listenForHover,
  isPressable: listenForPress,
  isPeekable: listenForPeek,
  isScrollable: listenForScroll,
  isSwipeable: listenForSwipe,
  isDraggable: listenForDrag,
  isSelectable: listenForSelect,
  isFocusable: listenForFocus,
  isEditable: listenForEdit,
};
