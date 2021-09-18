/**
 * PointerInput lists all of the metrics a pointer can have. A pointer is any means of targeting a specific pixel within an HTMLelement. As it is currently implemented, it describes the pointers generated by both touch events and mouse events. A pointer generated by a mouse event is the exact location of the mouse cursor in the mouse event. A pointer generated by a touch event is the centerpoint of the smallest circle that circumscribes all of the touch points in the touch event.
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
 * @typeParam xViewport is the horizontal component of the location of the pointer, in pixels, relative to the viewport. This property is only included when the pointer is generated by a touch event. That's because this parameter is only useful when calculating {@link dxViewport} and {@ dxPercent}
 *
 * @typeParam yViewport is the vertical component of the location of the pointer, in pixels, relative to the viewport. This property is only included when the pointer is generated by a touch event. That's because this parameter is only useful when calculating {@link dyViewport} and {@ dyPercent}
 *
 * @typeParam rViewport is the size of the pointer's radius relative to the viewport, in pixels. Think of the pointer as a circle. The size of the pointer can vary. When the pointer is a mouse cursor, the radius is zero. When the pointer is a pair of touch points, the radius is half of the distance between each touch point. When the pointer is three or more touch points, the radius is the radius of the smallest cirlce that can enclose all three touch points.
 *

 * @remarks Notice that the coordinate space of `r` and `dr` are relative to the browser {@link https://developer.mozilla.org/en-US/docs/Web/CSS/Viewport_concepts | viewport} ... NOT the coordinate space of the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement | HTMLElement}. This is a REALLY important design choice, because it lets the radius express the distance between fingertips on a device screen, regardless of the scale of the HTMLElement being touched. For example: take an 100x100px HTMLElement that is scaled to 50% of its original width and height. This element will still be 100x100px in its coordinate space. However, it will appear to be 50x50px in the viewport. Furthermore, if you move a pointer horizontally across the HTMLElement at a speed of 10px per second relative to the viewport, the `dx` of the pointer will be 20px per second, because it's covering twice as much distance, relative to the HTMLElement, as it would be if the HTMLElement was scaled to 100%. While this scaling is very helpful for tracking the position of a pointer within an element, it would create an unhelpful feedback loop if it was applied to the pointer's radius. That's because of this codebase implements the pinch-to-zoom gesture. Pinching changes the size of the radius. The size of the radius drives the scale of the HTMLElement's coordinate space. Increasing the size of the radius increases the scale of the space, and vice versa. Because of how the HTMLElement's coordinate space can be scaled relative to the radius, the radius cannot be measured relative to the HTMLElement's coordinate space.
 */
export declare type PointerInput = MouseInput & TouchAdditionalInput;

type MouseInput = {
  readonly type: 'PointerInput' /* this is here to speed up 'handle' function*/;
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
  // need to add a duration property that tracks the duration from the start of a mouse or touch event lifecycle all the way to the end. maybe when 'touchend', 'touchcancel' or 'mouseleave' occur, then duration resets to zero?
};

type TouchAdditionalInput = {
  numberOfTouchPoints: number;
  viewport?: {
    x?: number;
    y?: number;
    radius?: number;
    dRadius?: number;
    dRotation?: number;
  };
};

