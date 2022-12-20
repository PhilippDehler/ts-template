import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { RebuildTemplateString, VerbosityLevel } from "../templateStringValidator/rebuildTemplateString";
import { ExtractOperationInformations, Val, ValidateTemplate } from "../templateStringValidator/templateValidator";
import { Narrow } from "../ts-utils/narrow";
type TemplateString<Template extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}, Verbose extends VerbosityLevel> = Narrow<RebuildTemplateString<ValidateTemplate<Template, TSchema>, Verbose>>;
export type TemplateFn<TSchema extends {
    typeDefinition: TypeDefinitions;
}, Verbose extends VerbosityLevel> = <Template extends Validated, Validated = Val<Narrow<Template> & string, TSchema, Verbose>>(template: Narrow<Template>) => ReturnType<typeof createTemplateFn<Template & string, TSchema, Verbose>>;
export declare function createTemplateFn<Template extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}, Verbose extends VerbosityLevel>(template: TemplateString<Template, TSchema, Verbose>, schema: TSchema): (params: Params<Template, TSchema>) => string;
type Params<Input extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}, P extends Record<string, any> = {}> = Input extends `${string}{{${infer TemplateKey}}}${infer Rest}` ? ExtractOperationInformations<TemplateKey, TSchema["typeDefinition"]["DEFAULT"]["key"]> extends {
    key: infer Key extends string;
    type: infer Type extends string;
} ? Params<Rest, TSchema, MergeParams<P, Key, Type, TSchema>> : Params<Rest, TSchema, P> : P;
type MergeParams<P extends Record<string, any>, Key extends string, Type extends string, TSchema extends {
    typeDefinition: TypeDefinitions;
}> = (Key extends `?${infer TemplateKey}` ? {
    [K in TemplateKey]?: ReturnType<TSchema["typeDefinition"][Type]["parseValue"]>;
} : {
    [K in Key]: ReturnType<TSchema["typeDefinition"][Type]["parseValue"]>;
}) & P;
export {};
