"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateBuilder_1 = require("../schemaBuilder/templateBuilder");
const typeSchemaBuilder_1 = require("../schemaBuilder/typeSchemaBuilder");
const utils_1 = require("../utils");
const typeSchema = (0, typeSchemaBuilder_1.typeSchemaBuilder)({})
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
const { schema } = (0, templateBuilder_1.templateBuilder)(typeSchema, {})
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
function test(i) {
    return i;
}
test("slice(0,1)|uppercase");
test("iso|slice(0,[Expected Type:number])");
test("uppercase|slice(?[Expected Type:number],[Expected Type:number])");
test("iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])");
test("iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|lowercase");
test("iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|uppercase");
test("iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|slice");
test("[Error:Didn't expect Operation Key |a|.]");
test("[Error:Didn't expect Operation Key |iso|.]");
test("uppercase");
test("uppercase");
test("lowercase");
test("slice(0,[Expected Type:number])");
test("slice(0,1,[Error:Didn't expect Arg 1])");
test("slice[Expected Type:number],[Expected Type:number]");
test("[Error:Didn't expect Operation Key |slicee|.]");
test("slice");
test("slice");
test("?[Expected Type:string]");
test("a");
test("[Expected Type:string]");
test("some,[Expected Type:number]");
test("some,4");
test("some,[Error:Didn't expect Arg 4]");
test("some,[Expected Type:number]");
test("[Error:Expected non-empty-value]");
test("name");
test("name");
test("name|uppercase");
test("birthday#date|iso|uppercase|slice(0,1)");
test("birthday#date|iso|uppercase|slice(0,[Expected Type:number])");
test("birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]");
test("birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]");
test("name#string|uppercase|slice(0,1)");
test("name|lowercase|slice(0,?[Expected Type:number])");
test("");
test("Hallo {{name}}");
test("Hallo {{name|uppercase}}");
test("{{name|uppercase}}");
test("Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?");
test("Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)}} Geburtstag?");
test("{{birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]|lowercase}}");
test("{{birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]}}");
test("Hallo {{name#string|uppercase|slice(0,1)}}");
test("Hallo {{name|uppercase|slice(0,?[Expected Type:number])}}");
test("Hallo {{name|slice[Expected Type:number],[Expected Type:number]|slice(0,[Expected Type:number])}}");
test("date");
test("date");
test("DEFAULT");
test("string");
test("string");
