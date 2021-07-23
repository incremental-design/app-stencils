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

type MouseCoordinates = {
  x: number;
  y: number;
  xPercent?: number;
  yPercent?: number;
  dx?: number;
  dy?: number;
  dxPercent?: number;
  dyPercent?: number;
};

type TouchAdditionalCoordinates = {
  numberOfTouchPoints: number;
  radiusViewport?: number;
  dRadiusViewport?: number;
  dRotationViewport?: number;
};

export declare type PointerCoordinates = MouseCoordinates &
  TouchAdditionalCoordinates;

export function getPointerCoordinates(
  event: Event,
  previous?: Event
): PointerCoordinates {
  // type Return = {
  //   x: number;
  //   y: number;
  //   rViewport: number;
  //   [key: string]: number;
  // };

  const Target: {
    width: number | false;
    height: number | false;
    [key: string]: number | false;
  } =
    event.target instanceof HTMLElement
      ? {
          width: event.target.scrollWidth,
          height: event.target.scrollHeight,
        }
      : { width: false, height: false }; // notice that we are getting scrollWidth and scrollHeight instead of offsetWidth and offsetHeight. That's because scrollWidth and scrollHeight don't change if the target overflows its container.

  const previousHasSameTarget: () => boolean = () => {
    return event.target instanceof EventTarget &&
      previous &&
      previous.target instanceof EventTarget
      ? Object.is(event.target, previous.target)
      : false;
  };

  const MillisecondsElapsedSincePrevious =
    previous && previousHasSameTarget()
      ? event.timeStamp - previous.timeStamp
      : false;

  const getCoordinates = {
    mouse: (e: MouseEvent): PointerCoordinates => {
      // first, we get the required properties of the PointerCoordinates type
      const Coordinates: PointerCoordinates = {
        x: e.offsetX,
        y: e.offsetY,
        numberOfTouchPoints: 0,
      };

      // then, we get all of the optional properties
      if (MillisecondsElapsedSincePrevious) {
        Coordinates.dy =
          (e.movementX / MillisecondsElapsedSincePrevious) * 1000;
        Coordinates.dx =
          (e.movementY / MillisecondsElapsedSincePrevious) * 1000;
      }

      if (Target.width) {
        Coordinates.xPercent = Coordinates.x / Target.width;
        if (Coordinates.dx) {
          Coordinates.dxPercent = Coordinates.dx / Target.width;
        }
      }

      if (Target.height) {
        Coordinates.yPercent = Coordinates.y / Target.height;
        if (Coordinates.dy) {
          Coordinates.dyPercent = Coordinates.dy / Target.height;
        }
      }

      return Coordinates;
    },
    touch: (e: TouchEvent): PointerCoordinates => {
      // first, we get the required properties of the PointerCoordinates type
      const Coordinates: PointerCoordinates = {
        x: 0,
        y: 0,
        numberOfTouchPoints: 0,
      };

      return Coordinates;
    },
  };

  //   const getTouchCoordinates = (e: TouchEvent) => {
  //     const getTargetBounds = (): void => {
  //       const ElementBoundingRect =
  //         event.target instanceof HTMLElement
  //           ? event.target.getBoundingClientRect()
  //           : false;
  //
  //       if (ElementBoundingRect) {
  //         Target.viewportLeft = ElementBoundingRect.left;
  //         Target.viewportTop = ElementBoundingRect.top;
  //
  //         Target.viewportWidth = ElementBoundingRect.width;
  //         Target.viewportHeight = ElementBoundingRect.height;
  //
  //         if (Target.width) {
  //           Target.scaleX = Target.viewportWidth / Target.width;
  //         }
  //
  //         if (Target.height) {
  //           Target.scaleY = Target.viewportHeight / Target.height;
  //         }
  //       }
  //     };
  //     getTargetBounds();
  //
  //     const TouchPoints = e.targetTouches;
  //
  //     const TouchPointCoordinates: Array<Array<number>> = []; // 2D array is more efficient than nested object
  //
  //     for (let Index = 0; Index < TouchPoints.length; Index++) {
  //       const TouchPoint = TouchPoints.item(Index);
  //
  //       if (TouchPoint) {
  //         TouchPointCoordinates.push([TouchPoint.clientX, TouchPoint.clientY]); // notice that we are using `clientX` and `clientY` ... NOT `pageX` and `pageY`, or `screenX` and `screenY`. This is a very important distinction. See: https://developer.mozilla.org/en-US/docs/Web/API/Touch#browser_compatibility
  //       }
  //     }
  //
  //     let CenterpointX: number;
  //     let CenterpointY: number;
  //     let RViewport: number;
  //
  //     const calculateRelativeX = (TouchX: number) => {
  //       // TouchX will be the `clientX` of the Touch item
  //       if (ElementBoundingRect && ScaleX) {
  //         return (TouchX - ElementBoundingRect.left) / ScaleX;
  //       } else {
  //         return TouchX; // in the case that the HTML element has no scale or no bounding rect, just return the original TouchX, which is relative to the viewport.
  //       }
  //     };
  //     const calculateRelativeY = (TouchY: number) => {
  //       // TouchY will be the `clientY` of the Touch item
  //       if (ElementBoundingRect && ScaleY) {
  //         return (TouchY - ElementBoundingRect.left) / ScaleY;
  //       } else {
  //         return TouchY; // in the case that the HTML element has no scale or no bounding rect, just return the original TouchY, which is relative to the viewport.
  //       }
  //     };
  //
  //     const getDistanceBetween = (
  //       X1: number,
  //       Y1: number,
  //       X2: number,
  //       Y2: number
  //     ) => {
  //       const DX = X2 - X1;
  //       const DY = Y2 - Y1;
  //       return Math.sqrt(DX ** 2 + DY ** 2);
  //     };
  //
  //     const NumberOfTouchPoints = TouchPointCoordinates.length;
  //
  //     switch (NumberOfTouchPoints) {
  //       case 0:
  //         throw new Error(
  //           'it should be impossible to have a touch event with no touch points'
  //         );
  //       case 1:
  //         RViewport = 0; // by definition, the radius of a pointer with only one touch point is zero.
  //         CenterpointX = calculateRelativeX(TouchPointCoordinates[0][0]);
  //         CenterpointY = calculateRelativeY(TouchPointCoordinates[0][1]);
  //         break;
  //       case 2:
  //         RViewport =
  //           getDistanceBetween(
  //             TouchPointCoordinates[0][0],
  //             TouchPointCoordinates[0][1],
  //             TouchPointCoordinates[1][0],
  //             TouchPointCoordinates[1][1]
  //           ) / 2;
  //         CenterpointX = calculateRelativeX(
  //           (TouchPointCoordinates[1][0] + TouchPointCoordinates[0][0]) / 2
  //         );
  //         CenterpointY = calculateRelativeY(
  //           (TouchPointCoordinates[1][1] + TouchPointCoordinates[0][1]) / 2
  //         );
  //         break;
  //       default:
  //         throw new Error(
  //           `I have not implemented a way to find the centerpoint and radius for more than two touch points`
  //         );
  //     }
  //
  //     const Coordinates: Return = {
  //       x: CenterpointX,
  //       y: CenterpointY,
  //       rViewport: RViewport,
  //     };
  //   };

  if (event instanceof MouseEvent) {
    return getCoordinates.mouse(event);
  } else if (event instanceof TouchEvent) {
    return getCoordinates.touch(event);
  } else {
    throw new Error(`${event} is not a MouseEvent or TouchEvent`);
  }
}
