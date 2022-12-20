import {
  ErrorMsg,
  ExtendableMaybe,
  FromMaybe,
  HasError,
} from "../ts-utils/domain";

export type RebuildTemplateString<
  T extends ExtendableMaybe[],
  Verbosity extends 0 | 1 | 2 = 2,
  TAgg extends string = ""
> = T extends [
  infer Head extends ExtendableMaybe,
  ...infer Tail extends ExtendableMaybe[]
]
  ? HasError<Head> extends true
    ? Verbosity extends 0
      ? `${FromMaybe<Head> & string}`
      : Verbosity extends 1
      ? `${TAgg}${FromMaybe<Head> & string}`
      : Verbosity extends 2
      ? RebuildTemplateString<
          Tail,
          Verbosity,
          `${TAgg}${FromMaybe<Head> & string}`
        >
      : ErrorMsg<"Unknonw verbosity level">
    : RebuildTemplateString<
        Tail,
        Verbosity,
        `${TAgg}${FromMaybe<Head> & string}`
      >
  : TAgg;
