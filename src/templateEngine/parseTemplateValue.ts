import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { parseParserChain } from "./parseParserChain";

export function parseTemplateValue<
  TSchema extends Schema<{ typeDefinition: TypeDefinitions }>
>(k: string, schema: TSchema) {
  const [def, ...operations] = k.split("|");
  const [key, type] = def?.split("#") ?? [null, null];
  if (!key) throw new Error("Invalid template value: " + k);
  return {
    key: key,
    operationChain: parseParserChain<string, TSchema>(
      operations,
      type ?? null,
      schema
    ),
  };
}
