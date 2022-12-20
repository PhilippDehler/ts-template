import { typeSchemaBuilder } from "../schemaBuilder/typeSchemaBuilder";

export const builtInTypes = typeSchemaBuilder({})
  .addType("string", {
    isDefault: true,
    parseValue: (value) => value,
    validator: (value) => typeof value === "string",
  })
  .addType("number", {
    isDefault: false,
    parseValue: (value) => Number(value),
    validator: (value) => typeof value === "number",
  })
  .addType("date", {
    isDefault: false,
    parseValue: (value) => new Date(value),
    validator: (value) => value instanceof Date && !isNaN(value.getTime()),
  })
  .addType("boolean", {
    isDefault: false,
    parseValue: (value) => Boolean(value),
    validator: (value) => typeof value === "boolean",
  })
  .build();
