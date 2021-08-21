## Contribute to App Stencils:

Before you can contribute to app stencils, you need to install [Lerna](lerna.js.org).

You've probably used npm or yarn to manage and run tasks in your Vue projects. However, you can't use either in App Stencils, because this repository is managed by Lerna, which effectively replaces both of them. Much like NPM and Yarn, Lerna is a command line utility that you have to install globally. If you're on a Mac, the best way to to this is to install [homebrew](brew.sh), and then `brew install lerna`.

To check if Lerna is installed on your computer, run `Lerna -v`. If it's installed, it will print the version number (e.g. `4.0.0`).

### Setup:

1. Navigate to the root of this repository.
2. Run `lerna bootstrap`. This will install all of the new dependencies.

![`lerna bootstrap`](./.readme/lerna-bootstrap.gif)

- 🤔 `lerna bootstrap` replaces `yarn install`.
- 🛑 Do NOT run `yarn install` in any of these repositories.

#### Repository Structure:

![All packages are inside the `packages` folder.](.readme/diagram-repo-structure.png)

| File or Folder:       | What it does:                                                                                                                       | Can you edit it? |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------- | :--------------- |
| .git                  | Contains everything that git needs to function.                                                                                     | No               |
| .husky                | Contains git hooks that are managed by [Husky](https://github.com/typicode/husky)                                                   | No               |
| .readme               | Contains all of the images and files used to make this document.                                                                    | Yes              |
| libs                  | Contains helpful extensions that you can install in your editor of choice                                                           | Yes              |
| node_modules          | Contains all of the dependencies of this project. Automatically created by `lerna bootstrap`.                                       | No               |
| node_modules/.bin     | Contains binaries that you can run with `npx <name of binary>`                                                                      | No               |
| packages              | Contains all of the components, plugins and utilities that are published to NPM.                                                    | Yes              |
| template-repos        | Contains submodules that point to template repositories into which you can import packages.                                         | No               |
| .eslintrc.json        | Contains the rules that ESlint uses to check `.js` and `.ts` files for errors.                                                      | No               |
| .gitattributes        | Contains a [list of files](https://git-scm.com/docs/gitattributes) that git should version with LFS.                                | No               |
| .gitignore            | Contains a [list of files](https://git-scm.com/docs/gitignore) that git should ignore.                                              | No               |
| .gitmodules           | Contains the list of submodules included in `template-repos`                                                                        | No               |
| .prettierrc.json      | Contains the [settings](https://prettier.io/docs/en/configuration.html) that prettier uses to format code.                          | No               |
| .commitlint.config.js | Contains the [settings](https://commitlint.js.org/#/reference-configuration) that commitlint follows when checking commit messages. | No               |
| lerna.json            | Contains the [configuration](https://github.com/lerna/lerna#lernajson) that Lerna uses to find, link, build and publish packages.   | No               |
| package.json          | Contains all of the dependencies of this project, as well as settings for building and publishing this project.                     | No               |
| README.md             | This document. You are here.                                                                                                        | No               |
| tsconfig.json         | Contains all of the settings that Typescript uses to interpret and compile `.ts` files.                                             | No               |
| yarn.lock             | [Lockfile](https://classic.yarnpkg.com/en/docs/yarn-lock/) that is automatically created by `lerna bootstrap`                       | No               |

### Develop:

#### Run tasks with Lerna:

Use `lerna <command>` to run tasks in App stencils. Do not use `yarn <command>` or `npm <command>`.

Lerna lets you develop the code in App Stencils as if it was a single package, even though it's actually split into many packages. Without Lerna, this would be difficult, because you would have to run the same `yarn <command>` (e.g. `yarn install`, `yarn build`) in each package. When you run `lerna <command>`, (e.g. `lerna bootstrap`, `lerna build`), it actually runs the corresponding `yarn` command in every package at once. But that's not all - it also changes the location from which packages are retrieved. `yarn install` retrieves packages from `npmjs.com`, unless specifically configured otherwise. `Lerna bootstrap` retrieves packages from the `packages` folder, and only falls back to `npmjs.com` if the package can't be found within it. This means that you don't have to publish a package before importing it elsewhere within the App Stencils. Without Lerna, you would either have to publish each package to `npmjs.com` or manually configure yarn to retrieve them from `packages`.

Use the following Lerna commands to run tasks in App Stencils

| Task                                                                                                                 | Lerna Command               | NPM Command                        | Yarn Command               |
| :------------------------------------------------------------------------------------------------------------------- | --------------------------- | :--------------------------------- | :------------------------- |
| Build Package with Webpack                                                                                           | `lerna run build`           | `npm run build`                    | `yarn build`               |
| Install the packages listed in `package.json`                                                                        | `lerna bootstrap`           | `npm install`                      | `yarn install`             |
| Delete `node_modules`                                                                                                | `lerna clean`               | `rm -rf ./node_modules`            | `rm -rf ./node_modules`    |
| Add a [dependency](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) to `package.json`        | `lerna add <package>`       | `npm install <package>`            | `yarn add <package>`       |
| Add a [dev dependency](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies) to `package.json` | `lerna add --dev <package>` | `npm install --save-dev <package>` | `yarn add --dev <package>` |
| Run the source code in a [Development Server](https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-serve)    | `lerna run serve`           | `npm run serve`                    | `yarn serve`               |
| Run unit tests                                                                                                       | `lerna run test:unit`       | `npm run test:unit`                | `yarn test:unit`           |

#### Follow naming conventions:

Whenever you add a file or folder to App Stencils, name it as follows:

| Type:   | Contents:              | Capitalization: | Part of Speech:                                                                  | Example:                    |
| ------- | ---------------------- | --------------- | -------------------------------------------------------------------------------- | --------------------------- |
| `.vue`  | Vue Component          | PascalCase      | Subject                                                                          | `BaseComponent.vue`         |
| `.ts`   | Typescript Classes     | PascalCase      | Subject                                                                          | `VueSeamlssStateMachine.ts` |
| `.ts`   | Typescript Function(s) | PascalCase      | Subject                                                                          | `CompositionListeners.ts`   |
| `.js`   | configuration script   | lowercase       | n/a (these names are usually predetermined by the build tools that consume them) | `vue.config.js`             |
| `.json` | configuration object   | lowercase       | n/a (these names are usually predetermined by the build tools that consume them) | `package.json`              |
| `.sh`   | shell script           | snake_case      | Predicate                                                                        | `clean-and-serve.sh`        |
| folder  | anything               | kebab-case      | Subject                                                                          | `event-listeners`           |

Whenever you add code to a typescript or vue file, name it as follows:

| Type:                                       | Capitalization: | Part of Speech: | Example:                               |
| ------------------------------------------- | --------------- | --------------- | -------------------------------------- |
| exportable `const`, `var`, `let` or `class` | PascalCase      | Subject         | `ClickListener`                        |
| object property                             | camelCase       | Subject         | `ClickListener.duration`               |
| method                                      | camelCase       | Predicate       | `ClickListener.calculateVelocity(...)` |

When other developers read your code, they need to be able to figure out what each word represents, especially if it those words are defined in other files. This task becomes even more difficult in the absence of an IDE with jump-to-definition support. When you follow the aformentioned naming convention, it makes this task a little easier. That's because it uses both the part of speech and capitalization to denote meaning. When you use this convention, other developers can safely assume that every word that begins with a capital letter corresponds to an importable ES6 module member, such as a vue component, typescript class, or typescript function. They can also differentiate folder paths from filenames, and object properties from methods. Naming conventions make your code easy to read.

<!-- #### Put each feature in its own package: -->

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

#### Follow commit conventions:

Describe each of your commits with a message that contains:

1. a **type**. A type is an indicator of what kinds of changes a commit contains. The types of commits are:

| Type                       | When to use it:                                |
| :------------------------- | :--------------------------------------------- |
| `chore(<name-of-feature>)` | Whenever you make a change to the tooling      |
| `docs(<name-of-feature>)`  | Whenever you make a change to the README       |
| `feat(<name-of-feature>)`  | Whenever you add code for a new feature        |
| `fix`                      | Whenever you fix a bug                         |
| `perf`                     | Whenever you make something faster             |
| `refactor`                 | Whenever you change how your code is organized |
| `test`                     | Whenever you write a unit test                 |

2. a **subject**. A subject is a one-sentence description of the changes to a commit.

3. (Optional): a **body**. A body is a list of the changes you made, split up by files changed and commands run. Think of it like a 'table of contents' for your commit.

- You MUST begin your commit body with a blank line, or commitlint will complain.

For example:

```
feat: Add the widget to the doohicky
```

```

1. added the dinglebopper to the blamf.
2. cut the fleeb.
3. Chumble the hizzards.
4. Make the plumbus.

See: https://www.youtube.com/watch?v=eMJk4y9NGvE
```

Your commit history is a super way to teach other developers your techniques. However, your commits only have instructional value if other people can understand how they fit together. When you use the same message format to describe each commit, it's easy for other developers to compare them to each other.

⚠️ This repository uses [commitlint](https://commitlint.js.org/#/reference-configuration?id=prompt). It will not let you commit your changes unless your commit message follows the format.

- ⚠️ If you are using a git client, such as [Tower](https://www.git-tower.com/mac?gclid=CjwKCAjwt8uGBhBAEiwAayu_9alH0wnniAyMva6TGRRNLtSv2kftMmfa6egH1qzrEa7xFAnCXco24RoCoWYQAvD_BwE), it won't have access to your `$PATH`. When it tries to run the git hooks, it will fail, because some of the commands require access to `$PATH`. You can provide access to your `$PATH` as follows:

  - [Add `$PATH to Tower`](https://www.git-tower.com/help/guides/integration/environment/mac)

- ⚠️ If Lerna is installed in your home directory, your git client probably won't be able to find it, and will error when you try to commit.

  1.  To find out if Lerna is installed in your home directory, run `which lerna`. If the terminal responds with `~/.npm-global/bin/lerna`, then Lerna is installed in your home directory. If it responds `/usr/local/bin/lerna` then it isn't.

  2.  To fix this, uninstall Lerna with `npm uninstall -g lerna`. Pay attention to the `-g` flag. It tells NPM to delete Lerna from `~/.npm-global/bin/`

  3.  Next, install Lerna with `brew install lerna`. Brew will take care of installing Lerna in `/usr/local/bin`.

#### Add Dependencies

To install a package as dependency of any other package in this repository, use `lerna add <package name>`. To install a dev dependency, use `lerna add --dev <package name>`. Lerna will add the package to the [`dependencies`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies) or [`devDependencies`](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies) of _every_ `package.json` file in `packages/`.

What if you want one of the packages in `packages/` to be a dependency of another? Lerna takes care of this for you. When you `lerna add ...` the package, it will build it and then symlink it into the node*modules of the package that depends on it. It does all of this \_without* actually publishing your package to npmjs.org.

#### Build

To build every package at once, `lerna run build`.

This will populate each package's `dist` folder with the latest build. In fact, whenever you commit to this repository, the `pre-commit` hook actually runs this command and commits the build alongside your changes to the source code!

`lerna run build` inspects every `package.json` file inside the `packages` folder. It checks to see if the [`scripts`](https://docs.npmjs.com/cli/v7/using-npm/scripts) section of the `package.json` contains a `build` script. If it does, it installs all of the dependencies in the package, and then runs the script.

Most build scripts run Webpack. Each package's `README.md` contains more details on how Webpack works, and what you can do to configure it.

#### Run

To run every package at once `lerna run serve`.

Most packages can't actually be run, so this command only runs the few packages that can.

`lerna run serve` inspects every `package.json` file inside the `packages` folder. It checks to see if the [`scripts`](https://docs.npmjs.com/cli/v7/using-npm/scripts) section of the `package.json` contains a `serve` script. If it does, it installs all of the dependencies in the package, and then runs the script.

<!-- add instructions on how to use the vue devtools -->

#### Test

To test every package at once, `lerna run test:unit`.

This starts an instance of the Jest unit test framework for each package that contains unit tests. So, if your computer's fans start to sound like a jet engine at idle 🛩 ... this is why.

<!-- there should be ONE test file per folder within a package. The test file should inventory and test everything in the folder -->

#### Document

This repository contains multiple levels of documentation:

1. Monorepo-Level Documentation
2. Package-Level Documentation
3. Folder-Level Documentation
4. File-Level Documentation

Each level of documentation focuses on a different part of this project. The monorepo-level documentation focuses on installing and contributing to this project. The package-level documentation focuses on installing and using packages in your own projects. The folder-level documentation focuses both using and adding to the functionality of the files within a folder, and the file-level documentation focuses on the details of the code within the file.

![Levels of Documentation](.readme/diagram-levels-of-documentation.png)

As you add to or modify the code in this repository, update every level of documentation. This helps other contributors understand what you changed.

When most of us read an unfamiliar piece of code, several questions flash through our minds: "what does this code do?", "what happens if I change it?", "who wrote it?", "why?", and "what were they thinking?". To understand the code, we have to understand the **context** in which it was written. Context is the intersection between the person who wrote the code, the problem they were trying to solve, and the information available to them at the time. Unfortunately, code itself doesn't communicate context. To fix this, we need to write **documentation**. Documentation explains what the code does, why you should use it, how it works, and how you can modify it. It saves us the hours of detective work and the tedium of testing the code to learn what it does. Without it, most of us will literally ignore the code, rendering it useless. When documentation is successful, we take the time to read it. We don't skip over it, because we know that it will save us time testing the code.

When you make changes to the code, include the following details in each level of documentation:

| Level of Documentation | Details to include:                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Monorepo               | <ul><li>Link to the package that contains your code, in `README.md` > Usage > Packages</li><li>If the package exports a component, a storybook.js demo of the component. For more details on how to add a component to a storybook, consult the [README of `storybook` folder](./packages/storybook/README.md) inside `packages`.</li></ul>                                                                                                                                                                                                                                                                                                                              |
| Package                | <ul><li>List of methods, components, classes, functions, modules, or any other "things" that your code provides to its users, in `packages/.../<name-of-package>/README.md` > Usage</li></ul>                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| Folder                 | <ul><li>Link to the file that contains your code in `packages/.../<name-of-package>/.../<folder>/README.md` > Contents</li><li>Any changes or additions to the overall functionality of the code contained within `packages/.../<name-of-package>/.../<folder>/`. This includes how logic is spread through the files in the folder, and how the files depend on each other.</li><li>The same list of methods, components, classes, functions, modules, or any other "things" that you added to the package-level documentation.</li><li>Any special instructions for adding to or changing the code within a file, including how it affects its dependencies.</li></ul> |
| File                   | Any [`tsdoc`](https://tsdoc.org/), [`jsdoc`](https://jsdoc.app), [`vue-docgen`](https://vue-styleguidist.github.io/docs/Docgen.html) or other [multi-line comments](https://www.w3schools.com/js/js_comments.asp) that describe what each block of code does. This includes the parameters it accepts, the arguments it returns, the side effects (also known as state changes) it has when it runs, and the reason you structured the code as you did.                                                                                                                                                                                                                  |

This repository uses [Storybook](https://storybook.js.org) to generate **live** demos for each Vue component in App stencils. Storybook runs each component and displays the result in the browser. To launch the storybook `lerna run storybook:serve`.

![`lerna run storybook:serve`](.readme/storybook-serve.gif)

### Publish

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
