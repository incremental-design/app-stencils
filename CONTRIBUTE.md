# Contribute to app-stencils:

<!--
What are the prerequisites for contributing to the code?
    * provide users with containerized development environments, virtual machines, or, if developing for an embedded system, a pre-built OS image. Don't make them set up an environment from scratch.
-->

### Develop:

<!--
Tell your reader how to run the code in the development environment
-->

#### Repository Structure:

`app-stencils` is a polyglot monorepo. It contains Typescript and Go code.

- Packages are organized by language and environment
- The language folder contains language-level boilerplate.
- The environment folder contains environment-level boilerplate.
- Packages folders do not contain any boilerplate, apart from a `project.json`.

```
/.nx                      scripts that build the packages in
                          this repo

/.vscode                  configuration specific to vscode
/.nova                    configuration specific to panic nova

/go

  /ffi                    packages that are embedded into native
                          MacOS, iOS and Android apps via (FFI)
    <package>
    <package>
    ...

  /nix                    packages that run in nixOS containers
    Dockerfile            the dockerfile that builds the nixOS
                          containers
    <package>
    <package>
    ...

  /shared                 packages that run in other go packages
    <package>
    <package>
    ...

  /wasm                   packages that run in webassembly
                          runtimes
    <packaget>
    <package>
    ...

/typescript

  /bun                    packages that run on the edge, in
                          bun.js
    /<package>
    /<package>
    ...

    bun.build.ts          bun-specific build and test commands

  /nx                     plugins for the nx build scripts that
                          are specific to the languages and
                          targets in this repository

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
Vagrantfile               configuration for the MacOS VM that
                          builds all swift packages.
```

To start developing, run `vagrant up` and then `./nx g tasks/<language>:<environment>`

This will create a new component in the `/<language>` and `/<environment>` of your choice.

You can compose any of the other components in `/<language>` into this new component, by importing the other components with the language and framework specific tools.

<!-- show examples? Or, maybe make a jupyter notebook?? -->

Install the component's dependencies with `./nx i ./<language>/<environment>/<component>`

Test the component, with `./nx test ./<language>/<environment>/<component>`

- this will format and lint the component. If linting fails, this will fail.
- this will test the component, and all of the component's dependents. If any test fails, this will fail.

Build the component, with `./nx build ./<language>/<environment>/<component>`

- this will format and lint the component. If linting fails, this will fail.
- this will test the component, and all of the component's dependents. If any test fails, this will fail.
- this will build the component, and all of its dependents. If any build fails, this will fail.

you can add the `--watch` flag to any of the aformentioned commands to continuously re-run the command every time you modify the component.

you can run `./nx i`, `./nx test`, or `./nx build` against `./`, `./<language>`, `./<language>/<environment>`, to build all of the components contained within them.

<!-- need to support ./nx [test | build] <language>/<environment> to build everything in language environment folder -->
<!-- need to support ./nx [test | build] <language> to build everything in -->
<!-- need to support ./nx [test | build] -->

<!-- ./nx graph <language>/<environment>/<component> to show a graph of deps ? -->

If you just want to try out a component (e.g. a project scaffolded with a JS framework's CLI), you can create a folder inside the `/<language>` of your choice, and use the language's package manager to import other components in the `/<language>`'s `/<environment>`s. However, this component will NOT be automatically and continuously built. Also, I will not accept pull requests that contain components that are not created using `./nx g @incremental.design/<language>:<environment>`.

To import components within `app-stencils` (e.g. to import a component in `/typescript/shared`), use the language's package manager (e.g. pnpm add `<name of package>`). Each language has its own package manager:

| Language   | Package import                                                 |
| :--------- | :------------------------------------------------------------- |
| go         | `go get incremental.design/<environment>/<name of package>`    |
| typescript | `pnpm add @incremental.design/<environment>-<name of package>` |

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

### Format:

<!-- list formatting configs by language and target. explain the inputs and outputs for formatting steps -->

### Lint:

<!-- list lint configs by language and target. explain inputs and outputs -->

### Document:

<!-- list documentation (e.g. api documentation, test site generation) by language and target. explain how users should document code
by language and target -->

### Profile:

<!-- explain how each target is profiled for cpu and mem usage, speed -->

### Build

<!-- explain how each target is built -->
<!-- explain hermeticity (building in containers or vms) also note that even if you dev in a container, a nested container will be launched for build. that way you can't inadvertently screw up environment variables over the course of a dev session -->

### Test:

<!-- explain how each target is tested. explain how users should write tests that consume one or multiple targets -->

### Publish:

<!-- explain how each target is packaged for publishing. explain how CI publishes packages, and which branches and PRs have to pass before publish occurs. also explain how versioning works -->
