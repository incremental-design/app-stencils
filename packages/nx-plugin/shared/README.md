# nx-plugin-shared-new

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build nx-plugin-shared` to build the library.

How it works

[] give some context to nx
[] explain the general idea of an nx generator and executor

[] explain that everything is built with vite
[] explain that eslint uses nrwl/linter

[] explain what the generator does

[] explain that executors call each other automatically publish calls document, which calls build, which calls test, which calls lint, which calls format

[] explain that package json and vite config are exposed, so that dependencies can be added and externalized to keep bundle size small

[] need to explain that tsconfig.json is just there to make typescript and volar work. don't actually edit it.

[] need to explain that the eslintrc.json HAS to be included or @nrwl/linter rules cannot be used

// need to make sure that this plugin installs the tsconfig.base.json when it is first run
