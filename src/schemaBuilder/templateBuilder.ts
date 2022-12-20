import {
  createTemplateFn,
  TemplateFn,
} from "../templateEngine/createTemplateFn";
import { Narrow } from "../ts-utils/narrow";
import { operationBuilder, OperationBuilder } from "./operationBuilder";
import { TypeDefinitions } from "./typeSchemaBuilder";

type TemplateBuilder<T extends TypeDefinitions, TOperation extends {}> = {
  operation: TOperation;
  add: <TP, Key extends keyof T>(
    key: Narrow<Key> & string,
    operationDefinitions: (
      builder: OperationBuilder<
        ReturnType<T[Key]["parseValue"]>,
        T,
        ExtractDefault<T>["key"]
      >
    ) => { build: () => TP }
  ) => TemplateBuilder<
    T,
    TOperation & {
      [K in Key]: TP;
    }
  >;
  build: () => {
    schema: {
      typeDefinition: {
        DEFAULT: ExtractDefault<T>;
      } & T;
    } & TOperation;
    templateFn: TemplateFn<
      {
        typeDefinition: {
          DEFAULT: ExtractDefault<T>;
        } & T;
      } & TOperation
    >;
  };
};

export function templateBuilder<
  T extends TypeDefinitions,
  TOperation extends {} = {}
>(input: T, operation: TOperation): TemplateBuilder<T, TOperation> {
  const self: TemplateBuilder<T, TOperation> = {
    operation,
    add: (key, operationDefinitions) => {
      const builder = operationBuilder<
        ReturnType<T[typeof key & string]["parseValue"]>,
        T,
        ExtractDefault<T>["key"]
      >({});
      return templateBuilder(input, {
        ...self.operation,
        [key]: {
          ...operationDefinitions(builder).build(),
          ...(self.operation[key as keyof TOperation] ?? {}),
        },
      }) as any;
    },
    build() {
      const defaultType = Object.values(input).find((v) => v.isDefault);
      if (!defaultType) throw new Error("No default type defined");
      const schema = {
        typeDefinition: {
          ...input,
          DEFAULT: defaultType as ExtractDefault<T>,
        },
        ...self.operation,
      };
      const templateFn: TemplateFn<typeof schema> = (template) =>
        createTemplateFn(template, schema);
      return {
        templateFn,
        schema,
      };
    },
  };
  return self;
}

type ExtractDefault<
  T extends Record<
    string,
    {
      isDefault: boolean;
      validator: (input: unknown) => boolean;
      parseValue: (value: string) => unknown;
    }
  >
> = {
  [K in keyof T]: T[K]["isDefault"] extends true ? T[K] & { key: K } : never;
}[keyof T];
