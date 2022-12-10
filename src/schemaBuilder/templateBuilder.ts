import { createTemplateFn } from "../templateEngine/createTemplateFn";
import { Narrow } from "../utilityTypes";
import { operationBuilder, OperationBuilder } from "./operationBuilder";
import { TypeDefinitions } from "./typeSchemaBuilder";

type TemplateBuilder<T extends TypeDefinitions, TOperation extends {}> = {
  operation: TOperation;
  add: <TP, Key extends keyof T>(
    key: Narrow<Key> & string,
    operationDefinitions: (
      builder: OperationBuilder<ReturnType<T[Key]["parseValue"]>, T>
    ) => { build: () => TP }
  ) => TemplateBuilder<
    T,
    TOperation & {
      [K in Key]: ReturnType<ReturnType<typeof operationDefinitions>["build"]>;
    }
  >;
  build: () => {
    schema: {
      typeDefinition: {
        DEFAULT: ExtractDefault<T>;
      } & T;
    } & TOperation;
    template: ReturnType<
      typeof createTemplateFn<
        {
          typeDefinition: {
            DEFAULT: ExtractDefault<T>;
          } & T;
        } & TOperation
      >
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
        T
      >({});
      const operation = operationDefinitions(builder).build();
      self.operation = Object.assign(self.operation, {
        [key]: typeof operation,
      });
      return templateBuilder(
        input,
        Object.assign(self.operation, {
          [key]: operation,
        }) as any
      );
    },
    build() {
      const defaultType = Object.values(input).find((v) => v.isDefault);
      if (!defaultType) throw new Error("No default type defined");
      const schema = {
        typeDefinition: {
          ...input,
          DEFAULT: defaultType as ExtractDefault<typeof input>,
        },
        ...self.operation,
      };
      const template = createTemplateFn(schema);
      return {
        template,
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
