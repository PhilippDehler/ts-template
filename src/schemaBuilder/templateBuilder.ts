import { createTemplateFn } from "../templateEngine/createTemplateFn";
import { Narrow } from "../utilityTypes";
import { parserBuilder } from "./parserBuilder";
import { TypeDefinitions } from "./typeSchemaBuilder";

export function templateBuilder<
  T extends TypeDefinitions,
  TParser extends {} = {}
>(input: T, parser: TParser) {
  const self = {
    parser,
    add: <TP, Key extends keyof T>(
      key: Narrow<Key>,
      parserDefinitions: (
        builder: ReturnType<
          typeof parserBuilder<ReturnType<T[Key]["parseValue"]>, T>
        >
      ) => { build: () => TP }
    ) => {
      const builder = parserBuilder<ReturnType<T[Key]["parseValue"]>, T>(
        {} as any
      );
      const parser = parserDefinitions(builder as any).build();
      return templateBuilder<T, TParser & { [K in Key]: typeof parser }>(
        input,
        Object.assign(self.parser, {
          [key as string]: parser,
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
        ...self.parser,
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
