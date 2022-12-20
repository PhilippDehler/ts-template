export type IsEmptyArray<T> = T extends [] | never[] ? true : false;
export type Head<T, E> = T extends [infer Head extends E, ...string[]]
  ? Head
  : never;
export type Tail<T> = T extends [string, ...infer Tail extends any[]]
  ? Tail
  : [];
