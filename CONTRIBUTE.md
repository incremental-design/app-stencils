# Contribute to App Stencils:

Before you can contribute to app stencils, you need to install [Lerna](lerna.js.org).

You've probably used `npm` or `yarn` to manage your Vue projects. However, you can't use either of them in App Stencils, because this repository is managed by Lerna, which effectively replaces both of them. Much like `npm` and `yarn`, Lerna is a command line utility that you have to install globally.

- If you're on a Mac, the best way to to this is to install [homebrew](https://brew.sh), and then `brew install lerna`.
- To check if Lerna is installed on your computer, run `Lerna -v`. If it's installed, it will print the version number (e.g. `4.0.0`).

  ![`lerna -v`](./.readme/lerna-v.gif)

<!-- ![install brew.sh, and then `brew install lerna`]() -->

## Setup:

1. Navigate to the root of this repository.
2. Run `lerna bootstrap`.

   ![`lerna bootstrap`](./.readme/lerna-bootstrap.gif)

- 🤔 `lerna bootstrap` replaces `yarn install`.
- 🛑 Do NOT run `yarn install` in any of these repositories.

## Repository Structure:

There are three types of files in App Stencils: configuration, code, and documentation.

- [Configuration](#configuration) files set up this repository's **toolchain** - the programs that run, build, test, and publish the code files.
- [Code](#code) files form this repository's **packages** - the libraries that App Stencils [publishes to npmjs.com](https://www.npmjs.com/org/incremental.design).
- [Documentation](#documentation) files explain how this repository's code and configuration files work.

### Configuration

App stencils contains several [tools](#develop) that help you turn source code into bundles that can be published to `npmjs.com`. Some of these tools run automatically, and others run on command. All of them follow the directives in their respective configuration files.

Most configuration files are located in the repository root.
![Most configuration files are in the root of the repository.](.readme/diagram-repo-structure-configuration.png)
As a general rule, you should NOT edit any of the configuration files, because doing so will either break your copy of the repository, or worse, introduce breaking changes into this repository’s published packages.

### Code

Most code is located inside the `packages` folder. App stencils splits the code in this folder into distinct packages, each of which can be used independently from the others.

![All packages are inside the `packages` folder.](.readme/diagram-repo-structure-code.png)

App Stencils groups packages according to their contents. Each package contains exactly ONE of the following four types of content:

| Type of content:                                                                     | Where to find it:                             |
| :----------------------------------------------------------------------------------- | :-------------------------------------------- |
| Vue 3 [Single File Component](https://v3.vuejs.org/guide/single-file-component.html) | `packages/vue3/component-<name of component>` |
| Vue 3 [Plugin](https://v3.vuejs.org/guide/plugins.html#plugins)                      | `packages/vue3/plugin-<name of plugin>`       |
| Vue 3 Helper Script                                                                  | `packages/vue3/utility-<name of script>`      |
| Typescript Presentation Logic                                                        | `packages/shared/<name-of-package>`           |

### Documentation

App Stencils contains four levels of documentation.

1. Repository-Level Documentation
2. Package-Level Documentation
3. Folder-Level Documentation
4. File-Level Documentation

Each level of documentation focuses on a different aspect of App Stencils.

- The repository-level documentation focuses on installing and contributing to this project.
- The package-level documentation focuses on installing and using packages in your own projects.
- The folder-level documentation focuses on both using and adding to the functionality of the files within a folder.
- The file-level documentation focuses on the details of the code within a file.

![Levels of Documentation](.readme/diagram-levels-of-documentation.png)

As you modify the code in this repository, update every level of documentation. This helps the rest of us understand what you changed.

When most of us read an unfamiliar piece of code, several questions flash through our minds: "what does this code do?", "what happens if I change it?", "who wrote it?", "why?", and "what were they thinking?". To understand the code, we have to understand the **context** in which it was written. Context is the intersection between the person who wrote the code, the problem they were trying to solve, and the information available to them at the time. Unfortunately, code itself doesn't communicate context. To fix this, we need to write **documentation**. Documentation explains what the code does, why you should use it, how it works, and how you can modify it. Documentation saves us the hours of detective work and the tedium of testing the code to learn what it does. Without it, most of us will literally ignore the code, rendering it useless. When documentation is successful, we take the time to read it. We don't skip over it, because we know that it will save us the time we would otherwise spend testing the code.

When you make changes to the code, include the following details in each level of documentation:

| Level of Documentation | Details to include:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Repository             | <ul><li>Link to the package that contains your code, in [`README.md` → How to install App Stencils: → Packages](./README.MD/#how-to-install-app-stencils)</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| Package                | <ul><li>List of methods, components, classes, functions, modules, or any other "things" that your code provides to its users, in `packages/.../<name-of-package>/README.md` → Usage</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Folder                 | <ul><li>Link to the file that contains your code in `packages/.../<name-of-package>/.../<folder>/README.md` → Contents</li><li>Any changes or additions to the overall functionality of the code contained within `packages/.../<name-of-package>/.../<folder>/`. This includes how logic is spread through the files in the folder, and how the files depend on each other.</li><li>List of methods, components, classes, functions, modules, or any other "things" that your code provides to its users. This is the same list you added to the package level documentation.</li><li>Any special instructions for changing the code within a file, including a list of the sections of code that should <em>not</em> be altered.</li></ul> |
| File                   | <ul><li>Any [`tsdoc`](https://tsdoc.org/), [`jsdoc`](https://jsdoc.app), [`vue-docgen`](https://vue-styleguidist.github.io/docs/Docgen.html) or other [multi-line comments](https://www.w3schools.com/js/js_comments.asp) that describe what each block of code does. This includes the parameters it accepts, the arguments it returns, the side effects (also known as state changes) it has when it runs, and the reason you structured the code as you did.</li></ul>                                                                                                                                                                                                                                                                    |

App Stencils also contains a **Storybook** - a set of interactive demos of each Vue component in the repository. To launch these demos, run `lerna run storybook:serve`.

![`lerna run storybook:serve`](.readme/storybook-serve.gif)

Whenever you add Vue components to App Stencils, make sure you [demo it with Storybook](#use-storybook-to-demo-your-vue-components).

The best Vue components are easy to customize, and easy to understand. Without Storybook, it's really hard to make a component that's both. That's because the more customizable a component is, the harder it is to predict its appearance and behavior. When you use Storybook, it helps the rest of us _see the component for ourselves_. That's because unlike inline documentation, Storybook actually runs the component, exposing all of its configuration details. It lets us reconfigure the component, and observe how it changes, so that we can learn by _doing_ rather than by _guessing_. When you demo components with Storybook, you maximize customizability, without maximizing confusion.

To learn how to add a component to Storybook, see: ["Use Storybook to demo your vue components"](#use-storybook-to-demo-your-vue-components).

## Develop:

You have to build, test, document and package your code before the rest of us can use it. App Stencils’ tooling not only simplifies all of these tasks, but also makes it easy to collaborate with the rest of us. That’s because each of the following tools standardizes your code. Without them, it would be difficult for the rest of us to read and edit what you wrote.

| Tool                                                                       | What it does:                                                                                                                                  |
| -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lerna](#use-lerna-to-run-the-other-tools)                                 | Splits the App Stencils codebase into multiple NPM packages, each of which can be separately installed. Runs Jest, Storybook, Vue CLI and tsc. |
| [Commitlint](#use-commitlint-to-format-your-commit-messages)               | Formats commit messages, and rebuilds every package prior to each commit.                                                                      |
| [Typescript](#use-typescript-to-type-check-your-code)                      | Type-checks your code as you write it.                                                                                                         |
| [ESlint](#use-eslint-to-fix-errors)                                        | Checks your code for errors every time Lerna or Commitlint rebuild it.                                                                         |
| [Prettier](#use-prettier-to-format-your-code)                              | Formats `.ts`, `.js`, `.vue` and most other files every time you save your changes.                                                            |
| [Vue 3](#use-vue-3-to-make-user-interface-components)                      | Provides a declarative and reactive framework for building UIs.                                                                                |
| [Jest](#use-jest-to-exercise-your-code)                                    | Runs unit tests.                                                                                                                               |
| [Storybook](#use-storybook-to-demo-your-vue-components)                    | Demos Vue 3 components.                                                                                                                        |
| [TSdoc](#use-tsdoc-to-document-your-typescript-modules-and-vue-components) | Documents typescript and Vue code.                                                                                                             |
| [Git LFS](#use-git-lfs-to-version-images)                                  | Stores all of the images and videos used in the documentation separately from the rest of the repository.                                      |
| [Vue CLI](#use-vue-cli-to-stub-vue-component-packages)                     | Stubs out Vue 3 libraries.                                                                                                                     |
| [tsc](#use-tsc-to-stub-typescript-packages)                                | Stubs out Typescript libraries.                                                                                                                |

### Use Lerna to run the other tools:

Use `lerna <command>` to run tools in each of App stencils’ packages. Do not use `yarn <command>` or `npm <command>`.

Lerna lets you develop the code in App Stencils as if it was a single package, even though it's actually split into many packages. Without Lerna, this would be difficult, because you would have to manually run the same `yarn <command>` (e.g. `yarn install`, `yarn build`) in each package. When you run `lerna <command>`, (e.g. `lerna bootstrap`, `lerna build`), it actually runs the corresponding `yarn` command in every package at once. But that's not all - it also changes the location from which packages are retrieved. `yarn install` retrieves packages from `npmjs.com`, unless specifically configured otherwise. `Lerna bootstrap` retrieves packages from the `packages` folder. It only installs packages from `npmjs.com` if it can't find the package inside `packages`. This means that _you don't have to publish a package to `npmjs.com`_ before importing it into your code. Without Lerna, you would have to publish every package in `packages` to `npmjs.com` before you could use them.

Use the following Lerna commands to run tasks in App Stencils:

| Task                                                                                                                             | Lerna Command               | Yarn command it replaces:  | NPM command it replaces:           |
| -------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | -------------------------- | ---------------------------------- |
| Stub out a new Package                                                                                                           | `lerna create`              | n/a                        | n/a                                |
| Build Packages                                                                                                                   | `lerna run build`           | `yarn build`               | `npm run build`                    |
| Install the dependencies listed in each package's `package.json`                                                                 | `lerna bootstrap`           | `yarn install`             | `npm install`                      |
| Delete each package's `node_modules`                                                                                             | `lerna clean`               | `rm -rf ./node_modules`    | `rm -rf ./node_modules`            |
| Add a [dependency](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) to a package's `package.json`        | `lerna add <package>`       | `yarn add <package>`       | `npm install <package>`            |
| Add a [dev dependency](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies) to a package's `package.json` | `lerna add --dev <package>` | `yarn add --dev <package>` | `npm install --save-dev <package>` |
| Run each package's source code in a [Development Server](https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-serve)     | `lerna run serve`           | `yarn serve`               | `npm run serve`                    |
| Run unit tests                                                                                                                   | `lerna run test:unit`       | `yarn test:unit`           | `npm run test:unit`                |

### Use Commitlint to format your commit messages:

Your commit messages are only as useful as they are easy to read. When you write your commit messages according to Commitlint’s format, it helps us understand _why_ you made the commit in the first place. That’s because Commitlint’s format forces every commit message to carry the same types of information. This makes it easy for the rest of us to compare your commits to each other and follow your train of thought.

Commitlint will prevent you from making commits unless your commit message contains:

1. a **type**: an indicator of what kinds of changes a commit contains. The following are the types of commits, along with when you should use them:
   - `chore`
     - a change to App Stencils’ tooling.
   - `docs`
     - a change to the documentation in the root of the App Stencils’ repository.
   - `docs(<name-of-package>)`
     - a change to the documentation within a package.
   - `feat(<name-of-package>)`
     - an addition to the functionality provided by a package.
   - `fix(<name-of-package>)`
     - a patch to a bug in a package.
   - `perf(<name-of-package>)`
     - an improvement in speed or memory usage of the code in a package.
   - `refactor(<name-of-package>)`
     - a change to the organization of code within a package.
   - `test(<name-of-package>)`
     - an addition to the unit tests within a package.
2. a **subject**: a one-sentence description of the changes you made.
3. A **body**: a list of the changes you made, split up by files changed and commands run. Think of it like a 'table of contents' for your commit. This is _optional_, but helpful.
   - Note: You MUST begin your commit body with a blank line, or Commitlint will complain.

For example:

| <table><tr><td>type</td><td>subject</td></tr><tr><td>`feat(plumbus):` </td><td>`repurpose the batch of schleem`</td></tr></table>                                                                                                                         |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| <table><tr><td>body</td></tr><tr><td><ol><li>Add the `dinglebopper` to the `blamf`.</li><li>Cut the `fleeb`.</li><li>Chumble the `hizzards`.</li><li>Make the `plumbus`.</li></ol><br/>See: https://www.youtube.com/watch?v=eMJk4y9NGvE</td></tr></table> |

#### Break commits into small pieces:

Keep your commits small. A commit is the smallest set of changes needed to:

- make a single change to the build tooling.
- update the documentation for a single package.
- modify a single package.
- fix a bug in a single package.
- improve the performance of a single package.
- refactor a single package.
- test a single package.

In particular, a commit should _never_ contain changes to multiple packages.

When the rest of us browse your commit history, we should be able to understand the effect of each change you made. As the number of changes in a commit grows, this becomes harder to do. Furthermore, the more changes a commit contains, the more likely it is to introduce a bug. When you keep your commits small, it's easier for the rest of us to reason about them and isolate bugs. If your commits are small enough, none of us will have trouble understanding what they affect and why you made them.

#### Troubleshoot Commitlint:

Git clients, such as [Tower](https://www.git-tower.com/mac?gclid=CjwKCAjwt8uGBhBAEiwAayu_9alH0wnniAyMva6TGRRNLtSv2kftMmfa6egH1qzrEa7xFAnCXco24RoCoWYQAvD_BwE) do not have access to your `$PATH` by default. Commitlint cannot function unless you manually provide your Git client with your `$PATH`. You can do this as follows:

| Git Client     | Platform | How to provide `$PATH`                                            |
| :------------- | :------- | :---------------------------------------------------------------- |
| Git Tower      | MacOS    | https://www.git-tower.com/help/guides/integration/environment/mac |
| Github Desktop | MacOS    |                                                                   |
| Sublime Merge  | MacOS    |                                                                   |

If Lerna is installed in your home directory, your git client probably won't be able to find it, and will error when you try to commit.

1. To find out if Lerna is installed in your home directory, run `which lerna`. If the terminal responds with `~/.npm-global/bin/lerna`, then Lerna is installed in your home directory. If it responds `/usr/local/bin/lerna` then it isn't.
2. To fix this, uninstall Lerna with `npm uninstall -g lerna`. Pay attention to the `-g` flag. It tells NPM to delete Lerna from `~/.npm-global/bin/`
3. Reinstall Lerna with `brew install lerna`. Brew will take care of installing Lerna in `/usr/local/bin`, or `/opt/local/bin`, depending on your operating system and platform.

### Use Typescript to type-check your code:

Before you write any code, make sure you install the Typescript extension for your editor.

| Editor       | Extension                                                                                                                                               |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Panic Nova   | https://extensions.panic.com/extensions/apexskier/apexskier.typescript/ ![How to install typescript in Panic Nova](./.readme/get-ts-extension-nova.gif) |
| VScode       | Typescript extension is built in - there's nothing to install.                                                                                          |
| Sublime Text | https://packagecontrol.io/packages/TypeScript                                                                                                           |

If you want Typescript to give you helpful feedback as you type, you need to make sure that the Typescript language server is running. Although Typescript checks your code for errors, it doesn't share the results with your editor. When you install the Typescript language server, it connects typescript to your editor, so you can see errors as you type. And that's not all - it also augments your editor with autocompletion and jump-to-definition support. That means that as you type in the names of classes, objects, methods or functions, the Typescript language server will grab their options, and stick them into your editor's autocompletion menu. This lets you browse and select, rather than type (and misspell), options. It also locates the source code for any class, object, method or function that you import into your code, so you don't have to dig through the repository looking for it. It's like a spellcheck and dictionary, but for your code. Without the Typescript language server, you won't receive any of these assists.

#### Add type annotations to your code:

Type annotations make it easy to connect your code to the rest of the App Stencils codebase.

All of the App Stencils code compiles to browser-ready Javascript. However, the code is actually written in Typescript. That's because Javascript classes and functions don't indicate what inputs they receive, and what outputs they send. The only way to find out is to read the Javascript code, and test it out. This is a slow and frustrating experience that doesn't scale. No one has time to read and reason about all of the code they use. That's why we use typescript to read the code for us. It extends Javascript with [**type annotations**](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) - standardized syntax that enumerates classes' and functions' inputs and outputs. When you add type annotations to your code, we don't have to read it before we use it. Typescript takes care of telling us what inputs we need to give your code, and what outputs we will receive. This literally doubles the pace at which we can write new code.

<!-- put any specific guidelines for what annotations to use here -->

<!-- mention using the typescript snippets in nova here -->

#### Follow Typescript naming conventions:

Whenever you create a typescript file, name it as follows:

| File:  | Contents:                       | Capitalization: | Part of Speech: | Example:                    |
| ------ | ------------------------------- | --------------- | --------------- | --------------------------- |
| `*.ts` | Typescript Classes or Functions | PascalCase      | Subject         | `VueSeamlssStateMachine.ts` |

Whenever you add code to a `.ts` file within a package, name it as follows:

| Code:                                       | Capitalization: | Part of Speech: | Example:                               |
| ------------------------------------------- | --------------- | --------------- | -------------------------------------- |
| exportable `const`, `var`, `let` or `class` | PascalCase      | Subject         | `ClickListener`                        |
| object property                             | camelCase       | Subject         | `ClickListener.duration`               |
| method                                      | camelCase       | Predicate       | `ClickListener.calculateVelocity(...)` |

When the rest of us read your code, we need to be able to guess the meaning of each word, without peeking at its type definitions or documentation. As the App Stencils codebase grows, this becomes more difficult. When you follow this naming convention, it makes this task easier. That's because the capitalization and part-of-speech indicate the affordances of the code behind the word. Even if we don't know the definition and behavior of a word, it's naming convention denotes its general characteristics. This reduces the likelihood that we will have to look up the meaning of a word to understand the code surrounding it. When you follow the naming convention, you improve the readability of your code.

### Use ESlint to fix errors:

<!-- have to explain how eslint is different from typescript -->

### Use Prettier to format your code:

### Use Vue 3 to make user interface components:

Every user interface component you write needs to be **irreducible** and **configurable**. A component is irreducible when the code that describes it cannot be split into separate modules without duplicating logic. A component is configurable when its code furnishes parameters that affect its appearance and behavior. There are dozens of frameworks for making user interface components. We use Vue because it occupies a special goldilocks zone in the world of app development: it is as versatile and powerful as it is familiar to programmers of different backgrounds. Whether you primarily code in Javascript, Typescript, PHP, or even Java or .net, Vue's single-file-component format functions as a lingua franca that you can pick up over time. like react and angular, Vue's single-file-components enhance HTML and CSS with reactive logic and declarative paradigm. Unlike React, it doesn't make you interleave your HTML inside javascript, and unlike Angular, it doesn't make you learn Typescript before you can get started. Best of all, Vue is [really popular](https://www.techrepublic.com/article/considering-vue-js-here-are-5-reasons-youll-love-it/), so every Vue component you write can reach a wide audience.

#### Follow Vue naming conventions:

Whenever you create a `vue` file, name it as follows:

| File:   | Contents:     | Capitalization: | Part of Speech: | Example:                    |
| ------- | ------------- | --------------- | --------------- | --------------------------- |
| `*.vue` | Vue component | PascalCase      | Subject         | `VueSeamlssStateMachine.ts` |

Whenever you add code to a `.vue` file, name it as follows:

| Code:                                       | Capitalization:                                                                    | Part of Speech:                                                                              | Example:                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------- |
| Vue Component or Directive                  | PascalCase                                                                         | [Multi-Word](https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential) Subject | `ClickListener`                         |
| Vue Component data, prop, computed          | camelCase                                                                          | Subject                                                                                      | `ClickListener.duration`                |
| Vue Component method                        | camelCase                                                                          | Predicate                                                                                    | `ClickListener.calculateVelocity(...)`  |
| Vue event                                   | [kebab-case](https://vuejs.org/v2/guide/components-custom-events.html#Event-Names) | Imperative                                                                                   | `send-message`, `update-state`, `click` |
| exportable `const`, `var`, `let` or `class` | PascalCase                                                                         | Subject                                                                                      | `ClickListener`                         |

When we read your Vue components, we need to be able to guess the meaning of unfamiliar words, without searching for their definitions elsewhere in the App Stencils codebase. This is especially important in Vue single-file-components, which mix different syntaxes together, reducing readability. Just like the [words in your typescript files](#follow-typescript-naming-conventions), the words in your Vue components use capitalization and part-of-speech to indicate their affordances. This restores the readability of your Vue components.

<!-- #### Use Typescript in `<script>` sections -->

<!-- #### Use Less in `<style>` sections -->

<!-- add instructions on how to use the vue devtools -->

### Use Jest to exercise your code:

<!-- there should be ONE test file per folder within a package. The test file should inventory and test everything in the folder -->

<!-- To test every package at once, `lerna run test:unit`.

This starts an instance of the Jest unit test framework for each package that contains unit tests. So, if your computer's fans start to sound like a jet engine at idle 🛩 ... this is why. -->

### Use Storybook to demo your Vue components:

### Use TSdoc to document your Typescript modules and Vue components:

### Use Git LFS to version images:

### Use Vue CLI to stub Vue component packages:

<!-- Whenever you add a file or folder to a Vue package, name it as follows:

| Type:  | Contents:                       | Capitalization: | Part of Speech: | Example:                    |
| ------ | ------------------------------- | --------------- | --------------- | --------------------------- |
| folder | anything                        | kebab-case      | Subject         | `event-listeners`           | -->

<!-- put each vue component in its own package -->

<!-- need to explain /setup-function-members folder -->

<!-- keep vue files <300 lines of code -->

<!-- your package should have a single default export that contains the vue component, and no named exports -->

### Use `tsc` to stub Typescript packages:

1. Stub out a new package, with `lerna create @incremental.design/<name-of-package> shared --access public --es-module --license MIT`, then answer the prompts that follow.

   ![`lerna create @incremental.design/input-event-listeners shared --access public --es-module --license MIT`](./.readme/lerna-create-package.gif)

   | `lerna create`                    | `@incremental.design/<name-of-package>`                                                                                                                                                                                                                                                                                   | `shared`                                                 | `--access public`                          | `--es-module`                                                                                                                                                                                     | `--license MIT`                            |
   | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :----------------------------------------- |
   | stubs out a `package.json` for... | a package that is <table><tr><td>[scoped](https://docs.npmjs.com/cli/v7/using-npm/scope) to</td><td>[`@incremental.design`](https://www.npmjs.com/org/incremental.design)</td></tr><tr><td>[named](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name)</td><td>`<name-of-package>`</td></tr></table> and ... | is located at `packages/shared/<name-of-package>` and... | should be published to `npmjs.com`, and... | should have both a [`main` entry point](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main) and a [`modules` entry point](https://github.com/rollup/rollup/wiki/pkg.module), and ... | should have the `MIT` open source license. |

   <br/>

   | Prompt           | Answer                                                   |
   | :--------------- | :------------------------------------------------------- |
   | `package name`   | Enter ↵                                                  |
   | `version`        | Enter ↵                                                  |
   | `description`    | Explain what this package contains in up to 3 sentences. |
   | `keywords`       | Enter ↵                                                  |
   | `homepage`       | Enter ↵                                                  |
   | `license`        | Enter ↵                                                  |
   | `entry point`    | Enter ↵                                                  |
   | `module entry`   | Enter ↵                                                  |
   | `git repository` | Enter ↵                                                  |

2. Remove the `__tests__` folder from the package.

   Although you will add tests to your typescript packages, they won't live in the `__tests__` folder. Go ahead and delete it. Then open the `package.json` and remove the `directories.test` and `scripts.test` fields.

   ![Delete the `__tests__` folder, the `directories.test` and `scripts.test` fields](./.readme/remove-tests.gif)

3. Remove the `lib` folder from the package.

   Since all of your source code will go into `src`, the `lib` folder will never contain anything. Go ahead and delete it. Then, remove the `directories` field.

   ![Delete the `lib` folder, and the `directories` field](./.readme/remove-lib.gif)

4. Add typescript to the package.

   Before you can write Typescript code, you have to install Typescript. `cd` to `packages/shared/<name-of-package>` and run `lerna add --dev typescript`. Lerna will add `typescript` to your `package.json`'s `devDependencies`, create a `node_modules` folder, and install the `typescript` package, and its dependencies, within it.

   ![`lerna add --dev typescript`](./.readme/lerna-add-typescript.gif)

5. Stub out a typescript configuration file.

   Run `npx tsc --init` inside the `packages/shared/<name-of-package>` directory. This command will create a `tsconfig.json` file within it.

6. Set the Typescript target and module to `esnext`.

   To take full advantage of every feature that Typescript has to offer, you need to instruct it to compile and package your typescript code as `esnext` modules. This means that typescript won't add [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) to your code to make it compatible with older browsers. While this might sound like a problem, it's actually a good thing. That's because polyfills reduce performance. Furthermore, you're writing a _library_. Other developers are going to import your library into their projects, and add whatever polyfills they see fit. When you ship your code as `esnext` modules, you give them the choice between performance and compatibility, rather than forcing a performance penalty upon them.

   Open your `tsconfig.json` file, and change the `target` field from `es5` to `esnext`. Then, change the `module` field from `commonjs` to `esnext`:

   ![set `target` and `module` fields to `esnext`](./.readme/tsconfig-target-module-esnext.gif)

7. Set typescript module resolution to `node`.

   Before you can import dependencies into your Typescript code, you have to tell Typescript to look inside the `packages/shared/<name-of-package>/node_modules` folder first. Uncomment `moduleResolution : "node"` in your `tsconfig.json` file to do this.

   ![Uncomment `moduleResolution: "node"`](./.readme/tsconfig-module-resolution.gif)

8. Enable source maps.

   If you want to debug like a 10x developer, you need to turn on source maps. They give your browser console a way to trace issues back to the source code that caused them. And when you use your typescript code within a Vue project, they even give the Vue inspector the ability to open your editor and locate the bug. Uncomment `sourceMap: true` to enable this time-saver.

   ![Uncomment `sourceMap: true`](./.readme/tsconfig-source-map.gif)

9. Enable declaration generation.

   You need to make sure that Typescript doesn't toss out all of the type annotations when it compiles your code. When you enable declaration file generation, Typescript scoops up all of the type annotations you wrote, and puts them in a [declaration](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html) file, adjacent to the code it compiled. To set up declaration generation you need to:

   - go to your `tsconfig.json` and
     - uncomment `declaration: true`
     - uncomment `declarationMap: true`
     - uncomment `declarationDir` and set it to `./dist/types`
   - go to your `package.json` and
     - add a `types` field, and set it to `./dist/types`

   This tells typescript to generate a declaration file every time it builds your code, and it in `packages/shared/<name-of-package>/dist/types`. It also tells typescript to look for type annotations in the `./dist/types` folder whenever it imports your code into another project.

   ![Enable declaration generation](./.readme/tsconfig-declaration.gif)

10. Tell Typescript what to compile.

    You need to tell Typescript what you want it to compile, before it will compile anything. Since all of your source code lives in the `src` folder of your package, you need to add the `"include": ["src/**/*"]` field to your `tsconfig.json`.

    ![Include `src`](./.readme/tsconfig-include-src.gif)

11. Tell Typescript where to put compiled code.

    You need to tell Typescript where it should put the code it compiles, or it will dump it directly into `packages/shared/<name-of-package>`. Since your package's `package.json` `main` field already points to `dist/`, you need to make sure Typescript does as well. Go to your `tsconfig.json`, Uncomment `outDir` and set it to `dist/`.

    ![Set `outDir`](./.readme/tsconfig-outdir.gif)

12. Tell Typescript which types it needs to import.

    If you want Typescript to type-check any Browser, Node or Jest API calls you make, you need to tell it to import the type declarations for those APIs:

- Uncomment `types` and set it to `[" webpack-env","jest","node"]`
- Add the `lib` field to the `compilerOptions` field and set it to `["esnext", "dom", "dom.iterable", "scripthost"]`

  ![set `types` and `lib` fields](./.readme/ts-types-lib.gif)

13. Tell Typescript to resolve import statements relative to the package root.

    If you don't want to have to prefix all of your imports with `packages/shared/<name-of-package>`, you should tell Typescript NOT to look outside of your package for dependencies. After all, it shouldn't have to: Lerna already does the hard work of placing every dependency inside `packages/shared/<name-of-package>/node_modules`. To tell Typescript to look for dependencies within your package, uncomment the `baseURL` field.

    ![Uncomment `baseURL`](./.readme/ts-baseurl.gif)

14. Remove the unused parts of the typescript configuration file.

    Clean out your `tsconfig.json` file so that it's easier to read. Delete every line that is commented out. You should be left with:

    ```json
    {
      "compilerOptions": {
        /* Language and Environment */
        "target": "esnext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

        /* Modules */
        "module": "esnext" /* Specify what module code is generated. */,
        "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
        "baseUrl": "./" /* Specify the base directory to resolve non-relative module names. */,
        "types": [
          "webpack-env",
          "jest",
          "node"
        ] /* Specify type package names to be included without being referenced in a source file. */,
        "lib": ["esnext", "dom", "dom.iterable", "scripthost"],

        /* JavaScript Support */

        /* Emit */
        "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
        "declarationMap": true /* Create sourcemaps for d.ts files. */,
        "sourceMap": true /* Create source map files for emitted JavaScript files. */,
        "outDir": "./dist/" /* Specify an output folder for all emitted files. */,
        "declarationDir": "./dist/types" /* Specify the output directory for generated declaration files. */,

        /* Interop Constraints */
        "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
        "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

        /* Type Checking */
        "strict": true /* Enable all strict type-checking options. */,

        /* Completeness */
        "skipLibCheck": true /* Skip type checking all .d.ts files. */
      },
      "include": ["src/**/*"]
    }
    ```

    ![Delete commented configuration fields](./.readme/tsconfig-delete-comments.gif)

15. Connect Typescript to Lerna.

    Congratulations! You've configured Typescript to compile your source code and place it in `/dist`. Now, it will compile your code whenever you run `npx tsc` inside your package. However, it won't compile your code when you run `lerna build`. To connect Typescript to Lerna, add `"build": "tsc"` to your `package.json`'s `script` field. Now, whenever you run `lerna build`, it will run your `package.json`'s `script.build` command for you.

    ![Add `"build": "tsc"` to `package.json`](./.readme/tsconfig-build-script.gif)

16. Convert the contents of your package's `src` to typescript.

    Typescript only pays attention to the `.ts`, `.tsx`, `.d.ts` files in your package's `src` folder. It will ignore any `.js` and `.jsx` files. This is a problem, because your package currently contains a single `.js` file: in `src/<name-of-package>.js`. If you ask Typescript to build your code, it won't find anything to build, and it will error instead. To fix this, change the `.js` extension in `src/<name-of-package>.js` to `.ts` (i.e. `src/<name-of-package>.ts`). Once you make this change, Typescript will notice and compile the file.

    ![Convert `.js` files to `.ts`](./.readme/tsconfig-js-to-ts.gif)

17. Use your Typescript code as your package's module entry point.

    The best way to share your package's code is to provide us with both the Typescript AND the javascript to which it compiles. Your package's `main` field shares the compiled javascript in `dist/`, but not the Typescript in `src`. That's where the modules field comes in handy. When you use it to share the `src` folder, it gives us access to the Typescript code within it. When the rest of us import your code into our own typescript files, our copy of Typescript grabs the code from your `modules` field, rather than from your `main` field. The best part of this is that when we use Typescript's go-to-definition feature, it will take us to your Typescript code, rather than the autogenerated `dist/types/<name-ofpackage>.d.ts` file.

    `Lerna create` already stubbed out your `package.json`'s `main` field. All you need to do is update its `module` field to point to `src/<name-of-package>.ts`.

    ![Point `package.json` `module` field to `src/<name-of-package>.ts`](./.readme/tsconfig-module.gif)

18. Include your `src/` directory in your package's published contents.

    When it's time to `lerna publish` your code, you need to make sure that **both** the raw Typescript code, and the compiled Javascript code are included in the package's contents. Otherwise, the `modules` field will point to a folder that doesn't exist in the package, and Typescript will be forced to fall back to the `main` field. To fix this, add the `src` directory to the `package.json`'s `files` array.

    ![Add `src` to your `package.json`'s `files` array](./.readme/tsconfig-files-src.gif)

    Once you're done, your package.json should look something like this:

    ```json
    {
    "name": "@incremental.design/<name-of-package>",
    "version": "0.0.0" /* This number may vary. Lerna will manage it for you. Don't touch it. */,
    "description": <whatever description you gave your package in step 1>
    "author": "Your Name <your email>",
    "homepage": "https://github.com/incremental-design/app-stencils#readme",
    "license": "MIT",
    "main": "dist/<name-of-package>.js",
    "module": "src/<name-of-package>.ts",
    "types": "dist/types",
    "files": [
      "dist",
      "src"
    ],
    "publishConfig": {
      "access": "public"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/incremental-design/app-stencils.git"
    },
    "scripts": {
      "build": "tsc"
    },
    "bugs": {
      "url": "https://github.com/incremental-design/app-stencils/issues"
    },
    "devDependencies": {
      "typescript": "^4.4.2"
    }
    }
    ```

    And that's it! Congratulations! You set up a typescript package!

#### Follow folder naming conventions:

Whenever you add a folder to a typescript package, name it as follows:

| Type:  | Contents: | Capitalization: | Part of Speech: | Example:          |
| ------ | --------- | --------------- | --------------- | ----------------- |
| folder | anything  | kebab-case      | Subject         | `event-listeners` |

When you kebab-case your folder names, it helps the rest of us differentiate them from the names of the Typescript classes, methods, functions, variables in your package.

<!-- group related typescript modules into a single package -->

<!-- keep individual typescript files <300 lines of code -->

<!-- use index export convention -->

<!-- your package should have a single default export, and individual named exports (for tree shaking) -->

<!-- use overloaded methods rather than distinct function names (it's better to have a few customizable functions than many rigid functions) -->

<!-- prefer fewer methods that can be permuted to achieve more complex results. Never have two methods that have overlapping functionality. -->

## Publish

<!-- need to briefly go over how commits are cherry-picked into feature branches, and then squashed into the main branch -->

<!-- This project uses **semantic versioning.** That means that this project is structured into **releases.** A release is a version of the project that adds new features, changes existing features or replaces old features. There are three types of releases:

- Major
- Minor
- Patch

Each major release replaces one or more old features.

Each minor release adds one new feature.

Each patch improves one new feature.

To publish new versions of every package in this repository:

1. Navigate to the root of this repository.
2. Run `lerna publish`. Lerna will ask you if you are publishing a patch, minor release or major release.

- 🧐 Lerna runs this repository in [locked mode](https://github.com/lerna/lerna#fixedlocked-mode-default). That means that every package in this repository has the same version as the repository itself. Publishing any change to any package will increment the version for EVERY other package.

- ⚠️ Once you publish a package to `npm`, it's _really_ hard to unpublish it. Do not publish unless you are absolutely sure you want to do so. -->

<!-- * what you want the reader to do -->

<!-- * why?
   * desired outcome
   * underlying problem
   * action
   * compare action to doing nothing -->

<!-- * how tell if succeeded? -->
