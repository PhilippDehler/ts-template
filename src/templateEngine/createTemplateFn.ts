import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import {
  ExtractParserInformations,
  ValidateTemplate,
} from "../templateStringValidator/templateValidator";
import { Narrow } from "../utilityTypes";
import { parseTemplateValue } from "./parseTemplateValue";

export function createTemplateFn<
  TSchema extends { typeDefinition: TypeDefinitions }
>(schema: TSchema) {
  /**
   * @param template The template string
   * @returns A function that takes the params and returns the string
   * @example
   * const template = template("Hallo {{name}}!");
   * const result = template({name: "Max"});
   */
  return function template<Template extends string>(
    template: Narrow<ValidateTemplate<Template, TSchema>>
  ) {
    if (typeof template !== "string")
      throw new Error("Template is not a string");
    const matches = template.match(/{{.*?}}/g);
    //@ts-ignore
    if (!matches) return (params: Params<Template, TSchema>) => template;
    const chains = matches.map((m) => {
      const k = m.slice(2, -2);
      const { key, operationChain } = parseTemplateValue(
        k,
        schema as Schema<TSchema>
      );
      return {
        key,
        chain: (replaceValue: any) =>
          operationChain.reduce((v, chain) => chain(v), replaceValue),
      };
    });

    return (params: Params<Template, TSchema>) => {
      let i = 0;
      return template.replace(/{{.*?}}/g, () => {
        const { key, chain } = chains[i++]!;
        const replaceValue = params[key as keyof typeof params];
        if (replaceValue === undefined)
          throw new Error("Key is missing in Translation:" + key);
        const result = chain(replaceValue);
        if (typeof result !== "string" && typeof result !== "number")
          return JSON.stringify(result);
        return result + "";
      });
    };
  };
}

type Params<
  Input extends string,
  TSchema extends { typeDefinition: TypeDefinitions },
  P extends Record<string, any> = {}
> = Input extends `${string}{{${infer TemplateKey}}}${infer Rest}`
  ? ExtractParserInformations<
      TemplateKey,
      TSchema["typeDefinition"]["DEFAULT"]["key"]
    > extends {
      key: infer Key extends string;
      type: infer Type extends string;
    }
    ? Params<
        Rest,
        TSchema,
        P & {
          [K in Key]: ReturnType<TSchema["typeDefinition"][Type]["parseValue"]>;
        }
      >
    : Params<Rest, TSchema, P & {}>
  : P;
