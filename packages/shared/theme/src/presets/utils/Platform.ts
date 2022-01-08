import {
  Layout,
  ColorPalette,
  LayoutInterface,
  ColorPaletteInterface,
  RGBA,
} from '.';

/**
 * Platform contains all of the methods needed to generate styles for a particular platform.
 * @remarks
 *
 * Use the setters in this class to set the styles for your own platform. Use the {@link options} getter to generate an options object that you can feed into the {@link platform} static method of the {@link Theme} class.
 *
 * * Don't use this class to make a theme that looks just like iOS, MacOS, tvOS, Android, Windows, GTK (linux), or Bootstrap 5 (web). Those themes are already built into the {@link Theme} class.
 *
 * * This class contains a minimum of two {@link ColorPalette} objects: one for the platform's light mode, and another for the platform's dark mode. It also contains an array of {@link Layout} objects, each of which describes the styles needed to arrange and color the text and fill for a particular layout.
 *
 * * This class relies on dependency injection to do anything meaningful. You need to inject the {@link Layout}s you want to use. This class provides the fonts and colors that are common to all layouts, while the layouts provide the sizes and positions of text and fills.
 *
 * * Don't extend this class. It is tightly coupled to the {@link Layout} class.
 *
 * * How does the code in this class work?
 *
 * @example
 * ```typescript
 *  const P = new Platform()
 *  const L = new Layout(Theme.layouts.small)
 *
 *  //inject a layout into platform
 *  P.addLayout(L);
 * ```
 *
 */
export class Platform implements PlatformInterface {
  // !Static Methods

  // !Private (and/or readonly) Properties
  #layouts: Map<string, Layout | null> = new Map();
  #palettes: Map<string, ColorPalette> = new Map();

  // !Constructor Function
  constructor(
    colorPalettes: {
      dark: ColorPalette;
      light: ColorPalette;
      [paletteName: string]: ColorPalette;
    },
    layouts: Layout[]
  ) {
    /* at a minimum, ALL platform objects MUST contain a layout for each of Theme.Layouts */
    // for (const L of Object.values(Theme.layouts)) {
    //   this.#layouts.set(L, null); /* stub an empty layout */
    // }
    for (const layout of layouts) {
      const L = layout.name;
      this.#layouts.set(L, layout);
    }
    for (const paletteName in Object.keys(colorPalettes)) {
      this.#palettes.set(paletteName, colorPalettes[paletteName]);
    }
    if (this.#palettes.get('dark') === undefined) {
      throw new Error('dark palette is undefined');
    }
    if (this.#palettes.get('light') === undefined) {
      throw new Error('light palette is undefined');
    }
    /* at a minimum, ALL platform objects MUST contain a dark ColorPalette and a light ColorPalette */
  }

  // !Getters and Setters
  get layouts(): {
    inline: LayoutInterface;
    small: LayoutInterface;
    smallVertical: LayoutInterface;
    smallWithInline: LayoutInterface;
    smallWithItemLeft: LayoutInterface;
    smallWithItemRight: LayoutInterface;
    medium: LayoutInterface;
    mediumVertical: LayoutInterface;
    large: LayoutInterface;
    massive: LayoutInterface;
    [layout: string]: LayoutInterface;
  } {
    throw new Error('not implemented');
    // const L = Object.fromEntries(this.#layouts);
    // const MissingKeys = [];
    // for (const key of Object.keys(L)) {
    //   if (L[key] === null) MissingKeys.push(key);
    // }
    // if (MissingKeys.length > 0)
    //   throw new Error(
    //     `The following layouts are missing from this platform: ${MissingKeys.join(
    //       ', '
    //     )}`
    //   );
    // return L as { [layoutName: string]: Layout };
  }

  get colorPalettes(): {
    dark: ColorPalette;
    light: ColorPalette;
    [paletteName: string]: ColorPalette;
  } {
    throw new Error('not implemented');
    // return Object.fromEntries(this.#palettes) as {
    //   dark: ColorPalette;
    //   light: ColorPalette;
    //   [paletteName: string]: ColorPalette;
    // }; /* the constructor WILL enforce this type cast */
  }

  // !Public Instance Methods
  addLayout(layout: Layout): void {
    this.#layouts.set(layout.name, layout);
  }

  // !Private Subroutines
}

export interface PlatformInterface {
  layouts: {
    inline: LayoutInterface;
    small: LayoutInterface;
    smallVertical: LayoutInterface;
    smallWithInline: LayoutInterface;
    smallWithItemLeft: LayoutInterface;
    smallWithItemRight: LayoutInterface;
    medium: LayoutInterface;
    mediumVertical: LayoutInterface;
    large: LayoutInterface;
    massive: LayoutInterface;
    [layout: string]: LayoutInterface;
  };
  colorPalettes: {
    light: ColorPaletteInterface<RGBA>;
    dark: ColorPaletteInterface<RGBA>;
    [palette: string]: ColorPaletteInterface<RGBA>;
  };
}
