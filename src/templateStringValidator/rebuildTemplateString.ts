import {
  ErrorMsg,
  ExtendableMaybe,
  FromMaybe,
  MaybeHasError,
} from "../ts-utils/domain";

export type VerbosityLevel = 0 | 1 | 2 | 3;
export type RebuildTemplateString<
  T extends ExtendableMaybe[],
  Verbosity extends VerbosityLevel = 3,
  TAgg extends string = ""
> = T extends [
  infer Head extends ExtendableMaybe,
  ...infer Tail extends ExtendableMaybe[]
]
  ? MaybeHasError<Head> extends true
    ? Verbosity extends 0
      ? string
      : Verbosity extends 1
      ? `${FromMaybe<Head> & string}`
      : Verbosity extends 2
      ? `${TAgg}${FromMaybe<Head> & string}`
      : Verbosity extends 3
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
