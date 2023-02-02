export type If<Statement extends boolean, OnTrue, OnFalse = never> = [
    Statement
] extends [never] ? never : Statement extends true ? OnTrue : OnFalse;
export type IsNever<T> = [T] extends [never] ? true : false;
