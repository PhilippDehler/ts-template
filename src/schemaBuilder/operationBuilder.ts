import { ArgDefinition } from "../templateStringValidator/argsValidator";
import { Narrow } from "../ts-utils/narrow";
import { TypeDefinitions } from "./typeSchemaBuilder";

type WithReturnTypeDefault<
  T extends string,
  Default extends string
> = IsInferredString<T> extends true ? T : Default;
type IsInferredString<T extends string> = string extends T
  ? false
  : T extends string
  ? true
  : false;

export type OperationBuilder<
  InputType,
  T extends TypeDefinitions,
  TypeDefault extends keyof TypeDefinitions,
  TOperation extends {} = {}
> = {
  operation: TOperation;
  addOperation: <
    OperationKey extends string,
    TArgs extends ArgDefinition[],
    TReturn extends keyof T & string
  >(definition: {
    key: Narrow<OperationKey> & string;
    args: Narrow<TArgs>;
    returnType?: Narrow<TReturn>;
    operation: (
      input: InputType,
      args: ExtractArgs<TArgs, T>
    ) => ReturnType<T[TReturn]["parseValue"]>;
  }) => OperationBuilder<
    InputType,
    T,
    TypeDefault,
    TOperation & {
      [K in OperationKey]: {
        key: OperationKey;
        args: TArgs;
        returnType: WithReturnTypeDefault<TReturn, TypeDefault>;
        operation: (
          input: InputType,
          args: ExtractArgs<TArgs, T>
        ) => ReturnType<T[TReturn]["parseValue"]>;
      };
    }
  >;
  build: () => TOperation;
};

export function operationBuilder<
  Input,
  T extends TypeDefinitions,
  TypeDefault extends keyof TypeDefinitions,
  TOperation extends {} = {}
>(operation: TOperation) {
  const self: OperationBuilder<Input, T, TypeDefault, TOperation> = {
    operation,
    addOperation: (definition) => {
      return operationBuilder({
        ...self.operation,
        [definition.key]: definition,
      } as any);
    },
    build() {
      return self.operation;
    },
  };
  return self;
}

type ExtractArgs<
  T,
  X extends Record<
    string,
    {
      isDefault: boolean;
      validator: (input: unknown) => boolean;
      parseValue: (value: string) => unknown;
    }
  >
> = T extends [infer Head extends { key: string; type: keyof X }, ...infer Tail]
  ? {
      [K in Head["key"]]: ReturnType<X[Head["type"]]["parseValue"]>;
    } & ExtractArgs<Tail, X>
  : {};
