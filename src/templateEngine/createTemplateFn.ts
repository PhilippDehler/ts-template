import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { RebuildTemplateString } from "../templateStringValidator/rebuildTemplateString";
import {
  ExtractOperationInformations,
  ValidateTemplate,
} from "../templateStringValidator/templateValidator";
import { Narrow } from "../ts-utils/narrow";
import { parseTemplateValue } from "./parseTemplateValue";

type TemplateString<
  Template extends string,
  TSchema extends { typeDefinition: TypeDefinitions }
> = Narrow<RebuildTemplateString<ValidateTemplate<Template, TSchema>>>;

export type TemplateFn<TSchema extends { typeDefinition: TypeDefinitions }> = <
  Template extends string
>(
  template: Narrow<RebuildTemplateString<ValidateTemplate<Template, TSchema>>>
) => ReturnType<typeof createTemplateFn<Template, TSchema>>;

export function createTemplateFn<
  Template extends string,
  TSchema extends { typeDefinition: TypeDefinitions }
>(
  template: TemplateString<Template, TSchema>,
  schema: TSchema
): (params: Params<Template, TSchema>) => string {
  if (typeof template !== "string") throw new Error("Template is not a string");
  const operationChain = deriveOperationChain(template, schema);
  if (!operationChain) return () => template;

  return (params) => templateReplace(template, params, operationChain, schema);
}

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

function templateReplace<
  TSchema extends { typeDefinition: TypeDefinitions },
  Template extends string
>(
  template: TemplateString<Template, TSchema> & string,
  params: Params<Template, TSchema>,
  operationChain: {
    key: string;
    isOptional: boolean;
    chain: (replaceValue: any) => any;
  }[],
  // @ts-expect-error
  schema: TSchema
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
