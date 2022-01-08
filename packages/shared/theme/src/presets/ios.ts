import {
  RGBA,
  hexAlphaToRGBA as HR,
  Elevation,
  Font,
  FontAlign,
  FontVerticalAlign,
  StyleFactory,
} from '.';

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
    a030: HR('000000', 30),
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

const ForegroundPrimaryElevation: { [elevation: string]: Elevation<RGBA> } = {
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
  foregroundPrimaryDark: {
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
  foregroundPrimaryLight: {
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

const ForegroundSecondaryElevation: {
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
  foregroundSecondaryDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a040,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  foregroundSecondaryLight: {
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
  backgroundTertiaryDark: {
    fill: [
      {
        color: Colors.cEFEFEF.a010,
      },
    ],
    innerShadow: [],
    stroke: [],
    dropShadow: [],
  },
  backgroundTertiaryLight: {
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
};

const KnobElevation: Elevation<RGBA> = {
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

const FA /* (F)ont (A)wesome */ = ['Font Awesome 6 Pro'];

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
  massiveBGDark: { ...FontMassiveBG, color: Colors.cEFEFEF.a010 },
  massiveBGDarkGreen: { ...FontMassiveBG, color: Colors.c1ABD5E.a010 },
  massiveBGDarkYellow: { ...FontMassiveBG, color: Colors.cCBA12D.a012 },
  massiveBGDarkOrange: { ...FontMassiveBG, color: Colors.cDE6700.a010 },
  massiveBGLight: { ...FontMassiveBG, color: Colors.c001927.a010 },
  massiveBGLightGreen: { ...FontMassiveBG, color: Colors.c1ABD5E.a020 },
  massiveBGLightYellow: { ...FontMassiveBG, color: Colors.cCBA12D.a025 },
  massiveBGLightOrange: { ...FontMassiveBG, color: Colors.cDE6700.a020 },
  massiveTitleDarkPrimary: {
    ...FontMassiveTitle,
    color: Colors.cEFEFEF.a100,
  },
  massiveTitleDarkSecondary: {
    ...FontMassiveTitle,
    color: Colors.cEFEFEF.a070,
  },
  massiveTitleLightPrimary: {
    ...FontMassiveTitle,
    color: Colors.c001927.a100,
  },
  massiveTitleLightSecondary: {
    ...FontMassiveTitle,
    color: Colors.c001927.a070,
  },
  largeTitleDarkPrimary: { ...FontLargeTitle, color: Colors.cEFEFEF.a100 },
  largeTitleDarkSecondary: {
    ...FontLargeTitle,
    color: Colors.cEFEFEF.a070,
  },
  largeTitleLightPrimary: { ...FontLargeTitle, color: Colors.c001927.a100 },
  largeTitleLightSecondary: {
    ...FontLargeTitle,
    color: Colors.c001927.a070,
  },
  largeTitleAccentDarkPrimary: {
    ...FontLargeTitle,
    color: Colors.c1BA1E5.a100,
  },
  largeTitleAccentDarkSecondary: {
    ...FontLargeTitle,
    color: Colors.c1BA1E5.a070,
  },
  largeTitleAccentLightPrimary: {
    ...FontLargeTitle,
    color: Colors.c004D6F.a100,
  },
  largeTitleAccentLightSecondary: {
    ...FontLargeTitle,
    color: Colors.c004D6F.a070,
  },
  largeTitleAccentGreenDarkPrimary: {
    ...FontLargeTitle,
    color: Colors.c1ABD5E.a100,
  },
  largeTitleAccentGreenDarkSecondary: {
    ...FontLargeTitle,
    color: Colors.c1ABD5E.a070,
  },
  largeTitleAccentGreenLightPrimary: {
    ...FontLargeTitle,
    color: Colors.c016557.a100,
  },
  largeTitleAccentGreenLightSecondary: {
    ...FontLargeTitle,
    color: Colors.c016557.a070,
  },
  largeTitleAccentYellowDarkPrimary: {
    ...FontLargeTitle,
    color: Colors.cF5BF00.a100,
  },
  largeTitleAccentYellowDarkSecondary: {
    ...FontLargeTitle,
    color: Colors.cF5BF00.a070,
  },
  largeTitleAccentYellowLightPrimary: {
    ...FontLargeTitle,
    color: Colors.c6D5100.a100,
  },
  largeTitleAccentYellowLightSecondary: {
    ...FontLargeTitle,
    color: Colors.c6D5100.a070,
  },
  largeTitleAccentOrangeDarkPrimary: {
    ...FontLargeTitle,
    color: Colors.cDE6700.a100,
  },
  largeTitleAccentOrangeDarkSecondary: {
    ...FontLargeTitle,
    color: Colors.cDE6700.a070,
  },
  largeTitleAccentOrangeLightPrimary: {
    ...FontLargeTitle,
    color: Colors.c9B1700.a100,
  },
  largeTitleAccentOrangeLightSecondary: {
    ...FontLargeTitle,
    color: Colors.c9B1700.a070,
  },
  headlineDarkPrimary: { ...FontHeadline, color: Colors.cEFEFEF.a070 },
  headlineDarkSecondary: { ...FontHeadline, color: Colors.cEFEFEF.a040 },
  headlineLightPrimary: { ...FontHeadline, color: Colors.c000000.a070 },
  headlineLightSecondary: { ...FontHeadline, color: Colors.c001927.a070 },
  bodyDarkPrimary: { ...FontBody, color: Colors.cFFFFFF.a100 },
  bodyDarkSecondary: { ...FontBody, color: Colors.cEFEFEF.a070 },
  bodyLightPrimary: { ...FontBody, color: Colors.c001927.a100 },
  bodyLightSecondary: { ...FontBody, color: Colors.c001927.a070 },
  bodyAccentDarkPrimary: { ...FontBody, color: Colors.c1BA1E5.a100 },
  bodyAccentDarkSecondary: { ...FontBody, color: Colors.c1BA1E5.a070 },
  bodyAccentLightPrimary: { ...FontBody, color: Colors.c004D6F.a100 },
  bodyAccentLightSecondary: { ...FontBody, color: Colors.c004D6F.a070 },
  bodyAccentGreenDarkPrimary: { ...FontBody, color: Colors.c1ABD5E.a100 },
  bodyAccentGreenDarkSecondary: { ...FontBody, color: Colors.c1ABD5E.a070 },
  bodyAccentGreenLightPrimary: { ...FontBody, color: Colors.c016557.a100 },
  bodyAccentGreenLightSecondary: { ...FontBody, color: Colors.c016557.a070 },
  bodyAccentYellowDarkPrimary: { ...FontBody, color: Colors.cF5BF00.a100 },
  bodyAccentYellowDarkSecondary: { ...FontBody, color: Colors.cF5BF00.a070 },
  bodyAccentYellowLightPrimary: { ...FontBody, color: Colors.c6D5100.a100 },
  bodyAccentYellowLightSecondary: { ...FontBody, color: Colors.c6D5100.a070 },
  bodyAccentOrangeDarkPrimary: { ...FontBody, color: Colors.cDE6700.a100 },
  bodyAccentOrangeDarkSecondary: { ...FontBody, color: Colors.cDE6700.a070 },
  bodyAccentOrangeLightPrimary: { ...FontBody, color: Colors.c9B1700.a100 },
  bodyAccentOrangeLightSecondary: { ...FontBody, color: Colors.c9B1700.a070 },
  subheadDarkPrimary: { ...FontSubhead, color: Colors.cEFEFEF.a070 },
  subheadDarkSecondary: { ...FontSubhead, color: Colors.cEFEFEF.a040 },
  subheadLightPrimary: { ...FontSubhead, color: Colors.c000000.a070 },
  subheadLightSecondary: { ...FontSubhead, color: Colors.c000000.a040 },
  footnoteDarkPrimaryCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.cFFFFFF.a100,
  },
  footnoteDarkSecondaryCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.cEFEFEF.a070,
  },
  footnoteLightPrimaryCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.c001927.a100,
  },
  footnoteLightSecondaryCenterAligned: {
    ...FontFootnote,
    align: FontAlign.center,
    color: Colors.c001927.a070,
  },
  footnoteDarkPrimaryLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.cFFFFFF.a100,
  },
  footnoteDarkSecondaryLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.cEFEFEF.a070,
  },
  footnoteLightPrimaryLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.c001927.a100,
  },
  footnoteLightSecondaryLeftAligned: {
    ...FontFootnote,
    align: FontAlign.left,
    color: Colors.c001927.a070,
  },
  footnoteTinyDarkPrimaryCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.cEFEFEF.a070,
  },
  footnoteTinyDarkSecondaryCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.cEFEFEF.a040,
  },
  footnoteTinyLightPrimaryCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.c000000.a070,
  },
  footnoteTinyLightSecondaryCenterAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.center,
    color: Colors.c001927.a070,
  },
  footnoteTinyDarkPrimaryLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.cEFEFEF.a070,
  },
  footnoteTinyDarkSecondaryLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.cEFEFEF.a040,
  },
  footnoteTinyLightPrimaryLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.c000000.a070,
  },
  footnoteTinyLightSecondaryLeftAligned: {
    ...FontFootnoteTiny,
    align: FontAlign.left,
    color: Colors.c001927.a070,
  },
};

