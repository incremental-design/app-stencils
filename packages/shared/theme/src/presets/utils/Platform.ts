import { LayoutInterface, ColorPaletteInterface, RGBA } from '.';

// todo: maybe make a helper class called 'Platform' which implements PlatformInterface.

export interface PlatformInterface {
  layouts: {
    inline: LayoutInterface;
    small: LayoutInterface;
    smallVertical: LayoutInterface;
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
