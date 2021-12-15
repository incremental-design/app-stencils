# Contribute to App Stencils:

Before you can contribute to app stencils, you need to install [Lerna](lerna.js.org).

You've probably used `npm` or `yarn` to manage your Vue projects. However, you can't use either of them in App Stencils, because this repository is managed by Lerna, which effectively replaces both of them. Much like `npm` and `yarn`, Lerna is a command line utility that you have to install globally.

- If you're on a Mac, the best way to to this is to install [homebrew](https://brew.sh), and then `brew install lerna`.
- To check if Lerna is installed on your computer, run `Lerna -v`. If it's installed, it will print the version number (e.g. `4.0.0`).

  ![`lerna -v`](./.readme/lerna-v.gif)

<!-- ![install brew.sh, and then `brew install lerna`]() -->

## Setup:

1. Navigate to the root of this monorepo.
2. Run `yarn`. This installs the tooling for this monorepo.
3. Run `lerna bootstrap`. This installs the dependencies for each of the packages in this monorepo.

   ![`lerna bootstrap`](./.readme/lerna-bootstrap.gif)

- 🛑 Do NOT run `yarn` inside _any_ of the packages in this monorepo.

## Repository Structure:

There are three types of files in App Stencils: configuration, code, and documentation.

- [Configuration](#configuration) files set up this repository's **toolchain** - the programs that run, build, test, and publish the code files.
- [Code](#code) files form this repository's **packages** - the libraries that App Stencils [publishes to npmjs.com](https://www.npmjs.com/org/incremental.design).
- [Documentation](#documentation) files explain how this repository's code and configuration files work.

### Configuration

App stencils contains several [tools](#develop) that help you turn source code into bundles that can be published to `npmjs.com`. Some of these tools run automatically, and others run on command. All of them follow the directives in their respective configuration files.

Most configuration files are located in the repository root.
![Most configuration files are in the root of the repository.](.readme/diagram-repo-structure-configuration.png)
As a general rule, you should NOT edit any of the configuration files, because doing so will either break your copy of the repository, or worse, introduce breaking changes into this repository’s published packages.

### Code

Most code is located inside the `packages` folder. App stencils splits the code in this folder into distinct packages, each of which can be used independently from the others.

![All packages are inside the `packages` folder.](.readme/diagram-repo-structure-code.png)

App Stencils groups packages according to their contents. Each package contains exactly ONE of the following types of content:

<table>
<thead>
<tr>
<th align="left">Type of content:</th>
<th align="left">Where to find it:</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Vue 3 <a href="https://v3.vuejs.org/guide/single-file-component.html">Component</a></td>
<td align="left"><code><a href="./packages/vue3/">packages/vue3/</a>component-&lt;name-of-component&gt;</code></td>
</tr>
<tr>
<td align="left">Typescript Module</td>
<td align="left"><code><a href="./packages/shared/">packages/shared/</a>&lt;name-of-package&gt;</code></td>
</tr>
</tbody>
</table>

### Documentation

App Stencils contains four levels of documentation.

1. Repository-Level Documentation
2. Package-Level Documentation
3. Folder-Level Documentation
4. File-Level Documentation

Each level of documentation focuses on a different aspect of App Stencils.

- The repository-level documentation focuses on installing and contributing to this project.
- The package-level documentation focuses on installing and using packages in your own projects.
- The folder-level documentation focuses on both using and adding to the functionality of the files within a folder.
- The file-level documentation focuses on the details of the code within a file.

![Levels of Documentation](.readme/diagram-levels-of-documentation.svg)

As you modify the code in this repository, update every level of documentation. This helps the rest of us understand what you changed.

When most of us read an unfamiliar piece of code, several questions flash through our minds: "what does this code do?", "what happens if I change it?", "who wrote it?", "why?", and "what were they thinking?". To understand the code, we have to understand the **context** in which it was written. Context is the intersection between the person who wrote the code, the problem they were trying to solve, and the information available to them at the time. Unfortunately, code itself doesn't communicate context. To fix this, you need to write **documentation**. Documentation explains what the code does, why you should use it, how it works, and how you can modify it. Documentation saves us the hours of detective work and the tedium of testing the code to learn what it does. Without it, most of us will literally ignore the code, rendering it useless. When documentation is successful, we take the time to read it. We don't skip over it, because we know that it will save us the time we would otherwise spend testing the code.

When you make changes to the code, include the following details in each level of documentation:

<table>
<thead>
<tr>
<th>Level of Documentation</th>
<th>Details to include:</th>
</tr>
</thead>
<tbody>
<tr>
<td>Repository</td>
<td><ul><li>Link to the package that contains your code, in <a href="./README.MD/#how-to-install-app-stencils"><code>README.md</code> → How to install App Stencils: → Packages</a></li></ul></td>
</tr>
<tr>
<td>Package</td>
<td><ul><li>List of methods, components, classes, functions, modules, or any other "things" that your code provides to its users, in <code>packages/.../&lt;name-of-package&gt;/README.md</code> → Usage</li></ul></td>
</tr>
<tr>
<td>Folder</td>
<td><ul><li>Link to the file that contains your code in <code>packages/.../&lt;name-of-package&gt;/.../&lt;folder&gt;/README.md</code> → Contents</li><li>Any changes or additions to the overall functionality of the code contained within <code>packages/.../&lt;name-of-package&gt;/.../&lt;folder&gt;/</code>. This includes how logic is spread through the files in the folder, and how the files depend on each other.</li><li>List of methods, components, classes, functions, modules, or any other "things" that your code provides to its users. This is the same list you added to the package level documentation.</li><li>Any special instructions for changing the code within a file, including a list of the sections of code that should <em>not</em> be altered.</li></ul></td>
</tr>
<tr>
<td>File</td>
<td><ul><li>Any <a href="https://tsdoc.org/"><code>tsdoc</code></a>, <a href="https://jsdoc.app"><code>jsdoc</code></a>, <a href="https://vue-styleguidist.github.io/docs/Docgen.html"><code>vue-docgen</code></a> or other <a href="https://www.w3schools.com/js/js_comments.asp">multi-line comments</a> that describe what each block of code does. This includes the parameters it accepts, the arguments it returns, the side effects (also known as state changes) it has when it runs, and the reason you structured the code as you did.</li></ul></td>
</tr>
</tbody>
</table>

App Stencils also contains a **Storybook** - a set of interactive demos of each Vue component in the repository. To launch these demos, run `lerna run storybook:serve`.

![`lerna run storybook:serve`](.readme/storybook-serve.gif)

Whenever you add Vue components to App Stencils, make sure you [demo it with Storybook](#demo-user-interface-components-with-storybook).

## Develop:

You have to build, test, document and package your code before the rest of us can use it. App Stencils’ tooling not only simplifies all of these tasks, but also makes it easy to collaborate with the rest of us. That’s because each of the following tools standardizes your code. Without them, it would be difficult for the rest of us to read and edit what you wrote.

<table>
<thead>
<tr>
<th>Tool</th>
<th>What it does:</th>
</tr>
</thead>
<tbody>
<tr>
<td><a href="#run-tools-with-lerna">Lerna</a></td>
<td>Splits the App Stencils codebase into multiple NPM packages, each of which can be separately installed. Runs Jest, Storybook, Vue CLI and tsc.</td>
</tr>
<tr>
<td><a href="#format-your-commits-with-commitlint">Commitlint</a></td>
<td>Formats commit messages, and rebuilds every package prior to each commit.</td>
</tr>
<tr>
<td><a href="#Write-your-code-in-typescript">Typescript</a></td>
<td>Type-checks your code as you write it.</td>
</tr>
<tr>
<td><a href="#check-your-code-with-eslint">ESlint</a></td>
<td>Checks your code for errors every time Lerna or Commitlint rebuild it.</td>
</tr>
<tr>
<td><a href="#format-your-code-with-prettier">Prettier</a></td>
<td>Formats <code>.ts</code>, <code>.js</code>, <code>.vue</code> and most other files every time you save your changes.</td>
</tr>
<tr>
<td><a href="#make-user-interfaces-with-vue-3">Vue 3</a></td>
<td>Provides a declarative and reactive framework for building UIs.</td>
</tr>
<tr>
<td><a href="#test-your-code-with-jest">Jest</a></td>
<td>Runs unit tests.</td>
</tr>
<tr>
<td><a href="#demo-user-interface-components-with-storybook">Storybook</a></td>
<td>Demos Vue 3 components.</td>
</tr>
<tr>
<td><a href="#document-your-code-with-tsdoc">TSdoc</a></td>
<td>Documents typescript and Vue code.</td>
</tr>
<tr>
<td><a href="#version-images-with-git-lfs">Git LFS</a></td>
<td>Stores all of the images and videos used in the documentation separately from the rest of the repository.</td>
</tr>
<tr>
<td><a href="#make-vue-3-packages-with-vue-cli">Vue CLI</a></td>
<td>Stubs out Vue 3 Packages.</td>
</tr>
<tr>
<td><a href="#make-typescript-packages-with-tsc">tsc</a></td>
<td>Stubs out Typescript Packages.</td>
</tr>
</tbody>
</table>

<!-- need to add a section on less and naming conventions ... otherwise less code is going to get super confusing -->

<!-- ### Use Lerna to run the other tools: -->

### Run tools with Lerna

Use `lerna <command>` to run tools in each of App stencils’ packages. Do not use `yarn <command>` or `npm <command>`.

Lerna lets you develop the code in App Stencils as if it was a single package, even though it's actually split into many packages. Without Lerna, this would be difficult, because you would have to manually run the same `yarn <command>` (e.g. `yarn install`, `yarn build`) in each package. When you run `lerna <command>`, (e.g. `lerna bootstrap`, `lerna build`), it actually runs the corresponding `yarn` command in every package at once. But that's not all - it also changes the location from which packages are retrieved. `yarn install` retrieves packages from `npmjs.com`, unless specifically configured otherwise. `Lerna bootstrap` retrieves packages from the `packages` folder. It only installs packages from `npmjs.com` if it can't find the package inside `packages`. This means that _you don't have to publish a package to `npmjs.com`_ before importing it into your code. Without Lerna, you would have to publish every package in `packages` to `npmjs.com` before you could use them.

Use the following Lerna commands to run tasks in App Stencils:

<table>
<thead>
<tr>
<th>Task</th>
<th>Lerna Command</th>
<th>Yarn command it replaces:</th>
<th>NPM command it replaces:</th>
</tr>
</thead>
<tbody>
<tr>
<td>Stub out a new Package</td>
<td><code>lerna create</code></td>
<td>n/a</td>
<td>n/a</td>
</tr>
<tr>
<td>Build Packages</td>
<td><code>lerna run build</code></td>
<td><code>yarn build</code></td>
<td><code>npm run build</code></td>
</tr>
<tr>
<td>Install the dependencies listed in each package's <code>package.json</code></td>
<td><code>lerna bootstrap</code></td>
<td><code>yarn install</code></td>
<td><code>npm install</code></td>
</tr>
<tr>
<td>Delete each package's <code>node_modules</code></td>
<td><code>lerna clean</code></td>
<td><code>rm -rf ./node_modules</code></td>
<td><code>rm -rf ./node_modules</code></td>
</tr>
<tr>
<td>Add a <a href="https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies">dependency</a> to all packages' <code>package.json</code></td>
<td><code>lerna add &lt;package&gt;</code></td>
<td><code>yarn add &lt;package&gt;</code></td>
<td><code>npm install &lt;package&gt;</code></td>
</tr>
<tr>
<td>Add a <a href="https://docs.npmjs.com/cli/v7/configuring-npm/package-json#dependencies">dependency</a> to a specific package's <code>package.json</code></td>
<td><code>lerna add &lt;package&gt; --scope '@incremental.design/&lt;name-of-package&gt;'</code></td>
<td><code>yarn add &lt;package&gt;</code></td>
<td><code>npm install &lt;package&gt;</code></td>
</tr>
<tr>
<td>Add a <a href="https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies">dev dependency</a> to all packages' <code>package.json</code></td>
<td><code>lerna add --dev &lt;package&gt;</code></td>
<td><code>yarn add --dev &lt;package&gt;</code></td>
<td><code>npm install --save-dev &lt;package&gt;</code></td>
</tr>
<tr>
<td>Add a <a href="https://docs.npmjs.com/cli/v7/configuring-npm/package-json#devdependencies">dev dependency</a> to a specific package's <code>package.json</code></td>
<td><code>lerna add --dev &lt;package&gt; --scope '@incremental.design/&lt;name-of-package&gt;'</code></td>
<td><code>yarn add --dev &lt;package&gt;</code></td>
<td><code>npm install --save-dev &lt;package&gt;</code></td>
</tr>
<tr>
<td>Run each package's source code in a <a href="https://cli.vuejs.org/guide/cli-service.html#vue-cli-service-serve">Development Server</a></td>
<td><code>lerna run serve</code></td>
<td><code>yarn serve</code></td>
<td><code>npm run serve</code></td>
</tr>
<tr>
<td>Run unit tests</td>
<td><code>lerna run test:unit</code></td>
<td><code>yarn test:unit</code></td>
<td><code>npm run test:unit</code></td>
</tr>
</tbody>
</table>

### Format your commits with Commitlint

Your commit messages are only as useful as they are easy to read. When you write your commit messages according to Commitlint’s format, it helps us understand _why_ you made the commit in the first place. That’s because Commitlint’s format forces every commit message to carry the same types of information. This makes it easy for the rest of us to compare your commits to each other and follow your train of thought.

Commitlint will prevent you from making commits unless your commit message contains:

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

<table>
<tbody>
<!--  -->
<tr>
<th>Type</th>
<th>Subject</th>
</tr>
<!--  -->
<tr>
<td>feat(plumbus):</td>
<td>repurpose the batch of schleem</td>
</tr>
<!--  -->
<tr><th colspan="2">Body</th></tr>
<!--  -->
<tr><td colspan="2"><ol><li>Add the <code>dinglebopper</code> to the `blamf.</li><li>Cut the <code>fleeb</code>.</li><li>Chumble the <code>hizzards</code>.</li><li>Make the <code>plumbus</code>.</li></ol><br>See: <a href="https://www.youtube.com/watch?v=eMJk4y9NGvE">https://www.youtube.com/watch?v=eMJk4y9NGvE</a></td></tr>
<!--  -->
</tbody>
</table>

#### Break commits into small pieces:

Keep your commits small. A commit is the smallest set of changes needed to:

- make a single change to the build tooling.
- update the documentation for a single package.
- modify a single package.
- fix a bug in a single package.
- improve the performance of a single package.
- refactor a single package.
- test a single package.

In particular, a commit should _never_ contain changes to multiple packages.

When the rest of us browse your commit history, we should be able to understand the effect of each change you made. As the number of changes in a commit grows, this becomes harder to do. Furthermore, the more changes a commit contains, the more likely it is to introduce a bug. When you keep your commits small, it's easier for the rest of us to reason about them and isolate bugs. If your commits are small enough, none of us will have trouble understanding what they affect and why you made them.

#### Troubleshoot Commitlint:

Git clients, such as [Tower](https://www.git-tower.com/mac?gclid=CjwKCAjwt8uGBhBAEiwAayu_9alH0wnniAyMva6TGRRNLtSv2kftMmfa6egH1qzrEa7xFAnCXco24RoCoWYQAvD_BwE) do not have access to your `$PATH` by default. Commitlint cannot function unless you manually provide your Git client with your `$PATH`. You can do this as follows:

<table>
<thead>
<tr>
<th align="left">Git Client</th>
<th align="left">Platform</th>
<th align="left">How to provide <code>$PATH</code></th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Git Tower</td>
<td align="left">MacOS</td>
<td align="left"><a href="https://www.git-tower.com/help/guides/integration/environment/mac">https://www.git-tower.com/help/guides/integration/environment/mac</a></td>
</tr>
<tr>
<td align="left">Github Desktop</td>
<td align="left">MacOS</td>
<td align="left"></td>
</tr>
<tr>
<td align="left">Sublime Merge</td>
<td align="left">MacOS</td>
<td align="left"></td>
</tr>
</tbody>
</table>

If Lerna is installed in your home directory, your git client probably won't be able to find it, and will error when you try to commit.

1. To find out if Lerna is installed in your home directory, run `which lerna`. If the terminal responds with `~/.npm-global/bin/lerna`, then Lerna is installed in your home directory. If it responds `/usr/local/bin/lerna` or `/opt/homebrew/lerna` then it isn't.
2. To fix this, uninstall Lerna with `npm uninstall -g lerna`. Pay attention to the `-g` flag. It tells NPM to delete Lerna from `~/.npm-global/bin/`
3. Reinstall Lerna with `brew install lerna`. Brew will take care of installing Lerna in `/usr/local/bin`, or `/opt/homebrew/bin/lerna`, depending on your operating system and platform.

### Write your code in Typescript:

Before you write any code, make sure you install the Typescript extension for your editor.

<table>
<thead>
<tr>
<th align="left">Editor</th>
<th align="left">Extension</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left">Panic Nova</td>
<td align="left"><a href="https://extensions.panic.com/extensions/apexskier/apexskier.typescript/">https://extensions.panic.com/extensions/apexskier/apexskier.typescript/</a> <img src="./.readme/get-ts-extension-nova.gif" alt="How to install typescript in Panic Nova"></td>
</tr>
<tr>
<td align="left">VScode</td>
<td align="left">Typescript extension is built in - there's nothing to install.</td>
</tr>
<tr>
<td align="left">Sublime Text</td>
<td align="left"><a href="https://packagecontrol.io/packages/TypeScript">https://packagecontrol.io/packages/TypeScript</a></td>
</tr>
</tbody>
</table>

If you want Typescript to give you helpful feedback as you type, you need to make sure that the Typescript language server is running. Although Typescript checks your code for errors, it doesn't share the results with your editor. When you install the Typescript language server, it connects typescript to your editor, so you can see errors as you type. And that's not all - it also augments your editor with autocompletion and jump-to-definition support. That means that as you type in the names of classes, objects, methods or functions, the Typescript language server will grab their options, and stick them into your editor's autocompletion menu. This lets you browse and select, rather than type (and misspell), options. It also locates the source code for any class, object, method or function that you import into your code, so you don't have to dig through the repository looking for it. It's like a spellcheck and dictionary, but for your code. Without the Typescript language server, you won't receive any of these assists.

#### Add type annotations to your code:

Type annotations make it easy to connect your code to the rest of the App Stencils codebase.

All of the App Stencils code compiles to browser-ready Javascript. However, the code is actually written in Typescript. That's because Javascript classes and functions don't indicate what inputs they receive, and what outputs they send. The only way to find out is to read the Javascript code, and test it out. This is a slow and frustrating experience that doesn't scale. No one has time to read and reason about all of the code they use. That's why we use typescript to read the code for us. It extends Javascript with [**type annotations**](https://www.typescriptlang.org/docs/handbook/2/basic-types.html) - standardized syntax that enumerates classes' and functions' inputs and outputs. When you add type annotations to your code, we don't have to read it before we use it. Typescript takes care of telling us what inputs we need to give your code, and what outputs we will receive. This literally doubles the pace at which we can write new code.

<!-- put any specific guidelines for what annotations to use here -->

<!-- mention using the typescript snippets in nova here -->

#### Follow Typescript naming conventions:

Whenever you create a typescript file, name it as follows:

<table>
<thead>
<tr>
<th>File:</th>
<th>Contents:</th>
<th>Capitalization:</th>
<th>Part of Speech:</th>
<th>Example:</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>*.ts</code></td>
<td>Typescript Classes or Functions</td>
<td>PascalCase</td>
<td>Subject</td>
<td><code>VueSeamlssStateMachine.ts</code></td>
</tr>
</tbody>
</table>

Whenever you add code to a `.ts` file within a package, name it as follows:

<table>
<thead>
<tr>
<th>Code:</th>
<th>Capitalization:</th>
<th>Part of Speech:</th>
<th>Example:</th>
</tr>
</thead>
<tbody>
<tr>
<td>exportable <code>const</code>, <code>var</code>, <code>let</code> or <code>class</code></td>
<td>PascalCase</td>
<td>Subject</td>
<td><code>ClickListener</code></td>
</tr>
<tr>
<td>object property</td>
<td>camelCase</td>
<td>Subject</td>
<td><code>ClickListener.duration</code></td>
</tr>
<tr>
<td>method</td>
<td>camelCase</td>
<td>Predicate</td>
<td><code>ClickListener.calculateVelocity(...)</code></td>
</tr>
</tbody>
</table>

When the rest of us read your code, we need to be able to guess the meaning of each word, without peeking at its type definitions or documentation. As the App Stencils codebase grows, this becomes more difficult. When you follow this naming convention, it makes this task easier. That's because the capitalization and part-of-speech indicate the affordances of the code behind the word. Even if we don't know the definition and behavior of a word, it's naming convention denotes its general characteristics. This reduces the likelihood that we will have to look up the meaning of a word to understand the code surrounding it. When you follow the naming convention, you improve the readability of your code.

### Check your code with ESlint:

<!-- have to explain how eslint is different from typescript -->

### Format your code with Prettier:

### Make user interfaces with Vue 3:

Every user interface component you write needs to be **irreducible** and **configurable**. A component is irreducible when the code that describes it cannot be split into separate modules without duplicating logic. A component is configurable when its code furnishes parameters that affect its appearance and behavior. There are dozens of frameworks for making user interface components. We use Vue because it occupies a special goldilocks zone in the world of app development: it is as versatile and powerful as it is familiar to programmers of different backgrounds. Whether you primarily code in Javascript, Typescript, PHP, or even Java or .net, Vue's single-file-component format functions as a lingua franca that you can pick up over time. like React and Angular, Vue's single-file-components enhance HTML and CSS with reactive logic and declarative paradigm. Unlike React, it doesn't make you interleave your HTML inside javascript, and unlike Angular, it doesn't make you learn Typescript before you can get started. Best of all, Vue is [really popular](https://www.techrepublic.com/article/considering-vue-js-here-are-5-reasons-youll-love-it/), so every Vue component you write can reach a wide audience.

<!-- maybe mention that there is a rich pre-existing vue component open source packages, so no need to start from scratch. Instead, just wrap the components in basecomponent -->

<!-- need to explain how to install vetur/volar and which one to use -->

<!-- todo: make a root-level vetur.config.js (?) and  -->

#### Follow Vue naming conventions:

Whenever you create a `vue` file, name it as follows:

<table>
<thead>
<tr>
<th>File:</th>
<th>Contents:</th>
<th>Capitalization:</th>
<th>Part of Speech:</th>
<th>Example:</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>*.vue</code></td>
<td>Vue component</td>
<td>PascalCase</td>
<td>Subject</td>
<td><code>VueSeamlssStateMachine.ts</code></td>
</tr>
</tbody>
</table>

Whenever you add code to a `.vue` file, name it as follows:

<table>
<thead>
<tr>
<th>Code:</th>
<th>Capitalization:</th>
<th>Part of Speech:</th>
<th>Example:</th>
</tr>
</thead>
<tbody>
<tr>
<td>Component or Directive</td>
<td>PascalCase</td>
<td><a href="https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential">Multi-Word</a> Subject</td>
<td><code>ClickListener</code></td>
</tr>
<tr>
<td>Data, Prop, Computed</td>
<td>camelCase</td>
<td>Subject</td>
<td><code>ClickListener.duration</code></td>
</tr>
<tr>
<td>Method</td>
<td>camelCase</td>
<td>Predicate</td>
<td><code>ClickListener.calculateVelocity(...)</code></td>
</tr>
<tr>
<td>Event</td>
<td><a href="https://vuejs.org/v2/guide/components-custom-events.html#Event-Names">kebab-case</a></td>
<td>Imperative</td>
<td><code>send-message</code>, <code>update-state</code>, <code>click</code></td>
</tr>
<tr>
<td>exportable <code>const</code>, <code>var</code>, <code>let</code> or <code>class</code></td>
<td>PascalCase</td>
<td>Subject</td>
<td><code>ClickListener</code></td>
</tr>
</tbody>
</table>

When we read your Vue components, we need to be able to guess the meaning of unfamiliar words, without searching for their definitions elsewhere in the App Stencils codebase. This is especially important in Vue single-file-components, which mix different syntaxes together, reducing readability. Just like the [words in your typescript files](#follow-typescript-naming-conventions), the words in your Vue components use capitalization and part-of-speech to indicate their affordances. This restores the readability of your Vue components.

<!-- #### Use Typescript in `<script>` sections -->

<!-- #### Use Less in `<style>` sections -->

<!-- add instructions on how to use the vue devtools -->

### Test your code with Jest:

<!-- there should be ONE test file per folder within a package. The test file should inventory and test everything in the folder -->

<!-- To test every package at once, `lerna run test:unit`.

This starts an instance of the Jest unit test framework for each package that contains unit tests. So, if your computer's fans start to sound like a jet engine at idle 🛩 ... this is why. -->

### Demo user interface components with Storybook:

The best Vue components are easy to customize, and easy to understand. Without Storybook, it's really hard to make a component that's both. That's because the more customizable a component is, the harder it is to predict its appearance and behavior. When you use Storybook, it helps the rest of us _see the component for ourselves_. That's because unlike inline documentation, Storybook actually runs the component, exposing all of its configuration details. It lets us reconfigure the component, and observe how it changes, so that we can learn by _doing_ rather than by _guessing_. When you demo components with Storybook, you maximize customizability, without maximizing confusion.

#### Add your component to Storybook:

1. Navigate to <a href="./packages/storybook/src/stories"><code>packages/storybook/src/stories</code></a> and make a new file `<NameOfComponent>.stories.ts`.

   ![Create `<NameOfComoponent>.stories.ts`](.readme/storybook-add-file.gif)

2. Run `lerna add '@incremental.design/<name-of-package>' --scope '@incremental.design/storybook'`

   ![](.readme/storybook-add-package.gif)

3. Import your component into the file:

   ```typescript
   + import <name-of-package> from '@incremental.design/<name-of-package>'
   ```

   ![Import your component into the file.](.readme/storybook-import-component.gif)

4. Add a section to the storybook, as follows:

   ```typescript
     import <name-of-package> from '@incremental.design/<name-of-package>'
   +
   + export default {
   + title '<Name of Component>'
   + }
   ```

   ![Add a story section to the file.](.readme/storybook-add-section.gif)

5. Add a story to the storybook, as follows:

   ```typescript
     import <NameOfComponent> from '@incremental.design/<name-of-package>'

     export default {
     title '<Name of Component>'
     }
   +
   + export const MyStory = ({
   +   components: {<NameOfComponent>},
   +   template: '<name-of-component></name-of-component>'
   + })
   ```

   ![Add a story to the section.](.readme/storybook-add-story.gif)

   The story initializes your component, with the `template` you provide.

   - You can add as many stories as you want. Each needs to contain `components` and a `template`. Consider writing a story for each of the configurations of your component. For more information on how to write stories, see [Storybook JS | What's a story?](https://storybook.js.org/docs/react/get-started/whats-a-story)

6. `Lerna boostrap && lerna run storybook:serve` to view your storybook.

   ![Serve the storybook.](.readme/storybook-serve-component.gif)

### Document your code with TSdoc:

### Version images with Git LFS:

### Make Vue 3 packages with Vue CLI:

You probably want your Vue Components to load fast. The best way to do that is to package each of them separately. However, making packages is hard. It's much simpler to stick all of your Vue components into a single folder and package them together - bundle size be damned. Vue CLI fixes this problem. It makes Vue packages for you. Without it, you would have to manually configure every Vue package.

#### Stub out a Vue package:

1.  `cd` into `packages/vue3`

    ![`cd packages/vue3`](.readme/vue-cli-cd.gif)

2.  run `vue create <name-of-package>`, and answer the following prompts:

    ![`vue create component-tabs`](.readme/vue-cli-create.gif)

    <table>
      <thead>
        <th>Prompt</th>
        <th>Answer</th>
      </thead>
      <tr>
        <td>Please pick a preset</td>
        <td>Manually Select Features</td>
      </tr>
      <tr>
        <td>Check the features needed for your project</td>
        <td><ul><li>Choose Vue Version</li><li>Babel</li><li>TypeScript</li><li>CSS Preprocessor</li></ul></td>
      </tr>
      <tr>
        <td>Choose a version of Vue.js that you want to start the project with</td>
        <td><code>3.x (Preview)</code></td>
      </tr>
      <tr>
        <td>Use class-style component syntax?</td>
        <td><code>N</code></td>
      </tr>
      <tr>
        <td>Use Babel alongside TypeScript (required for modern mode, auto-detected polyfills, transpiling JSX)?</td>
        <td><code>Y</code></td>
      </tr>
      <tr>
        <td>Pick a CSS pre-processor (PostCSS, Autoprefixer, and CSS Modules are supported by default):</td>
        <td>Less</td>
      </tr>
      <tr>
        <td>Where do you prefer placing config for Babel, ESLint, etc.?</td>
        <td>In dedicated config files</td>
      </tr>
      <tr>
        <td>Save this as a preset for future projects?</td>
        <td><code>N</code></td>
      </tr>
    </table>

3.  Navigate to `packages/vue3/<name-of-package>` and delete the `src/assets`, `src/components` and `public` folders.

    ![Delete `packages/vue3/<name-of-package>/src/assets`, `packages/vue3/<name-of-package>/src/components` and `packages/vue3/<name-of-package>/public`](.readme/vue-cli-delete-folders.gif)

4.  Navigate to `packages/vue3/<name-of-package>/src` and delete the `main.ts` file.

    ![Delete `packages/vue3/<name-of-package>/src/main.ts`](.readme/vue-cli-delete-main.gif)

5.  In `packages/vue3/<name-of-package>/src`, rename `App.vue` to `<NameOfComponent>.vue`. E.g. if `<name-of-package>` is `component-tabs`, then `<NameOfComponent>` should be `TabsComponent`. Make sure you PascalCase the name of this file.

    ![Rename `packages/vue3/<name-of-package>/src/App.vue](.readme/vue-cli-rename-app.gif)

6.  Navigate to `packages/vue3/<name-of-package>`, open `package.json`, and change the `scripts.build` command to `vue-cli-service build --target lib --modern --name <name-of-package> src/<NameOfComponent>.vue && rm -rf ./node_modules/.cache`

    ![Change `scripts.build` command in `packages/vue3/<name-of-package>/package.json`](.readme/vue-cli-package-json.gif)

7.  In `packages/vue3/<name-of-package>/package.json`, prepend `@incremental.design/` to the `name` field. This will scope the package to the `@incremental.design` namespace on [npmjs.org](npmjs.org).

    ![Scope the `name` field in `packages/vue3/<name-of-package>/package.json` to `@incremental.design/`](.readme/vue-cli-package-json-name.gif)

8.  In `packages/vue3/<name-of-package>/package.json`, add a:

- `main` field, and set it to `dist/<name-of-package>.common.js`
- `module` field, and set it to `src/<NameOfComponent>.vue`
- `types` field, and set it to `dist/types/<NameOfComponent>.vue.d.ts`
- `sideEffects` field, and set it to `true`.

  ![Add `main`, `module`, `types`, and `sideEffects` fields](.readme/vue-cli-package-json-fields.gif)

9. In `packges/vue3/<name-of-package>/package.json`, change the `private` field to `false`.

   ![Change `private` field](.readme/vue-cli-package-json-private.gif)

10. Navigate to `packages/vue3/<name-of-package>/tsconfig.json` and add a:

- `declaration` field, and set it to `true`,
- `declarationDir` field, and set it to `./dist/types`
- `declarationMap` field, and set it to `true`

  ![Add `declaration`, `declarationDir`, `declarationMap` fields to `tsconfig.json`](.readme/vue-cli-tsconfig.gif)

11. Navigate to `packages/vue3/<name-of-package>/src` and open `<NameOfComponent>.vue`. Then delete all references to the `HelloWorld` component from it.

    ![Delete all references to `HelloWorld.vue` from `packages/vue3/<name-of-package>/src/<NameOfComponent>.vue`](.readme/vue-cli-delete-hello-world.gif)

12. In `packages/vue3/<name-of-package>/src/<NameOfComponent.vue`, delete all references to the `./assets` folder.

    ![Delete references to `./assets` from `packages/vue3/<name-of-package>/src/<NameOfComponent>.vue`](.readme/vue-cli-delete-assets.gif)

13. In `package/vue3/<name-of-package>/src/<NameOfComponent.vue>`, delete the `name` field from the options object, and delete everything from the `<styles>` section.

    ![Delete `name` and contents of `<styles>`](.readme/vue-cli-remove-name.gif)

14. Navigate to `package/vue3/<name-of-package>` and create a `vue.config.js` file. Then, add the following to it:

    ```js
    + module.exports = {
    +    parallel: false,
    +    chainWebpack: (config) => {
    +      config.module
    +        .rule('ts')
    +        .use('ts-loader')
    +        .tap((options) => {
    +          options.transpileOnly = false;
    +          return options;
    +        });
    +      config.module
    +        .rule('tsx')
    +        .use('ts-loader')
    +        .tap((options) => {
    +          options.transpileOnly = false;
    +          return options;
    +        });
    +    },
    + };
    ```

    ![Make `vue.config.js`](.readme/vue-cli-vue-config-js.gif)

15. Run `lerna clean && lerna bootstrap && lerna run build` to reinstall all of the dependencies in `packages/vue3/<name-of-package>` and then build the package.

    ![Run `lerna clean && lerna boostrap && lerna run build`](.readme/vue-cli-lerna-bootstrap.gif)

16. Navigate to `vetur.config.js` and [register your package with Vetur](https://vuejs.github.io/vetur/guide/setup.html#advanced) by adding thefollowing object to the `projects` array:

    ```js
      module.exports = {
        settings: {
          "vetur.useWorkspaceDependencies": true,
          "vetur.experimental.templateInterpolationService": true
        },
        projects: [
    +     {
    +       root: "./packages/vue3/<name-of-package>",
    +       package: "./package.json",
    +       tsconfig: "./tsconfig.json"
    +     }
        ]
      },

    ```

    ![Register package with vetur](.readme/vue-cli-register-with-vetur.gif)

    <!-- Whenever you add a file or folder to a Vue package, name it as follows:

| Type:  | Contents: | Capitalization: | Part of Speech: | Example:          |
| ------ | --------- | --------------- | --------------- | ----------------- | --- |
| folder | anything  | kebab-case      | Subject         | `event-listeners` | --> |

<!-- need to explain /setup-function-members folder -->

<!-- keep vue files <300 lines of code -->

<!-- your package should have a single default export that contains the vue component, and no named exports -->

<!-- prefer the composition api to the options api
- need to explain what the two are, when the composition api became available, and why we use it

- when using the setup API order the code in your export as follows:

1. components
2. props
3. emits
4. setup
  1. injectionKey
  2. provide()
  3. inject
  4. any setup subroutines
  5. data + computed properties
  6. methods
  7. watchEffect
  8. watch
  9. onBeforeMount
  10. onMounted
  11. onBeforeUpdate
  12. onUpdated
  13. onActivated
  14. onDeactivated
  15. onBeforeUnmount
  16. onUnmounted
  17. onErrorCaptured
  18. onRenderTracked
  19. onRenderTriggered

  If you're using panic nova, you can do this automatically by installing the vue 3 clips extension and using the `setup()` clip (show a gif of using the setup clip)
 -->

<!-- when you use the options api, order the options in your vue component as follows

  1. components
  2. extends
  3. mixins
  4. props
  5. inject
  6. data
  7. provide
  8. computed
  9. methods
  10. watch
  11. emits
  12. directives
  13. beforeCreate
  14. updated
  15. activated
  16. deactivated
  17. beforeUnmount
  18. unmounted
  19. errorCaptured
  20. renderTracked
  21. renderTriggered

  If you're using panic nova, you can do this automatically by installing the vue 3 clips extension and using the `options` clip (show a gif of using the options snippet)
 -->

### Make Typescript packages with `tsc`:

The more Vue components you write, the more you will find yourself rewriting the same logic in each of them. Eventually, you'll wrap this logic in a Typescript module, and import it into each of your components. While this is always preferable to rewriting the same code over and over again, it can lead to dependency management issues. That's because _anything_ can import your typescript module, regardless of where it is located relative to your module. Without strict organization, what starts as just a handful of imports _will_ grow into a tangled mess. To prevent this, you need to place all of the typescript modules you want to reuse into packages that are located in the `packages/shared` folder. This helps the rest of us find and reuse the code you wrote, without getting lost in a maze of crisscrossing dependencies.

<table>
<thead>
<tr>
<th align="left">Before</th>
<th align="left">After</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><img src=".readme/diagram-repo-imports-bad.png" alt="Vue components importing typescript modules from each other."></td>
<td align="left"><img src=".readme/diagram-repo-imports-good.png" alt="Vue components importing typescript modules from packages/shared"></td>
</tr>
<tr>
<td align="left">This is bad because:</td>
<td align="left">This is good because:</td>
</tr>
<tr>
<td align="left"><ul><li>vue component packages have to export both vue components and typescript modules.</li><li>vue components import typescript modules from other vue component packages</li><li>Typescript modules import other typescript modules in different packages</li></ul></td>
<td align="left"><ul><li>Vue components only import typescript modules from the packages in the <code>packages/shared</code> folder</li><li>Typescript modules <em>don't</em> import modules from other typescript packages</li></ul></td>
</tr>
<tr>
<td align="left">This makes it difficult to update any of the typescript modules without introducing bugs that are difficult to trace and fix.</td>
<td align="left">This makes it easy to trace imports from within packages in the <code>packages/vue3</code> to packages in the <code>packages/shared</code> directory, and also guarantees that typescript modules that aren't in the same package never depend on each other. This makes shared code easier to locate, and update. It also makes bugs easier to trace and fix.</td>
</tr>
</tbody>
</table>

#### Stub out a typescript package:

1. Run `lerna create @incremental.design/<name-of-package> shared --access public --es-module --license MIT`, then answer the prompts that follow.

   ![`lerna create @incremental.design/input-event-listeners shared --access public --es-module --license MIT`](./.readme/lerna-create-package.gif)

    <table>
    <thead>
    <tr>
    <th align="left"><code>lerna create</code></th>
    <th align="left"><code>@incremental.design/&lt;name-of-package&gt;</code></th>
    <th align="left"><code>shared</code></th>
    <th align="left"><code>--access public</code></th>
    <th align="left"><code>--es-module</code></th>
    <th align="left"><code>--license MIT</code></th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td align="left">stubs out a <code>package.json</code> for...</td>
    <td align="left">a package that is <table><tbody><tr><td><a href="https://docs.npmjs.com/cli/v7/using-npm/scope">scoped</a> to</td><td><a href="https://www.npmjs.com/org/incremental.design"><code>@incremental.design</code></a></td></tr><tr><td><a href="https://docs.npmjs.com/cli/v7/configuring-npm/package-json#name">named</a></td><td><code>&lt;name-of-package&gt;</code></td></tr></tbody></table> and ...</td>
    <td align="left">is located at <code>packages/shared/&lt;name-of-package&gt;</code> and...</td>
    <td align="left">should be published to <code>npmjs.com</code>, and...</td>
    <td align="left">should have both a <a href="https://docs.npmjs.com/cli/v7/configuring-npm/package-json#main"><code>main</code> entry point</a> and a <a href="https://github.com/rollup/rollup/wiki/pkg.module"><code>modules</code> entry point</a>, and ...</td>
    <td align="left">should have the <code>MIT</code> open source license.</td>
    </tr>
    </tbody>
    </table>
    
   <br/>

    <table>
    <thead>
    <tr>
    <th align="left">Prompt</th>
    <th align="left">Answer</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td align="left"><code>package name</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>version</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>description</code></td>
    <td align="left">Explain what this package contains in up to 3 sentences.</td>
    </tr>
    <tr>
    <td align="left"><code>keywords</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>homepage</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>license</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>entry point</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>module entry</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    <tr>
    <td align="left"><code>git repository</code></td>
    <td align="left">Enter ↵</td>
    </tr>
    </tbody>
    </table>

2. Remove the `__tests__` folder from the package.

   Although you will add tests to your typescript packages, they won't live in the `__tests__` folder. Go ahead and delete it. Then open the `package.json` and remove the `directories.test` and `scripts.test` fields.

   ![Delete the `__tests__` folder, the `directories.test` and `scripts.test` fields](./.readme/remove-tests.gif)

3. Remove the `lib` folder from the package.

   Since all of your source code will go into `src`, the `lib` folder will never contain anything. Go ahead and delete it. Then, remove the `directories` field.

   ![Delete the `lib` folder, and the `directories` field](./.readme/remove-lib.gif)

4. Add typescript to the package.

   Before you can write Typescript code, you have to install Typescript. `cd` to `packages/shared/<name-of-package>` and run `lerna add --dev typescript`. Lerna will add `typescript` to your `package.json`'s `devDependencies`, create a `node_modules` folder, and install the `typescript` package, and its dependencies, within it.

   ![`lerna add --dev typescript`](./.readme/lerna-add-typescript.gif)

5. Stub out a typescript configuration file.

   Run `npx tsc --init` inside the `packages/shared/<name-of-package>` directory. This command will create a `tsconfig.json` file within it.

6. Set the Typescript target and module to `esnext`.

   To take full advantage of every feature that Typescript has to offer, you need to instruct it to compile and package your typescript code as `esnext` modules. This means that typescript won't add [polyfills](https://developer.mozilla.org/en-US/docs/Glossary/Polyfill) to your code to make it compatible with older browsers. While this might sound like a problem, it's actually a good thing. That's because polyfills reduce performance. Furthermore, you're writing a _library_. Other developers are going to import your library into their projects, and add whatever polyfills they see fit. When you ship your code as `esnext` modules, you give them the choice between performance and compatibility, rather than forcing a performance penalty upon them.

   Open your `tsconfig.json` file, and change the `target` field from `es5` to `esnext`. Then, change the `module` field from `commonjs` to `esnext`:

   ![set `target` and `module` fields to `esnext`](./.readme/tsconfig-target-module-esnext.gif)

7. Set typescript module resolution to `node`.

   Before you can import dependencies into your Typescript code, you have to tell Typescript to look inside the `packages/shared/<name-of-package>/node_modules` folder first. Uncomment `moduleResolution : "node"` in your `tsconfig.json` file to do this.

   ![Uncomment `moduleResolution: "node"`](./.readme/tsconfig-module-resolution.gif)

8. Enable source maps.

   If you want to debug like a 10x developer, you need to turn on source maps. They give your browser console a way to trace issues back to the source code that caused them. And when you use your typescript code within a Vue project, they even give the Vue inspector the ability to open your editor and locate the bug. Uncomment `sourceMap: true` to enable this time-saver.

   ![Uncomment `sourceMap: true`](./.readme/tsconfig-source-map.gif)

9. Enable declaration generation.

   You need to make sure that Typescript doesn't toss out all of the type annotations when it compiles your code. When you enable declaration file generation, Typescript scoops up all of the type annotations you wrote, and puts them in a [declaration](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html) file, adjacent to the code it compiled. To set up declaration generation you need to:

   - go to your `tsconfig.json` and
     - uncomment `declaration: true`
     - uncomment `declarationMap: true`
     - uncomment `declarationDir` and set it to `./dist/types`
   - go to your `package.json` and
     - add a `types` field, and set it to `./dist/types`

   This tells typescript to generate a declaration file every time it builds your code, and it in `packages/shared/<name-of-package>/dist/types`. It also tells typescript to look for type annotations in the `./dist/types` folder whenever it imports your code into another project.

   ![Enable declaration generation](./.readme/tsconfig-declaration.gif)

10. Tell Typescript what to compile.

    You need to tell Typescript what you want it to compile, before it will compile anything. Since all of your source code lives in the `src` folder of your package, you need to add the `"include": ["src/**/*"]` field to your `tsconfig.json`.

    ![Include `src`](./.readme/tsconfig-include-src.gif)

11. Tell Typescript where to put compiled code.

    You need to tell Typescript where it should put the code it compiles, or it will dump it directly into `packages/shared/<name-of-package>`. Since your package's `package.json` `main` field already points to `dist/`, you need to make sure Typescript does as well. Go to your `tsconfig.json`, Uncomment `outDir` and set it to `./dist/`.

    ![Set `outDir`](./.readme/tsconfig-outdir.gif)

12. Tell Typescript which types it needs to import.

    If you want Typescript to type-check any browser, Node or Jest API calls you make, you need to tell it to import the type declarations for those APIs:

- Uncomment `types` and set it to `["webpack-env","jest","node"]`
- Add the `lib` field to the `compilerOptions` field and set it to `["esnext", "dom", "dom.iterable", "scripthost"]`
- run `lerna add --dev @types/webpack-env --scope '@incremental.design/<name-of-package>' && lerna add --dev @types/jest --scope '@incremental.design/<name-of-package>' && lerna add --dev @types/node --scope '@incremental.design/<name-of-package>'`

  ![set `types` and `lib` fields](./.readme/ts-types-lib.gif)

13. Tell Typescript to resolve import statements relative to the package root.

    If you don't want to have to prefix all of your imports with `packages/shared/<name-of-package>`, you should tell Typescript NOT to look outside of your package for dependencies. After all, it shouldn't have to: Lerna already does the hard work of placing every dependency inside `packages/shared/<name-of-package>/node_modules`. To tell Typescript to look for dependencies within your package, uncomment the `baseURL` field.

    ![Uncomment `baseURL`](./.readme/ts-baseurl.gif)

14. Remove the unused parts of the typescript configuration file.

    Clean out your `tsconfig.json` file so that it's easier to read. Delete every line that is commented out. You should be left with:

    ```json
    {
      "compilerOptions": {
        /* Language and Environment */
        "target": "esnext" /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */,

        /* Modules */
        "module": "esnext" /* Specify what module code is generated. */,
        "moduleResolution": "node" /* Specify how TypeScript looks up a file from a given module specifier. */,
        "baseUrl": "./" /* Specify the base directory to resolve non-relative module names. */,
        "types": [
          "webpack-env",
          "jest",
          "node"
        ] /* Specify type package names to be included without being referenced in a source file. */,
        "lib": ["esnext", "dom", "dom.iterable", "scripthost"],

        /* JavaScript Support */

        /* Emit */
        "declaration": true /* Generate .d.ts files from TypeScript and JavaScript files in your project. */,
        "declarationMap": true /* Create sourcemaps for d.ts files. */,
        "sourceMap": true /* Create source map files for emitted JavaScript files. */,
        "outDir": "./dist/" /* Specify an output folder for all emitted files. */,
        "declarationDir": "./dist/types" /* Specify the output directory for generated declaration files. */,

        /* Interop Constraints */
        "esModuleInterop": true /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables `allowSyntheticDefaultImports` for type compatibility. */,
        "forceConsistentCasingInFileNames": true /* Ensure that casing is correct in imports. */,

        /* Type Checking */
        "strict": true /* Enable all strict type-checking options. */,

        /* Completeness */
        "skipLibCheck": true /* Skip type checking all .d.ts files. */
      },
      "include": ["src/**/*"]
    }
    ```

    ![Delete commented configuration fields](./.readme/tsconfig-delete-comments.gif)

15. Connect Typescript to Lerna.

    Congratulations! You've configured Typescript to compile your source code and place it in `/dist`. Now, it will compile your code whenever you run `npx tsc` inside your package. However, it won't compile your code when you run `lerna build`. To connect Typescript to Lerna, add `"build": "tsc"` to your `package.json`'s `script` field. Now, whenever you run `lerna build`, it will run your `package.json`'s `script.build` command for you.

    ![Add `"build": "tsc"` to `package.json`](./.readme/tsconfig-build-script.gif)

16. Convert the contents of your package's `src` to typescript.

    Typescript only pays attention to the `.ts`, `.tsx`, `.d.ts` files in your package's `src` folder. It will ignore any `.js` and `.jsx` files. This is a problem, because your package currently contains a single `.js` file: in `src/<name-of-package>.js`. If you ask Typescript to build your code, it won't find anything to build, and it will error instead. To fix this, change the `.js` extension in `src/<name-of-package>.js` to `.ts` (i.e. `src/<name-of-package>.ts`). Once you make this change, Typescript will be able to notice and compile the file.

    ![Convert `.js` files to `.ts`](./.readme/tsconfig-js-to-ts.gif)

17. Change your package's `src/<name-of-package>.ts` file to PascalCase.

    You need to follow the [naming conventions](#follow-typescript-naming-conventions) for typescript files. To do this:

    - change the name of `src/<name-of-package>.ts` to `src/NameOfPackage.ts`
    - change your package's `package.json`'s

      - `main` field from `dist/<name-of-package>.js` to `dist/<NameOfPackage>.js`
      - `module` field from `src/<name-of-package>.ts` to `src/<NameOfPackage>.ts`

      ![](.readme/tsconfig-pascalcase.gif)

    Once you're done, your package.json should look something like this:

    ```json
    {
    "name": "@incremental.design/<name-of-package>",
    "version": "0.0.0" /* This number may vary. Lerna will manage it for you. Don't touch it. */,
    "description": <whatever description you gave your package in step 1>
    "author": "Your Name <your email>",
    "homepage": "https://github.com/incremental-design/app-stencils#readme",
    "license": "MIT",
    "main": "dist/<NameOfPackage>.js",
    "module": "src/<NameOfPackage>.ts",
    "types": "dist/types<NameOfPackage>.d.ts",
    "files": [
      "dist",
    ],
    "publishConfig": {
      "access": "public"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/incremental-design/app-stencils.git"
    },
    "scripts": {
      "build": "tsc"
    },
    "bugs": {
      "url": "https://github.com/incremental-design/app-stencils/issues"
    },
    "devDependencies": {
      "typescript": "^4.4.2"
    }
    }
    ```

    And that's it! Congratulations! You set up a typescript package!

#### Make self-contained packages:

You probably want to write features, not bugs. Unfortunately, bugs are difficult to avoid, especially when your typescript modules depend on others. Even if your module is free of bugs, it can inherit bugs from the modules it imports. Therefore, the best way to limit the spread of bugs is to limit what your module imports. Don't import any typescript modules from other packages in the `packages/shared` folder. Only import from within the same package. If you absolutely need to import a module that is inside another package, move your module into that package, first. When you restrict the location of your imports, it keeps bugs from spreading among the packages in the `packages/shared` folder.

<table>
<thead>
<tr>
<th align="left">Before</th>
<th align="left">After</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><img src=".readme/diagram-package-imports-bad.png" alt="Typescript modules importing other typescript modules in other packages"></td>
<td align="left"><img src=".readme/diagram-package-imports-good.png" alt="Typescript modules importing other typescript modules within their own packages"></td>
</tr>
</tbody>
</table>

#### Sort the files in your `src` folder by their imports:

When you modify a module, you need to be able to find all of the files into which it was imported, so that you can check each one for bugs. If you don't organize your modules, this will become increasingly difficult as you add to your package. That's because there's no intrinsic relationship between a Typescript file, the modules it contains, and the locations into which those modules are imported. A single Typescript file can contain as many modules as you want, and each of those modules can be imported into any other file within the package. Every import adds complexity. The best way to manage that complexity is to restrict the the locations into which you import a module. You should only import a module into other files in the same folder or parent folder. You should never import a module into files in descendant or ancestor folders. The simplest way to achieve this outcome is to:

1. Place the modules you want to export from your package in one or more files in your package's `src/` folder.
2. Place the modules you _don't_ want to export from your package in one or more files files in one or more subfolders of your package's `src/` folder.
3. Only import from files in the same folder, and files in a subfolder. Do not import from files that are nested within a subfolder of a subfolder.

When you follow these organization rules, a module can only be imported by another module in the same folder, or a module in the parent folder. This reduces the number of files and folders you have to inspect to track down all of the locations in which a module was imported.

<table>
<thead>
<tr>
<th align="left">Before</th>
<th align="left">After</th>
</tr>
</thead>
<tbody>
<tr>
<td align="left"><img src=".readme/diagram-package-sort-bad.png" alt="Example of poorly-sorted modules"></td>
<td align="left"><img src=".readme/diagram-package-sort-good.png" alt="Example of well-sorted modules"></td>
</tr>
<tr>
<td align="left">Modules import from files in their parent or ancestor folders.</td>
<td align="left">Modules only import from files in the same folder, or files in a direct subfolder.</td>
</tr>
</tbody>
</table>

#### Use index files to export the contents of each subfolder:

Given that there isn't an intrinsic relationship between modules and the files that contain them, you might want to regroup modules in different files. However, doing this will change the paths to the modules, breaking everything that imports them. To fix this problem, all you need to do is add an `index.ts` file to your folder, and then `export * from <name-of-file>` for each of the other files in the folder. Then, you can `import <name-of-module> from src/<path-to-folder>`, without specifying the file in which the module lives. This makes your import statements much more resilient, and spares the rest of us the tedium of digging through your package's source code to find the specific file that contains a module.

![An `index.ts` file imports and re-exports every module in a folder.](.readme/diagram-index-file.png)

#### Follow naming conventions:

Whenever you add a folder to a typescript package, name it as follows:

<table>
<thead>
<tr>
<th>Type:</th>
<th>Contents:</th>
<th>Capitalization:</th>
<th>Part of Speech:</th>
<th>Example:</th>
</tr>
</thead>
<tbody>
<tr>
<td>folder</td>
<td>anything</td>
<td>kebab-case</td>
<td>Subject</td>
<td><code>event-listeners</code></td>
</tr>
</tbody>
</table>

When you kebab-case your folder names, it helps the rest of us differentiate them from the names of the Typescript classes, methods, functions, variables in your package.

Also, remember to follow the aforementioned [typescript naming conventions](#follow-typescript-naming-conventions) when you populate your folders with typescript files.

#### Share both a default export, and named exports from your package:

Your package needs to be **lightweight**. Ideally, it should add less than a dozen kilobytes to the [final bundle size](https://bundlephobia.com/) of any package that imports it. However, the more code your package contains, the heavier it will get ... unless you split your package into named exports. A named export makes it possible to export individual modules from your package. When we import a named export, only the module and the other modules it imports get added to our final bundle. When we import your package's default export, every module contained in the default export gets added to our final bundle.

To export both a default export, and one or more named exports from your package, you need to update the export statements in your package's `src/<name-of-package>.ts` file:

<table>
<tr><th align="left"><code>src/&lt;name-of-package&gt;.ts</code></th></tr>
<tr><th align="left">Before</th></tr>
<tr>
<td>
<pre>
<code class="language-typescript">  
import { rubChumble, pushDinglebop, repurposeSchleem, shavePlubis, cutFleeb, receiveGrumbo } from './utils'

export default { rubChumble, pushDinglebop, repurposeSchleem, shavePlubis, cutFleeb, receiveGrumbo }

</code>
</pre>
</td>
</tr>
<tr><th align="left">After</th></tr>
<tr>
<td>
<pre>
<code class="language-typescript">
import { rubChumble, pushDinglebop, repurposeSchleem, shavePlubis, cutFleeb, receiveGrumbo } from './utils'

export rubChumble;

export pushDinglebop;

export repurposeSchleem;

export shavePlubis;

export cutFleeb;

export receiveGrumbo;

export default { rubChumble, pushDinglebop, repurposeSchleem, shavePlubis, cutFleeb, receiveGrumbo }

</code>
</pre>
</td>
</tr>
</table>

<!-- need to double-check syntax -->

#### Overload named exports:

The more named exports your package contains, the more the rest of us have to learn before we can use any of them. That's because each export relates to the others, and we need to make sure we use the right export. The best way to reduce the number of named exports in your package, without reducing the functionality that you export is to [overload](https://www.typescriptlang.org/docs/handbook/2/functions.html#function-overloads) each of your module's functions, methods, classes, and class constructors, so that the same named export can be instantiated with more than one set of arguments. It's easier for the rest of us to figure out how to instantiate a single, overloaded function with just the right arguments than it is for us to choose the right export, when several of them seem to do the same thing.

## Publish

<!-- need to briefly go over how commits are cherry-picked into feature branches, and then squashed into the main branch -->

<!-- This project uses **semantic versioning.** That means that this project is structured into **releases.** A release is a version of the project that adds new features, changes existing features or replaces old features. There are three types of releases:

- Major
- Minor
- Patch

Each major release replaces one or more old features.

Each minor release adds one new feature.

Each patch improves one new feature.

To publish new versions of every package in this repository:

1. Navigate to the root of this repository.
2. Run `lerna publish`. Lerna will ask you if you are publishing a patch, minor release or major release.

- 🧐 Lerna runs this repository in [locked mode](https://github.com/lerna/lerna#fixedlocked-mode-default). That means that every package in this repository has the same version as the repository itself. Publishing any change to any package will increment the version for EVERY other package.

- ⚠️ Once you publish a package to `npm`, it's _really_ hard to unpublish it. Do not publish unless you are absolutely sure you want to do so. -->

<!-- * what you want the reader to do -->

<!-- * why?
   * desired outcome
   * underlying problem
   * action
   * compare action to doing nothing -->

<!-- * how tell if succeeded? -->
