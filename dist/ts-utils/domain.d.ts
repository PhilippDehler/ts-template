import { If, IsNever } from "./utilityTypes";
export type ErrorMsg<Msg extends string> = `[Error:${Msg}]`;
export type SuggestionMsg<Msg extends string> = `${Msg}`;
export type NeedsSuggestions<T extends string> = T extends SuggestionString ? true : false;
export type SuggestionString = `${string}?${string}`;
export type Maybe<T extends string, Msg extends string = ""> = [T] extends [
    never
] ? {
    value: never;
    error: Msg;
} : {
    value: T;
    error: never;
};
export type ExtendableMaybe = {
    value: any;
    error: any;
};
export type MaybeHasError<T extends ExtendableMaybe> = IsNever<T["value"]>;
export type FromMaybe<T extends ExtendableMaybe, OnImpossible = "FROM ERROR: value is never and error is never"> = If<IsNever<T["error"]>, If<IsNever<T["value"]>, OnImpossible, T["value"]>, If<IsNever<T["value"]>, T["error"], T["value"]>>;
