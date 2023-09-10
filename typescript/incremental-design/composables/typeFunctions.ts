/**
 * type functions - how they work
 * 
 * type functions are generics that transform an input to an output, based on logic inside the function.
 * 
 * e.g.
 */ 
type AUnion<T, U> = (a: T, b: U) => (T | U)


// don't forget about object union, object intersection, and object keyof ... does tuple have any of these operators?
/**
 * AUnion is a function that takes in T and U, and returns a single object of type T unioned with U. In other words, the output type will contain all of the members of both input types
 * 
 * T and U are opaque. That means that we can't peek inside and see what their members are.
 * 
 * Instead of using T and U, we can use objects, records, tuples and arrays to make transparent types.
 * 
 * Transparent types let you peek inside and see what types their members are.
 * 
 */
type AnObject = {a: boolean, b: number, c: string}
type ARecord = {[key: string]: string}
type ATuple = [boolean, number, string]
type AnArray = string[]
/**
 * Object types contain a fixed number of members, which can be of different types. 
 * Record types contain any number of members, which are all of the same type.
 * Tuple types contain a fixed number of members, which can be of different types.
 * Array types contain any number of members, which are all of the same type.
 * 
 * 
 * | type   | number of members  | number of types |
 * | :----- | :----------------- | :-------------- |
 * | Object | fixed              | any             |
 * | Record | any                | 1               |
 * | Tuple  | fixed              | any             |
 * | Array  | any                | 1               |
 * 
 * 
 * Object and record types describe objects. Tuple and array types describe arrays.
 * 
 * 
 * | type   | indexed by                |
 * | :----- | :------------------------ |
 * | Object | string, number, or symbol |
 * | Record | string, number, or symbol |
 * | Tuple  | number                    |
 * | Array  | number                    |
 * 
*/

/**
 * Array<T> is an alternate notation for T[]
*/
var a: AnArray = ['a','b','c']
var b: Array<string> = a
/**
 * Record<string,T> is an alternate notation for {[key: string], T} 
*/
var c: {x: string, y: string, z: string} = {x: 'a', y: 'b', z: 'c'}
var d: ARecord = c  

/**
 * Record<number,T> is an alternate notation for {[key: number], T} 
*/
var e: {[key: number]: string} = {1: 'a', 2: 'b', 3: 'c'}
var f : Record<number, string> = e

/**
 * Record<number,T> and {[key: number], T} are NOT alternate notations for Array<T> or T[]
 * 
 * This is because arrays have manipulation methods that objects don't have (i.e. push, pop, shift, etc.) 
*/
var g: {[key: number]: string} = {1: 'a', 2: 'b', 3: 'c'}
var h : Record<number, string> = g
var i: string[] = g // not the same
var j: Array<string> = h // not the same

/**
 * use Partial<Type> to take an object, record, tuple, or array, and make all of its members optional.
 *
 * note that using Partial<> does NOT get rid of indices. It only makes the values at those indices optional. This means that ...
 * - for an object to be of type `APartialObject`, it must contain ALL of the keys in `AnObject`
 * - for a tuple to be of type `APartialTuple` it must be the length of `ATuple`
 */
type APartialObject = Partial<AnObject>
type APartialRecord = Partial<ARecord>
type APartialTuple = Partial<ATuple>
type APartialArray = Partial<AnArray>
/**
 * use Required<Type> to take an object, record, tuple, or array, and make all of its members required. This is the opposite of Partial<>
 */
type ARequiredObject = Required<APartialObject>
type ARequiredRecord = Required<APartialRecord>
type ARequiredTuple = Required<APartialTuple>
type ARequiredArray = Required<APartialArray>
/**
 * Use Pick<> to select a single member of an object, record, tuple or array type by its index, _and then place it into a new object type_
 * 
 * To pick a member of an object or record, you can use an index of string, number or symbol
 * To pick a member of a tuple or array, you must use a number.
 * A tuple has a fixed length. If the number you choose is outside of that length, then the type will be "undefined".
 * - Note that the type is not 'never'. That is because any index that is not contained in an array or object will always evaluate to undefined.
 */
