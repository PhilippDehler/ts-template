"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateBuilder_1 = require("../schemaBuilder/templateBuilder");
const typeSchemaBuilder_1 = require("../schemaBuilder/typeSchemaBuilder");
const parseArguments_1 = require("../templateEngine/parseArguments");
const parseParserChain_1 = require("../templateEngine/parseParserChain");
const utils_1 = require("../utils");
describe("testing index file", () => {
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
    let testIncrementor = autoIncrement();
    const templateTestMessage = () => `Test templatestring variation ${testIncrementor()}`;
    const { schema, template } = (0, templateBuilder_1.templateBuilder)(typeSchema, {})
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
    test(templateTestMessage(), () => expect(template("Hallo {{user}}!")({ user: "Max" })).toBe("Hallo Max!"));
    test(templateTestMessage(), () => expect(template("Hallo {{user|uppercase}}!")({ user: "Max" })).toBe("Hallo MAX!"));
    test(templateTestMessage(), () => expect(template("Hallo {{user|lowercase|slice(0,1)}}!")({ user: "Max" })).toBe("Hallo m!"));
    test(templateTestMessage(), () => expect(template("Happy Birthday, {{user|lowercase|slice(0,1)}}. {{birthday#date|iso}}!")({ user: "Max", birthday: new Date(0) })).toBe("Happy Birthday, m. 1970-01-01T00:00:00.000Z!"));
    testIncrementor = autoIncrement();
    const parserTestMessage = () => `Test parser variation ${testIncrementor()}`;
    test(parserTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(parserTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as(", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(parserTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as()", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(parserTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as(1,)", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(parserTestMessage(), () => {
        expect(JSON.stringify((0, parseArguments_1.parseArguments)("as(1,1900-01-01)", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema))).toBe(JSON.stringify({
            user: "1",
            birthday: new Date("1900-01-01T00:00:00.000Z"),
        }));
    });
    test(parserTestMessage(), () => {
        expect((0, parseParserChain_1.parseParserChain)([], "string", schema).length).toBe(0);
    });
});
function autoIncrement() {
    let counter = 0;
    return () => counter++;
}
