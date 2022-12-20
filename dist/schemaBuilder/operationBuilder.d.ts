import { Narrow } from "../ts-utils/narrow";
import { TypeDefinitions } from "./typeSchemaBuilder";
export type OperationBuilder<InputType, T extends TypeDefinitions, TOperation extends {} = {}> = {
    operation: TOperation;
    addOperation: <OperationKey extends string, TArgs extends {
        key: string;
        type: string;
    }[], TReturn extends keyof T>(definition: {
        key: Narrow<OperationKey> & string;
        args: Narrow<TArgs>;
        returnType: Narrow<TReturn>;
        operation: (input: InputType, args: ExtractArgs<TArgs, T>) => ReturnType<T[TReturn]["parseValue"]>;
    }) => OperationBuilder<InputType, T, TOperation & {
        [K in OperationKey]: {
            key: OperationKey;
            args: TArgs;
            returnType: TReturn;
            operation: (input: InputType, args: ExtractArgs<TArgs, T>) => ReturnType<T[TReturn]["parseValue"]>;
        };
    }>;
    build: () => TOperation;
};
export declare function operationBuilder<Input, T extends TypeDefinitions, TOperation extends {} = {}>(operation: TOperation): OperationBuilder<Input, T, TOperation>;
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
