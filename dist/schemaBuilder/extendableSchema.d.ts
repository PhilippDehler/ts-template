import { TypeDefinitions } from "./typeSchemaBuilder";
type AnyFn = (...args: any[]) => any;
export type Schema<TSchema extends {
    typeDefinition: TypeDefinitions;
}> = TSchema & {
    [K in keyof TSchema["typeDefinition"]]: Record<string, {
        operation: AnyFn;
        key: string;
        args: {
            key: string;
            type: keyof TSchema["typeDefinition"] & string;
        }[];
        returnType: string;
    }>;
};
export {};
