import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { ErrorMsg, ExtendableMaybe, FromMaybe, Maybe } from "../ts-utils/domain";
import { AutoComplete, IsNoneEmptyString, Split } from "../ts-utils/string";
import { If } from "../ts-utils/utilityTypes";
import { ValidateOperations } from "./operationValidator";
type ValidateKey<Key extends string> = Maybe<If<IsNoneEmptyString<Key>, Key>, ErrorMsg<"Expected non-empty-value">>;
export type ExtractOperationInformations<T extends string, DefaultType> = T extends `${infer Key}#${infer Type}|${infer Operations}` ? {
    key: Key;
    type: Type;
    operations: Operations;
    hasOperations: true;
    hasType: true;
} : T extends `${infer Key}#${infer Type}` ? {
    key: Key;
    type: Type;
    operations: "";
    hasOperations: false;
    hasType: true;
} : T extends `${infer Key}|${infer Operations}` ? {
    key: Key;
    type: DefaultType;
    operations: Operations;
    hasOperations: true;
    hasType: false;
} : {
    key: T;
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
    operations: infer Operations extends string;
    hasType: infer HasType extends boolean;
    hasOperations: infer HasOperations extends boolean;
} ? [
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
