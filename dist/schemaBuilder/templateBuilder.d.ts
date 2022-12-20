import { TemplateFn } from "../templateEngine/createTemplateFn";
import { Narrow } from "../ts-utils/narrow";
import { OperationBuilder } from "./operationBuilder";
import { TypeDefinitions } from "./typeSchemaBuilder";
type TemplateBuilder<T extends TypeDefinitions, TOperation extends {}> = {
    operation: TOperation;
    add: <TP, Key extends keyof T>(key: Narrow<Key> & string, operationDefinitions: (builder: OperationBuilder<ReturnType<T[Key]["parseValue"]>, T, ExtractDefault<T>["key"]>) => {
        build: () => TP;
    }) => TemplateBuilder<T, TOperation & {
        [K in Key]: TP;
    }>;
    build: () => {
        schema: {
            typeDefinition: {
                DEFAULT: ExtractDefault<T>;
            } & T;
        } & TOperation;
        templateFn: TemplateFn<{
            typeDefinition: {
                DEFAULT: ExtractDefault<T>;
            } & T;
        } & TOperation>;
    };
};
export declare function templateBuilder<T extends TypeDefinitions, TOperation extends {} = {}>(input: T, operation: TOperation): TemplateBuilder<T, TOperation>;
type ExtractDefault<T extends Record<string, {
    isDefault: boolean;
    validator: (input: unknown) => boolean;
    parseValue: (value: string) => unknown;
}>> = {
    [K in keyof T]: T[K]["isDefault"] extends true ? T[K] & {
        key: K;
    } : never;
}[keyof T];
export {};
