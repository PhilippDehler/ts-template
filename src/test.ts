import { templateBuilder } from "./schemaBuilder/templateBuilder";
import { typeSchemaBuilder } from "./schemaBuilder/typeSchemaBuilder";
import { infer } from "./utils";

typeSchemaBuilder({})
  .addType("string", {
    isDefault: true,
    validator: (input: string) => typeof input === "string",
    parseValue: (value: string) => value,
  })
  .addType("number", {
    isDefault: false,
    validator: (input: number) => typeof input === "number",
    parseValue: (value: string) => Number(value),
  })
  .addType("date", {
    isDefault: false,
    validator: (input: Date) => input instanceof Date,
    parseValue: (value: string) => new Date(value),
  })
  .build();

const { schema, template } = templateBuilder(
  {
    string: {
      key: "string",
      isDefault: true,
      validator: (input) => typeof input === "string",
      parseValue: (value) => value,
    },
    number: {
      key: "number",
      isDefault: false,
      validator: (input) => typeof input === "number",
      parseValue: (value) => Number(value),
    },
    date: {
      key: "date",
      isDefault: false,
      validator: (input) => input instanceof Date,
      parseValue: (value) => new Date(value),
    },
  },
  {}
)
  .add("string", (b) =>
    b
      .addOperation({
        key: "slice",
        args: infer([
          { key: "start", type: "number" },
          { key: "end", type: "number" },
        ]),
        returnType: "string",
        operation: (input, { start, end }) => input.slice(start, end),
      })
      .addOperation({
        key: "uppercase",
        args: [],
        returnType: "string",
        operation: (input) => input.toUpperCase(),
      })
      .addOperation({
        key: "lowercase",
        args: [],
        returnType: "string",
        operation: (input) => input.toLowerCase(),
      })
  )
  .add("number", (b) =>
    b
      .addOperation({
        key: "square",
        args: [],
        returnType: "number",
        operation: (input) => input * input,
      })
      .addOperation({
        key: "add",
        args: infer([{ key: "addend", type: "number" }]),
        returnType: "number",
        operation: (input, { addend }) => input + addend,
      })
  )
  .add("date", (b) =>
    b.addOperation({
      key: "iso",
      args: [],
      returnType: "string",
      operation: (input) => input.toISOString(),
    })
  )
  .build();

export type TestSchema = typeof schema;

const x = template(
  "hallo, {{lastname#string|uppercase|slice(0,1)}} {{firstname#string|uppercase}} {{age#number|square}} {{date#date|iso}}"
);

console.log(
  x({ age: 2, date: new Date(), firstname: "Max", lastname: "Mustermann" })
);
