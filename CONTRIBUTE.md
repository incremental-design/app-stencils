# Contribute to App Stencils:

Before you can contribute to app stencils, you need to install [Lerna](lerna.js.org).

You've probably used `npm` or `yarn` to manage your Vue projects. However, you can't use either of them in App Stencils, because this repository is managed by Lerna, which effectively replaces both of them. Much like `npm` and `yarn`, Lerna is a command line utility that you have to install globally.

- If you're on a Mac, the best way to to this is to install [homebrew](brew.sh), and then `brew install lerna`.
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

- Configuration files set up this repository's **toolchain** - the programs that run, build, test, and publish the code.
- Code files form this repository's **packages** - the libraries that App Stencils [publishes to npmjs.com](https://www.npmjs.com/org/incremental.design).
- Documentation files explain how this repository's code and configuration files work.

### Configuration Files

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
- The folder-level documentation focuses both using and adding to the functionality of the files within a folder.
- The file-level documentation focuses on the details of the code within the file.

![Levels of Documentation](.readme/diagram-levels-of-documentation.png)

As you add to or modify the code in this repository, update every level of documentation. This helps other contributors understand what you changed.

When most of us read an unfamiliar piece of code, several questions flash through our minds: "what does this code do?", "what happens if I change it?", "who wrote it?", "why?", and "what were they thinking?". To understand the code, we have to understand the **context** in which it was written. Context is the intersection between the person who wrote the code, the problem they were trying to solve, and the information available to them at the time. Unfortunately, code itself doesn't communicate context. To fix this, we need to write **documentation**. Documentation explains what the code does, why you should use it, how it works, and how you can modify it. Documentation saves us the hours of detective work and the tedium of testing the code to learn what it does. Without it, most of us will literally ignore the code, rendering it useless. When documentation is successful, we take the time to read it. We don't skip over it, because we know that it will save us time testing the code.

When you make changes to the code, include the following details in each level of documentation:

