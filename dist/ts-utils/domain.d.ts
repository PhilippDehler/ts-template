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
export type HasError<T extends ExtendableMaybe> = [T["value"]] extends [never] ? true : false;
export type FromMaybe<T extends ExtendableMaybe, OnImpossible = "FROM ERROR: value is never and error is never"> = [T["error"]] extends [never] ? [T["value"]] extends [never] ? OnImpossible : T["value"] : [T["value"]] extends [never] ? T["error"] : T["value"];
