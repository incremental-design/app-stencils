# `@incremental.design/input-event-listeners`

<!--
Add a banner image and badges

see: https://towardsdatascience.com/how-to-write-an-awesome-readme-68bf4be91f8b

For bonus points, make the banner animated with html, css and svg

maybe some cool retro image with a bunch of input ports and cords?

see: https://github.com/sindresorhus/css-in-readme-like-wat
 -->

**Handle every user input, without the boilerplate.**

The best user interfaces respond to _everything_ a user does: every mouse movement, touch, keypress, and even device motion. Over the past decade, web APIs have grown to respond to more inputs: from mice and keyboards, to touchscreens, accelerometers and even gamepads. However, responding to _all_ of these inputs takes a lot of logic. The more inputs your code responds to, the more logic it needs to contain, and the more bloated it becomes. `input-event-handlers` moves all of this logic out of your code, so you can respond to every [event](https://developer.mozilla.org/en-US/docs/Web/API/Event), without bloating it.

Use the handlers in this package to:

- **Filter the useful information out of input events, with just five lines of code:**

  ![Filter an event with just 5 lines of code](../../../.readme/diagram-filter-events-5-lines.png)

  Feed an event into its corresponding listener in `input-event-listener` and get an object with just the values you _actually_ need to handle an event. For example:

  ![Example of filtering an event into an object with a listener](../../../.readme/diagram-filter-events.png)

<!-- can we automatically pick the correct listener by introspecting the event? Need to write a switch statement with instanceof event -->

- **Calculate changes between instances of input events, with a single argument:**

  ![To make the handler function calculate the differences between an event and a previous event, feed the results of the previous event back into the handler.](../../../.readme/diagram-calculate-events-1-argument.png)

  Feed a listener the current instance of a DOM event, and the object it returned from any previous event, and it will automatically calculate the changes between the two. For example:

  ![Example of calculating changes between instances of an event with a listener](../../../.readme/diagram-calculate-events.png)

<!-- list any codebases, websites, apps, platforms or other products that use your code -->

<!-- link to your reader to your repository's bug page, and let them know if you're open to contributions -->

## Installation:

Add `@incremental.design/input-event-listeners` to your codebase.

<!-- show using a single named import with ES6 + gif -->

<!--
default import is Listener

it accepts ANY event, and ANY previous, and tries to calculate accordingly

use it if you just want a quick-and-dirty way to get up and running
 -->

 <!-- to get even better performance and bundle size you can import just the specific listeners you need with ES6 imports
 
 note, your project must have ES6 imports enabled. Virtually any project that uses either webpack or typescript has these imports enabled
 
  -->

## Usage:

<!-- * what you want the reader to do -->

Use the `@incremental.design/input-event-listeners` API in your codebase:

<!-- use in vue template

show that there is one event listener for each @<event>

 -->

<!-- use in vue setup function

show example of a setup function
 -->

<!-- use in typescript
reveal that this is virtually identical to using in setup function
 -->

<!-- every listener extends the same generic listener function - they all have the same arguments -->

### API Methods:

[ ] List the methods your project provides. Be sure to show readers what the project will do if they use each method.

### How `@incremental.design/input-event-listeners` works:

[ ] Explain how execution works. What is the entry point for your code? Which files correspond to which functionality? What is the lifecycle of your project? Are there any singletons, side effects or shared state among instances of your project? Take extra care to explain design decisions. After all, you wrote an ENTIRE codebase around your opinions. Make sure that the people using it understand them.

## Roadmap:

See [Roadmap](../../../README.md#roadmap)

## Contribute to `@incremental.design/input-event-listeners`:

See [Contribute to App Stencils](../../../CONTRIBUTE.md)

<!-- * why?
 * desired outcome
 * underlying problem
 * action
 * compare action to doing nothing -->

<!-- * how tell if succeeded? -->
