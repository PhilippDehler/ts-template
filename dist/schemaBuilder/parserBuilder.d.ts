import { Narrow } from "../utilityTypes";
import { TypeDefinitions } from "./typeSchemaBuilder";
export type ParserBuilder<InputType, T extends TypeDefinitions, TParser extends {} = {}> = {
    operation: TParser;
    addParser: <Key extends string, TArgs extends {
        key: string;
        type: string;
    }[], TReturn extends keyof T>(definition: {
        key: Narrow<Key>;
        args: TArgs;
        returnType: Narrow<TReturn>;
        operation: (input: InputType, args: ExtractArgs<TArgs, T>) => ReturnType<T[TReturn]["parseValue"]>;
    }) => ParserBuilder<InputType, T, TParser & {
        [K in Key]: typeof definition;
    }>;
    build: () => TParser;
};
export declare function operationBuilder<Input, T extends TypeDefinitions, TParser extends {} = {}>(operation: TParser): ParserBuilder<Input, T, TParser>;
type ExtractArgs<T, X extends Record<string, {
    isDefault: boolean;
    validator: (input: unknown) => boolean;
    parseValue: (value: string) => unknown;
}>> = T extends [infer Head extends {
    key: string;
    type: keyof X;
}, ...infer Tail] ? {
    [K in Head["key"]]: ReturnType<X[Head["type"]]["parseValue"]>;
} & ExtractArgs<Tail, X> : {};
export {};
