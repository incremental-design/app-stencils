**Typescript Clips** provides clips for **Typescript**, including [TSdoc](https://tsdoc.org) tags.

<!-- ## Typescript Clips -->

<!-- need to reread the typescript notes, and then list best practices and how the clips help you follow them -->

<!-- | | | -->

## TSdoc Clips

Once you write your typescript code, you probably want to share it with someone else. But, before you do that, you should document what it does, and why you wrote it, with TSdoc.

Typescript's first-class support for classes, interfaces, and type declarations makes it easy for programmers to independently write pieces of code that fit together. However, typescript doesn't share the **context** behind the code. The context includes:

1. Why the code was written in the first place.
2. Who the code helps, and what it helps them do.
3. How the code can be used.
4. How the code shouldn't be used.

TSdoc is _the_ standard way to add context to your code. It splits your documentation into **sections**, each of which corresponds to a single function, variable, class or method. It further splits each section into **tags**. Each tag describes a different aspect of the section. Together, they give other developers a comprehensive understanding of the code you wrote. As an added bonus, TSdoc also formats your documentation into a website or markdown file, with [Typedoc](https://typedoc.org).

### Use TSdoc Sections

To use TSdoc, you need to write your documentation inside multi-line comments:

- TSdoc ONLY pays attention to multi-line comments: i.e.:

  ```typescript
  /**
   * comment
   */
  ```

- TSdoc completely ignores single-line comments: i.e.:

  ```typescript
  // comment
  ```

  ```typescript
  /* comment */
  ```

If you don't like manually typing out multi-line comments. No problem, just use the `/doc` clip I've provided.

<!-- show gif of doc snippet -->

TSdoc lumps everything within a multiline comment into a single section:

```typescript
/**
 * This is a section
 */

/**
 * This is another section
 */
```

To split your documentation into sections, all you need to do is make a multiline comment for each section.

But where do you put each section? TSdoc expects you to put each section directly before the piece of code it describes:

```typescript
/**
 * This section describes `const CoffeeBeans`
 */
const CoffeeBeans = 'French Roast';

/**
 * This section describes `function grindCoffeeBeans(...)`
 */
function grindCoffeeBeans(beans: string): string {
  //...
}

/**
 * This section describes `class CoffeeBeanGrinder{ ... }`
 */
class CoffeeBeanGrinder {
  //...

  /**
   * This section describes `public grind(beans:string):string
   */
  public grind(beans: string): string {
    //...
  }
}
```

Every TSdoc section contains a summary, a set of blocks and a list of modifiers:

```typescript
/**
 * <Summary>
 *
 * <Block>
 *
 * <Block>
 *
 * <Block>
 *
 * <Modifier>
 */
```

The summary should contain up to three sentences that explains what the corresponding code does. E.g.:

```typescript
/**
 * GrindCoffeeBeans turns whole beans into powder. It can accept any kind of coffee beans, and can be adjusted to grind powder at varying levels of coarseness.
 *
 * <Block>
 *
 * <Block>
 *
 * <Block>
 *
 * <Modifier>
 */
```

Each block contains a single tag, followed by supporting documentation. You can even format this documentation with [markdown](https://github.com/microsoft/tsdoc/issues/12) and [code fences](https://github.com/microsoft/tsdoc/issues/20) if you want.

```typescript
/**
 * grindCoffeeBeans turns whole beans into powder. It can accept any kind of coffee beans, and can be adjusted to grind powder at varying levels of coarseness.
 *
 * @param beans - the coffee beans you want to grind
 *
 * @returns coffee powder
 *
 * @remarks
 * grindCoffeeBeans actually makes use of the static method {@link CoffeeBeanGrinder.grind} under the hood.
 *
 * <Modifier>
 */
```

The list of modifiers contains tags separated by spaces, none of which are followed by text. E.g.:

```typescript
/**
 * grindCoffeeBeans turns whole beans into powder. It can accept any kind of coffee beans, and can be adjusted to grind powder at varying levels of coarseness.
 *
 * @param beans - the coffee beans you want to grind
 *
 * @returns coffee powder
 *
 * @remarks
 * grindCoffeeBeans actually makes use of the static method {@link CoffeeBeanGrinder.grind} under the hood.
 *
 * @alpha @experimental
 */
```

If all of this is a lot to remember, don't worry, I've made a few clips that make it a LOT easier:

#### Use the `/class` clip to document a class. It expands to:

````typescript
/**
 * What is the class's single responsibility?
 *
 * @remarks
 * When should you use the class? What performance benefits or other magical powers does it confer upon you?
 * When shouldn't you use the class?
 * What states does this class furnish?
 * What behaviors does this class furnish?
 * Can you inject dependencies into this class?
 * Are there any situations where it makes sense to extend this class, rather than inject dependencies into it?
 * How does the code in this class work?
 *
 * @example
 * ```typescript
 *	// example of how to use this class here
 * ```
 *
 * @alpha @beta @eventProperty @experimental @internal @override @packageDocumentation @public @readonly @sealed @virtual
 */
````

#### Use the `/method` clip to document a method or function. It expands to:

```typescript
/**
 * What does this method or function do?
 *
 * @param name - description
 *
 * @returnstype and meaning of return value
 *
 * @alpha @beta @eventProperty @experimental @internal @override @packageDocumentation @public @readonly @sealed @virtual
 */
```

#### Use the `/const` clip to document a variable. It expands to:

```typescript
/**
 * Summary
 *
 * Block Tags
 *
 * @alpha @beta @eventProperty @experimental @internal @override @packageDocumentation @public @readonly @sealed @virtual
 */
```

### Use TSdoc tags:

Remember how I mentioned that every TSdoc section has a summary, blocks, and a list of modifiers? Some tags describe blocks, and others describe modifiers. But that's not all - you can actually tags _within_ blocks. Here are all of the following [tags](https://tsdoc.org/mobile_nav) you can use, grouped by what they describe:

#### Tags that describe blocks:

| Tag                                                             | Clip              | What it does:                                                                                                                                                        |
| :-------------------------------------------------------------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@decorator](https://tsdoc.org/pages/tags/decorator/)           | `@decorator`      | Quotes an [ES6 decorator](https://www.typescriptlang.org/docs/handbook/decorators.html) expression.                                                                  |
| [@deprecated](https://tsdoc.org/pages/tags/deprecated/)         | `@deprecated`     | Deprecates the code it documents, and recommends an up-to-date alternative.                                                                                          |
| [@defaultValue](https://tsdoc.org/pages/tags/defaultvalue/)     | `@defaultValue`   | Lists value that a property of a class or interface will have if it isn't set.                                                                                       |
| [@example](https://tsdoc.org/pages/tags/example/)               | `@example`        | Demonstrates how to use the code it documents.                                                                                                                       |
| [@param](https://tsdoc.org/pages/tags/param/)                   | `@param`          | Describes an argument of a method or function.                                                                                                                       |
| [@privateRemarks](https://tsdoc.org/pages/tags/privateremarks/) | `@privateRemarks` | Contains documentation that should be omitted from any auto-generated documentation site.                                                                            |
| [@remarks](https://tsdoc.org/pages/tags/remarks/)               | `@remarks`        | Contains an explanation of the implementation details, reasoning, or any other long-form contextual information about the code it documents.                         |
| [@returns](https://tsdoc.org/pages/tags/returns/)               | `@returns`        | Describes what returns from a method or function.                                                                                                                    |
| [@see](https://tsdoc.org/pages/tags/see/)                       | `@see`            | Lists links to other sections of the documentation or websites.                                                                                                      |
| [@throws](https://tsdoc.org/pages/tags/throws/)                 | `@throws`         | Lists any errors that a method or function throws.                                                                                                                   |
| [@typeParam](https://tsdoc.org/pages/tags/typeparam/)           | `@typeParam`      | Describes the types you can insert into the type argument of a [generic](https://www.typescriptlang.org/docs/handbook/2/generics.html) function, interface or class. |

#### Tags that describe phrases within blocks (also known as inline tags):

| Tag                                                     | Clip          | What it does:                                                                                  |
| :------------------------------------------------------ | :------------ | :--------------------------------------------------------------------------------------------- |
| [@inheritDoc](https://tsdoc.org/pages/tags/inheritdoc/) | `@inheritDoc` | Copies the `@remarks` `@params` `@typeParam` from another section into the current section.    |
| [@label](https://tsdoc.org/pages/tags/label/)           | `@label`      | Adds an arbitrary label to the block that contains it, so that the block can be referenced it. |
| [@link](https://tsdoc.org/pages/tags/link/)             | `@link`       | Links to another section, or a website.                                                        |

#### Tags that describe modifiers

Note that the `@mod` clip expands to: `@alpha @beta @eventProperty @experimental @internal @override @packageDocumentation @public @readonly @sealed @virtual`. This includes all of the available modifier clips, each of which occupies its own tab stop. This makes it east to choose the ones you want. Keep in mind that you **must** place these modifiers on the [LAST](https://tsdoc.org/pages/spec/tag_kinds/) line of the TSdoc comment.

| Tag                                                                         | Clip   | What it does:                                                                                                                                                            |
| :-------------------------------------------------------------------------- | :----- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [@alpha](https://tsdoc.org/pages/tags/alpha/)                               | `@mod` | Marks code as an 'alpha' release.                                                                                                                                        |
| [@beta](https://tsdoc.org/pages/tags/beta/)                                 | `@mod` | Marks code as a 'beta' release.                                                                                                                                          |
| [@eventProperty](https://tsdoc.org/pages/tags/eventproperty/)               | `@mod` | Indicates that a method returns a [Browser Event](https://developer.mozilla.org/en-US/docs/Web/API/Event) or [Node Event](https://nodejs.org/api/events.html).           |
| [@experimental](https://tsdoc.org/pages/tags/experimental/)                 | `@mod` | Marks code as 'experimental' release.                                                                                                                                    |
| [@internal](https://tsdoc.org/pages/tags/internal/)                         | `@mod` | Excludes code from a public API.                                                                                                                                         |
| [@override](https://tsdoc.org/pages/tags/override/)                         | `@mod` | Marks a class as overriding the class from which it inherits.                                                                                                            |
| [@packageDocumentation](https://tsdoc.org/pages/tags/packagedocumentation/) | `@mod` | Indicates that a section describes an entire package - not just the code it immediately precedes. **This should only ever be used in the package's entry `.d.ts file.`** |
| [@public](https://tsdoc.org/pages/tags/public/)                             | `@mod` | Marks code as a stable, 'public' release. This code shouldn't change.                                                                                                    |
| [@readonly](https://tsdoc.org/pages/tags/readonly/)                         | `@mod` | Marks a variable or property as being read-only.                                                                                                                         |
| [@sealed](https://tsdoc.org/pages/tags/sealed/)                             | `@mod` | Indicates that a class should never be extended.                                                                                                                         |
| [@virtual](https://tsdoc.org/pages/tags/virtual/)                           | `@mod` | Indicates that a class can not only be extended, but can also be overridden without consequence.                                                                         |

When you use any of the above clips within a TSdoc section, it will automatically add in the tag name, and a placeholder for any additional text that follows the tag.
