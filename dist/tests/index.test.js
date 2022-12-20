"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const templateBuilder_1 = require("../schemaBuilder/templateBuilder");
const typeSchemaBuilder_1 = require("../schemaBuilder/typeSchemaBuilder");
const parseArguments_1 = require("../templateEngine/parseArguments");
const parseOperationChain_1 = require("../templateEngine/parseOperationChain");
describe("testing template engine", () => {
    const typeSchema = (0, typeSchemaBuilder_1.typeSchemaBuilder)({})
        .addType("string", {
        isDefault: true,
        parseValue: (value) => value,
        validator: (input) => typeof input === "string",
    })
        .addType("number", {
        parseValue: (value) => Number(value),
        validator: (input) => typeof input === "number" && !isNaN(input),
    })
        .addType("date", {
        parseValue: (value) => new Date(value),
        validator: (input) => input instanceof Date && !isNaN(input.getTime()),
    })
        .build();
    let testIncrementor = autoIncrement();
    const templateTestMessage = () => `Test templatestring variation ${testIncrementor()}`;
    const { schema, templateFn } = (0, templateBuilder_1.templateBuilder)(typeSchema, {})
        .add("string", (b) => b
        .addOperation({
        key: "slice",
        args: [
            { key: "start", type: "number" },
            { key: "end", type: "number" },
        ],
        operation: (input, { start, end }) => input.slice(start, end),
    })
        .addOperation({
        key: "uppercase",
        args: [],
        operation: (input) => input.toUpperCase(),
    })
        .addOperation({
        key: "lowercase",
        args: [],
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
        args: [{ key: "addend", type: "number" }],
        returnType: "number",
        operation: (input, { addend }) => input + addend,
    }))
        .add("date", (b) => b.addOperation({
        key: "iso",
        args: [],
        operation: (input) => input.toISOString(),
    }))
        .build();
    test(templateTestMessage(), () => expect(templateFn("Hallo {{user}}!")({ user: "Max" })).toBe("Hallo Max!"));
    test(templateTestMessage(), () => expect(templateFn("Hallo {{user|uppercase}}!")({ user: "Max" })).toBe("Hallo MAX!"));
    test(templateTestMessage(), () => expect(templateFn("Hallo {{user|lowercase|slice(0,1)}}!")({ user: "Max" })).toBe("Hallo m!"));
    test(templateTestMessage(), () => expect(templateFn("Happy Birthday, {{user|lowercase|slice(0,1)}}. {{birthday#date|iso}}!")({ user: "Max", birthday: new Date(0) })).toBe("Happy Birthday, m. 1970-01-01T00:00:00.000Z!"));
    test(templateTestMessage(), () => expect(() => templateFn("Happy Birthday, {{user|lowercase|slice(0,abc)}}. {{birthday#date|iso}}!")({ user: "Max", birthday: new Date(0) })).toThrow());
    test(templateTestMessage(), () => expect(templateFn("Happy Birthday, {{?firstname|uppercase}} {{lastName}}!")({
        firstname: "Max",
        lastName: "Smith",
    })).toBe("Happy Birthday, MAX Smith!"));
    test(templateTestMessage(), () => expect(templateFn("Happy Birthday, {{?firstname|uppercase}} {{lastName}}!")({
        lastName: "Smith",
    })).toBe("Happy Birthday,  Smith!"));
    testIncrementor = autoIncrement();
    const operationTestMessage = () => `Test operation variation ${testIncrementor()}`;
    test(operationTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(operationTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as(", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(operationTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as()", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(operationTestMessage(), () => {
        expect(() => (0, parseArguments_1.parseArguments)("as(1,)", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema)).toThrow();
    });
    test(operationTestMessage(), () => {
        expect(JSON.stringify((0, parseArguments_1.parseArguments)("as(1,1900-01-01)", [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
        ], schema))).toBe(JSON.stringify({
            user: "1",
            birthday: new Date("1900-01-01T00:00:00.000Z"),
        }));
    });
    test(operationTestMessage(), () => {
        expect((0, parseOperationChain_1.parseOperationChain)([], "string", schema).length).toBe(0);
    });
});
function autoIncrement() {
    let counter = 0;
    return () => counter++;
}
