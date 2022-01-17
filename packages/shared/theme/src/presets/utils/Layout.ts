import { StyleFactory, Shape, Tint, State, RGBA } from '.';

// Todo: maybe make a helper class called 'Layout' which implements LayoutInterface.

/**
 * LayoutInterface contains a {@link StyleFactory} for each of the styles in a given layout.
 *
 */
export interface LayoutInterface {
  text: {
    [textName: string]: StyleFactory;
  };
  fill: {
    [fillName: string]: StyleFactory;
  };
  bg: {
    [bgName: string]: StyleFactory;
  };
  tints: Array<
    string | 'none' | 'active' | 'progress' | 'warn' | 'fail'
  > /* this should be keyof Tint<RGBA> but typescript won't accept it */;
  states: Array<
    | 'none'
    | 'hovered'
    | 'pressed'
    | 'toggled'
    | 'toggledHovered'
    | 'toggledPressed'
    | 'focused'
  > /* this should be keyof State but typescript won't accept it */;
}
