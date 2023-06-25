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

nx.json                   configuration for nx build scripts in /.nx
Vagrantfile               configuration for the MacOS VM that
                          builds all swift components.
```

To start developing, run `vagrant up` and then `./nx g @incremental.design/<language>:<target>`

This will create a new package in the `/<language>` and `/<target>` of your choice. This package will be incrementally and continously

- formatted, when you run `./nx format`
- linted, when you run `./nx lint`
- formatted, linted and built, when you run `./nx build`
- formatted, linted, built and tested, when you run `./nx test`
- formatted, linted, built, tested and profiled, when you run `./nx profile`

you can add the `--watch` flag to any of the aformentioned targets (e.g. `./nx)

If you just want to try out a component (e.g. a project scaffolded with a JS framework's CLI), you can create a folder inside the `/<language>` of your choice, and use the language's package manager to import other components in the `/<language>`'s `/<target>`s. However, this component will NOT be automatically and continuously built. Also, I will not accept pull requests that contain components that are not created using `./nx g @incremental.design/<language>:<target>`.

To import components within `app-stencils` (e.g. to import a component in `/typescript/shared`), use the language's package manager (e.g. pnpm add `<name of package>`). Each language has its own package manager:

| Language   | Package import                                            |
| :--------- | :-------------------------------------------------------- |
| python     |                                                           |
| go         | `go get incremental.design/<target>/<name of package>`    |
| swift      |                                                           |
| typescript | `pnpm add @incremental.design/<target>-<name of package>` |
| rust       |                                                           |

#### Why monorepo?

Monorepos let us combine the components we build, without accidentally breaking dependents. It even lets us write

#### Why polyglot?

Different languages have different strengths. It makes more sense to combine them together in microservices and client-side code than it does to try and reimplement the features and libraries present in one language in another. E.g. it's less work to make a native UI in swift than it is to draw equivalent UI components in rust. It's less work to analyze data in python than it is to do so in Go.

<!-- don't forget to set gopls "experimentalWorkspaceModule" to "true". see: https://earthly.dev/blog/golang-monorepo/ -->

#### Why Nx?

Nx facilitates powerful code generation and dependency detection. It also supports continous, incremental rebuilding. Every time you save changes to a component, Nx can automatically rebuild and re-test it and its dependents. It can detect broken integration points before you publish components.

### Test:

<!--
When the reader runs the code, what are the expected inputs and outputs?
How can the reader tell if the code is malfunctioning?
-->

### Document:

<!--
How should the reader document changes and additions to the code?
-->

### Deploy:

<!--
How is the code deployed? When the reader submits a pull request, how is the code merged into main and converted into a package?
-->

<!--
Additional tip: SHOW, don't TELL
* DON'T try to sell your reader on using your code. Don't spend words on clever analogies or context. That material is great for a blog post or video, but bad for the documentation included in repository. Your reader wants to run the code, not read about it. Help your reader get to 'hello world' as fast as possible.
* DO make diagrams. A diagram can help yoru reader organize information in ways that words alone can't.
    * Do not put more than 50 nodes and edges into a single diagram. It will turn into an indecipherable spaghetti-string mess. Keep diagrams simple.
-->
