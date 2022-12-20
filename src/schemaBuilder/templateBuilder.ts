import {
  createTemplateFn,
  TemplateFn,
} from "../templateEngine/createTemplateFn";
import { VerbosityLevel } from "../templateStringValidator/rebuildTemplateString";
import { Narrow } from "../ts-utils/narrow";
import {
  operationBuilder,
  OperationBuilder,
  OperationDefinition,
} from "./operationBuilder";
import {
  castSchemaKey,
  ExtractDefaultType,
  getTypeSchemaDefault,
  getTypeSchemaDefaultKey,
  TypeDefinitions,
} from "./typeSchemaBuilder";

type TemplateBuilder<
  T extends TypeDefinitions,
  TOperation extends Record<string, OperationDefinition>,
  Verbose extends VerbosityLevel
> = {
  operation: TOperation;
  add: <TOperationBuilderReturn, TypeKey extends keyof T>(
    key: Narrow<TypeKey> & string,
    operationDefinitions: (
      builder: OperationBuilder<
        ReturnType<T[TypeKey]["parseValue"]>,
        T,
        ExtractDefaultType<T>["key"]
      >
    ) => { build: () => TOperationBuilderReturn }
  ) => TemplateBuilder<
    T,
    TOperation & {
      [K in Narrow<TypeKey> & string]: TOperationBuilderReturn;
    },
    Verbose
  >;
  build: () => {
    schema: {
      typeDefinition: {
        DEFAULT: ExtractDefaultType<T>;
      } & T;
    } & TOperation;
    templateFn: TemplateFn<
      {
        typeDefinition: {
          DEFAULT: ExtractDefaultType<T>;
        } & T;
      } & TOperation,
      Verbose
    >;
  };
};

export function templateBuilder<
  TypeSchema extends TypeDefinitions,
  Verbose extends VerbosityLevel = 3,
  TOperation extends Record<string, OperationDefinition> = {}
>(input: TypeSchema, operation: TOperation, verbose?: Verbose) {
  const typeDefaultKey = getTypeSchemaDefaultKey(input);
  const self: TemplateBuilder<TypeSchema, TOperation, Verbose> = {
    operation,
    add: (key, operationDefinitions) => {
      const schemaKey = castSchemaKey(key, input);
      const builder = operationBuilder<
        ReturnType<TypeSchema[typeof key & string]["parseValue"]> &
          keyof TypeSchema,
        TypeSchema,
        ExtractDefaultType<TypeSchema>["key"]
      >({}, typeDefaultKey);
      const builtOperations = operationDefinitions(builder).build();
      return templateBuilder<
        TypeSchema,
        Verbose,
        TOperation & {
          [K in typeof key]: typeof builtOperations;
        }
      >(
        input,
        {
          ...self.operation,
          [key]: {
            ...builtOperations,
            ...(self.operation[schemaKey] ?? {}),
          },
        },
        verbose
      );
    },
    build() {
      const defaultType = getTypeSchemaDefault(input);
      const schema = {
        typeDefinition: {
          ...input,
          DEFAULT: defaultType,
        },
        ...self.operation,
      };
      const templateFn: TemplateFn<typeof schema, Verbose> = (template) =>
        createTemplateFn(template as any, schema);
      return {
        templateFn,
        schema,
      };
    },
  };
  return self;
}
