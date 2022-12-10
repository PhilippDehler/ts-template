import { templateBuilder } from "../schemaBuilder/templateBuilder";
import { typeSchemaBuilder } from "../schemaBuilder/typeSchemaBuilder";
import { parseArguments } from "../templateEngine/parseArguments";
import { parseOperationChain } from "../templateEngine/parseOperationChain";
import { infer } from "../utils";

describe("testing index file", () => {
  const typeSchema = typeSchemaBuilder({})
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
  let testIncrementor = autoIncrement();
  const templateTestMessage = () =>
    `Test templatestring variation ${testIncrementor()}`;
  const { schema, templateFn } = templateBuilder(typeSchema, {})
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

  test(templateTestMessage(), () =>
    expect(templateFn("Hallo {{user}}!")({ user: "Max" })).toBe("Hallo Max!")
  );

  test(templateTestMessage(), () =>
    expect(templateFn("Hallo {{user|uppercase}}!")({ user: "Max" })).toBe(
      "Hallo MAX!"
    )
  );

  test(templateTestMessage(), () =>
    expect(
      templateFn("Hallo {{user|lowercase|slice(0,1)}}!")({ user: "Max" })
    ).toBe("Hallo m!")
  );

  test(templateTestMessage(), () =>
    expect(
      templateFn(
        "Happy Birthday, {{user|lowercase|slice(0,1)}}. {{birthday#date|iso}}!"
      )({ user: "Max", birthday: new Date(0) })
    ).toBe("Happy Birthday, m. 1970-01-01T00:00:00.000Z!")
  );

  testIncrementor = autoIncrement();
  const operationTestMessage = () =>
    `Test operation variation ${testIncrementor()}`;
  test(operationTestMessage(), () => {
    expect(() =>
      parseArguments(
        "as",
        [
          { key: "user", type: "string" },
          { key: "birthday", type: "date" },
        ],
        schema as any
      )
    ).toThrow();
  });
  test(operationTestMessage(), () => {
    expect(() =>
      parseArguments(
        "as(",
        [
          { key: "user", type: "string" },
          { key: "birthday", type: "date" },
        ],
        schema as any
      )
    ).toThrow();
  });
  test(operationTestMessage(), () => {
    expect(() =>
      parseArguments(
        "as()",
        [
          { key: "user", type: "string" },
          { key: "birthday", type: "date" },
        ],
        schema as any
      )
    ).toThrow();
  });
  test(operationTestMessage(), () => {
    expect(() =>
      parseArguments(
        "as(1,)",
        [
          { key: "user", type: "string" },
          { key: "birthday", type: "date" },
        ],
        schema as any
      )
    ).toThrow();
  });
  test(operationTestMessage(), () => {
    expect(
      JSON.stringify(
        parseArguments(
          "as(1,1900-01-01)",
          [
            { key: "user", type: "string" },
            { key: "birthday", type: "date" },
          ],
          schema as any
        )
      )
    ).toBe(
      JSON.stringify({
        user: "1",
        birthday: new Date("1900-01-01T00:00:00.000Z"),
      })
    );
  });
  test(operationTestMessage(), () => {
    expect(parseOperationChain([], "string", schema as any).length).toBe(0);
  });
});

function autoIncrement() {
  let counter = 0;
  return () => counter++;
}
