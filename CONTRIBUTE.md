# Contribute to app-stencils:

<!--
What are the prerequisites for contributing to the code?
    * provide users with containerized development environments, virtual machines, or, if developing for an embedded system, a pre-built OS image. Don't make them set up an environment from scratch.
    * the point of containerized dev env is to prevent the environment from leaking out - it should be totally optional (to a point)
-->

<!-- todo: a single nixos container with a shared volume to desktop. the idea is that anything that needs xcode will be run on a macos desktop. everything else will be run in a nixos box -->

### Develop:

<!-- todo: containerized (or VM) development environment -->

`app-stencils` is a polyglot monorepo. It contains Typescript and Go code.

- Packages are organized by language and environment
- The language folder contains language-level boilerplate.
- The environment folder contains environment-level boilerplate.
- Packages folders do not contain any boilerplate, apart from a `project.json`.

```
/.nx                      scripts that build the packages in
                          this repo

/.vscode                  configuration specific to vscode

/go

  /gomobile               packages that are embedded into native
                          MacOS, iOS and Android apps via (FFI)
    <package>
    <package>
    ...

  /shared                 packages that run in other go packages
    <package>
    <package>
    ...

  /wasm                   packages that run in webassembly
                          runtimes
    <package>
    <package>
    ...

/typescript

  /vue3                   packages that run in vue.js websites
    /<package>
    /<package>
    ...

    vite.config.ts        vue-specific configuration for vite and
                          vitest

  /shared                 packages that run within the other
                          typescript targets
    /<package>
    /<package>
    ...

    vite.config.ts        shared library configuration for vite
                          and vitest

  pnpm-lock.yaml          lockfile for all packages used in
                          typescript packages
  pnpm-workspace.yaml     configuration for pnpm package manager
  .prettier.config.js     configuration for prettier
  .eslint.config.js       configuration for eslint
  tsconfig.json           configuration for typescript

nx                        nx executable
nx.json                   configuration for nx build scripts in /.nx
```

- **Download and install all dependencies for all packages**, with `./nx run-many --target=install`
- **Build all packages** with `./nx run-many --target=build`
- **test all packages** with `./nx run-many --target=test --watch`

### Create Packages:

| Command                          | What it does                                                                                                                   |
| :------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `./nx g tasks/typescript:vue3`   | creates a vue3 component or plugin in /typescript/vue3/<package>                                                               |
| `./nx g tasks/typescript:shared` | creates a shared library in /typescript/shared/<package>                                                                       |
| `./nx g tasks/go:gomobile`       | creates a golang shared library that can be run within an iOS, iPadOS, MacOS, or android application in /go/gomobile/<package> |
| `./nx g tasks/go:wasm`           | creates a golang program or library that can be run within a webassembly runtime in /go/wasm/<package>                         |
| `./nx g tasks/go:shared`         | creates a golang library that can be imported into any other go package in /go/shared/<package>                                |

If you just want to try out a package (e.g. a project scaffolded with a JS framework's CLI), you can create a folder inside the `/<language>` of your choice, and use the language's package manager to import other packages in the `/<language>`'s `/<environment>`s. However, this package will NOT be automatically and continuously built. Also, I will not accept pull requests that contain packages that are not created using `./nx g @incremental.design/<language>:<environment>`.

### Compose Packages:

| Language   | environment | Package import                                          |
| :--------- | :---------- | :------------------------------------------------------ |
| typescript | vue3        | `pnpm add @incremental.design/vue3-<name of package>`   |
| typescript | shared      | `pnpm add @incremental.design/shared-<name of package>` |
| go         | shared      | `go get incremental.design/shared/<name of package>`    |

_do not try to import go/wasm or go/gomobile packages into each other. These packages should simply wrap go/shared packages with the bindings needed to run in their respective environments._

### Why polyglot?

Different languages have different strengths. It makes more sense to combine them together in microservices and client-side code than it does to try and reimplement the features and libraries present in one language in another.

### Why monorepo?

Monorepos help us reuse packages.

A dependent is a piece of code that re-uses a package. Whenever you change a package, you might break a dependent. Without a monorepo, it's impossible to track all of a package's dependents - and therefore impossible to find out what might've broken.

Monorepos put packages and their dependents in the same repository. They make it possible to find and test a package's dependents.

### Why Nx?

Testing can be a slow and tedious process - and it's one of the steps that we usually skip when we're in a hurry to build a new package.

Nx lints, formats, builds and tests packages _and_ their dependents _every time you modify the package's code_. It alerts you when a change you've made breaks a dependent, so that you don't have to manually check each dependent.

Without Nx, it's easy to introduce breaking changes that slip by undetected for several commits. When the bugs are finally detected, they often invalidate many of the commits that follow them, and take significant time to fix.

<!-- a note on how nx is used: every tool can be run manually, without nx. Sometimes, this is useful for debugging purposes. Nx just automates the running of each of these tools -->

### Document:

<!-- list documentation (e.g. api documentation, test site generation) by language and target. explain how users should document code
by language and target. make short checklist of what needs to be documented before a PR will be accepted -->

### Build

<!-- explain how each target is built -->

### Test:

<!-- explain how each target is tested. explain how users should write tests that consume one or multiple targets -->

### Publish:

<!-- explain how each target is packaged for publishing. explain how CI publishes packages, and which branches and PRs have to pass before publish occurs. also explain how versioning works -->

<!--
notes about nx build

project.json
  contains 'targets'

  a project is another name for a directory
  a target is an action that can be performed on the project


  todo: need to explain the workspace:* part of pnpm, and adding pnpm deps to other projects

  todo: explain that volar takeover mode requires disabling builtin typescript support https://vuejs.org/guide/typescript/overview.html#volar-takeover-mode

  todo: codegen - for a library to be used as a dependent, it needs to put an index.ts in <package name>/src
  also todo: codegen - need to name libraries as @incremental.design/<environment>-<package name>
 -->
