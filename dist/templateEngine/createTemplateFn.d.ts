import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { ExtractOperationInformations, ValidateTemplate } from "../templateStringValidator/templateValidator";
import { Narrow } from "../utilityTypes";
export declare function createTemplateFn<TSchema extends {
    typeDefinition: TypeDefinitions;
}>(schema: TSchema): <Template extends string>(template: Narrow<ValidateTemplate<Template, TSchema>>) => (params: Params<Template, TSchema, {}>) => string;
type Params<Input extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}, P extends Record<string, any> = {}> = Input extends `${string}{{${infer TemplateKey}}}${infer Rest}` ? ExtractOperationInformations<TemplateKey, TSchema["typeDefinition"]["DEFAULT"]["key"]> extends {
    key: infer Key extends string;
    type: infer Type extends string;
} ? Params<Rest, TSchema, P & {
    [K in Key]: ReturnType<TSchema["typeDefinition"][Type]["parseValue"]>;
}> : Params<Rest, TSchema, P & {}> : P;
export {};
