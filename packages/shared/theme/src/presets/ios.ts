import {
  RGBA,
  hexAlphaToRGBA as HR,
  Elevation,
  Font,
  FontAlign,
  FontVerticalAlign,
} from '.';

export const ios = {
  layouts: {},
  colorPalettes: {
    light: {
      fill: {
        background: {
          modal: {},
          floating: {},
          primary: {},
          secondary: {},
          tertiary: {},
        },
        foreground: {
          primary: {},
          secondary: {},
        },
      },
      text: {},
    },
    dark: {},
  },
};

const Colors = {
  cFFFFFF: {
    a100: HR('FFFFFF', 100),
  },
  c191919: {
    a007: HR('191919', 7),
  },
  cF4F4F7: {
    a100: HR('F4F4F7', 100),
  },
  cEFEFEF: {
    a100: HR('EFEFEF', 100),
    a070: HR('EFEFEF', 70),
    a040: HR('EFEFEF', 40),
    a015: HR('EFEFEF', 15),
    a010: HR('EFEFEF', 10),
  },
  c009AF2: {
    a016: HR('009AF2', 16),
  },
  c001927: {
    a100: HR('001927', 100),
    a070: HR('001927', 70),
    a015: HR('001927', 15),
    a010: HR('001927', 10),
  },
  c000000: {
    a100: HR('000000', 100),
    a070: HR('000000', 70),
    a040: HR('000000', 40),
    a030: HR('000000', 30), // is this even used?
    a015: HR('000000', 15),
    a004: HR('000000', 4),
  },
  c1BA1E5: {
    a070: HR('1BA1E5', 70),
    a100: HR('1BA1E5', 100),
  },
  c004D6F: {
    a100: HR('004D6F', 100),
    a070: HR('004D6F', 70),
  },
  c1ABD5E: {
    a010: HR('1ABD5E', 10),
    a020: HR('1ABD5E', 20),
    a070: HR('1ABD5E', 70),
    a100: HR('1ABD5E', 100),
  },
  c016557: {
    a100: HR('016557', 100),
    a070: HR('016557', 70),
  },
  cB05200: {
    a020: HR('B05200', 20),
  },
  cDE6700: {
    a010: HR('DE6700', 10),
    a020: HR('DE6700', 20),
    a070: HR('DE6700', 70),
    a100: HR('DE6700', 100),
  },
  c9B1700: {
    a100: HR('9B1700', 100),
    a070: HR('9B1700', 70),
  },
  cCBA12D: {
    a010: HR('CBA12D', 10),
    a012: HR('CBA12D', 18),
    a018: HR('CBA12D', 18),
    a025: HR('CBA12D', 25),
    a100: HR('CBA12D', 100),
  },
  cF5BF00: {
    a100: HR('F5BF00', 100),
    a070: HR('F5BF00', 70),
  },
  c6D5100: {
    a100: HR('6D5100', 100),
    a070: HR('6D5100', 70),
  },
};

