import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import {
  ExtractOperationInformations,
  ValidateTemplate,
} from "../templateStringValidator/templateValidator";
import { Narrow } from "../utilityTypes";
import { parseTemplateValue } from "./parseTemplateValue";

function deriveOperationChain<
  Template extends string,
  TSchema extends { typeDefinition: TypeDefinitions }
>(template: Template, schema: TSchema) {
  const matches = template.match(/{{.*?}}/g);
  const chains =
    matches?.map((m) => {
      const k = m.slice(2, -2);
      const { key, operationChain, isOptional } = parseTemplateValue(
        k,
        schema as Schema<TSchema>
      );
      return {
        key,
        isOptional,
        chain: (replaceValue: any) =>
          operationChain.reduce((v, chain) => chain(v), replaceValue),
      };
    }) ?? null;
  return chains;
}

export function createTemplateFn<
  Template extends string,
  TSchema extends { typeDefinition: TypeDefinitions }
>(template: Narrow<ValidateTemplate<Template, TSchema>>, schema: TSchema) {
  if (typeof template !== "string") throw new Error("Template is not a string");
  const operationChain = deriveOperationChain(template, schema);
  //@ts-ignore ignores the unused parameters
  if (!operationChain) return (params: Params<Template, TSchema>) => template;

  return (params: Params<Template, TSchema>) =>
    templateReplace<Template, TSchema>(template, params, operationChain);
}
export type TemplateFn<TSchema extends { typeDefinition: TypeDefinitions }> = <
  Template extends string
>(
  params: Narrow<ValidateTemplate<Template, TSchema>>
) => ReturnType<typeof createTemplateFn<Template, TSchema>>;

function templateReplace<
  Template extends string,
  TSchema extends { typeDefinition: TypeDefinitions }
>(
  template: Narrow<ValidateTemplate<Template, TSchema>> & string,
  params: Params<Template, TSchema>,
  operationChain: {
    key: string;
    isOptional: boolean;
    chain: (replaceValue: any) => any;
  }[]
) {
  let i = 0;
  return template.replace(/{{.*?}}/g, () => {
    const { key, chain, isOptional } = operationChain[i++]!;
    const replaceValue = params[key as keyof typeof params];
    if (replaceValue !== undefined) {
      const result = chain(replaceValue);
      if (typeof result !== "string" && typeof result !== "number")
        return JSON.stringify(result);
      return result + "";
    }
    if (isOptional) return "";
    throw new Error("Key is missing in Translation:" + key);
  });
}

type Params<
  Input extends string,
  TSchema extends { typeDefinition: TypeDefinitions },
  P extends Record<string, any> = {}
> = Input extends `${string}{{${infer TemplateKey}}}${infer Rest}`
  ? ExtractOperationInformations<
      TemplateKey,
      TSchema["typeDefinition"]["DEFAULT"]["key"]
    > extends {
      key: infer Key extends string;
      type: infer Type extends string;
    }
    ? Params<Rest, TSchema, MergeParams<P, Key, Type, TSchema>>
    : Params<Rest, TSchema, P>
  : P;

type MergeParams<
  P extends Record<string, any>,
  Key extends string,
  Type extends string,
  TSchema extends { typeDefinition: TypeDefinitions }
> = (Key extends `?${infer TemplateKey}`
  ? {
      [K in TemplateKey]?: ReturnType<
        TSchema["typeDefinition"][Type]["parseValue"]
      >;
    }
  : {
      [K in Key]: ReturnType<TSchema["typeDefinition"][Type]["parseValue"]>;
    }) &
  P;
