# Contribute to App Stencils:

## Setup

1. [Install pnpm v7.x](https://pnpm.io/installation)
2. Clone this repository.
3. run `pnpm -i`

## Develop

### Create new packages with `pnpm create-package <path to package>/<name of package>` 
* where `<path to package>` is one of
  * `packages/vue3`
  * `packages/shared`
* and `<name of package>` is the name of the package you want to make.
  * Keep in mind that `<name of package>` must:
    * be kebab-cased (e.g. `my-fun-package`)
    * not start with a number
    * be different from the name of any other packages.

Choose `packages/vue3` for `<path to package>` if you want to create a vue component. e.g.
```
pnpm create packages/vue3/component-awesome
```
This command will stub out `@incremental.design/component-awesome` inside `packages/vue3/component-awesome`
* Make sure that you prefix any vue component with `component-` (e.g. `component-a`, `component-b`, `component-c`). This makes it much easier to tell that a package exports a single component.

Choose `packages/shared` for `<path to package>` if you want to create a typescript module. e.g.
```
pnpm create packages/shared/library-awesome
```
This command will stub out `@incremental.design/library-awesome` inside `packages/shared/library-awesome`
  


### Format your commits:

You must include the following information in your commits. Otherwise, Git will reject them.

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
* type and subject: `feat(plumbus): repurpose the batch of schleem`
* body: 
  ```
  1. Add the `dinglebopper` to the `blamf`.
  2. Cut the `fleeb`.
  3. Chumble the `hizzards`.
  4. Make the `plumbus`.

  See: https://www.youtube.com/watch?v=eMJk4y9NGvE
  ```

### Install [Volar](https://github.com/johnsoncodehk/volar)
Volar enables typescript intellisense for Vue components within your editor of choice:
- [Install in VSCode](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
  - If you use VSCode, don't forget to enable [takeover mode](https://github.com/johnsoncodehk/volar/discussions/471), or Volar won't work.
- [Install in Panic Nova](https://extensions.panic.com/extensions/com.tommasonegri/com.tommasonegri.Vue/)

### Install ESlint
eslint enforces typescript naming conventions, and formats your code on save.
- [install ESlint in VSCode](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [install ESlint in Panic Nova](https://extensions.panic.com/extensions/apexskier/apexskier.eslint/)

Note that if you have prettier installed in either [VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) or in [Panic Nova](https://extensions.panic.com/extensions/alexanderweiss/alexanderweiss.prettier/) you MUST disable this extension when you work in this monorepo! Otherwise, you will end up double-formatting this code every time you save.

- If you're using VScode, once you install Volar _and_ enable takeover mode, you should get syntax highlighting, intellisense, and formatting in your `.vue`,`.ts`, and `.js` files. If you don't:
  1. use cmd-shift-p to bring up the command palette.
  2. Type "Format document with" into the palette, and press enter.
  3. Select "Configure default formatter", and press enter.
  4. Select "Vue Language Features (Volar)"

### Build the code
run `pnpm build`

To delete and reinstall `node_modules` folders before a rebuild, run `pnpm clean && pnpm i`

<!-- todo: test with vitest -->
<!-- need to explain that you should populate the <package-name>.test.ts file with whatever test and then run pnpm test and it will continuously watch as you code -->

<!-- todo: document components. right now this doesn't exist because we don't have a documentation site within this repo -->

<!-- todo: publish instructions. right now no publish because CI/CD isn't set up. Also, need to be able to publish locally without hitting actual npm repo -->
