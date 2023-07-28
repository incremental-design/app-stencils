export * from "./Color";
export * from "./Elevation";
export * from "./Font";
export * from "./Shape";

// consider using https://vanilla-extract.style to transform all of these classes AT COMPILE TIME ... it's like your very own tailwind

// the idea is to use color, elevation, font, and shape to define tokens, which then get sent through vanilla-extract and turned into a stylesheet.

// even better, the stylesheet can be made tailwind-compatible, or any other css library compatible, just by building and outputting the rules to the corresponding library's selectors

// and best of all, if you really wanted to use these styles AT RUNTIME, you could do so by packaging vanilla-extract into these utils. then, you would prerender styles at compile time, re-render the changed based on state on SSR, and then toss out and re-render on client side (if needed). by default, you could disable toss out and rerender on hydrate, opting just to use the enumerated pre-rendered styles from vanilla, but if you wanted to enable dynamic theming for specific components, you could 'flip the switch' and use a composable to override the styles.

// todo: see if https://pinceau.dev/configuration/tokens-config would work

// also check out https://unocss.dev/guide/

// refer to: https://nuxt.com/docs/getting-started/styling#third-party-libraries-and-modules

