export type Narrowable = string | number | bigint | boolean;
export type Narrow<A> =
  | (A extends Narrowable ? A : never)
  | (A extends [] ? [] : never)
  | {
      [K in keyof A]: A[K] extends Function ? A[K] : Narrow<A[K]>;
    };
