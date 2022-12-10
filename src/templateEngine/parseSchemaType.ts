import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";

export function parseSchemaType<
  Type extends string,
  TSchema extends Schema<{ typeDefinition: TypeDefinitions }>
>(
  type: Type | null,
  schema: TSchema
): keyof TSchema["typeDefinition"] & string {
  if (type && schema.typeDefinition[type]) return type;
  if (!schema.typeDefinition.DEFAULT)
    throw new Error("No default type defined");
  return schema.typeDefinition.DEFAULT.key;
}
