import { templateBuilder } from "../schemaBuilder/templateBuilder";
import { typeSchemaBuilder } from "../schemaBuilder/typeSchemaBuilder";
import { parseArguments } from "../templateEngine/parseArguments";
import { parseParserChain } from "../templateEngine/parseParserChain";
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
  const { schema, template } = templateBuilder(typeSchema, {})
    .add("string", (b) =>
      b
        .addParser(
          "slice",
          infer([
            { key: "start", type: "number" },
            { key: "end", type: "number" },
          ]),
          "string",
          (input, { start, end }) => input.slice(start, end)
        )
        .addParser("uppercase", [], "string", (input) => input.toUpperCase())
        .addParser("lowercase", [], "string", (input) => input.toLowerCase())
    )
    .add("number", (b) =>
      b
        .addParser("square", [], "number", (input) => input * input)
        .addParser(
          "add",
          infer([{ key: "addend", type: "number" }]),
          "number",
          (input, { addend }) => input + addend
        )
    )
    .add("date", (b) =>
      b.addParser("iso", [], "string", (input) => input.toISOString())
    )
    .build();

  test(templateTestMessage(), () =>
    expect(template("Hallo {{user}}!")({ user: "Max" })).toBe("Hallo Max!")
  );

  test(templateTestMessage(), () =>
    expect(template("Hallo {{user|uppercase}}!")({ user: "Max" })).toBe(
      "Hallo MAX!"
    )
  );

  test(templateTestMessage(), () =>
    expect(
      template("Hallo {{user|lowercase|slice(0,1)}}!")({ user: "Max" })
    ).toBe("Hallo m!")
  );

  test(templateTestMessage(), () =>
    expect(
      template(
        "Happy Birthday, {{user|lowercase|slice(0,1)}}. {{birthday#date|iso}}!"
      )({ user: "Max", birthday: new Date(0) })
    ).toBe("Happy Birthday, m. 1970-01-01T00:00:00.000Z!")
  );

  testIncrementor = autoIncrement();
  const parserTestMessage = () => `Test parser variation ${testIncrementor()}`;
  test(parserTestMessage(), () => {
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
  test(parserTestMessage(), () => {
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
  test(parserTestMessage(), () => {
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
  test(parserTestMessage(), () => {
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
  test(parserTestMessage(), () => {
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
  test(parserTestMessage(), () => {
    expect(parseParserChain([], "string", schema as any).length).toBe(0);
  });
});

function autoIncrement() {
  let counter = 0;
  return () => counter++;
}
