# ts-template

This is a small typesafe template engine written in Typescript.

## Setup

### Create a Type Schema

Create a typeschema for your template engine. You can specify any datatype you want.
You need to specify at least on default type

```typescript
import { typeSchemaBuilder } from "ts-template";

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
```

### Create your custom template function

```typescript
import { infer, templateBuilder } from "ts-template";

const { schema, templateFn } = templateBuilder(typeSchema, {})
  .add("string", (b) =>
    b
      // You can add multiple functions to a definied type
      .add("string", (b) =>
        b
          .addParser({
            // key of your custom operation
            key: "slice",
            // Argumentdefinition that your operation will receive from the template string
            // In this version you have to use the helper function infer
            args: infer([
              { key: "start", type: "number" },
              { key: "end", type: "number" },
            ]),
            // define the return type from your operation
            // all keys of your typeschema are valid here
            returnType: "string",
            // define youe operation, if everything is setup correctly your all types will be inferred
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
  )
  // build your template function
  .build();
```

## Usage

```typescript
// We take the templateFn from the previous code block
// Create a simple template string

const greetUser = templatefn("Hello, {{user}}!");
greetUser({ user: "Max" });

// specify the type of the variable by append "#<SchemaType>"
// if you don't specify any type the default type from your TypeSchema is used
const greetUser1 = templatefn(
  "Hello, {{user|uppercase}}. Today is your {{birthday#date|iso}}!"
);
greetUser1({ user: "Max", birthday: new Date() });

// chain operation to modify the string
// Parserchaindefinition: |<ParserKey>|<ParserKey>| ... |<ParserKey>

const greetUser2 = templatefn(
  "Hello, {{user}}. Today is your {{birthday#date|iso|slice(0,1)|lowercase}}!"
);
greetUser2({ user: "Max", birthday: new Date() });
```

## String Validation

It's sometimes unsafe to define a template string with an arbitrary amount of chained operations without any typing errors.
This library tries to validate your template string and can also suggests valid template strings.

```typescript
type TestValidateTemplate = ValidateTemplate<"", TestSchema>;
test<TestValidateTemplate>("");

type TestValidateTemplate1 = ValidateTemplate<"Hello {{name}}", TestSchema>;
test<TestValidateTemplate1>("Hello {{name}}");

type TestValidateTemplate2 = ValidateTemplate<
  "Hello {{name|uppercase}}",
  TestSchema
>;
test<TestValidateTemplate2>("Hello {{name|uppercase}}");

type TestValidateTemplate3 = ValidateTemplate<"{{name|uppercase}}", TestSchema>;
test<TestValidateTemplate3>("{{name|uppercase}}");

type TestValidateTemplate4 = ValidateTemplate<
  "Hello {{name|uppercase}}, it's your brithday {{birthday#date|iso}}.",
  TestSchema
>;
test<TestValidateTemplate4>(
  "Hello {{name|uppercase}}, it's your brithday {{birthday#date|iso}}."
);

type TestValidateTemplate5 = ValidateTemplate<
  "Hello {{name|uppercase}}, it's your brithday {{birthday#date|iso|uppercase|slice(0,1)|}}!",
  TestSchema
>;
test<TestValidateTemplate5>(
  "Hello {{name|uppercase}}, it's your brithday {{birthday#date|iso|uppercase|slice(0,1)}}!"
);

type TestValidateTemplate6 = ValidateTemplate<
  "{{birthday#date|uppercase|iso|?}}",
  TestSchema
>;
test<TestValidateTemplate6>(
  "{{birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]|lowercase}}"
);

type TestValidateTemplate7 = ValidateTemplate<
  "{{birthday#string|uppercase|iso|}}",
  TestSchema
>;
test<TestValidateTemplate7>(
  "{{birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]}}"
);

type TestValidateTemplate8 = ValidateTemplate<
  "Hallo {{name#string|uppercase|slice(0,1)}}",
  TestSchema
>;
test<TestValidateTemplate8>("Hallo {{name#string|uppercase|slice(0,1)}}");

type TestValidateTemplate9 = ValidateTemplate<
  "Hallo {{name|uppercase|slice(0,?)|}}",
  TestSchema
>;
test<TestValidateTemplate9>(
  "Hallo {{name|uppercase|slice(0,?[Expected Type:number])}}"
);

type TestValidateTemplate10 = ValidateTemplate<
  "Hallo {{name|slice|slice(0,)}}",
  TestSchema
>;
test<TestValidateTemplate10>(
  "Hallo {{name|slice[Expected Type:number],[Expected Type:number]|slice(0,[Expected Type:number])}}"
);
```

## TODOs

- trim every value in the template keys to prevent bugs