type APickedObject = Pick<AnObject, "a">
type APickedRecord = Pick<ARecord, "a">
/**
 * keep in mind that Pick returns an object type, not an array type.
 */
type AnObjectFromPickedTuple = Pick<ATuple, 1> // take the 1st item in the tuple, and place it in an object that is keyed with "1"
type AnObjectFromPickedArray = Pick<AnArray, 1> // take the 1st item in the array, and place it in an object that is keyed with "1"
/**
 * To select a single member of a tuple or array, and then place it into a new _array_, use bracket notation:
 */
type APickedTuple = [ATuple[0]]
type APickedArray = AnArray[0][] // note that this is a no-op, because arrays have a variable length and a single type

/**
 * Use Omit<> to discard a single member of an object, record, tuple or array by its index, _and then place the rest of the members into a new object_
 */
type AnOmittedObject = Omit<AnObject, "a">
type AnOmittedRecord = Omit<ARecord, "a">
/**
 * converting a tuple or array into an object has an unintuitive side effects.
 * 
 * Arrays and tuples contain special methods that operate on their indicces (i.e. pop, push, shift, unshift). Converting an array into an object picks these methods, and places them into the resulting object. This is probably not what you want to do.
 */
type AnObjectFromOmittedTuple = Omit<ATuple, 2> // while this is technically a type, it isn't the type you're looking for
type AnObjectFromOmittedArray = Omit<AnArray, 1> // this is not the type you're looking for
/**
 * To discard a selected member of a tuple or array, and then place the rest of the members into a new tuple or array, use bracket notation to specify the items that you want to keep
 */
type AnOmittedTuple = [ATuple[0],ATuple[2]]

/**
 * Tuples are indexed by number. But, you can attach a string label to each index. The string label shows up in type intellisense. However, you cannot use it to access a given index.
 * 
 * Use the string label to indicate what each value in the tuple type is supposed to represent
 */
type AStringAliasedtuple = [a: boolean, b: number, c: string]
type FirstInTuple = AStringAliasedtuple[0]
type doesNotWork = AStringAliasedtuple["a"]

/**
 * Tuples can have optional indices
 */
type TupleWithOptionals = [boolean, number, string, string, boolean?, boolean?] // this tuple has optionals
/**
 * optional indices cannot precede required indices
 */
type tupleThatDoesNotWork = [boolean?, number, string]
/**
 * you can use labels, optionals, and a spread operator to create a tuple that describes the parameters in a function
 * 
 */
type TupleWitLabelAndOptionals = [a: boolean, b: number, c: string, d:string, e?: boolean, f?: boolean] // this tuple has labels and optionals
type abcFn = (...args:TupleWitLabelAndOptionals) => unknown

/**
 * type functions check if a transparent type extends another, and if so, uses 
 * - union `|`, intersection `&`, bracket notation `<Tuple or Array>[<index>]`, rest `...`, and infer operators 
 * - Pick<>, Omit<>, Required<>, Optional<>, Exclude<>, Extract<>, NonNullable<>, Parameters<>, ConstructorParameters<>, ReturnType<>, InstanceType<>, ThisParameterType<>, OmitThisParameterType<>, ThisType<> utility types
 * 
 * to create an output type
 */

/**
 * for a type A, return type B or C depending on the truthiness of A
 * 
 * A doesn't have to extend a boolean. it can extend a superclass on the left, and a subclass on the right
 * 
 */
type If<A extends boolean, B, C> = A extends true ? B: C

/**
 * use string literals instead of strings wherever possible
 * 
 * we can make typescript use a string literal instead of a string type as follows
 */
const fnWide = <S /* this is like saying S extends Unknown */>(a: S) => ({a})
const fnNarrow = <S extends string>(a: S) => ({a})
const wide = fnWide("hello") // the type of wide is {a: string}
const narrow = fnNarrow("hello") // the type of narrow is {a: 'hello'}

/**
 * use tuples instead of arrays wherever possible
 * 
 * we can make typescript use a tuple instead of an array as follows:
 * 
 * note that this only works with non-empty array types, because a tuple must have at least one member. There is no such thing as an empty tuple.
 */