const ForegroundPrimaryElevations: { [elevation: string]: Elevation<RGBA> } = {
  foregroundPrimaryBlue: {
    fill: [
      {
        color: Colors.c1BA1E5.a100,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [],
  },
  foregroundPrimaryGreen: {
    fill: [
      {
        color: Colors.c1ABD5E.a100,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [],
  },
  foregroundPrimaryYellow: {
    fill: [
      {
        color: Colors.cF5BF00.a100,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [],
  },
  foregroundPrimaryOrange: {
    fill: [
      {
        color: Colors.cDE6700.a100,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [],
  },
  foregroundPrimaryDefaultDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a040,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [],
  },
  foregroundPrimaryDefaultLight: {
    fill: [
      {
        color: Colors.cFFFFFF.a100,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [],
  },
};

const ForegroundSecondaryElevations: {
  [elevation: string]: Elevation<RGBA>;
} = {
  foregroundSecondaryBlue: {
    fill: [
      {
        color: Colors.c1BA1E5.a070,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  foregroundSecondaryGreen: {
    fill: [
      {
        color: Colors.c1ABD5E.a070,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  foregroundSecondaryYellow: {
    fill: [
      {
        color: Colors.cF5BF00.a070,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  foregroundSecondaryOrange: {
    fill: [
      {
        color: Colors.cDE6700.a070,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  foregroundSecondaryDefaultDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a040,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  foregroundSecondaryDefaultLight: {
    fill: [
      {
        color: Colors.cEFEFEF.a100,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
};

const backgroundPrimaryElevation: { [elevation: string]: Elevation<RGBA> } = {
  backgroundPrimaryDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a015,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundPrimaryLight: {
    fill: [
      {
        color: Colors.c001927.a015,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
};

const backgroundSecondaryElevation: { [elevation: string]: Elevation<RGBA> } = {
  backgroundSecondaryDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a015,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundSecondaryLight: {
    fill: [
      {
        color: Colors.c001927.a015,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
};

const backgroundTertiaryElevation: { [elevation: string]: Elevation<RGBA> } = {
  backgroundTertiaryGreen: {
    fill: [
      {
        color: Colors.c1ABD5E.a010,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundTertiaryOrange: {
    fill: [
      {
        color: Colors.cDE6700.a010,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundTertiaryYellow: {
    fill: [
      {
        color: Colors.cCBA12D.a018,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundTertiaryDefaultDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a010,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundTertiaryDefaultLight: {
    fill: [
      {
        color: Colors.c191919.a007,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
};

const PopoverElevation: { [elevation: string]: Elevation<RGBA> } = {
  PopoverDark: {
    fill: [
      {
        color: Colors.c001927.a070,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [
      {
        y: 10,
        blur: 100,
        color: Colors.c000000.a030,
      },
    ],
  },
  PopoverLight: {
    fill: [
      {
        color: Colors.cEFEFEF.a070,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [
      {
        y: 10,
        blur: 100,
        color: Colors.c000000.a030,
      },
    ],
  },
};

const FloatingElevation: { [elevation: string]: Elevation<RGBA> } = {
  floatingDark: {
    fill: [
      {
        color: Colors.c009AF2.a016,
        bgBlur: {
          radius: 40,
        },
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [
      {
        blur: 16,
        spread: 0,
        color: Colors.c000000.a015,
      },
      {
        y: 3,
        blur: 1,
        spread: 0,
        color: Colors.c000000.a004,
      },
    ],
  },
  floatingLight: {
    fill: [
      {
        color: Colors.cEFEFEF.a070,
        bgBlur: {
          radius: 30,
          saturation: 0.5,
        },
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [
      {
        spread: 0,
        blur: 16,
        color: Colors.c000000.a015,
      },
      {
        blur: 2,
        y: 1,
        color: Colors.c000000.a004,
      },
    ],
  },
};

const TactileElevation: { [elevation: string]: Elevation<RGBA> } = {
  TactileDark: {
    fill: [
      {
        color: Colors.c009AF2.a016,
        bgBlur: {
          radius: 40,
        },
      },
    ],
    innerShadow: [],
    stroke: [
      {
        offset: 'outer',
        color: Colors.c000000.a004,
        width: 0.5,
      },
    ],
    dropShadow: [
      {
        blur: 8,
        color: Colors.c000000.a015,
      },
      {
        blur: 1,
        y: 3,
        color: Colors.c000000.a004,
      },
    ],
  },
  TactileLight: {
    fill: [
      {
        color: Colors.cEFEFEF.a070,
        bgBlur: {
          radius: 30,
          saturation: 0.5,
        },
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        width: 0.5,
        offset: 'outer',
      },
    ],
    dropShadow: [
      {
        blur: 8,
        color: Colors.c000000.a015,
      },
      {
        y: 3,
        blur: 1,
        color: Colors.c000000.a004,
      },
    ],
  },
  TactileKnob: {
    fill: [
      {
        color: Colors.cFFFFFF.a100,
      },
    ],
    innerShadow: [],
    stroke: [
      {
        color: Colors.c000000.a004,
        offset: 'outer',
        width: 0.5,
      },
    ],
    dropShadow: [
      {
        y: 3,
        blur: 8,
        color: Colors.c000000.a015,
      },
      {
        y: 3,
        blur: 1,
        color: Colors.c000000.a004,
      },
    ],
  },
};

const TypefaceFallback = ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'];

const SFPR /* (SF) (P)ro (R)ounded */ = [
  'SF Pro Rounded',
  'SF Pro Icons',
  ...TypefaceFallback,
];

const SFPT /* (SF) (P)ro (T)ext */ = [
  'SF Pro Text',
  'SF Pro Icons',
  ...TypefaceFallback,
];

const FontMassiveBG = {
  typeface: SFPR,
  size: 56,
  weight: 600,
  tracking: 0.3,
  leading: 66,
  align: FontAlign.center,
  verticalAlign: FontVerticalAlign.top,
};

const FontMassiveTitle = {
  typeface: SFPR,
  size: 56,
  weight: 300,
  tracking: 0.3,
  leading: 66,
  align: FontAlign.left,
  verticalAlign: FontVerticalAlign.top,
};

const FontLargeTitle = {
  typeface: SFPR,
  size: 38,
  weight: 300,
  tracking: 0.37,
  leading: 44,
  align: FontAlign.left,
  verticalAlign: FontVerticalAlign.top,
};

const FontHeadline = {
  typeface: SFPT,
  size: 17,
  weight: 600,
  align: FontAlign.left,
  verticalAlign: FontVerticalAlign.top,
  tracking: -0.43,
  leading: 22,
};

const FontBody = {
  typeface: SFPT,
  size: 17,
  weight: 400,
  align: FontAlign.left,
  verticalAlign: FontVerticalAlign.top,
  tracking: -0.43,
  leading: 22,
};

const FontSubhead = {
  typeface: SFPT,
  size: 15,
  weight: 400,
  tracking: -0.23,
  leading: 20,
  align: FontAlign.left,
  verticalAlign: FontVerticalAlign.top,
};

const FontFootnote = {
  typeface: SFPT,
  size: 13,
  weight: 400,
  tracking: -0.08,
  leading: 18,
  verticalAlign: FontVerticalAlign.top,
};

const FontFootnoteTiny = {
  typeface: SFPT,
  size: 9.5,
  tracking: 0.17,
  leading: 11,
  verticalAlign: FontVerticalAlign.top,
  weight: 600,
};

const Fonts: { [font: string]: Font<RGBA> } = {
  massiveBGDarkDefault: { ...FontMassiveBG, color: Colors.cEFEFEF.a010 },
  fontMassiveBGDarkGreen: { ...FontMassiveBG, color: Colors.c1ABD5E.a010 },
  fontMassiveBGDarkYellow: { ...FontMassiveBG, color: Colors.cCBA12D.a012 },
  fontMassiveBGDarkOrange: { ...FontMassiveBG, color: Colors.cDE6700.a010 },
  fontMassiveBGLightDefault: { ...FontMassiveBG, color: Colors.c001927.a010 },
  fontMassiveBGLightGreen: { ...FontMassiveBG, color: Colors.c1ABD5E.a020 },
  fontMassiveBGLightYellow: { ...FontMassiveBG, color: Colors.cCBA12D.a025 },
  fontMassiveBGLightOrange: { ...FontMassiveBG, color: Colors.cDE6700.a020 },
  MassiveTitleDarkHovered: {
    ...FontMassiveTitle,
    color: Colors.cEFEFEF.a100,
  },
  massiveTitleDarkNotHovered: {
    ...FontMassiveTitle,
    color: Colors.cEFEFEF.a070,
  },
  massiveTitleLightHovered: {
    ...FontMassiveTitle,
    color: Colors.c001927.a100,
  },
  massiveTitleLightNotHovered: {
    ...FontMassiveTitle,
    color: Colors.c001927.a070,
  },
  largeTitleDarkHovered: { ...FontLargeTitle, color: Colors.cEFEFEF.a100 },
  largeTitleDarkNotHovered: {
    ...FontLargeTitle,
    color: Colors.cEFEFEF.a070,
  },
  largeTitleLightHovered: { ...FontLargeTitle, color: Colors.c001927.a100 },
  largeTitleLightNotHovered: {
    ...FontLargeTitle,
    color: Colors.c001927.a070,
  },
  largeTitleAccentDefaultDarkHovered: {
    ...FontLargeTitle,
    color: Colors.c1BA1E5.a100,
  },
  largeTitleAccentDefaultDarkNotHovered: {
    ...FontLargeTitle,
    color: Colors.c1BA1E5.a070,
  },
  largeTitleAccentDefaultLightHovered: {
    ...FontLargeTitle,
    color: Colors.c004D6F.a100,
  },
  largeTitleAccentDefaultLightNotHovered: {
    ...FontLargeTitle,
    color: Colors.c004D6F.a070,
  },
  largeTitleAccentGreenDarkHovered: {
    ...FontLargeTitle,
    color: Colors.c1ABD5E.a100,
  },
  largeTitleAccentGreenDarkNotHovered: {
    ...FontLargeTitle,
    color: Colors.c1ABD5E.a070,
  },
  largeTitleAccentGreenLightHovered: {
    ...FontLargeTitle,
    color: Colors.c016557.a100,
  },
  largeTitleAccentGreenLightNotHovered: {
    ...FontLargeTitle,
    color: Colors.c016557.a070,
  },
  largeTitleAccentYellowDarkHovered: {
    ...FontLargeTitle,
    color: Colors.cF5BF00.a100,
  },
  largeTitleAccentYellowDarkNotHovered: {
    ...FontLargeTitle,
    color: Colors.cF5BF00.a070,
  },
  largeTitleAccentYellowLightHovered: {
    ...FontLargeTitle,
    color: Colors.c6D5100.a100,
  },
  largeTitleAccentYellowLightNotHovered: {
    ...FontLargeTitle,
    color: Colors.c6D5100.a070,
  },
  largeTitleAccentOrangeDarkHovered: {
    ...FontLargeTitle,
    color: Colors.cDE6700.a100,
  },
  largeTitleAccentOrangeDarkNotHovered: {
    ...FontLargeTitle,
    color: Colors.cDE6700.a070,
  },
  largeTitleAccentOrangeLightHovered: {
    ...FontLargeTitle,
    color: Colors.c9B1700.a100,
  },
  largeTitleAccentOrangeLightNotHovered: {
    ...FontLargeTitle,
    color: Colors.c9B1700.a070,
  },
  headlineDarkHovered: { ...FontHeadline, color: Colors.cEFEFEF.a070 },
  headlineDarkNotHovered: { ...FontHeadline, color: Colors.cEFEFEF.a040 },
  headlineLightHovered: { ...FontHeadline, color: Colors.c000000.a070 },
  headlineLightNotHovered: { ...FontHeadline, color: Colors.c001927.a070 },
  bodyDarkHovered: { ...FontBody, color: Colors.cFFFFFF.a100 },
  bodyDarkNotHovered: { ...FontBody, color: Colors.cEFEFEF.a070 },
  bodyLightHovered: { ...FontBody, color: Colors.c001927.a100 },
  bodyLightNotHovered: { ...FontBody, color: Colors.c001927.a070 },
  bodyAccentDefaultDarkHovered: { ...FontBody, color: Colors.c1BA1E5.a100 },
  bodyAccentDefaultDarkNotHovered: { ...FontBody, color: Colors.c1BA1E5.a070 },
  bodyAccentDefaultLightHovered: { ...FontBody, color: Colors.c004D6F.a100 },
  bodyAccentDefaultLightNotHovered: { ...FontBody, color: Colors.c004D6F.a070 },
  bodyAccentGreenDarkHovered: { ...FontBody, color: Colors.c1ABD5E.a100 },
  bodyAccentGreenDarkNotHovered: { ...FontBody, color: Colors.c1ABD5E.a070 },
  bodyAccentGreenLightHovered: { ...FontBody, color: Colors.c016557.a100 },
  bodyAccentGreenLightNotHovered: { ...FontBody, color: Colors.c016557.a070 },
  bodyAccentYellowDarkHovered: { ...FontBody, color: Colors.cF5BF00.a100 },
  bodyAccentYellowDarkNotHovered: { ...FontBody, color: Colors.cF5BF00.a070 },
  bodyAccentYellowLightHovered: { ...FontBody, color: Colors.c6D5100.a100 },
  bodyAccentYellowLightNotHovered: { ...FontBody, color: Colors.c6D5100.a070 },
  bodyAccentOrangeDarkHovered: { ...FontBody, color: Colors.cDE6700.a100 },
  bodyAccentOrangeDarkNotHovered: { ...FontBody, color: Colors.cDE6700.a070 },
  bodyAccentOrangeLightHovered: { ...FontBody, color: Colors.c9B1700.a100 },
  bodyAccentOrangeLightNotHovered: { ...FontBody, color: Colors.c9B1700.a070 },
  subheadDarkHovered: { ...FontSubhead, color: Colors.cEFEFEF.a070 },
  subheadDarkNotHovered: { ...FontSubhead, color: Colors.cEFEFEF.a040 },
  subheadLightHovered: { ...FontSubhead, color: Colors.c000000.a070 },
  subheadLightNotHovered: { ...FontSubhead, color: Colors.c000000.a040 },
  footnoteDarkHoveredCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.cFFFFFF.a100,
  },
  footnoteDarkNotHoveredCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.cEFEFEF.a070,
  },
  footnoteLightHoveredCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.c001927.a100,
  },
  footnoteLightNotHoveredCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.c001927.a070,
  },
  footnoteDarkHoveredLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.cFFFFFF.a100,
  },
  footnoteDarkNotHoveredLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.cEFEFEF.a070,
  },
  footnoteLightHoveredLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.c001927.a100,
  },
  footnoteLightNotHoveredLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.c001927.a070,
  },
  footnoteTinyDarkHoveredCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.cEFEFEF.a070,
  },
  footnoteTinyDarkNotHoveredCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.cEFEFEF.a040,
  },
  footnoteTinyLightHoveredCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.c000000.a070,
  },
  footnoteTinyLightNotHoveredCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.c001927.a070,
  },
  footnoteTinyDarkHoveredLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.cEFEFEF.a070,
  },
  footnoteTinyDarkNotHoveredLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.cEFEFEF.a040,
  },
  footnoteTinyLightHoveredLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.c000000.a070,
  },
  footnoteTinyLightNotHoveredLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.c001927.a070,
  },
};
