# `incremental.design/theme`

<!--
Add a banner image and badges
-->

Make your prototypes look just like an iOS, MacOS, tvOS, Android, Windows, GTK (linux) app.

If you design apps for a living, you probably have to prototype user interfaces for a variety of desktop and mobile platforms - each of which have their own, unique visual language. You don't have time to re-skin the same prototype for each platform. With `@incremental.design/theme`, you don't have to.

**Make your prototypes look like native apps, without writing a single line of CSS:**

The [`Theme`](./src/Theme.ts) object generates all of the CSS rules you need to make your prototype's UI components look just like a native app. All you need to do is choose a [`Platform`](./README.md#apply-a-preset-theme), a [`Layout`](./README.md#apply-a-preset-theme), [`Element`](./README.md#apply-a-preset-theme), and a [`Style`](./README.md#apply-a-preset-theme), and it will generate all the styles your component needs to match your favorite platform's visual language.

**Reskin your components, with just one setting:**

Just swap out the [`platform`](), and the [`Theme`](./src/Theme.ts) object will update every style it generates.

**Add dark mode to your prototypes, without a single line of code:**

Every [`style`]() in the [`Theme`](./src/Theme.ts) object has a light mode and dark mode. Best of all, the theme object automatically updates your prototype's styles to match your operating system's color scheme.

**Make entirely new themes, with the [`Platform`](./src/Platform.ts), [`Layout`](./src/Layout.ts), [`Element`](./src/Element.ts), [`Style`](./src/Style.ts), and [`ColorPalette`](./src/ColorPalette.ts) classes:**

~~Combine [ColorPalette](./src/ColorPalette.ts)s and [Layout](./src/Layout.ts)s to create an entirely new [Platform](./src/Platform.ts). Then, feed this platform into the `theme` object to generate CSS rules.~~

<!-- list any codebases, websites, apps, platforms or other products that use your code -->

<!-- link to your reader to your repository's bug page, and let them know if you're open to contributions -->

## Installation:

<!-- Show readers how to set up and use your project from within their codebase. -->

<!-- asciicast or gif of installation -->

## Usage:

<!-- explain that all themes consist of platforms, layouts, elements and styles -->

