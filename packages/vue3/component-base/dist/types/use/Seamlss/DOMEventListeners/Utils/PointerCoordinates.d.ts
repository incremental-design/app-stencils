/**
 * PointerCoordinates describe all of the metrics a pointer can have. A pointer is any means of targeting a specific pixel within an HTMLelement.
 * @typeParam x is the horizontal component of the location of the pointer, in pixels, relative to the element. For example, if the pointer is 50 pixels to the right of the left edge of the element, x will be 50.
 *
 * @typeParam y is the vertical component of the location of the pointer, in pixels, relative to the element. For example, if the cursor is 50 pixels below the top edge of the element, y will be 50.
 *
 * @typeParam rViewport is the size of the pointer's radius relative to the viewport, in pixels. Think of the pointer as a circle. The size of the pointer can vary. When the pointer is a mouse cursor, the radius is zero. When the pointer is a pair of touch points, the radius is half of the distance between each touch point. When the pointer is three or more touch points, the radius is the radius of the smallest cirlce that can enclose all three touch points.
 *
 * @typeParam xPercent is the horizontal component of the location of the pointer, in percentage, relative to the element. For example, if the cursor is 50 pixels to the right of the left edge, and 50 pixels to the left of the right edge of the element, then xPercent will be .5
 *
 * @typeParam yPercent is the horizontal component of the location of the pointer, in decimal, relative to the element. For example, if the pointer is 50 pixels below the top edge, and 50 pixels above the bottom edge of the element, then yPercent will be .5
 *
 *
 * @typeParam dx is the horizontal component of the pointer's velocity, measured in pixels per second. For example, if the pointer is moving 5 pixels to the right each second, dx will be 5.
 *
 * @typeParam dy is the vertical component of the pointer's velocity, measured in pixels per second. For example, if the pointer is moving 5 pixels down each second, dy will be 5.
 *
 * @typeParam drViewport is the change in size of the pointer's radius, relative to the viewport, measured in pixels per second. For example, if the pointer's is growing at a rate of 5 pixels per second, dr will be 5.
 *
 * @typeParam dxPercent is the horizontal component of the pointer's velocity, measured in percent per second. For example, if the pointer is moving 5 pixels to the right each second, and the width of the element is 50 pixels, then dxPercent is .1.
 *
 * @typeParam dyPercent is the vertical component of the pointer's velocity, measured in percent per second. For example, if the pointer is moving 5 pixels down each second, and the height of the element is 50 pixels, then dyPercent is .1.
 *
 * @remarks Notice that the coordinate space of `r` and `dr` are relative to the browser {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts | viewport} ... NOT the coordinate space of the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement | HTMLElement}. This is a REALLY important design choice, because it lets the radius express the distance between fingertips on a device screen, regardless of the scale of the HTMLElement being touched. For example: take an 100x100px HTMLElement that is scaled to 50% of its original width and height. This element will still be 100x100px in its coordinate space. However, it will appear to be 50x50px in the viewport. Furthermore, if you move a pointer horizontally across the HTMLElement at a speed of 10px per second relative to the viewport, the `dx` of the pointer will be 20px per second, because it's covering twice as much distance, relative to the HTMLElement, as it would be if the HTMLElement was scaled to 100%. While this scaling is very helpful for tracking the position of a pointer within an element, it would create an unhelpful feedback loop if it was applied to the pointer's radius. That's because of this codebase implements the pinch-to-zoom gesture. Pinching changes the size of the radius. The size of the radius drives the scale of the HTMLElement's coordinate space. Increasing the size of the radius increases the scale of the space, and vice versa. Because of how the HTMLElement's coordinate space can be scaled relative to the radius, the radius cannot be measured relative to the HTMLElement's coordinate space.
 */
declare type MouseCoordinates = {
    x: number;
    y: number;
    xPercent?: number;
    yPercent?: number;
    dx?: number;
    dy?: number;
    dxPercent?: number;
    dyPercent?: number;
};
declare type TouchAdditionalCoordinates = {
    numberOfTouchPoints: number;
    radiusViewport?: number;
    dRadiusViewport?: number;
    dRotationViewport?: number;
};
export declare type PointerCoordinates = MouseCoordinates & TouchAdditionalCoordinates;
export declare function getPointerCoordinates(event: Event, previous?: Event): PointerCoordinates;
export {};
//# sourceMappingURL=PointerCoordinates.d.ts.map