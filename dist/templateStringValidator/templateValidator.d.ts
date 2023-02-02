import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { ErrorMsg, ExtendableMaybe, FromMaybe, Maybe } from "../ts-utils/domain";
import { AutoComplete, IsNoneEmptyString, Split } from "../ts-utils/string";
import { If } from "../ts-utils/utilityTypes";
import { ValidateOperations } from "./operationValidator";
import { RebuildTemplateString, VerbosityLevel } from "./rebuildTemplateString";
type ValidateKey<Key extends string> = Maybe<If<IsNoneEmptyString<Key>, Key>, ErrorMsg<"Expected non-empty-value">>;
export type ExtractOperationInformations<T extends string, DefaultType> = T extends `${infer Key}#${infer Type}|${infer Operations}` ? {
    key: Key extends `?${infer K}` ? K : Key;
    type: Type;
    isOptional: Key extends `?${string}` ? true : false;
    operations: Operations;
    hasOperations: true;
    hasType: true;
} : T extends `${infer Key}#${infer Type}` ? {
    key: Key extends `?${infer K}` ? K : Key;
    isOptional: Key extends `?${string}` ? true : false;
    type: Type;
    operations: "";
    hasOperations: false;
    hasType: true;
} : T extends `${infer Key}|${infer Operations}` ? {
    key: Key extends `?${infer K}` ? K : Key;
    isOptional: Key extends `?${string}` ? true : false;
    type: DefaultType;
    operations: Operations;
    hasOperations: true;
    hasType: false;
} : {
    key: T extends `?${infer K}` ? K : T;
    isOptional: T extends `?${string}` ? true : false;
    type: DefaultType;
    operations: "";
    hasOperations: false;
    hasType: false;
};
export type ValidateTemplateValue<T extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}> = ExtractOperationInformations<T, TSchema["typeDefinition"]["DEFAULT"]["key"]> extends {
    key: infer Key extends string;
    type: infer Type extends string;
    isOptional: infer IsOptional extends boolean;
    operations: infer Operations extends string;
    hasType: infer HasType extends boolean;
    hasOperations: infer HasOperations extends boolean;
} ? [
    If<IsOptional, Maybe<"?">, Maybe<"">>,
    ValidateKey<Key>,
    ...If<HasType, [
        Maybe<"#">,
        AutoComplete<Type, TSchema["typeDefinition"]>
    ], [
    ]>,
    ...If<HasOperations, [
        Maybe<"|">,
        ...ValidateOperations<Split<Operations, "|">, TSchema, FromMaybe<AutoComplete<Type, TSchema["typeDefinition"]>> & keyof TSchema>
    ], [
    ]>
] : [
    Maybe<never, ErrorMsg<"ValidateTemplateValue couldn't extract all necessarry operation infromation">>
];
export type Validate<Input extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}, Verbose extends VerbosityLevel> = RebuildTemplateString<ValidateTemplate<Input, TSchema>, Verbose>;
export type ValidateTemplate<Input extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}, Agg extends ExtendableMaybe[] = []> = Input extends `${infer Start}{{${infer TemplateKey}}}${infer Rest}` ? ValidateTemplate<Rest, TSchema, [
    ...Agg,
    Maybe<Start>,
    Maybe<"{{">,
    ...ValidateTemplateValue<TemplateKey, TSchema>,
    Maybe<"}}">
]> : [...Agg, Maybe<Input>];
export {};
