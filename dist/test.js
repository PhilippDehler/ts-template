"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateBuilder_1 = require("./schemaBuilder/templateBuilder");
const typeSchemaBuilder_1 = require("./schemaBuilder/typeSchemaBuilder");
const utils_1 = require("./utils");
(0, typeSchemaBuilder_1.typeSchemaBuilder)({})
    .addType("string", {
    isDefault: true,
    validator: (input) => typeof input === "string",
    parseValue: (value) => value,
})
    .addType("number", {
    isDefault: false,
    validator: (input) => typeof input === "number",
    parseValue: (value) => Number(value),
})
    .addType("date", {
    isDefault: false,
    validator: (input) => input instanceof Date,
    parseValue: (value) => new Date(value),
})
    .build();
const { schema, template } = (0, templateBuilder_1.templateBuilder)({
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
}, {})
    .add("string", (b) => b
    .addOperation({
    key: "slice",
    args: (0, utils_1.infer)([
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
}))
    .add("number", (b) => b
    .addOperation({
    key: "square",
    args: [],
    returnType: "number",
    operation: (input) => input * input,
})
    .addOperation({
    key: "add",
    args: (0, utils_1.infer)([{ key: "addend", type: "number" }]),
    returnType: "number",
    operation: (input, { addend }) => input + addend,
}))
    .add("date", (b) => b.addOperation({
    key: "iso",
    args: [],
    returnType: "string",
    operation: (input) => input.toISOString(),
}))
    .build();
const x = template("hallo, {{lastname#string|uppercase|slice(0,1)}} {{firstname#string|uppercase}} {{age#number|square}} {{date#date|iso}}");
console.log(x({ age: 2, date: new Date(), firstname: "Max", lastname: "Mustermann" }));
