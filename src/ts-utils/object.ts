/**
 * Returns keys of a record as a union of string literals
 * @example
 * type T = { a: string; b: number; c: boolean };
 * type Keys = PKeys<T>; // "a" | "b" | "c"
 * type Keys = PKeys<Record<string, any>>; // string
 * type Keys = PKeys<[]>; // never
 *
 */
export type StringKeys<T extends Record<string, any>> = keyof T & string;
