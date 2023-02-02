import { Narrow } from "../ts-utils/narrow";

export interface TypeDefinition {
  key: string;
  isDefault: boolean;
  validator: (input: any) => boolean;
  parseValue: (value: string) => unknown;
}
export type TypeDefinitions = Record<string, TypeDefinition>;

type WithBooleanPartialDefault<T extends boolean> = [undefined] extends [T]
  ? false
  : [T] extends [boolean]
  ? [T] extends [true]
    ? true
    : [T] extends [false]
    ? false
    : false
  : never;

export type TypeSchemaBuilder<T extends TypeDefinitions> = {
  types: T;
  addType: <Key extends string, TDefault extends boolean, TReturn>(
    key: Narrow<Key> & string,
    typeDefinition: {
      isDefault?: Narrow<TDefault>;
      validator: (input: TReturn) => boolean;
      parseValue: (value: string) => TReturn;
    }
  ) => TypeSchemaBuilder<
    T & {
      [K in Key]: {
        key: K & string;
        isDefault: WithBooleanPartialDefault<TDefault>;
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
    addType: (key, { isDefault, ...typeDefinition }) => {
      return typeSchemaBuilder(
        Object.assign(types, {
          [key]: { ...typeDefinition, isDefault: isDefault ?? false, key },
        }) as any
      );
    },
    build() {
      const hasDefault =
        Object.values(types).find((type) => type.isDefault) ?? false;
      if (!hasDefault)
        throw new Error(
          "No default type defined in build of typeSchemaBuilder"
        );
      return types;
    },
  };
}
export type ExtractDefaultType<T extends Record<string, TypeDefinition>> = {
  [K in keyof T]: T[K]["isDefault"] extends true ? T[K] & { key: K } : never;
}[keyof T];

export function getTypeSchemaDefault<TypeSchema extends TypeDefinitions>(
  typeSchema: TypeSchema
): ExtractDefaultType<TypeSchema> {
  const typeDefault = Object.values(typeSchema).find((v) => v.isDefault);
  if (!typeDefault) throw new Error("No default type defined");
  return typeDefault as ExtractDefaultType<TypeSchema>;
}

export function getTypeSchemaDefaultKey<TypeSchema extends TypeDefinitions>(
  typeSchema: TypeSchema
): ExtractDefaultType<TypeSchema>["key"] & keyof TypeSchema & string {
  const typeDefault = getTypeSchemaDefault(typeSchema);
  if (Object.keys(typeSchema).includes(typeDefault.key)) return typeDefault.key;
  throw new Error(
    `Default type key ${typeDefault.key} not found in type schema`
  );
}

export function castSchemaKey<TypeSchema extends TypeDefinitions>(
  key: string,
  typeSchema: TypeSchema
): keyof TypeSchema & string {
  if (Object.keys(typeSchema).includes(key)) return key;
  throw new Error(`Key ${key} not found in type schema`);
}
