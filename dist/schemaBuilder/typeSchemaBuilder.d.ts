import { Narrow } from "../ts-utils/narrow";
export interface TypeDefinition {
    key: string;
    isDefault: boolean;
    validator: (input: any) => boolean;
    parseValue: (value: string) => unknown;
}
export type TypeDefinitions = Record<string, TypeDefinition>;
type WithBooleanPartialDefault<T extends boolean> = [undefined] extends [T] ? false : [T] extends [boolean] ? [T] extends [true] ? true : [T] extends [false] ? false : false : never;
export type TypeSchemaBuilder<T extends TypeDefinitions> = {
    types: T;
    addType: <Key extends string, TDefault extends boolean, TReturn>(key: Narrow<Key> & string, typeDefinition: {
        isDefault?: Narrow<TDefault>;
        validator: (input: TReturn) => boolean;
        parseValue: (value: string) => TReturn;
    }) => TypeSchemaBuilder<T & {
        [K in Key]: {
            key: K & string;
            isDefault: WithBooleanPartialDefault<TDefault>;
            validator: (input: TReturn) => boolean;
            parseValue: (value: string) => TReturn;
        };
    }>;
    build: () => T;
};
export declare function typeSchemaBuilder<T extends TypeDefinitions>(types: T): TypeSchemaBuilder<T>;
export type ExtractDefaultType<T extends Record<string, {
    isDefault: boolean;
    validator: (input: unknown) => boolean;
    parseValue: (value: string) => unknown;
}>> = {
    [K in keyof T]: T[K]["isDefault"] extends true ? T[K] & {
        key: K;
    } : never;
}[keyof T];
export declare function getTypeSchemaDefault<TypeSchema extends TypeDefinitions>(typeSchema: TypeSchema): ExtractDefaultType<TypeSchema>;
export declare function getTypeSchemaDefaultKey<TypeSchema extends TypeDefinitions>(typeSchema: TypeSchema): ExtractDefaultType<TypeSchema>["key"] & keyof TypeSchema & string;
export declare function castSchemaKey<TypeSchema extends TypeDefinitions>(key: string, typeSchema: TypeSchema): keyof TypeSchema & string;
export {};
