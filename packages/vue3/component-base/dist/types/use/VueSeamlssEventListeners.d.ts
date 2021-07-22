/**
 * Listeners are functions that receive events, optionally modify them, and extract relevant information. Use listeners to filter the useful information out of an event before discarding it.
 * @param event - the event you want to listen to
 * @typeParam Returns - the type of information that the listener will return from the event
 * @param stopPropogation - a boolean that determines whether e.stopPropogation() should be called.
 * @param preventDefault - a boolean that determines whether e.preventDefault() should be called.
 * @param previous - any previous event you want to compare the event to.
 * @returns Returns - the type of information the listener will return from the event.
 *
 * To use the listener in your Vue components, you need to wrap it in a callback, and bind it to the name of the event you want to listen to:
 * @example
 * <div @click="(event) => { ClickListener(event, true, true) }"></div>
 */
declare type Listener<Returns> = (event: Event, stopPropogation?: boolean, preventDefault?: boolean, previous?: Event) => Returns;
/**
 * @typeParam x is the horizontal component of the location in pixels, relative to the element. For example, if the cursor is 50 pixels to the right of the left edge of the element, x will be 50.
 * @typeParam y is the vertical component of the location in pixels, relative to the element. For example, if the cursor is 50 pixels below the top edge of the element, y will be 50.
 * @typeParam xPercent is the horizontal component of the location in percentage, relative to the element. For example, if the cursor is 50 pixels to the right of the left edge, and 50 pixels to the left of the right edge of the element, then xPercent will be .5
 * @typeParam yPercent is the horizontal component of the location in percentage, relative to the element. For example, if the cursor is 50 pixels below the top edge, and 50 pixels above the bottom edge of the element, then yPercent will be .5
 * @typeParam dx is the horizontal component of the cursor's velocity, measured in pixels per second. For example, if the cursor is moving 5 pixels to the right each second, dx will be 5.
 * @typeParam dy is the vertical component of the cursor's velocity, measured in pixels per second. For example, if the cursor is moving 5 pixels down each second, dy will be 5.
 * @typeParam dxPercent is the horizontal component of the cursor's velocity, measured in percent per second. For example, if the cursor is moving 5 pixels to the right each second, and the width of the element is 50 pixels, then dxPercent is .1.
 * @typeParam dyPercent is the vertical component of the cursor's velocity, measured in percent per second. For example, if the cursor is moving 5 pixels down each second, and the height of the element is 50 pixels, then dyPercent is .1.
 */
export declare type PointerCoordinates = {
    x: number;
    y: number;
    xPercent?: number;
    yPercent?: number;
    dx?: number;
    dy?: number;
    dxPercent?: number;
    dyPercent?: number;
};
/**
 * AuxclickListener
 */
/**
 * BlurListener
 */
/**
 * ClickListener
 */
export declare const ClickListener: Listener<PointerCoordinates>;
/**
 * CompositionendListener
 */
/**
 * CompositionstartListener
 */
/**
 * CompositionupdateListener
 */
/**
 * ContextmenuListener
 */
/**
 * CopyListener
 */
/**
 * CutListener
 */
/**
 * DblclickListener
 */
/**
 * ErrorListener
 */
/**
 * FocusListener
 */
/**
 * FocusinListener
 */
/**
 * FocusoutListener
 */
/**
 * FullscreenchangeListener
 */
/**
 * FullscreenerrorListener
 */
/**
 * KeydownListener
 */
/**
 * KeyupListener
 */
/**
 * MousedownListener
 */
export declare const MousedownListener: Listener<PointerCoordinates>;
/**
 * MouseenterListener
 */
export declare const MouseenterListener: Listener<PointerCoordinates>;
/**
 * MouseleaveListener
 */
export declare const MouseleaveListener: Listener<PointerCoordinates>;
/**
 * MousemoveListener
 */
export declare const MousemoveListener: Listener<PointerCoordinates>;
/**
 * MouseoutListener
 */
export declare const MouseoutListener: Listener<PointerCoordinates>;
/**
 * MouseoverListener
 */
export declare const MouseoverListener: Listener<PointerCoordinates>;
/**
 * MouseupListener
 */
export declare const MouseupListener: Listener<PointerCoordinates>;
/**
 * OverflowListener
 */
/**
 * PasteListener
 */
/**
 * ScrollListener
 */
/**
 * SelectListener
 */
/**
 * TouchcancelListener
 */
/**
 * TouchendListener
 */
/**
 * TouchmoveListener
 */
/**
 * TouchstartListener
 */
/**
 * WebkitmouseforcedownListener
 */
/**
 * WheelListener
 */
/**
 * MouseListeners contains ALL listeners that respond to MouseEvents
 */
export declare const MouseListeners: {
    ClickListener: Listener<PointerCoordinates>;
    MousedownListener: Listener<PointerCoordinates>;
    MouseenterListener: Listener<PointerCoordinates>;
    MouseleaveListener: Listener<PointerCoordinates>;
    MousemoveListener: Listener<PointerCoordinates>;
    MouseoutListener: Listener<PointerCoordinates>;
    MouseoverListener: Listener<PointerCoordinates>;
    MouseupListener: Listener<PointerCoordinates>;
};
export {};
//# sourceMappingURL=VueSeamlssEventListeners.d.ts.map