# Contribute to app-stencils:

- discuss nx

  - custom plugins
  - polyglot
  - build configs hoisted to parent Folder
  - as much as possible, build configs kept out of root

    ```
    /typescript
      vite.config.base.ts
      .prettierrc
      .prettierignore
      .eslintrc.json

      /vue
        vitest.config.ts

      /react

    /go
      /<package name>
        go.sum
        go.mod

    /nx
      /plugin-vue
      /plugin-react
      /plugin-go
    ```

- we use the monorepo pattern so that we can make changes to all of our modules, without breaking their dependencies.
<!--
What are the prerequisites for contributing to the code?
    * provide users with containerized development environments, virtual machines, or, if developing for an embedded system, a pre-built OS image. Don't make them set up an environment from scratch.
-->

### Develop:

<!--
Tell your reader how to run the code in the development environment
-->

#### Repository Structure:

- discuss nx

<!--
List each file, and what it does.
    * Identify whether you are open to pull requests for a specific file or not.
-->

| File or Folder | What does it do? | When should you modify it? |
| :------------- | :--------------- | :------------------------- |
|                |                  |                            |

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
