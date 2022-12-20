import { Head, IsEmptyArray, Tail } from "../ts-utils/array";
import { ErrorMsg, ExtendableMaybe, Maybe, SuggestionString } from "../ts-utils/domain";
import { If, IsNever } from "../ts-utils/utilityTypes";
export interface ArgDefinition<Type extends string = string> {
    key: string;
    type: Type;
}
type NeverOnEmptyOrSuggestion<T extends string> = T extends "" | SuggestionString ? never : T;
export type ValidateArg<TArg extends string, TArgDefinition extends ArgDefinition> = [TArgDefinition] extends [never] ? Maybe<[
    TArg
] extends [never] ? "" : never, ErrorMsg<`Didn't expect Arg ${TArg}`>> : Maybe<[
    TArg
] extends [never] ? TArg : NeverOnEmptyOrSuggestion<TArg>, ErrorMsg<`Expected Type:${TArgDefinition["type"] & string}`>>;
export type ValidateArgs<Args extends string[], TArgDefinitions extends ArgDefinition[], TAgg extends ExtendableMaybe[] = []> = TArgDefinitions extends [
    infer FirstArgDef extends ArgDefinition,
    ...infer RestArgDefs extends ArgDefinition[]
] ? ValidateArgs<Tail<Args>, RestArgDefs, [
    ...TAgg,
    ValidateArg<Head<Args, string>, FirstArgDef>,
    ...If<IsEmptyArray<RestArgDefs>, [], [Maybe<",">]>
]> : [
    ...TAgg,
    ...If<IsNever<Head<Args, string>>, [], [Maybe<",">]>,
    ValidateArg<Head<Args, string>, never>
];
export {};
