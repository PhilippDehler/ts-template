"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.builtInTypes = void 0;
const typeSchemaBuilder_1 = require("../schemaBuilder/typeSchemaBuilder");
exports.builtInTypes = (0, typeSchemaBuilder_1.typeSchemaBuilder)({})
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