const CSSRules: {
  [ruleset: string]: { [cssRule: string]: string | number };
} = {
  marginL8R8: {
    marginLeft: 8,
    marginRight: 8,
  },
  marginT4B4: {
    marginTop: 4,
    marginBottom: 4,
  },
  marginT4B8: {
    marginTop: 4,
    marginBottom: 8,
  },
  minWidth48: {
    minWidth: 48,
  },
};

const TSF: {
  [styleName: string]: StyleFactory;
} /* (T)ext (S)tyle (F)actories */ = {
  body: {} as StyleFactory,
  footnote: {} as StyleFactory,
};

const FSF: {
  [styleName: string]: StyleFactory;
} /* (F)oreground (S)tyle (F)actories */ = {
  label: {} as StyleFactory,
  button: {} as StyleFactory,
};

const BSF: {
  [styleName: string]: StyleFactory;
} /* (B)ackground (S)tyle (F)actories */ = {};

export const IOS = {
  layouts: {
    /**
     * Elements that have an inline layout include:
     * * field
     *  * label left
     *    * icon left
     *    * icon right
     *    * label text center
     *  * input and validation
     *    * input text
     *    * validator badge
     *      * badge icon left
     *      * badge icon right
     *      * badge text center
     *      * badge fill
     *    * stepper handle right
     *    * input fill
     * * button
     *  * back chevron
     *  * label
     *  * action icon
     *    * disclosure indicator left
     *    * disclosure indicator right
     *    * fill
     * * list item
     *  * label text
     *  * indicator badge
     *    * icon left
     *    * icon right
     *    * text center
     *  * indicator thumbnail rectangle
     *    * indicator thumbnail image
     *    * indicator thumbnail fill
     *  * indicator thumbnail circle
     *    * indicator thumbnail image
     *    * indicator thumbnail fill
     *  * disclosure hint
     *  * disclosure indicator
     */
    inline: {
      text: {
        // TSF.body,
      },
      fill: {
        foreground: {},
        background: {},
      },
    },
    small: {
      /**
       * Elements that have a small layout include:
       * * field
       *    * float label
       *      * label left
       *      * icon left
       *      * icon right
       *    * label text center
       *    * input and validation
       *      * input text
       *      * validator badge
       *        * badge icon left
       *        * badge icon right
       *        * badge text center
       *        * badge fill
       *      * stepper handle right
       * * button
       *    * back chevron
       *    * Action icon and disclosure
       *      * Action icon
       *      * disclosure indicator left
       *      * disclosure indicator right
       *      * fill
       *    * label (bottom)
       * * collection item
       *    * label text
       *    * disclosure left
       *      * disclosure indicator (left)
       *        * disclosure hint
       *    * disclosure right
       *      * disclosure indicator (right)
       *        * disclosure hint
       *    * thumbnail rectangle
       *      * thumbnail image
       *      * thumbnail fill
       */
      text: {
        body: TSF.body,
        footnote: TSF.footnote,
      },
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Currently, there are no elements with a 'small vertical' layout
     */
    smallVertical: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },

    smallWithInline: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Elements that have a smallWithItemLeft layout include:
     * * list item
     *    * label text
     *      * footnote text
     *    * indicator badge
     *      * icon left
     *      * icon right
     *      * text center
     *    * indicator thumbnail rectangle
     *      * indicator thumbnail image
     *      * indicator thumbnail fill
     *    * indicator thumbnail circle
     *      * indicator thumbnail image
     *      * indicator thumbnail fill
     *    * disclosure indicator
     *      * disclosure hint
     */
    smallWithItemLeft: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Elements that have a smallWithItemRight layout include:
     * * field
     *    * float label
     *      * label left
     *      * icon left
     *      * icon right
     *    * label text center
     *    * input and validation
     *      * input text
     *      * validator badge
     *        * badge icon left
     *        * badge icon right
     *        * badge text center
     *        * badge fill
     *      * stepper handle right
     * * button
     *    * back chevron
     *    * Action icon and disclosure
     *      * Action icon
     *      * disclosure indicator left
     *      * disclosure indicator right
     *      * fill
     *    * label (left)
     *      * footnote
     */
    smallWithItemRight: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Elements that have a medium layout include:
     * * slider
     *  * footnote text
     *  * knob
     *    * knob fill
     *  * field knob
     *    * field label
     *      * text left
     *      * icon center
     *      * text right
     *    * field input
     *      * input text
     *      * stepper handle
     *      * input fill
     *    * knob fill
     *  * track
     *    * track fill
     *    * interval tick
     *    * interval label
     *      * track interval label text
     *      * track interval label icon (left)
     *    * track beginning label
     *    * track end label
     *  * expandable chunk
     *    * BG icon
     *    * BG text
     *    * label
     *    * disclosure
     *     * hint
     *    * footnote
     *    * card fill
     */
    medium: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Elements that have a medium layout include:
     *  * expandable chunk
     *    * BG icon
     *    * BG text
     *    * label
     *    * disclosure
     *     * hint
     *    * footnote
     *    * card fill
     */
    mediumVertical: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Elements that have a large layout include:
     *  * expandable chunk
     *    * BG icon
     *    * BG text
     *    * label
     *    * disclosure
     *     * hint
     *    * footnote
     *    * card fill
     */
    large: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
    /**
     * Elements that have a massive layout include:
     *  * expandable chunk
     *    * BG icon
     *    * BG text
     *    * label
     *    * disclosure
     *     * hint
     *    * footnote
     *    * card fill
     */
    massive: {
      text: {},
      fill: {
        foreground: {},
        background: {},
      },
    },
  },
  colorPalettes: {
    light: {
      fill: {
        background: {
          modal: {
            none: PopoverElevation.PopoverLight,
          },
          floating: {
            none: FloatingElevation.FloatingLight,
          },
          primary: {
            none: backgroundPrimaryElevation.backgroundPrimaryLight,
          },
          secondary: {
            none: backgroundSecondaryElevation.backgroundSecondaryLight,
          },
          tertiary: {
            none: backgroundTertiaryElevation.backgroundTertiaryLight,
            success: backgroundTertiaryElevation.backgroundTertiaryGreen,
            warn: backgroundTertiaryElevation.backgroundTertiaryYellow,
            fail: backgroundTertiaryElevation.backgroundTertiaryRed,
          },
        },
        foreground: {
          primary: {
            none: ForegroundPrimaryElevation.ForegroundPrimaryLight,
            active: ForegroundPrimaryElevation.ForegroundPrimaryBlue,
            success: ForegroundPrimaryElevation.ForegroundPrimaryGreen,
            warn: ForegroundPrimaryElevation.ForegroundPrimaryYellow,
            fail: ForegroundPrimaryElevation.ForegroundPrimaryOrange,
          },
          secondary: {
            none: ForegroundSecondaryElevation.ForegroundSecondaryLight,
            active: ForegroundSecondaryElevation.ForegroundSecondaryBlue,
            success: ForegroundSecondaryElevation.ForegroundSecondaryGreen,
            warn: ForegroundSecondaryElevation.ForegroundSecondaryYellow,
            fail: ForegroundSecondaryElevation.ForegroundSecondaryOrange,
          },
          tactile: {
            none: TactileElevation.TactileLight,
          },
          knob: {
            none: KnobElevation,
          },
        },
      },
      text: {
        primary: {
          massiveBG: {
            none: Fonts.massiveBGLight,
            success: Fonts.massiveBGLightGreen,
            warn: Fonts.massiveBGLightYellow,
            fail: Fonts.massiveBGLightOrange,
          },
          massiveTitle: {
            none: Fonts.massiveTitleLightPrimary,
          },
          title: {
            none: Fonts.largeTitleLightPrimary,
            active: Fonts.largeTitleAccentLightPrimary,
            success: Fonts.largeTitleAccentGreenLightPrimary,
            warn: Fonts.largeTitleAccentYellowLightPrimary,
            fail: Fonts.largeTitleAccentOrangeLightPrimary,
          },
          headline: {
            none: Fonts.headlineLightPrimary,
          },
          body: {
            none: Fonts.bodyLightPrimary,
            active: Fonts.bodyAccentLightPrimary,
            success: Fonts.bodyAccentGreenLightPrimary,
            warn: Fonts.bodyAccentYellowLightPrimary,
            fail: Fonts.bodyAccentOrangeLightPrimary,
          },
          subhead: {
            none: Fonts.subheadLightPrimary,
          },
          footnote: {
            none: Fonts.footnoteLightPrimaryCenterAligned,
          },
          footnoteLeftAligned: {
            none: Fonts.footnoteLightPrimaryLeftAligned,
          },
          footnoteTiny: {
            none: Fonts.footnoteTinyLightPrimaryCenterAligned,
          },
          footnoteTinyLeftAligned: {
            none: Fonts.footnoteTinyLightPrimaryLeftAligned,
          },
        },
        secondary: {
          massiveTitle: {
            none: Fonts.massiveTitleLightSecondary,
          },
          title: {
            none: Fonts.largeTitleLightSecondary,
            active: Fonts.largeTitleAccentLightSecondary,
            success: Fonts.largeTitleAccentGreenLightSecondary,
            warn: Fonts.largeTitleAccentYellowLightSecondary,
            fail: Fonts.largeTitleAccentOrangeLightSecondary,
          },
          headline: {
            none: Fonts.headlineLightSecondary,
          },
          body: {
            none: Fonts.bodyLightSecondary,
            active: Fonts.bodyAccentLightSecondary,
            success: Fonts.bodyAccentGreenLightSecondary,
            warn: Fonts.bodyAccentYellowLightSecondary,
            fail: Fonts.bodyAccentOrangeLightSecondary,
          },
          subhead: {
            none: Fonts.subheadLightSecondary,
          },
          footnote: {
            none: Fonts.footnoteLightSecondaryCenterAligned,
          },
          footnoteLeftAligned: {
            none: Fonts.footnoteLightSecondaryLeftAligned,
          },
          footnoteTiny: {
            none: Fonts.footnoteTinyLightSecondaryCenterAligned,
          },
          footnoteTinyLeftAligned: {
            none: Fonts.footnoteTinyLightSecondaryLeftAligned,
          },
        },
      },
    },
    dark: {
      fill: {
        background: {
          modal: {
            none: PopoverElevation.PopoverDark,
          },
          floating: {
            none: FloatingElevation.FloatingDark,
          },
          primary: {
            none: backgroundPrimaryElevation.backgroundPrimaryDark,
          },
          secondary: {
            none: backgroundSecondaryElevation.backgroundSecondaryDark,
          },
          tertiary: {
            none: backgroundTertiaryElevation.backgroundTertiaryDark,
            success: backgroundTertiaryElevation.backgroundTertiaryGreen,
            warn: backgroundTertiaryElevation.backgroundTertiaryYellow,
            fail: backgroundTertiaryElevation.backgroundTertiaryRed,
          },
        },
        foreground: {
          primary: {
            none: ForegroundPrimaryElevation.ForegroundPrimaryDark,
            active: ForegroundPrimaryElevation.ForegroundPrimaryBlue,
            success: ForegroundPrimaryElevation.ForegroundPrimaryGreen,
            warn: ForegroundPrimaryElevation.ForegroundPrimaryYellow,
            fail: ForegroundPrimaryElevation.ForegroundPrimaryOrange,
          },
          secondary: {
            none: ForegroundSecondaryElevation.ForegroundSecondaryLight,
            active: ForegroundSecondaryElevation.ForegroundSecondaryBlue,
            success: ForegroundSecondaryElevation.ForegroundSecondaryGreen,
            warn: ForegroundSecondaryElevation.ForegroundSecondaryYellow,
            fail: ForegroundSecondaryElevation.ForegroundSecondaryOrange,
          },
          tactile: {
            none: TactileElevation.tactileDark,
          },
          knob: {
            none: KnobElevation,
          },
        },
      },
      text: {
        primary: {
          massiveBG: {
            none: Fonts.massiveBGDark,
            success: Fonts.massiveBGDarkGreen,
            warn: Fonts.massiveBGDarkYellow,
            fail: Fonts.massiveBGDarkOrange,
          },
          massiveTitle: {
            none: Fonts.massiveTitleDarkPrimary,
          },
          title: {
            none: Fonts.largeTitleDarkPrimary,
            active: Fonts.largeTitleAccentDarkPrimary,
            success: Fonts.largeTitleAccentGreenDarkPrimary,
            warn: Fonts.largeTitleAccentYellowDarkPrimary,
            fail: Fonts.largeTitleAccentOrangeDarkPrimary,
          },
          headline: {
            none: Fonts.headlineDarkPrimary,
          },
          body: {
            none: Fonts.bodyDarkPrimary,
            active: Fonts.bodyAccentDarkPrimary,
            success: Fonts.bodyAccentGreenDarkPrimary,
            warn: Fonts.bodyAccentYellowDarkPrimary,
            fail: Fonts.bodyAccentOrangeDarkPrimary,
          },
          subhead: {
            none: Fonts.subheadDarkPrimary,
          },
          footnote: {
            none: Fonts.footnoteDarkPrimaryCenterAligned,
          },
          footnoteLeftAligned: {
            none: Fonts.footnoteDarkPrimaryLeftAligned,
          },
          footnoteTiny: {
            none: Fonts.footnoteTinyDarkPrimaryCenterAligned,
          },
          footnoteTinyLeftAligned: {
            none: Fonts.footnoteTinyDarkPrimaryLeftAligned,
          },
        },
        secondary: {
          massiveTitle: {
            none: Fonts.massiveTitleDarkSecondary,
          },
          title: {
            none: Fonts.largeTitleDarkSecondary,
            active: Fonts.largeTitleAccentDarkSecondary,
            success: Fonts.largeTitleAccentGreenDarkSecondary,
            warn: Fonts.largeTitleAccentYellowDarkSecondary,
            fail: Fonts.largeTitleAccentOrangeDarkSecondary,
          },
          headline: {
            none: Fonts.headlineDarkSecondary,
          },
          body: {
            none: Fonts.bodyDarkSecondary,
            active: Fonts.bodyAccentDarkSecondary,
            success: Fonts.bodyAccentGreenDarkSecondary,
            warn: Fonts.bodyAccentYellowDarkSecondary,
            fail: Fonts.bodyAccentOrangeDarkSecondary,
          },
          subhead: {
            none: Fonts.subheadDarkSecondary,
          },
          footnote: {
            none: Fonts.footnoteDarkSecondaryCenterAligned,
          },
          footnoteLeftAligned: {
            none: Fonts.footnoteDarkSecondaryLeftAligned,
          },
          footnoteTiny: {
            none: Fonts.footnoteTinyDarkSecondaryCenterAligned,
          },
          footnoteTinyLeftAligned: {
            none: Fonts.footnoteTinyDarkSecondaryLeftAligned,
          },
        },
      },
    },
  },
};
