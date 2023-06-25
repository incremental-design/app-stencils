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

`app-stencils` is a polyglot monorepo. It contains typescript, <!-- python, go, swift, and rust --> code.

- Components are organized by language and target
- The language folder contains language-level boilerplate.
- The target folder contains target-level boilerplate.
- Component folders do not contain any boilerplate, apart from the language's package manifest.

```
/.nx                      scripts that build the components in
                          this repo

/.vscode                  configuration specific to vscode
/.nova                    configuration specific to panic nova

/python

  /nix                    components that run in nixOS containers
    <component>
    <component>
    ...

  ???                     pip or conda? Some sort of workspace
                          package manager?

/go

  /ffi                    components that are embedded into native
                          MacOS, iOS and Android apps via (FFI)
    <component>
    <component>
    ...

  /nix                    components that run in nixOS containers
    Dockerfile            the dockerfile that builds the nixOS
                          containers
    <component>
    <component>
    ...

  /shared                 components that run in other go targets
    <component>
    <component>
    ...

  /wasm                   components that run in webassembly
                          runtimes
    <component>
    <component>
    ...


/swift

  /iOS                    components that are included in iOS
                          applications
    /<component>
    /<component>
    ...

  /MacOS                  components that are included in MacOS
                          applications
    /<component>
    /<component>
    ...

  /nix                    components that run in nixOS containers
    Dockerfile            the dockerfile that builds the nixOS
                          containers
    /<component>
    /<component>
    ...


  /shared                 components that are shared among other
                          swift targets
    /<component>
    /<component>
    ...

  ???                     an xcode workspace? something for swift
                          package manager?

/typescript

  /bun                    components that run on the edge, in
                          bun.js
    /<component>
    /<component>
    ...

    bun.build.ts          bun-specific build and test commands

  /nx                     plugins for the nx build scripts that
                          are specific to the languages and
                          targets in this repository

  /vue3                   components that run in vue.js websites
    /<component>
    /<component>
    ...

    vite.config.ts        vue-specific configuration for vite and
                          vitest

  /shared                 components that run within the other
                          typescript targets
    /<component>
    /<component>
    ...

    vite.config.ts        shared library configuration for vite
                          and vitest

  pnpm-lock.yaml          lockfile for all packages used in
                          typescript components
  pnpm-workspace.yaml     configuration for pnpm package manager
  .prettier.config.js     configuration for prettier
  .eslint.config.js       configuration for eslint
  tsconfig.json           configuration for typescript

/rust

  /ffi                    components that are embedded into native
                          MacOS, iOS and Android apps via (FFI)
    /<component>
    /<component>
    ...

  /shared                 components that are shared with within other
                          rust targets
    /<component>
    /<component>
    ...

  /wasm                   components that run in webassembly runtimes
    /<component>
    /<component>
    ...

  cargo.toml              configuration for cargo package manager

nx                        nx executable
nx.json                   configuration for nx build scripts in /.nx
Vagrantfile               configuration for the MacOS VM that
                          builds all swift components.
```

To start developing, run `vagrant up` and then `./nx g @incremental.design/<language>:<target>`

This will create a new component in the `/<language>` and `/<target>` of your choice. This component will be

- [formatted](#format), when you run `./nx format`
- [linted](#lint), when you run `./nx lint`
- [documented](#document) when you run `./nx docgen`
- formatted, linted and [built](#build), when you run `./nx build`
- formatted, linted, built and [tested](#test), when you run `./nx test`
- formatted, linted, built, tested and [profiled](#profile), when you run `./nx profile`
- formatted, linted, built, tested, api documentation generated, and packaged for [publishing](#publish) when you run `./nx publish`
  - note that this will not actually publish

you can add the `--watch` flag to any of the aformentioned commands (e.g. `./nx) to continuously re-run the command every time you modify the component.

If you just want to try out a component (e.g. a project scaffolded with a JS framework's CLI), you can create a folder inside the `/<language>` of your choice, and use the language's package manager to import other components in the `/<language>`'s `/<target>`s. However, this component will NOT be automatically and continuously built. Also, I will not accept pull requests that contain components that are not created using `./nx g @incremental.design/<language>:<target>`.

To import components within `app-stencils` (e.g. to import a component in `/typescript/shared`), use the language's package manager (e.g. pnpm add `<name of package>`). Each language has its own package manager:

| Language   | Package import                                            |
| :--------- | :-------------------------------------------------------- |
| python     |                                                           |
| go         | `go get incremental.design/<target>/<name of package>`    |
| swift      |                                                           |
| typescript | `pnpm add @incremental.design/<target>-<name of package>` |
| rust       |                                                           |

<!-- https://pnpm.io/workspaces -->

#### Why monorepo?

Monorepos let us combine the components we build, without accidentally breaking dependents. It even lets us write

#### Why polyglot?

Different languages have different strengths. It makes more sense to combine them together in microservices and client-side code than it does to try and reimplement the features and libraries present in one language in another. E.g. it's less work to make a native UI in swift than it is to draw equivalent UI components in rust. It's less work to analyze data in python than it is to do so in Go.

<!-- don't forget to set gopls "experimentalWorkspaceModule" to "true". see: https://earthly.dev/blog/golang-monorepo/ -->

#### Why Nx?

Nx facilitates powerful code generation and dependency detection. It also supports continous, incremental rebuilding. Every time you save changes to a component, Nx can automatically rebuild and re-test it and its dependents. It can detect broken integration points before you publish components.

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