If you've ever prototyped a native app, you've probably spent more hours than you can count coaxing CSS into something that resembles the [Apple human interface guidelines](https://developer.apple.com/design/human-interface-guidelines/), [material design guidelines](https://material.io), or [fluent design guidelines](https://www.microsoft.com/design/fluent/#/). The [`Theme`](./src/Theme.ts) class takes care of that for you. Even better, it describes all of these visual languages with a simple, common vocabulary: **platforms**, **layouts**, **styles**, **tints**, and **states**. When you use [`Theme`](./src/Theme.ts), you don't have to manually write hundreds of CSS selectors. All you need to do is describe the component you want to style in these six terms, and [`Theme`](./src/Theme.ts) will generate the corresponding styles for you.

<!-- need an illustration for platform -->

- A **platform** is the **visual language** of an operating system.
A visual language is the combination of styles that make a platform recognizable, familiar, and distinct from its contemporaries. Ergo, the visual language of iOS is different from that of MacOS, Android or Windows. `Theme` ships with six preset platforms:

   <table>
   <tr>
      <td><code>ios</code></td>
      <td>the visual language of <a href=="https://developer.apple.com/ios/">iOS</a> and <a href="https://developer.apple.com/ipados/">iPadOS</a></td>
   </tr>
   <tr>
      <td><code>macos</code></td><td>the visual language of <a href="https://developer.apple.com/macos/">macOS</a></td>
   </tr>
   <tr>
      <td><code>tvos</code></td><td>the visual language of <a href="https://developer.apple.com/tvos/">tvOS</a></td>
   </tr>
   <tr>
      <td><code>android</code></td><td>the visual language of <a href="https://developer.android.com">Android</a></td>
   </tr>
   <tr>
      <td><code>windows</code></td><td>the visual language of <a href="https://developer.microsoft.com/en-us/windows/">Windows</a></td>
   </tr>
   <tr>
      <td><code>gtk</code></td><td>the visual language of <a href="https://www.gtk.org">Linux (Gnome)</a></td>
   </tr>
   </table>

<!-- need an illustration for layout -->

- A **layout** is a set of rules that dictate the position of text and foreground shapes relative to a background shape.

  Each of the platforms in `Theme` contains the following layouts:

   <table>
      <tr>
         <th>Layout</th>
         <th>iOS</th>
         <th>macOS</th>
         <th>tvOS</th>
         <th>Android</th>
         <th>Windows</th>
         <th>GTK</th>
         <th>Web</th>
      </tr>
      <tr>
         <td height><a href="./src/Layout.ts"><code>inline</code></a></td>
         <td><img src="../../../.readme/layout-iOS-inline.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>small</code></a></td>
         <td><img src="../../../.readme/layout-iOS-small.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>smallVertical</code></a></td>
         <td><img src="../../../.readme/layout-iOS-smallVertical.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>smallWithInline</code></a></td>
         <td><img src="../../../.readme/layout-iOS-smallWithInline.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>smallWithItemLeft</code></a></td>
         <td><img src="../../../.readme/layout-iOS-smallWithItemLeft.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>smallWithItemRight</code></a></td>
         <td><img src="../../../.readme/layout-iOS-smallWithItemRight.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>medium</code></a></td>
         <td><img src="../../../.readme/layout-iOS-medium.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>mediumVertical</code></a></td>
         <td><img src="../../../.readme/layout-iOS-mediumVertical.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>large</code></a></td>
         <td><img src="../../../.readme/layout-iOS-large.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
      <tr>
         <td><a href="./src/Layout.ts"><code>massive</code></a></td>
         <td><img src="../../../.readme/layout-iOS-massive.png"/></td>
         <!-- <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td>
         <td><img src="../../../.readme/something.png"/></td> -->
      </tr>
   </table>

  Some preset themes also contain additional layouts that are specific to that theme. When you supply a platform to [`Theme.platform()`](./src/Theme.ts), it will return a list of all of the layouts that the platform contains.

- A **style** is a set of CSS rules that position and shade a specific piece of text, or a specific foreground or background shape within a layout.

  Every layout contains just three types of styles: `text`, `fill.foreground` and `fill.background`. After all, virtually every user interface component in any design system can be described in terms of its text, foreground fills, and background fills.

  All of the layouts contain some combination of the following styles:

   <table>
      <tr><th>Type</th><th>styles</th></tr>
      <tr><td rowspan=6"><code>text</code></td></tr>
      <tr><td><code>textBody</code></td></tr>
      <tr><td><code>textFootnote</code></td></tr>
      <tr><td><code>textHeadline</code></td></tr>
      <tr><td><code>textSubhead</code></td></tr>
      <tr><td><code>textTitle</code></td></tr>
      <tr><td rowspan=5"><code>fill.foreground</code></td></tr>
      <tr><td><code>fgKnob</code></td></tr>
      <tr><td><code>fgTactile</code></td></tr>
      <tr><td><code>fgPrimary</code></td></tr>
      <tr><td><code>fgSecondary</code></td></tr>
         <tr><td rowspan=6"><code>fill.background</code></td></tr>
      <tr><td><code>bgPopover</code></td></tr>
      <tr><td><code>bgFloating</code></td></tr>
      <tr><td><code>bgPrimary</code></td></tr>
      <tr><td><code>bgSecondary</code></td></tr>
      <tr><td><code>bgTertiary</code></td></tr>
   </table>

  Some layouts may contain styles that aren't listed here. When you supply one of the preset layouts to [`Theme.platform(<platform>).layout()`](./src/Theme.ts), you will receive a list of the styles within the layout.

- A **tint** is an adjustment to a style that signifies a change in the application's data. Every style function accepts the following tints:

   <table>
   <tr><th>tint</th><th>what it signifies</th><tr>
   <tr><td><code>none</code></td><td>Interacting with the component does not do anything to the application data.</td></tr>
   <tr><td><code>active</code></td><td>Interacting with the component will change the application data in a way that can be undone and redone.</td></tr>
   <tr><td><code>progress</code></td><td>Interacting with the component will initiate a change in the application data that will take at least a few seconds to complete.</td></tr>
   <tr><td><code>warn</code></td><td>Interacting with the component will initiate a change in the application data that CANNOT be undone.</td></tr>
   <tr><td><code>success</code></td><td>The previous interaction with the component has completed.</td></tr>
   <tr><td><code>fail</code></td><td>The previous interaction with the component has been canceled.</td></tr>
   </table>

- A **state** is an adjustment to a style that reflects user interaction. Every style function accepts the following states:

   <table>
   <tr><td><code>none</code></td><td>The component is not being interacted with.</td></tr>
   <tr><td><code>hovered</code></td><td>The component is occluded by a pointer, such as a mouse cursor or fingertip.</td></tr>
   <tr><td><code>pressed</code></td><td>The component is depressed by a pointer.</td></tr>
   <tr><td><code>toggled</code></td><td>the component remains pressed after a pointer has released it.</td></tr>
   <tr><td><code>focused</code></td><td>A component's contents can receive input from a keyboard or a pointer.</td></tr>
   </table>

### Apply a preset theme:

The `Theme` class is a tree of styles, grouped by platforms, then by layouts,and then by styles. To access a style, you need to select the platform and layout to which that style belongs, as follows:

1. Choose one of `ios`, `macos`, `tvos`, `android`, `windows`, `gtk` or `web`, and supply it to `Theme.platform`:

   ```
   const {layout, layouts} = Theme.platform('ios')

   console.log(layout) // function
   console.log(layouts) // ['inline', 'small', 'smallVertical', 'smallWithInline', 'smallWithItemLeft', 'smallWithItemRight', 'medium', 'mediumVertical', 'large', 'massive']
   ```

2. Choose one of `inline`, `small`, `smallVertical`, `smallWithInline`, `smallWithItemLeft`, `smallWithItemRight`, `medium`, `mediumVertical`, `large`, or `massive` and insert it into `Theme.platform(...).layout`:

   ```
   const {style, styles} = Theme.platform('ios').layout('smallWithInline');

   console.log(style) // function
   console.log(styles) // {text: ['textIcon', 'textBody', 'textFootnote'], fill:{foreground: ['fgPrimary', 'fgSecondary'], background: ['bgPrimary', 'bgSecondary', 'bgTertiary']}, tints: ['none', 'active', 'progress', 'warn', 'fail'], states:['none', 'hovered', 'pressed', 'toggled', 'focused']}
   ```

3. Chose one of the styles that `Theme.platform(...).layout(...)` returned, and insert it into `Theme.platform(...).layout(...).style`. You can also optionally insert one of the `Tint

   ```
   const CSSRules = Theme.platform('ios').layout('smallWithInline').element('text-body').style('active','hovered')

   console.log(CSSRules) //tbd
   ```

### Customise a preset theme

<!-- need to explain that you can supply an object instead of a string to push your own custom layout -->

### Make an entirely new theme:

<!-- need to explain how to build

- shapes
- colors
- Elevations
- Fonts
- tints
- colorPalettes
- layouts
- platforms

 -->

use theme to build visual language
break the language into properties, rather than CSS rules

<!-- * what you want the reader to do -->

use theme to style prototypes

use theme to build visual language
break the language into properties, rather than CSS rules

<!-- * why?
   * desired outcome
   * underlying problem
   * action
   * compare action to doing nothing -->

<!-- * how tell if succeeded? -->

### How `incremental.design/theme` works:

<!-- [ ] Explain how execution works. What is the entry point for your code? Which files correspond to which functionality? What is the lifecycle of your project? Are there any singletons, side effects or shared state among instances of your project? Take extra care to explain design decisions. After all, you wrote an ENTIRE codebase around your opinions. Make sure that the people using it understand them. -->

why solve this problem? there are so many different CSS frameworks out there - many of which can be themed to match whatever platform you want to mimic

- this isn't a wholesale replacement for your favorite CSS library. It can actually be used right alongside it! It's really meant to be good at two things, reskinning between platforms, and describing the look of user interface elements in a css-agnostic way. In theory, you can take the values in a theme.plaform, and generate XML that can be used in Sketch app, or NSSstrings that can be used on iOS. This is more than a collection of styles: it's a generator.

#### Repository Structure:

[ ] List each file, and what it does.
[ ] Identify whether you are open to pull requests for a specific file or not.

| File or Folder | What does it do? | When should you modify it? |
| :------------- | :--------------- | :------------------------- |
|                |                  |                            |

<!--
Class that generates styles that match the visual languages of iOS, MacOS, tvOS, Android, Windows, GTK, or Web. This class describes the appearance of text and background shapes for:
inline, small, medium, large, and massive sizes
light and dark modes
hovered, pressed, toggled, and focused states
active, progress, success, warning, and failure tints
-->
