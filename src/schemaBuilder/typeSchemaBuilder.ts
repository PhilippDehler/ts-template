import { Narrow } from "../ts-utils/narrow";

export interface TypeDefinition {
  key: string;
  isDefault: boolean;
  validator: (input: any) => boolean;
  parseValue: (value: string) => unknown;
}
export type TypeDefinitions = Record<string, TypeDefinition>;
export type TypeSchemaBuilder<T extends TypeDefinitions> = {
  types: T;
  addType: <Key extends string, TDefault extends boolean, TReturn>(
    key: Narrow<Key> & string,
    typeDefinition: {
      isDefault: TDefault;
      validator: (input: TReturn) => boolean;
      parseValue: (value: string) => TReturn;
    }
  ) => TypeSchemaBuilder<
    T & {
      [K in Key]: {
        key: K & string;
        isDefault: TDefault;
        validator: (input: TReturn) => boolean;
        parseValue: (value: string) => TReturn;
      };
    }
  >;
  build: () => T;
};

export function typeSchemaBuilder<T extends TypeDefinitions>(
  types: T
): TypeSchemaBuilder<T> {
  return {
    types,
    addType: (key, typeDefinition) => {
      return typeSchemaBuilder(
        Object.assign(types, {
          [key]: { ...typeDefinition, key },
        }) as any
      );
    },
    build() {
      return types;
    },
  };
}
