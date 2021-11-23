# Vue 3 Clips for Panic Nova

This Nova extension contains clips for Typescript projects.

# Installation:

1. Open the Panic Nova Extension Library

   ![Go to Extensions > Extensions Library](./.readme/install-extension-1.gif)

2. Search for `Typescript Clips Incremental Design`.

   ![Go to Extensions > Extensions Library](./.readme/install-extension-2.gif)

3. Install `Typescript Clips`.

   ![Go to Extensions > Extensions Library](./.readme/install-extension-3.gif)

4. Go to the clips section of the sidebar, click the 'Extensions' tab, and then expand `Typescript Clips`

   ![Go to Extensions > Extensions Library](./.readme/install-extension-4.gif)

# Usage:

How to use Typescript Clips for Panic Nova in your codebase:

Type any of the following triggers in any `.ts` file in your project, and Panic Nova will offer the corresponding clip:

| Typescript Classes            |                                                                   |
| ----------------------------- | :---------------------------------------------------------------- |
| <code>typescript class</code> | <img src=".readme/clip-typescript-class.gif" alt="class trigger"> |

| TSdoc Sections      |                                                                         |
| ------------------- | :---------------------------------------------------------------------- |
| <code>class</code>  | <img src=".readme/clip-tsdoc-section-class.gif" alt="class trigger">    |
| <code>method</code> | <img src=".readme/clip-tsdoc-section-method.gif" alt="method trigger">  |
| <code>const</code>  | <img src=".readme/clip-tsdoc-section-variable.gif" alt="const trigger"> |

| TSdoc Tags                                                                             |                                                                                     |
| -------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------- |
| <a href="https://tsdoc.org/pages/tags/decorator/"><code>decorator</code></a>           | <img src=".readme/clip-tsdoc-tag-decorator.gif" alt="decoarator trigger"/>          |
| <a href="https://tsdoc.org/pages/tags/defaultvalue/"><code>defaultValue</code></a>     | <img src=".readme/clip-tsdoc-tag-defaultvalue.gif" alt="defaultValue trigger"/>     |
| <a href="https://tsdoc.org/pages/tags/deprecated/"><code>deprecated</code></a>         | <img src=".readme/clip-tsdoc-tag-deprecated.gif" alt="deprecated trigger"/>         |
| <a href="https://tsdoc.org/pages/tags/example/"><code>example</code></a>               | <img src=".readme/clip-tsdoc-tag-example.gif" alt="example trigger"/>               |
| <a href="https://tsdoc.org/pages/tags/inheritdoc/"><code>inheritdoc</code></a>         | <img src=".readme/clip-tsdoc-tag-inheritdoc.gif" alt="inheritDoc trigger"/>         |
| <a href="https://tsdoc.org/pages/tags/label/"><code>label</code></a>                   | <img src=".readme/clip-tsdoc-tag-label.gif" alt="label trigger"/>                   |
| <a href="https://tsdoc.org/pages/tags/link/"><code>link</code></a>                     | <img src=".readme/clip-tsdoc-tag-link.gif" alt="link trigger"/>                     |
| <a href="https://tsdoc.org/pages/spec/tag_kinds/#modifier-tags"><code>mod</code></a>   | <img src=".readme/clip-tsdoc-tag-modifiers.gif" alt="mod trigger"/>                 |
| <a href="https://tsdoc.org/pages/tags/param/"><code>param</code></a>                   | <img src=".readme/clip-tsdoc-tag-param.gif" alt="param trigger"/>                   |
| <a href="https://tsdoc.org/pages/tags/privateremarks/"><code>privateRemarks</code></a> | <img src=".readme/clip-tsdoc-tag-privateremarks.gif" alt="privateRemarks trigger"/> |
| <a href="https://tsdoc.org/pages/tags/remarks/"><code>remarks</code></a>               | <img src=".readme/clip-tsdoc-tag-remarks.gif" alt="remarks trigger">                |
| <a href="https://tsdoc.org/pages/tags/returns/"><code>returns</code></a>               | <img src=".readme/clip-tsdoc-tag-returns.gif" alt="returns trigger">                |
| <a href="https://tsdoc.org/pages/tags/see/"><code>see</code></a>                       | <img src=".readme/clip-tsdoc-tag-see.gif" alt="see trigger">                        |
| <a href="https://tsdoc.org/pages/tags/throws/"><code>throws</code></a>                 | <img src=".readme/clip-tsdoc-tag-throws.gif" alt="throws trigger">                  |
| <a href="https://tsdoc.org/pages/tags/typeparam/"><code>typeParam</code></a>           | <img src=".readme/clip-tsdoc-tag-typeparam.gif" alt="typeParam trigger">            |

## How Typescript Clips for Panic Nova works:

Typescript Clips is a [Panic Nova Extension](https://docs.nova.app/extensions/) that automatically adds clips to your editor.

# Contribute to Typescript Clips for Panic Nova:

To add or change clips, you need to install a copy of Panic Nova, and you also need to [clone and setup](https://github.com/incremental-design/app-stencils#contribute-to-app-stencils) the `app-stencils` monorepo.

## Repository Structure:

| File or Folder                                  | What it does                                                                                                                                                  | Can you modify it? |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| `.readme/*`                                     | Contains all of the images referenced in this file. Everything in this folder is versioned with Git-LFS                                                       | Yes                |
| `Typescript Clips.novaextension/*`              | Contains everything used in the nova extension. This folder gets published to the nova extension library.                                                     | Yes                |
| `Typescript Clips.novaextension/CHANGELOG.MD`   | Describes the changes that occured between releases.                                                                                                          | Yes                |
| `Typescript Clips.novaextension/Clips.json`     | Contains all of the clips that this extension provides.                                                                                                       | Yes                |
| `Typescript Clips.novaextension/extension.json` | Contains the [manifest](https://docs.nova.app/extensions/manifest/) for this extension. This file tells Nova how to install the other files in the extension. | Yes                |
| `Typescript Clips.novaextension/extension.png`  | The icon that is displayed next to the extension in the extension library.                                                                                    | Yes                |
| `Typescript Clips.novaextension/README.md`      | The [documentation](https://extensions.panic.com/extensions/incremental.design/incremental.design.Vue3Clips/) that is displayed in the extension library.     | Yes                |

## Develop:

1. Locate the `libs/snippets/panic-nova/typescript-clips-for-panic-nova` folder in the `app-stencils` repository. Then, open it in Finder.

   ![Go to Extensions > Extensions Library](./.readme/open-extension-1.gif)

2. Open the `Typescript Clips.novaextension` package with Panic Nova. Then, select "open for editing".

   ![Go to Extensions > Extensions Library](./.readme/open-extension-2.gif)

3. Go to `Extensions > Activate Project as Extension`. Then, go to the clips section of your sidebar, switch to the `extensions` tab, and find the clips in this extension.

   ![Go to Extensions > Extensions Library](./.readme/open-extension-3.gif)

### Document:

Whenever you modify this extension, make sure you describe the modifications in `Typescript Clips.novaextension/README.md`.

Whenever you submit this extension to the extension library, make sure you describe updates in `Typescript Clips.novaextension/CHANGELOG.md`

## Deploy:

Go to `Extensions > Submit to the Extension Library` and follow the prompts.

![Go to Extensions > Extensions Library](./.readme/open-extension-4.gif)
