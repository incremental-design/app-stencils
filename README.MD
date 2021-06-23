# Vue Stencils

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

This project contains all of the tasks I need to do to make tooling for web development with Vue.js. Think of it like a [parts bin](https://www.youtube.com/watch?t=204&v=4E793WS72aU&feature=youtu.be) for the pieces of code I use to make sites work.

The goals of this project are to:

- Make a set of reusable pieces of code
- Improve the performance and reliability of the code over time
- reduce the amount of time fixing issues with websites that use the code

# Roadmap

| Release | Goal:                                                                                                                        | Git Commit |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------- |
| 1.0     | Set up a monorepo using Lerna. Then, add packages containing typescript and vue snippets for [Panic Nova.](https://nova.app) |            |
| 1.1     | Make a vue component that plays video with an alpha channel.                                                                 |            |
| 1.2     | Make a vue component for tabs.                                                                                               |            |
| 1.3     | Make a vue component that morphs SVGs.                                                                                       |            |

# Versioning

This project uses **semantic versioning.** That means that this project is structured into **releases.** A release is a version of the project that adds new features, changes existing features or replaces old features. There are three types of releases:

- Major
- Minor
- Patch

Each major release replaces one or more old features.

Each minor release adds one new feature.

Each patch improves one new feature.

# Developing

1. Navigate to the root of this repository.
2. Run `lerna bootstrap`. This will install all of the new dependencies.

- 🤔 `lerna bootstrap` replaces `yarn install`.
- 🛑 Do NOT run `yarn install` in any of these repositories.

2. Run `lerna run compile` to compile all of the typescript code in each package.

# Committing

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

# Publishing

1. Navigate to the root of this repository.
2. Run `lerna publish`. Lerna will ask you if you are publishing a patch, minor release or major release.

- ⚠️ Once you publish a package to `npm`, it's _really_ hard to unpublish it. Do not publish unless you are absolutely sure you want to do so.
