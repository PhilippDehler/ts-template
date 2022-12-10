"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateBuilder_1 = require("./schemaBuilder/templateBuilder");
const typeSchemaBuilder_1 = require("./schemaBuilder/typeSchemaBuilder");
const parseParserChain_1 = require("./templateEngine/parseParserChain");
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
const { schema } = (0, templateBuilder_1.templateBuilder)({
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
    .addParser("slice", (0, utils_1.infer)([
    { key: "start", type: "number" },
    { key: "end", type: "number" },
]), "string", (input, { start, end }) => input.slice(start, end))
    .addParser("uppercase", [], "string", (input) => input.toUpperCase())
    .addParser("lowercase", [], "string", (input) => input.toLowerCase()))
    .add("number", (b) => b
    .addParser("square", [], "number", (input) => input * input)
    .addParser("add", (0, utils_1.infer)([{ key: "addend", type: "number" }]), "number", (input, { addend }) => input + addend))
    .add("date", (b) => b.addParser("iso", [], "string", (input) => input.toISOString()))
    .build();
console.log((0, parseParserChain_1.parseParserChain)([], "string", schema));
