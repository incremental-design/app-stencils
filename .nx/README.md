# How to use portable Nx

The `.nx` folder contains a portable build of the Nx monorepo manager. Nx generates, installs dependencies, builds and tests packages.

Nx scans the directories in `app-stencils`, looking for `project.json` files. Each `project.json` file specifies **targets**. Targets are tasks that Nx can perform upon a directory. Each target contains an **executor** and **options**. Executors are procedures that nx can run. Options are configuration that Nx passes into the executor. For example:

```json
{
  "root": "./typescript",
  "targets": {
    "install": {
      "executor": "nx:run-commands",
      "options": {
        "command": "cd ./typescript && pnpm i"
      }
    }
  }
}
```

The `install` target uses the `nx:run-commands` executor. This executor reads the `options`, and runs the command `cd ./typescript && pnpm i`.

Nx also provides **generators**. A generator is a procedure that Nx runs in order to create a new directory. Generators can stub files, update dependencies, and even set up project.json files.

Generators live in the `tasks` directory.

To run a generator, `cd` to the root of this repository, and run any of the following commands:

You can [create a generator](https://nx.dev/extending-nx/recipes/local-generators). When you are finished, make sure you add it to the [list of available generators](../CONTRIBUTE.md#create-packages).

<!-- todo: explain dependency inference -->
<<<<<<< Updated upstream
=======

<!-- tasks contains custom executors. so, you don't have to drop to shell every time -->

<!-- but where do we put generators? -->

<!-- to build/update, cd ./nx/tasks && pnpm run build -->
>>>>>>> Stashed changes
