import { StyleFactory } from '.';

/**
 * Layout contains the {@link StyleGenerator}s needed to define a layout within a {@link Platform}
 * @remarks
 *
 * Use this class to hold the {@link StyleGenerator}s for the text, foreground fill and background fill of a layout.
 *
 * * Don't use this class to generate styles. It only does anything meaningful when it is injected into the {@link Layout} class.
 *
 * * This class keeps track of all of the {@link StyleGenerator} methods you supply it.
 *
 * * This class doesn't have any meaningful behaviors of its own. All it really does is pass the {@link ColorPalette} objects from the {@link Platform} class into each of the {@link StyleGenerator} functions that it contains. This class doesn't do anything until you plug it into the {@link Platform} class, which will in turn generate an object that you need to plug into the {@link platform} method of the {@link Theme} class.
 *
 * * Don't extend this class, because its current implementation is tightly coupled to the {@link Platform} class.
 *
 * * When you plug Layout into {@link Platform}, {@link Platform} inserts a set of {@link ColorPalette}s into it. Layout will appply the colors that you select from the palette.
 *
 * @example
 * ```typescript
 * const L = new Layout('layoutMediumWithItem');
 *
 * // define a text style generator for the layout
 * L.addText('body' (P: ColorPalette, tint?: string) => {
 *  return {
 *    'font-size': 1rem,
 *    'font-family': 'Proxima Nova',
 *    'color': P.text.body,
 *  }
 * });
 *
 * // define a foreground style generator for the layout
 * L.addFG('floating', (P: ColorPalette, tint?: string)=>{
 *  return {
 *    'background-color': P.fill.floating[tint] ? P.fill.floating[tint].fill : P.fill.floating.default.fill,
 *    'border-radius': P.fill.floating[tint] ? P.fill.floating[tint].borderRadius : P.fill.floating.default.borderRadius,
 *    'border-width': P.fill.floating[tint] ? P.fill.floating[tint].borderWidth : P.fill.floating.default.borderWidth,
 *    'min-width': 6rem,
 *    'min-height': 4rem,
 *    'display': 'flex',
 *  }
 * });
 * ```
 */
export class Layout implements LayoutInterface {
  // !Static Methods

  // !Private (and/or readonly) Properties
  #name: string;
  #textStyleGenerators: Map<string, StyleFactory> = new Map();
  #foregroundStyleGenerators: Map<string, StyleFactory> = new Map();
  #backgroundStyleGenerators: Map<string, StyleFactory> = new Map();

  // !Constructor Function
  constructor(nameOfLayout: string) {
    this.#name = nameOfLayout;
  }

  // !Getters and Setters
  get name(): string {
    return this.#name;
  }

  get text(): { [textStyleName: string]: StyleFactory } {
    return Object.fromEntries(this.#textStyleGenerators);
  }

  get fill(): {
    foreground: { [fillName: string]: StyleFactory };
    background: { [fillName: string]: StyleFactory };
  } {
    return {
      foreground: Object.fromEntries(this.#foregroundStyleGenerators),
      background: Object.fromEntries(this.#backgroundStyleGenerators),
    };
  }

  // !Public Instance Methods
  addText(): void {
    throw new Error('not implemented');
  }

  addFG(): void {}

  addBG(): void {}

  // !Private Subroutines
}

export interface LayoutInterface {}