const fnArrayWide = <T extends Array<unknown> /* we have to be explicit when using unknown here, because Array is a generic type that requires a parameter */ >(t: T) => t
const fnArrayNarrow = <T extends [unknown, ...unknown[]] /* a tuple that definitely has a zeroth element of unknown, and has zero or more trailing elements after that */>(t: T) => t
const arrayWide = fnArrayWide([true, 2,'c']) // the type of arrayWide is Array<string | number | boolean> because typescript could not narrow the order of the input elements
const arrayNarrow = fnArrayNarrow([true, 2,'c']) // the type of arrayWide is [boolean, number, string ]because typescript could narrow the order of the elements to a tuple

/**
 * use unions of literals to make switch statements:
 * 
 * you can derive either an object or a tuple from another type, and then use a selector to output a third type
 */
type SwitchWithObject<I extends 0 | 1 | 2 | 3 | 4> = {
    0: "a"; 
    1: 1; 
    2: true; 
    3: "d"; 
    4: "e"; 
}[I]
type SwitchWithTuple<I extends 0 | 1 | 2 | 3 | 4> = ["a",1,true,"d","e"][I]

/**
 * use infer to extract the type of an object or tuple's member(s)
 */
type extract<T> = T extends { i: infer Inferred } ? Inferred : never // get the type of T. Then, if T is an object that has a member, i, return the type of T.i
var l: extract<{i: boolean, j: string, k: number}> = false

type extractTwo<T> = T extends { i: infer TI, j: infer TJ } ? [TI, TJ] : never // get the type of T. Then, if T is an object that has members i and j, return a tuple of types [T.i, T.j]

// infer can be tricky:
type extractIdentity<T> = T extends infer Inferred ? Inferred : never // get the type of T. Then if T is not never, return the type of T
// this function can be read as if T extends its own type, return T, otherwise return never

var m: extractIdentity<{i: boolean, j: string, k: number}> = {i: false, j: 'hello', k: 2}

/**
 * you can also use infer to extract one or more members of a tuple
 */
type extractFirst<T extends[unknown, ...unknown[]]> = T extends [infer First, ...unknown[]] ? First : never
var n: extractFirst<[a: boolean, b: string, c: number]> = false

type extractFirstLast<T extends[unknown, ...unknown[]]> = T extends [infer First, ...unknown[], infer Last] ? [First, Last] : never
var o: extractFirstLast<[a: boolean, b: string, c: number]> = [false, 3]

type extractFirstSecond<T extends[unknown, ...unknown[]]> = T extends [infer First, infer Second, ...unknown[]] ? [First, Second] : never
var p: extractFirstSecond<[a: boolean, b: string, c: number]> = [false, 'hibob']

type extractFirstSecondInferred<T extends [unknown, ...unknown[]]> = T extends [...infer FirstSecond, unknown] ? FirstSecond : never
var q: extractFirstSecondInferred<[a: boolean, b: string, c: number]> = [false, 'hello'] // interesting side effect: inferring rest params keeps the LABELS for the params

/**
 * use recursion to iterate through a tuple, and perform an action at each step of the way
 * 
 * this example filters type X out of type T
 */
type FilterOutX<T extends unknown[], X> = 
    T extends [infer First, ...infer Rest] 
    ? First extends X
        ? FilterOutX<Rest, X>
        : [First, FilterOutX<Rest, X>]
    : T
/**
 * this example maps all values of type X to type Y
*/
type ReplaceXWithY<T extends unknown[], X, Y> = 
    T extends [infer First, ...infer Rest] 
    ? First extends X
        ? [Y, ReplaceXWithY<Rest, X, Y>]
        : [First, ReplaceXWithY<Rest, X, Y>]
    : T
/**
 * This example unions all types that aren't X into type Acc
 */
type UnionNotX<T extends unknown[], X, Acc = never> = 
    T extends [infer First, ...infer Rest] 
    ? First extends X
        ? UnionNotX<Rest, X, Acc>
        : UnionNotX<Rest, X, Acc | First>
    : T