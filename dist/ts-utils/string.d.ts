import { Not } from "./boolean";
import { Maybe, SuggestionMsg } from "./domain";
import { StringKeys } from "./object";
import { If } from "./utilityTypes";
/**
 * @param I - a string literal
 * @param B - a string literal
 * @returns true if I is a substring of B, false otherwise
 * @example
 * type T = "fo"
 * type T1 = "foo"
 * type T2 = "buzz"
 * type T3 = "fizzBuzz"
 * type Result = HasPartialMatch<T, T1>; // true
 * type Result1 = HasPartialMatch<T, T2>; // false
 * type Result2 = HasPartialMatch<T, T3>; // false
 * type Result3 = HasPartialMatch<T2, T3>; // false
 *
 *
 */
export type HasPartialMatch<I extends string, B extends string> = [
    B & `${I}${string}`
] extends [`${infer A}`] ? [A] extends [never] ? false : true : false;
/**
 * @param I - a string literal
 * @param B - a string literal
 * @returns true if I and B are the same string literal, false otherwise
 *
 */
export type HasExactMatch<I extends string, B extends string> = [I] extends [B] ? [B] extends [I] ? true : false : false;
/**
 * @param T - a string literal
 * @param KeyLookUp - a record of keys, these keys will be used to autocomplete the template key
 * @returns Always returns a Maybe from the KeyLookUp (only if the key is invalid the maybe will have an error)
 * @example
 * type T = "fo"
 * type KeyLookUp = { foo: string; buzz: number; fizzBuzz: boolean };
 * type Result = AutoComplete<T, KeyLookUp>; // Maybe<"foo">
 * type T1 = "fizz"
 * type Result1 = AutoComplete<T, KeyLookUp>; // Maybe<"fizzBuzz">
 * type T2 = "fizzz"
 * type Result2 = AutoComplete<T, KeyLookUp>; // Maybe<never,"fizzBuzz">|Maybe<never,"buzz">|Maybe<never,"foo">
 * */
export type AutoComplete<T extends string, KeyLookUp extends Record<string, any>> = If<HasPartialMatch<T, StringKeys<KeyLookUp>>, Maybe<If<HasExactMatch<T, StringKeys<KeyLookUp>>, T, SuggestionMsg<StringKeys<KeyLookUp> & `${T}${string}`>>>, Maybe<never, SuggestionMsg<StringKeys<KeyLookUp>>>>;
export type Split<T extends string, TSplit extends string, TAgg extends string[] = []> = T extends `${infer First}${TSplit}${infer Rest}` ? Split<Rest, TSplit, [...TAgg, First]> : [...TAgg, T];
export type IsEmptyString<T> = T extends "" ? true : false;
export type IsNoneEmptyString<T extends string> = Not<IsEmptyString<T>>;
