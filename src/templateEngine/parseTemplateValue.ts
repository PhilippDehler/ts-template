import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { parseOperationChain } from "./parseOperationChain";

export function parseTemplateValue<
  TSchema extends Schema<{ typeDefinition: TypeDefinitions }>
>(k: string, schema: TSchema) {
  const [def, ...operations] = k.split("|");
  const [key, type] = def?.split("#") ?? [null, null];
  if (!key) throw new Error("Invalid template value: " + k);
  const isOptional = key.startsWith("?");
  const templateKey = isOptional ? key.slice(1) : key;

  return {
    key: templateKey,
    isOptional,
    operationChain: parseOperationChain<string, TSchema>(
      operations,
      type ?? null,
      schema
    ),
  };
}
