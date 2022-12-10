import { Narrow } from "../utilityTypes";
import { TypeDefinitions } from "./typeSchemaBuilder";

export function parserBuilder<
  Input,
  T extends TypeDefinitions,
  TParser extends {} = {}
>(parser: TParser) {
  const self = {
    parser,
    addParser<
      Key extends string,
      TArgs extends { key: string; type: string }[],
      TReturn extends keyof T
    >(
      key: Narrow<Key>,
      args: TArgs,
      returnType: Narrow<TReturn>,
      parser: (
        input: Input,
        args: ExtractArgs<TArgs, T>
      ) => ReturnType<T[TReturn]["parseValue"]>
    ) {
      return parserBuilder<
        Input,
        T,
        TParser & {
          [K in Key]: {
            parser: typeof parser;
            key: Key;
            args: TArgs;
            returnType: TReturn;
          };
        }
      >(
        Object.assign(self.parser, {
          [key as string]: { parser, key, args, returnType },
        }) as any
      );
    },
    build() {
      return self.parser;
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
