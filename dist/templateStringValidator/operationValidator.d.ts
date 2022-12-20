import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { IsEmptyArray } from "../ts-utils/array";
import { ErrorMsg, ExtendableMaybe, FromMaybe, Maybe, NeedsSuggestions, SuggestionMsg } from "../ts-utils/domain";
import { StringKeys } from "../ts-utils/object";
import { HasPartialMatch, Split } from "../ts-utils/string";
import { If } from "../ts-utils/utilityTypes";
import { ArgDefinition, ValidateArgs } from "./argsValidator";
type BrutForceOperationReturnType<TSchema extends {
    typeDefinition: TypeDefinitions;
}, Type, Operation> = Type extends keyof TSchema ? Operation extends keyof TSchema[Type] ? "returnType" extends keyof TSchema[Type][Operation] ? TSchema[Type][Operation]["returnType"] extends StringKeys<TSchema> ? TSchema[Type][Operation]["returnType"] extends keyof TSchema ? TSchema[Type][Operation]["returnType"] & keyof TSchema : never : never : never : never : never;
type OperationReturnType<TSchema extends {
    typeDefinition: TypeDefinitions;
}, Type, Operation> = FromMaybe<Maybe<BrutForceOperationReturnType<TSchema, Type, Operation>, TSchema["typeDefinition"]["DEFAULT"]["key"]>> & keyof TSchema;
export type ValidateOperationKey<Key extends string, TOperationLookUp extends OperationLookUp> = If<NeedsSuggestions<Key>, Maybe<never, SuggestionMsg<StringKeys<TOperationLookUp>>>, Maybe<If<HasPartialMatch<Key, StringKeys<TOperationLookUp>>, SuggestionMsg<StringKeys<TOperationLookUp> & `${Key}${string}`>>, ErrorMsg<`Didn't expect Operation Key |${Key}|.`>>>;
interface ExtendableOperationDefinition {
    key: string;
    args: ArgDefinition[];
    operation: (input: any, t: any) => any;
}
type OperationKeyAndArgs<T extends string> = T extends `${infer Operation}(${infer Args})` ? {
    operation: Operation;
    args: Args;
} : T extends `${infer Operation}(${infer Args}` ? {
    operation: Operation;
    args: Args;
} : {
    operation: T;
    args: "";
};
export type ValidateOperation<Operation extends string, TOperationLookUp extends OperationLookUp> = OperationKeyAndArgs<Operation> extends {
    operation: infer OperationKey extends string;
    args: infer Args extends string;
} ? [
    ValidateOperationKey<OperationKey, TOperationLookUp>,
    ...If<FromMaybe<ValidateOperationKey<OperationKey, TOperationLookUp>> extends keyof TOperationLookUp ? true : false, If<IsEmptyArray<TOperationLookUp[FromMaybe<ValidateOperationKey<OperationKey, TOperationLookUp>>]["args"]>, [
    ], [
        Maybe<"(">,
        ...ValidateArgs<Split<Args, ",">, TOperationLookUp[FromMaybe<ValidateOperationKey<OperationKey, TOperationLookUp>>]["args"]>,
        Maybe<")">
    ]>, [
    ]>
] : [
    Maybe<never, ErrorMsg<`Operation couldn't be parsed in ValidateOperation. Received:${Operation}`>>
];
type OperationLookUp = Record<string, ExtendableOperationDefinition>;
export type ValidateOperations<Operation extends string[], TSchema extends {
    typeDefinition: TypeDefinitions;
}, InitalType extends keyof TSchema, TAgg extends ExtendableMaybe[] = []> = Operation extends [
    infer FirstOperation extends string,
    ...infer Rest extends string[]
] ? TSchema[InitalType] extends OperationLookUp ? ValidateOperations<Rest, TSchema, OperationReturnType<TSchema, InitalType, ValidateOperation<FirstOperation, TSchema[InitalType]>>, [
    ...TAgg,
    ...ValidateOperation<FirstOperation, TSchema[InitalType]>,
    ...If<IsEmptyArray<Rest>, Rest, [Maybe<"|">]>
]> : [
    ...TAgg,
    Maybe<never, ErrorMsg<`Inital type is not matching the schema keys in ValidateOperations. Received: ${InitalType & string}`>>
] : TAgg;
export {};
