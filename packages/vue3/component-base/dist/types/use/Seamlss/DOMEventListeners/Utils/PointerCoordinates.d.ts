/**
 * PointerCoordinates lists all of the metrics a pointer can have. A pointer is any means of targeting a specific pixel within an HTMLelement. As it is currently implemented, it describes the pointers generated by both touch events and mouse events. A pointer generated by a mouse event is the exact location of the mouse cursor in the mouse event. A pointer generated by a touch event is the centerpoint of the smallest circle that circumscribes all of the touch points in the touch event.
 *
 * @typeParam x is the horizontal component of the location of the pointer, in pixels, relative to the target element. For example, if the pointer is 50 pixels to the right of the left edge of the element, x will be 50.
 *
 * @typeParam y is the vertical component of the location of the pointer, in pixels, relative to the target element. For example, if the pointer is 50 pixels below the top edge of the element, y will be 50.
 *
 * @typeParam xPercent is the horizontal component of the location of the pointer, in percentage, relative to the target element's container. For example, if the cursor is 50 pixels to the right of the left edge, and 50 pixels to the left of the right edge of the element, then xPercent will be .5. Keep in mind that the target element is distinct from its container. If the target element overflows its container (ie it is wider than its container), then the xPercent will NOT reflect the location of the pointer relative to the width of the element itself.
 *
 * @typeParam yPercent is the horizontal component of the location of the pointer, in decimal, relative to the target element's container. For example, if the pointer is 50 pixels below the top edge, and 50 pixels above the bottom edge of the element, then yPercent will be .5. Keep in mind that the target element is distinct from its container. If the target element overflows its container (ie it is taller than its container), then the yPercent will NOT reflect the location of the pointer relative to the height of the element itself.
 *
 * @typeParam dxViewport is the horizontal component of the pointer's velocity relative to the viewport, measured in pixels per second. For example, if the pointer is moving 5 pixels to the right each second, dx will be 5. Keep in mind that the velocity is NOT measured relative to the target element. This is a REALLY important design choice, because it lets the dxViewport express the distance that a draggable element is moving, relative to the viewport.
 *
 * @typeParam dyViewport is the vertical component of the pointer's velocity relative to the viewport, measured in pixels per second. For example, if the pointer is moving 5 pixels down each second, dy will be 5. Keep in mind that the velocity is NOT measured relative to the target element. This is a REALLY important design choice, because it lets the dyViewport express the distance that a draggable element is moving, relative to the viewport.
 *
 * @typeParam dxPercent is the horizontal component of the pointer's velocity relative to the viewport, measured as a percent of the target element's width. For example, if the pointer is moving 5 pixels to the right each second, and the width of the element is 50 pixels, then dxPercent is .1.
 *
 * @typeParam dyPercent is the vertical component of the pointer's velocity relative to the viewport, measured in terms of the percentage of the target element's height. For example, if the pointer is moving 5 pixels down each second, and the height of the element is 50 pixels, then dyPercent is .1.
 *
 * @typeParam xViewport is the horizontal component of the location of the pointer, in pixels, relative to the viewport. This property is only included when the pointer is generated by a touch event. That's because this parameter is only useful when calculating {@link `dxViewport`} and {@ `dxPercent`}
 *
 * @typeParam rViewport is the size of the pointer's radius relative to the viewport, in pixels. Think of the pointer as a circle. The size of the pointer can vary. When the pointer is a mouse cursor, the radius is zero. When the pointer is a pair of touch points, the radius is half of the distance between each touch point. When the pointer is three or more touch points, the radius is the radius of the smallest cirlce that can enclose all three touch points.
 *
 * @remarks Notice that the coordinate space of `r` and `dr` are relative to the browser {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts | viewport} ... NOT the coordinate space of the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement | HTMLElement}. This is a REALLY important design choice, because it lets the radius express the distance between fingertips on a device screen, regardless of the scale of the HTMLElement being touched. For example: take an 100x100px HTMLElement that is scaled to 50% of its original width and height. This element will still be 100x100px in its coordinate space. However, it will appear to be 50x50px in the viewport. Furthermore, if you move a pointer horizontally across the HTMLElement at a speed of 10px per second relative to the viewport, the `dx` of the pointer will be 20px per second, because it's covering twice as much distance, relative to the HTMLElement, as it would be if the HTMLElement was scaled to 100%. While this scaling is very helpful for tracking the position of a pointer within an element, it would create an unhelpful feedback loop if it was applied to the pointer's radius. That's because of this codebase implements the pinch-to-zoom gesture. Pinching changes the size of the radius. The size of the radius drives the scale of the HTMLElement's coordinate space. Increasing the size of the radius increases the scale of the space, and vice versa. Because of how the HTMLElement's coordinate space can be scaled relative to the radius, the radius cannot be measured relative to the HTMLElement's coordinate space.
 */
export declare type PointerCoordinates = MouseCoordinates & TouchAdditionalCoordinates;
declare type MouseCoordinates = {
    event: MouseEvent | TouchEvent;
    relative: {
        x: number;
        y: number;
        xPercent?: number;
        yPercent?: number;
        dxPercent?: number;
        dyPercent?: number;
    };
    viewport?: {
        dx?: number;
        dy?: number;
    };
};
declare type TouchAdditionalCoordinates = {
    numberOfTouchPoints: number;
    viewport?: {
        x?: number;
        y?: number;
        radius?: number;
        dRadius?: number;
        dRotation?: number;
    };
};
export declare function getPointerCoordinates(event: Event, previous?: PointerCoordinates | false): PointerCoordinates;
export {};
//# sourceMappingURL=PointerCoordinates.d.ts.map