export function getPointerInput(
  event: Event,
  previous?: PointerInput
): PointerInput {
  const getTarget = (): {
    width: number | false;
    height: number | false;
    getBoundingClientRect?: () => DOMRect;
    [key: string]: number | (() => DOMRect) | false | undefined;
  } => {
    if (event.target instanceof HTMLElement) {
      const ET = event.target;

      return {
        width: ET.offsetWidth,
        height: ET.offsetHeight,
        getBoundingClientRect: () => {
          return ET.getBoundingClientRect();
        },
      };
    } else {
      return {
        width: false,
        height: false,
      };
    }
  };
  const Target = getTarget();

  const previousHasSameTarget: () => boolean = () => {
    return event.target instanceof EventTarget &&
      previous &&
      previous.event.target instanceof EventTarget
      ? Object.is(event.target, previous.event.target)
      : false;
  };

  const MillisecondsElapsedSincePrevious =
    previous && previousHasSameTarget()
      ? event.timeStamp - previous.event.timeStamp
      : false;

  const getCoordinates = {
    mouse: (e: MouseEvent): PointerInput => {
      // first, we get the required properties of the PointerCoordinates type
      const Coordinates: PointerInput = {
        type: 'PointerInput',
        event: e,
        relative: {
          x: e.offsetX,
          y: e.offsetY,
        },
        numberOfTouchPoints: 0,
      };

      // then, we get all of the optional properties
      if (MillisecondsElapsedSincePrevious) {
        Coordinates.viewport = {
          dx: (e.movementX / MillisecondsElapsedSincePrevious) * 1000,
          dy: (e.movementY / MillisecondsElapsedSincePrevious) * 1000,
        };
      }

      if (Target.width) {
        Coordinates.relative.xPercent = Coordinates.relative.x / Target.width;

        if (
          Coordinates.viewport &&
          typeof Coordinates.viewport.dx === 'number'
        ) {
          Coordinates.relative.dxPercent =
            Coordinates.viewport.dx / Target.width;
        }
      }

      if (Target.height) {
        Coordinates.relative.yPercent = Coordinates.relative.y / Target.height;

        if (
          Coordinates.viewport &&
          typeof Coordinates.viewport.dy === 'number'
        ) {
          Coordinates.relative.dyPercent =
            Coordinates.viewport.dy / Target.height;
        }
      }

      return Coordinates;
    },
    touch: (e: TouchEvent): PointerInput => {
      // before we can begin, we have to get a list of touch points
      type TouchPointCoords = { viewportX: number; viewportY: number }; // todo: find out if viewportX and viewportY correspond to SCREEN or OFFSET coords (ie do they include the browser chrome in their measurements)
      type TouchPointList = {
        [id: string]: {
          previous?: TouchPointCoords;
          current: TouchPointCoords;
        };
      };

      const P = previous || false;
      const PreviousTouchEvent =
        P && P.event instanceof TouchEvent ? P.event : false;

      if (e.targetTouches.length > 0) {
        // we can short-circuit all of the following calculations if there are no touch points, because we can simply re-use `P`, the previous touch coordinates, if they are available.
        const getTouchPoints = () => {
          const TouchPoints: TouchPointList = {};

          const supportsTouchIdentifier = (): boolean => {
            // unfortunately not all browsers support Touch.identifier (see: https://developer.mozilla.org/en-US/docs/Web/API/Touch/identifier), so we need to do a litmus test before we run the for loop.
            const FirstTouch = e.targetTouches.item(0);

            return typeof FirstTouch?.identifier === 'number' ? true : false;
          };
          const DoesSupportTouchIdentifier = supportsTouchIdentifier();

          const getAllPreviousTouches = () => {
            if (PreviousTouchEvent && DoesSupportTouchIdentifier) {
              const PreviousTouches: { [id: number]: TouchPointCoords } = {};

              for (
                let Index = 0;
                Index < PreviousTouchEvent.targetTouches.length;
                Index++
              ) {
                const PreviousTouch = PreviousTouchEvent.targetTouches.item(
                  Index
                );

                if (PreviousTouch) {
                  PreviousTouches[PreviousTouch.identifier] = {
                    viewportX: PreviousTouch.clientX,
                    viewportY: PreviousTouch.clientY,
                  };
                }
              }

              return PreviousTouches;
            } else {
              return false;
            }
          };
          const PreviousTouches = getAllPreviousTouches();

          for (let Index = 0; Index < e.targetTouches.length; Index++) {
            const Touch = e.targetTouches.item(Index);

            if (Touch) {
              TouchPoints[Touch.identifier] = {
                current: {
                  viewportX: Touch.clientX,
                  viewportY: Touch.clientY,
                },
              };
              if (PreviousTouches && PreviousTouches[Touch.identifier]) {
                TouchPoints[Touch.identifier].previous =
                  PreviousTouches[Touch.identifier];
              }
            }
          }

          return TouchPoints;
        };

        const TouchPoints = getTouchPoints();

        // once we've gotten the touch points, we have to find the centerpoint. The centerpoint is the center of the smallest circle that circumscribes all of the touchpoints
        type Centerpoint = {
          viewport: {
            x: number;
            y: number;
            radius?: number;
            rotation?: number;
          };
          relative?: {
            x: number;
            y: number;
          };
        };
        const calculateTouchCenterpoint = (): Centerpoint => {
          const BoundingRect = Target.getBoundingClientRect
            ? Target.getBoundingClientRect()
            : false;

          const calculateTargetScaleAndTranslate = (): void => {
            if (
              Target.width !== false &&
              Target.height !== false &&
              BoundingRect
            ) {
              const { left, top, width, height } = BoundingRect;
              Target.viewportTranslateX = left;
              Target.viewportTranslateY = top;
              Target.scaleX = Target.width === 0 ? 0 : width / Target.width;
              Target.scaleY = Target.height === 0 ? 0 : height / Target.height;
            }
          };
          calculateTargetScaleAndTranslate();

          const TouchPointIDs = Object.keys(TouchPoints);

          const calculateRelativeXY = (C: Centerpoint): void => {
            if (
              typeof Target.scaleX === 'number' &&
              typeof Target.scaleY === 'number' &&
              typeof Target.viewportTranslateX === 'number' &&
              typeof Target.viewportTranslateY === 'number'
            ) {
              C.relative = {
                x: (C.viewport.x - Target.viewportTranslateX) * Target.scaleX,
                y: (C.viewport.y - Target.viewportTranslateY) * Target.scaleY,
              };
            }
          };

          switch (TouchPointIDs.length) {
            case 1:
              const getCenterpointOfOne = (): Centerpoint => {
                const C: Centerpoint = {
                  viewport: {
                    x: TouchPoints[TouchPointIDs[0]].current.viewportX,
                    y: TouchPoints[TouchPointIDs[0]].current.viewportY,
                  },
                };

                calculateRelativeXY(C);

                return C;
              };
              return getCenterpointOfOne();
            case 2:
            case 3: // I know that this is hacky ... right now I'm ignoring the 3rd touch point entirely ... but it'll take me another day to write the code to handle this, and I don't have that time rn.
              const getCenterpointOfTwo = (): Centerpoint => {
                const Adjacent =
                  TouchPoints[TouchPointIDs[1]].current.viewportX -
                  TouchPoints[TouchPointIDs[0]].current.viewportX;

                const Opposite =
                  TouchPoints[TouchPointIDs[1]].current.viewportY -
                  TouchPoints[TouchPointIDs[0]].current.viewportY;

                const getPreviousOppositeAdjacent = () => {
                  function isTouchPointCoords(
                    previous: TouchPointCoords | undefined
                  ): previous is TouchPointCoords {
                    if (previous) {
                      return (
                        (previous as TouchPointCoords).viewportX !==
                          undefined &&
                        (previous as TouchPointCoords).viewportY !== undefined
                      );
                    } else {
                      return false;
                    }
                  }

                  const P1 = TouchPoints[TouchPointIDs[1]].previous;
                  const P0 = TouchPoints[TouchPointIDs[0]].previous;

                  if (isTouchPointCoords(P1) && isTouchPointCoords(P0)) {
                    return {
                      PreviousAdjacent: P1.viewportX - P0.viewportX,
                      PreviousOpposite: P1.viewportY - P0.viewportY,
                    };
                  } else {
                    return false;
                  }
                };
                const PreviousAdjacentOpposite = getPreviousOppositeAdjacent();

                const C: Centerpoint = {
                  viewport: {
                    x:
                      (TouchPoints[TouchPointIDs[0]].current.viewportX +
                        TouchPoints[TouchPointIDs[1]].current.viewportX) /
                      2,
                    y:
                      (TouchPoints[TouchPointIDs[0]].current.viewportY +
                        TouchPoints[TouchPointIDs[1]].current.viewportY) /
                      2,
                    radius: (Adjacent ** 2 + Opposite ** 2) ** 0.5 / 2,
                  },
                };

                const calculateRotation = (): void => {
                  if (PreviousAdjacentOpposite) {
                    const {
                      PreviousAdjacent,
                      PreviousOpposite,
                    } = PreviousAdjacentOpposite;

                    const getSlopeInDegrees = (
                      Adjacent: number,
                      Opposite: number
                    ) => {
                      if (Adjacent === 0) {
                        // then slope is either 90 degrees or 270 degrees
                        if (Opposite === 0) {
                          // then there is no slope. Assume zero degrees.
                          return 0;
                        } else if (Opposite < 0) {
                          return 270;
                        } else {
                          return 90;
                        }
                      } else {
                        const Atan = Math.atan(Opposite / Adjacent);
                        if (Adjacent < 0) {
                          // then slope is between 90 and 270 degrees
                          if (Atan === 0) {
                            return 180;
                          } else {
                            // then slope is between 90 and 270 degrees
                            return 180 + (180 / Math.PI) * Atan;
                          }
                        } else {
                          // then slope is between 0 and 90 degrees or 270 and 360 degrees
                          if (Atan === 0) {
                            return 0;
                          } else if (Atan > 0) {
                            // then slope is between 0 and 90 degrees
                            return (180 / Math.PI) * Atan;
                            // return 45; // correct
                          } else {
                            return 360 + (180 / Math.PI) * Atan;
                          }
                        }
                      }
                    };

                    const Slope = getSlopeInDegrees(Adjacent, Opposite);
                    const PreviousSlope = getSlopeInDegrees(
                      PreviousAdjacent,
                      PreviousOpposite
                    );
                    C.viewport.rotation = Slope - PreviousSlope;
                  }
                };
                calculateRotation();

                calculateRelativeXY(C);

                return C;
              };
              return getCenterpointOfTwo();
            // case 3:
            // do something else
            // const getCenterpointOfThree = (): Centerpoint => {};
            // return getCenterpointOfThree();
            default:
              throw new Error(
                `I haven't implemented the smallest-enclosing-circle algorithm yet. Once I do, I will be able to calculate the centerpoint of a TouchEvent with ${
                  Object.keys(TouchPoints).length
                } touch points.`
              );
          }
        };

        const { viewport, relative } = calculateTouchCenterpoint();

        // Finally, we populate and return the coordinates object
        const Coordinates: PointerInput = {
          type: 'PointerInput',
          event: e,
          relative: relative
            ? { x: relative.x, y: relative.y }
            : { x: viewport.x, y: viewport.y },
          numberOfTouchPoints: e.targetTouches.length,
        };

        const Viewport: {
          x: number;
          y: number;
          [key: string]: number;
        } = {
          x: viewport.x,
          y: viewport.y,
        };

        if (
          typeof Target.width === 'number' &&
          typeof Target.height === 'number' &&
          relative
        ) {
          Coordinates.relative.xPercent = relative.x / Target.width;
          Coordinates.relative.yPercent = relative.y / Target.height;

          if (
            previous &&
            previous.viewport &&
            MillisecondsElapsedSincePrevious
          ) {
            if (previous.viewport.x) {
              const MovementX = viewport.x - previous.viewport.x;

              Viewport.dx =
                (MovementX / MillisecondsElapsedSincePrevious) * 1000;
              Coordinates.relative.dxPercent = Viewport.dx / Target.width;
            }
            if (previous.viewport.y) {
              const MovementY = viewport.y - previous.viewport.y;

              Viewport.dy =
                (MovementY / MillisecondsElapsedSincePrevious) * 1000;
              Coordinates.relative.dyPercent = Viewport.dy / Target.height;
            }
          }
        }

        if (viewport.radius) {
          Viewport.radius = viewport.radius;
          if (previous && previous.viewport && previous.viewport.radius) {
            Viewport.dRadius = viewport.radius - previous.viewport.radius;
          }
        }

        if (viewport.rotation && MillisecondsElapsedSincePrevious) {
          Viewport.dRotation =
            (viewport.rotation / MillisecondsElapsedSincePrevious) * 1000;
        }

        Coordinates.viewport = Viewport;

        return Coordinates;
      } else {
        if (P) {
          const Coordinates: PointerInput = {
            type: 'PointerInput',
            event: e,
            relative: {
              x: P.relative.x,
              y: P.relative.y,
              dxPercent: 0,
              dyPercent: 0,
            },
            viewport: {
              dx: 0,
              dy: 0,
            },
            numberOfTouchPoints: 0,
          };

          if (typeof P.relative.xPercent === 'number') {
            Coordinates.relative.xPercent = P.relative.xPercent;
          }
          if (typeof P.relative.yPercent === 'number') {
            Coordinates.relative.yPercent = P.relative.yPercent;
          }
          if (P.viewport && Coordinates.viewport) {
            if (typeof P.viewport.x === 'number') {
              Coordinates.viewport.x = P.viewport.x;
            }
            if (typeof P.viewport.y === 'number') {
              Coordinates.viewport.y = P.viewport.y;
            }
          }
          if (
            P.viewport &&
            typeof P.viewport.radius === 'number' &&
            Coordinates.viewport
          ) {
            Coordinates.viewport.radius = P.viewport.radius;
          }
          return Coordinates;
        } else {
          throw new Error(
            'a touchend or touchcancel event always follows a touchstart or touchmove event. Please supply the PointerCoordinates for the touchstart or touchmove event to the touchend and touchcancel event listener'
          );
        }
      }
    },
  };

  if (event instanceof MouseEvent) {
    return getCoordinates.mouse(event);
  } else if (event instanceof TouchEvent) {
    return getCoordinates.touch(event);
  } else {
    throw new Error(`${event} is not a MouseEvent or TouchEvent`);
  }
}