| Level of Documentation | Details to include:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repository             | <ul><li>Link to the package that contains your code, in `README.md` > Usage > Packages</li><li>If the package exports a component, a storybook.js demo of the component. For more details on how to add a component to a storybook, consult the [README of `storybook` folder](./packages/storybook/README.md) inside `packages`.</li></ul>                                                                                                                                                                                                                                                                                                                              |
| Package                | <ul><li>List of methods, components, classes, functions, modules, or any other "things" that your code provides to its users, in `packages/.../<name-of-package>/README.md` > Usage</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Folder                 | <ul><li>Link to the file that contains your code in `packages/.../<name-of-package>/.../<folder>/README.md` > Contents</li><li>Any changes or additions to the overall functionality of the code contained within `packages/.../<name-of-package>/.../<folder>/`. This includes how logic is spread through the files in the folder, and how the files depend on each other.</li><li>The same list of methods, components, classes, functions, modules, or any other "things" that you added to the package-level documentation.</li><li>Any special instructions for adding to or changing the code within a file, including how it affects its dependencies.</li></ul> |
| File                   | Any [`tsdoc`](https://tsdoc.org/), [`jsdoc`](https://jsdoc.app), [`vue-docgen`](https://vue-styleguidist.github.io/docs/Docgen.html) or other [multi-line comments](https://www.w3schools.com/js/js_comments.asp) that describe what each block of code does. This includes the parameters it accepts, the arguments it returns, the side effects (also known as state changes) it has when it runs, and the reason you structured the code as you did.                                                                                                                                                                                                                  |

App Stencils also contains a **Storybook** - a set of interactive demos of each Vue component in the repository. To launch these demos, run `lerna run storybook:serve`.

![`lerna run storybook:serve`](.readme/storybook-serve.gif)

Whenever you add Vue components to App Stencils, make sure you [demo them with Storybook](#use-storybook-to-demo-your-vue-components).

The best Vue components are as easy to understand as they are to customize. When you demo Vue components with Storybook, you show other developers what your component looks like, how it behaves, and how they can customize it. You help them understand how the component works. That's because unlike inline documentation, Storybook actually runs your component, exposing all of the parameters to which it responds. Storybook makes it possible for other developers to play with the parameters, so they can learn by _doing_ rather than by _guessing_. This is especially important, given that the more customizable a Vue component is, the more varied its appearance and behavior becomes. When you use storybook, you maximize customizability, without maximizing confusion.

To learn how to add a component to the Storybook, see: ["Use Storybook to demo your vue components"](#use-storybook-to-demo-your-vue-components).

## Develop:

You have to build, test, document and package your code before other people can use it. App Stencils’ tooling not only simplifies this, but also makes it easy to collaborate with others. That’s because each of the following tools standardizes your code. Without them, it would be difficult to connect your code to the rest of the App Stencils codebase.

| Tool                                                                       | What it does:                                                                                                                                            |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Lerna](#use-lerna-to-run-the-other-tools)                                 | Splits the App Stencils codebase into multiple NPM packages, each of which can be separately installed. Runs tools within all of these packages at once. |
| [Commitlint](#use-commitlint-to-check-your-commits-for-formatting-errors)  | Formats commit messages, and rebuilds every package prior to each commit.                                                                                |
| [Typescript](#use-typescript-to-modularize-your-presentation-logic)        | Adds type checking and ES6 support to your code.                                                                                                         |
| [ESlint](#use-eslint-to-fix-errors)                                        | Adds compile-time error checking support to your code.                                                                                                   |
| [Prettier](#use-prettier-to-format-your-code)                              | Formats `.ts`, `.js`, `.vue` and most other files in App Stencils.                                                                                       |
| [Vue 3](#use-vue-3-to-make-user-interface-components)                      | Provides a declarative and reactive framework for building UIs.                                                                                          |
| [Jest](#use-jest-to-exercise-your-code)                                    | Runs unit tests.                                                                                                                                         |
| [Storybook](#use-storybook-to-demo-your-vue-components)                    | Documents and demos Vue 3 components.                                                                                                                    |
| [TSdoc](#use-tsdoc-to-document-your-typescript-modules-and-vue-components) | Documents typescript and Vue code.                                                                                                                       |
| [Git LFS](#use-git-lfs-to-version-images)                                  | Stores all of the images and videos used in the documentation separately from the rest of the repository.                                                |
| [Vue CLI](#use-vue-cli-to-stub-vue-component-libraries)                    | Stubs out Vue 3 libraries.                                                                                                                               |
| [tsc](#use-tsc-to-stub-typescript-libraries)                               | Stubs out typescript libraries.                                                                                                                          |

### Use Lerna to run the other tools:

Use `lerna <command>` to run tools in each of App stencils’ packages. Do not use `yarn <command>` or `npm <command>`.

Lerna lets you develop the code in App Stencils as if it was a single package, even though it's actually split into many packages. Without Lerna, this would be difficult, because you would have to manually run the same `yarn <command>` (e.g. `yarn install`, `yarn build`) in each package. When you run `lerna <command>`, (e.g. `lerna bootstrap`, `lerna build`), it actually runs the corresponding `yarn` command in every package at once. But that's not all - it also changes the location from which packages are retrieved. `yarn install` retrieves packages from `npmjs.com`, unless specifically configured otherwise. `Lerna bootstrap` retrieves packages from the `packages` folder, and only falls back to `npmjs.com` if the package can't be found within it. This means that _you don't have to publish a package to `npmjs.com`_ before importing it elsewhere within the App Stencils. Without Lerna, you would either have to publish each package to `npmjs.com` or manually configure yarn to retrieve them from `packages`.

Use the following Lerna commands to run tasks in App Stencils:

| Task                                                                                                                 | Lerna Command               | Corresponding NPM Command          | Corresponding Yarn Command |
| -------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------- | -------------------------- |
| Build Packages                                                                                                       | `lerna run build`           | `npm run build`                    | `yarn build`               |
| Install the packages listed in `package.json`                                                                        | `lerna bootstrap`           | `npm install`                      | `yarn install`             |
| Delete `node_modules`                                                                                                | `lerna clean`               | `rm -rf ./node_modules`            | `rm -rf ./node_modules`    |
| Add a [dependency](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) to `package.json`        | `lerna add <package>`       | `npm install <package>`            | `yarn add <package>`       |
| Add a [dev dependency](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies) to `package.json` | `lerna add --dev <package>` | `npm install --save-dev <package>` | `yarn add --dev <package>` |
| Run the source code in a [Development Server](https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-serve)    | `lerna run serve`           | `npm run serve`                    | `yarn serve`               |
| Run unit tests                                                                                                       | `lerna run test:unit`       | `npm run test:unit`                | `yarn test:unit`           |

### Use Commitlint to format your commit messages:

Your commit messages are only as useful as they are easy to read. When you write your commit messages according to Commitlint’s format, it helps other developers read them. That’s because Commitlint’s format forces every commit message to carry the same types of information. This makes it easy for other developers to compare your commits to each other.

Commitlint will prevent you from committing changes unless your commit message contains:

1. a **type**. A type is an indicator of what kinds of changes a commit contains. The following are the types of commits, along with when you should use them:
   - `chore`
     - a change to App Stencils’ tooling.
   - `docs`
     - a change to the documentation in the root of the App Stencils’ repository.
   - `docs (<name-of-package>)`
     - a change to the documentation within a package.
   - `feat (<name-of-package>)`
     - an addition to the functionality provided by a package.
   - `fix (<name-of-package>)`
     - a patch to a bug in a package.
   - `perf (<name-of-package>)`
     - an improvement in speed or memory usage of the code in a package.
   - `refactor (<name-of-package>)`
     - a change to the organization of code within a package.
   - `test (<name-of-package>)`
     - an addition to the unit tests within a package.
2. a **subject**. A subject is a one-sentence description of the changes to a commit.
3. A **body** . A body is a list of the changes you made, split up by files changed and commands run. Think of it like a 'table of contents' for your commit. This is _optional_.
   - Note: You MUST begin your commit body with a blank line, or Commitlint will complain.

For example:

```
feat (doohicky): Add the widget to the doohicky
```

```

1. added the dinglebopper to the blamf.
2. cut the fleeb.
3. Chumble the hizzards.
4. Make the plumbus.

See: https://www.youtube.com/watch?v=eMJk4y9NGvE
```

#### Break commits into small pieces:

Keep your commits small. A commit is the smallest set of changes needed to:

- make a single change to the build tooling
- update the documentation for a single feature
- modify a single feature
- fix a bug in a single feature
- improve the performance of a single feature
- refactor a single feature
- test a single feature

In particular, commits should _never_ span multiple packages or even multiple features within a package.
When other developers browse your commit history, they should be able to understand the effect of each change you made. As the size of a commit grows, this becomes harder to do. Furthermore, the larger a commit is, the more likely it is to introduce a bug. When you keep your commits small, it's easier to reason about them and isolate bugs. If your commits are small enough, other developers will have no trouble stepping through and reproducing each of them.

#### Troubleshoot Commitlint:

If you are using a git client, such as [Tower](https://www.git-tower.com/mac?gclid=CjwKCAjwt8uGBhBAEiwAayu_9alH0wnniAyMva6TGRRNLtSv2kftMmfa6egH1qzrEa7xFAnCXco24RoCoWYQAvD_BwE), it won't have access to your `$PATH`. When it tries to run the git hooks, it will fail, because some of the commands require access to `$PATH`. You can provide access to your `$PATH` as follows:

- [Add `$PATH to Tower`](https://www.git-tower.com/help/guides/integration/environment/mac)
<!-- todo: find instructions for adding path to sublime merge, github desktop -->

If Lerna is installed in your home directory, your git client probably won't be able to find it, and will error when you try to commit.

1. To find out if Lerna is installed in your home directory, run `which lerna`. If the terminal responds with `~/.npm-global/bin/lerna`, then Lerna is installed in your home directory. If it responds `/usr/local/bin/lerna` then it isn't.
2. To fix this, uninstall Lerna with `npm uninstall -g lerna`. Pay attention to the `-g` flag. It tells NPM to delete Lerna from `~/.npm-global/bin/`
3. Reinstall Lerna with `brew install lerna`. Brew will take care of installing Lerna in `/usr/local/bin`.

### Use Typescript to modularize your presentation logic:

Whenever you create a typescript file, name it as follows:

| Type: | Contents:                       | Capitalization: | Part of Speech: | Example:                    |
| ----- | ------------------------------- | --------------- | --------------- | --------------------------- |
| `.ts` | Typescript Classes or Functions | PascalCase      | Subject         | `VueSeamlssStateMachine.ts` |

Whenever you add code to a `.ts` file within a package, name it as follows:

| Type:                                       | Capitalization: | Part of Speech: | Example:                               |
| ------------------------------------------- | --------------- | --------------- | -------------------------------------- |
| exportable `const`, `var`, `let` or `class` | PascalCase      | Subject         | `ClickListener`                        |
| object property                             | camelCase       | Subject         | `ClickListener.duration`               |
| method                                      | camelCase       | Predicate       | `ClickListener.calculateVelocity(...)` |

When other developers read your code, they need to be able to figure out what each word represents, especially if it those words are defined in other files. This task becomes even more difficult in the absence of an IDE with jump-to-definition support. When you follow this naming convention, it makes this task a little easier. That's because it uses both the part of speech and capitalization to denote meaning. When you use this convention, other developers can safely assume that every word that begins with a capital letter corresponds to an importable ES6 module member, such as a vue component, typescript class, or typescript function. They can also differentiate folder paths from filenames, and object properties from methods. Naming conventions make your code easy to read.

### Use ESlint to fix errors:

### Use Prettier to format your code:

### Use Vue 3 to make user interface components:

Whenever you add code to a `.vue` file, name it as follows:

| Type:                                       | Capitalization: | Part of Speech: | Example:                               |
| ------------------------------------------- | --------------- | --------------- | -------------------------------------- |
| Vue Component or Directive                  | PascalCase      | Subject         | `ClickListener`                        |
| Vue Component data, prop, computed          | camelCase       | Subject         | `ClickListener.duration`               |
| Vue Component method                        | camelCase       | Predicate       | `ClickListener.calculateVelocity(...)` |
| exportable `const`, `var`, `let` or `class` | PascalCase      | Subject         | `ClickListener`                        |

<!-- add instructions on how to use the vue devtools -->

### Use Jest to exercise your code:

<!-- there should be ONE test file per folder within a package. The test file should inventory and test everything in the folder -->

<!-- To test every package at once, `lerna run test:unit`.

This starts an instance of the Jest unit test framework for each package that contains unit tests. So, if your computer's fans start to sound like a jet engine at idle 🛩 ... this is why. -->

### Use Storybook to demo your Vue components:

### Use TSdoc to document your Typescript modules and Vue components:

### Use Git LFS to version images:

### Use Vue CLI to stub Vue component packages:

Whenever you add a file or folder to a Vue package, name it as follows:

| Type:  | Contents:                       | Capitalization: | Part of Speech: | Example:                    |
| ------ | ------------------------------- | --------------- | --------------- | --------------------------- |
| `.vue` | Vue Component                   | PascalCase      | Subject         | `BaseComponent.vue`         |
| `.ts`  | Typescript Classes or Functions | PascalCase      | Subject         | `VueSeamlssStateMachine.ts` |
| folder | anything                        | kebab-case      | Subject         | `event-listeners`           |

<!-- put each vue component in its own package -->

<!-- need to explain /setup-function-members folder -->

### Use TSC to stub Typescript packages:

Whenever you add a folder to a typescript package, name it as follows:

| Type:  | Contents: | Capitalization: | Part of Speech: | Example:          |
| ------ | --------- | --------------- | --------------- | ----------------- |
| folder | anything  | kebab-case      | Subject         | `event-listeners` |

<!-- group related typescript modules into a single package -->

## Publish

<!-- need to briefly go over how commits are cherry-picked into feature branches, and then squashed into the main branch -->

This project uses **semantic versioning.** That means that this project is structured into **releases.** A release is a version of the project that adds new features, changes existing features or replaces old features. There are three types of releases:

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

- ⚠️ Once you publish a package to `npm`, it's _really_ hard to unpublish it. Do not publish unless you are absolutely sure you want to do so.

<!-- * what you want the reader to do -->

<!-- * why?
   * desired outcome
   * underlying problem
   * action
   * compare action to doing nothing -->

<!-- * how tell if succeeded? -->
