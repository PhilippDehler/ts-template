import { templateBuilder } from "../schemaBuilder/templateBuilder";
import { typeSchemaBuilder } from "../schemaBuilder/typeSchemaBuilder";
import { infer } from "../utils";

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

export const { schema, templateFn } = templateBuilder(builtInTypes, {})
  .add("string", (_) =>
    _.addOperation({
      key: "trim",
      args: [],
      returnType: "string",
      operation: (_) => _.trim(),
    })
      .addOperation({
        key: "slice",
        args: infer([
          { key: "start", type: "number" },
          { key: "end", type: "number" },
        ]),
        returnType: "string",
        operation: (_, { start, end }) => _.slice(start, end),
      })
      .addOperation({
        key: "replace",
        args: infer([
          { key: "searchValue", type: "string" },
          { key: "replaceValue", type: "string" },
        ]),
        returnType: "string",
        operation: (_, { replaceValue, searchValue }) =>
          _.replace(searchValue, replaceValue),
      })
      .addOperation({
        key: "toLower",
        args: [],
        returnType: "string",
        operation: (_) => _.toLowerCase(),
      })
      .addOperation({
        key: "toUpper",
        args: [],
        returnType: "string",
        operation: (_) => _.toUpperCase(),
      })
      .addOperation({
        key: "capitalize",
        args: [],
        returnType: "string",
        operation: (_) => _.charAt(0).toUpperCase() + _.slice(1),
      })
      .addOperation({
        key: "startsWith",
        args: infer([
          { key: "searchString", type: "string" },
          { key: "position", type: "number" },
        ]),
        returnType: "boolean",
        operation: (_, { searchString, position }) =>
          _.startsWith(searchString, position),
      })
      .addOperation({
        key: "endsWith",
        args: infer([
          { key: "searchString", type: "string" },
          { key: "position", type: "number" },
        ]),
        returnType: "boolean",
        operation: (_, { searchString, position }) =>
          _.endsWith(searchString, position),
      })
      .addOperation({
        key: "includes",
        args: infer([
          { key: "searchString", type: "string" },
          { key: "position", type: "number" },
        ]),
        returnType: "boolean",
        operation: (_, { searchString, position }) =>
          _.includes(searchString, position),
      })
      .addOperation({
        key: "repeat",
        args: infer([{ key: "count", type: "number" }]),
        returnType: "string",
        operation: (_, { count }) => _.repeat(count),
      })
      .addOperation({
        key: "padStart",
        args: infer([
          { key: "targetLength", type: "number" },
          { key: "padString", type: "string" },
        ]),
        returnType: "string",
        operation: (_, { targetLength, padString }) =>
          _.padStart(targetLength, padString),
      })
      .addOperation({
        key: "padEnd",
        args: infer([
          { key: "targetLength", type: "number" },
          { key: "padString", type: "string" },
        ]),
        returnType: "string",
        operation: (_, { targetLength, padString }) =>
          _.padEnd(targetLength, padString),
      })
      .addOperation({
        key: "truncate",
        args: infer([
          { key: "length", type: "number" },
          { key: "end", type: "string" },
        ]),
        returnType: "string",
        operation: (_, { length, end }) => {
          if (_.length > length) {
            return _.slice(0, length) + end;
          }
          return _;
        },
      })
      .addOperation({
        key: "toDate",
        args: [],
        returnType: "date",
        operation: (_) => new Date(_),
      })
      .addOperation({
        key: "toNumber",
        args: [],
        returnType: "number",
        operation: (_) => Number(_),
      })
      .addOperation({
        key: "toBoolean",
        args: [],
        returnType: "boolean",
        operation: (_) => Boolean(_),
      })
      .addOperation({
        key: "urlEncode",
        args: [],
        returnType: "string",
        operation: (_) => encodeURIComponent(_),
      })
      .addOperation({
        key: "urlDecode",
        args: [],
        returnType: "string",
        operation: (_) => decodeURIComponent(_),
      })
      .addOperation({
        key: "base64Encode",
        args: [],
        returnType: "string",
        operation: (_) => Buffer.from(_).toString("base64"),
      })
      .addOperation({
        key: "base64Decode",
        args: [],
        returnType: "string",
        operation: (_) => Buffer.from(_, "base64").toString("ascii"),
      })
      .addOperation({
        key: "length",
        args: [],
        returnType: "number",
        operation: (_) => _.length,
      })
  )
  .build();
