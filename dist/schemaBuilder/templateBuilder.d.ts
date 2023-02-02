import { TemplateFn } from "../templateEngine/createTemplateFn";
import { VerbosityLevel } from "../templateStringValidator/rebuildTemplateString";
import { Narrow } from "../ts-utils/narrow";
import { OperationBuilder, OperationDefinition } from "./operationBuilder";
import { ExtractDefaultType, TypeDefinitions } from "./typeSchemaBuilder";
type TemplateBuilder<T extends TypeDefinitions, TOperation extends Record<string, Record<string, OperationDefinition>>, Verbose extends VerbosityLevel> = {
    operation: TOperation;
    add: <TOperationBuilderReturn, TypeKey extends keyof T>(key: Narrow<TypeKey> & string, operationDefinitions: (builder: OperationBuilder<ReturnType<T[TypeKey]["parseValue"]>, T, ExtractDefaultType<T>["key"]>) => {
        build: () => TOperationBuilderReturn;
    }) => TemplateBuilder<T, TOperation & {
        [K in Narrow<TypeKey> & string]: TOperationBuilderReturn;
    }, Verbose>;
    build: () => {
        schema: {
            typeDefinition: {
                DEFAULT: ExtractDefaultType<T>;
            } & T;
        } & TOperation;
        templateFn: TemplateFn<{
            typeDefinition: {
                DEFAULT: ExtractDefaultType<T>;
            } & T;
        } & TOperation, Verbose>;
    };
};
export declare function templateBuilder<TypeSchema extends TypeDefinitions, Verbose extends VerbosityLevel = 3, TOperation extends Record<string, Record<string, OperationDefinition>> = {}>(input: TypeSchema, operation: TOperation, verbose?: Verbose): TemplateBuilder<TypeSchema, TOperation, Verbose>;
export declare function buildTemplateFn<T extends TypeDefinitions, TOperation extends Record<string, Record<string, OperationDefinition>>, Verbose extends VerbosityLevel>(input: T, operations: TOperation, verbose: Verbose): {
    schema: {
        typeDefinition: {
            DEFAULT: ExtractDefaultType<T>;
        } & T;
    } & TOperation;
    templateFn: TemplateFn<{
        typeDefinition: {
            DEFAULT: ExtractDefaultType<T>;
        } & T;
    } & TOperation, Verbose>;
};
export {};
