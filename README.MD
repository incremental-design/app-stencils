# App Stencils

[] make a banner image
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
This [monorepo](https://lerna.js.org/) contains all of the templates, components, plugins and utilities that incremental.design uses to make websites, web apps, and prototypes. Essentially, this is how we make great stuff fast 🏎.

# Installation:

This is a monorepo. That means that it contains several packages, each of which is published to [npm](https://www.npmjs.com/org/incremental.design?tab=packages). To use any of these packages, simply run `npm install @incremental.design/<name of package>` or `yarn add @incremental.design/<name of package>`.

# Usage:

How to use App Stencils in your codebase:
[ ] summarize the amazing new capabilities the reader will unlock when they use this project. Then describe how they can activate these capabilities.

## API Methods:

[ ] List the methods your project provides. Be sure to show readers what the project will do if they use each method.

## How App Stencils works:

[ ] Explain how execution works. What is the entry point for your code? Which files correspond to which functionality? What is the lifecycle of your project? Are there any singletons, side effects or shared state among instances of your project?

# Roadmap:

| Release | Goal:                                                                                                                        | Git Commit |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1.0     | Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for [Panic Nova.](https://nova.app) |            |
| 1.1     | Make a vue component that plays video with an alpha channel.                                                                 |            |
| 1.2     | Make a vue component for tabs.                                                                                               |            |
| 1.3     | Make a vue component that morphs SVGs.                                                                                       |            |

# Contribute to App Stencils:

[ ] Describe the tooling needed to develop your project in 3 sentences or less. Then list each step to set that tooling up.

## Setup:

1. Navigate to the root of this repository.
2. Run `lerna bootstrap`. This will install all of the new dependencies.
   [ ] asciicast or GIF of install prerequisites

- 🤔 `lerna bootstrap` replaces `yarn install`.
- 🛑 Do NOT run `yarn install` in any of these repositories.

### Repository Structure:

![All packages are inside the `packages` repository.](.readme/repo-structure.png)

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
| .eslintrc.json        | Contains the rules that ESlint uses to check `.js` and `.ts` files for errors.                                                      |                  |
| .gitattributes        | Contains a [list of files](https://git-scm.com/docs/gitattributes) that git should version with LFS.                                |                  |
| .gitignore            | Contains a [list of files](https://git-scm.com/docs/gitignore) that git should ignore.                                              |                  |
| .gitmodules           | Contains the list of submodules included in `template-repos`                                                                        |                  |
| .prettierrc.json      | Contains the [settings](https://prettier.io/docs/en/configuration.html) that prettier uses to format code.                          |                  |
| .commitlint.config.js | Contains the [settings](https://commitlint.js.org/#/reference-configuration) that commitlint follows when checking commit messages. | No               |
| lerna.json            | Contains the [configuration](https://github.com/lerna/lerna#lernajson) that Lerna uses to find, link, build and publish packages.   | No               |
| package.json          | Contains all of the dependencies of this project, as well as settings for building and publishing this project.                     | No               |
| README.md             | This document. You are here.                                                                                                        | No               |
| tsconfig.json         | Contains all of the settings that Typescript uses to interpret and compile `.ts` files.                                             | No               |
| yarn.lock             | [Lockfile](https://classic.yarnpkg.com/en/docs/yarn-lock/) that is automatically created by `lerna bootstrap`                       | No               |

## Develop:

2. Run `lerna run compile` to compile all of the typescript code in each package.

### Commit

This repository uses [commitlint](https://commitlint.js.org/#/reference-configuration?id=prompt). It will not let you commit your changes unless your commit message contains the following:

1. a **type**. A type is an indicator of what kinds of changes a commit contains. The types of commits are:

   | Type       | When to use it:                                |
   | :--------- | :--------------------------------------------- |
   | `chore`    | Whenever you make a change to the tooling      |
   | `docs`     | Whenever you make a change to the README       |
   | `feat`     | Whenever you add a new feature                 |
   | `fix`      | Whenever you fix a bug                         |
   | `perf`     | Whenever you make something faster             |
   | `refactor` | Whenever you change how your code is organized |
   | `test`     | Whenever you write a unit test                 |

2. a **subject**. A subject is a one-sentence description of the changes to a commit.

3. a **body**. A body is a list of the changes you made, split up by files changed and commands run. Think of it like a 'table of contents' for your commit.
   - You MUST begin your commit body with a blank line, or commitlint will complain.

Here is an example commit:

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

If you are using a git client, such as [Tower](https://www.git-tower.com/mac?gclid=CjwKCAjwt8uGBhBAEiwAayu_9alH0wnniAyMva6TGRRNLtSv2kftMmfa6egH1qzrEa7xFAnCXco24RoCoWYQAvD_BwE), it won't have access to your `$PATH`. When it tries to run the git hooks, it will fail, because some of the commands require access to `$PATH`. You can provide access to your `$PATH` as follows:

- [Add `$PATH to Tower`](https://www.git-tower.com/help/guides/integration/environment/mac)

### Run:

### Test:

### Document:

## Publish:

This project uses **semantic versioning.** That means that this project is structured into **releases.** A release is a version of the project that adds new features, changes existing features or replaces old features. There are three types of releases:

- Major
- Minor
- Patch

Each major release replaces one or more old features.

Each minor release adds one new feature.

Each patch improves one new feature.

1. Navigate to the root of this repository.
2. Run `lerna publish`. Lerna will ask you if you are publishing a patch, minor release or major release.

- ⚠️ Once you publish a package to `npm`, it's _really_ hard to unpublish it. Do not publish unless you are absolutely sure you want to do so.
