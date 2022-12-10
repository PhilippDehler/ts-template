# template-ts

This is a small typesafe template engine written in Typescript.

## Setup

### Create a type schema

Create a type schema for your template engine. You can specify any datatype you want.
You need to specify _exactly one_ default type.

```typescript
import { typeSchemaBuilder } from "template-ts";

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

Note: For this engine to work you have to use the `infer` function

```typescript
import { infer, templateBuilder } from "template-ts";

const { schema, templateFn } = templateBuilder(typeSchema, {})
  .add("string", (b) =>
    b
      // You can add multiple functions to a definied type
      .add("string", (b) =>
        b
          .addParser({
            // key of your custom operation
            key: "slice",
            // Argumentdefinition that your operation will receive from the templateFn
            // In this version you HAVE to use the helper function infer
            args: infer([
              { key: "start", type: "number" },
              { key: "end", type: "number" },
            ]),
            // Define the return type from your operation
            // All keys of your typeschema are valid here
            returnType: "string",
            // define the executable operation, if everything is setup correctly all your types will be inferred
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

If you want to specify a replacable value in the template string, start by wrapping `{{` and `}}` around your template value.

After opening the template value scope you can prepend your `TemplateKey` by an `?`
to indicate that this value is optional in the resulting templateFn.

### Example template key

```typescript
const greetUser = templateFn("Hello, {{firstName}} {{lastName}}");
greetUser({ firstName: "Max", lastName: "Smith" }); // returns "Hello, Max Smith"
```

### Example optional

```typescript
// Optional parameters
const greetUser = templateFn("Hello, {{firstName}} {{?lastName}}");
greetUser({ firstName: "Max" }); // returns "Hello, Max "
greetUser({ firstName: "Max", lastName: "Smith" }); // returns "Hello, Max Smith"
```

### Example type

After your `TemplateKey` you can specify a type by append `#` and a valid `SchemaTypeKey`.
If you don't specify any type the default `SchemaTypeKey` is used ("string" in our examples).

```typescript
const greetUser = templateFn(
  "Hello, {{firstName}}. You are {{age#number}} years old."
);
greetUser({ firstName: "Max", age: 12 }); // returns "Hello, Max. You are 12 years old."
```

### Example operation

Now you can define an operation chain. Just append `|` and an valid `OperationKey` after your `SchemaTypeKey` or your `TemplateKey` if no `SchemaTypeKey` is specified.
The operation chain will be validated dynamiclly.

```typescript
const greetUser = templateFn(
  "Hello, {{firstName}}. You are {{age#number|square|square}} years old."
);
greetUser({ firstName: "Max", age: 2 }); // returns "Hello, Max. You are 8 years old."

// This will create an type error because uppercase can not be called with an input of type number
const greetUser = templateFn(
  "Hello, {{firstName}}. You are {{age#number|square|uppercase}} years old."
);
greetUser({ firstName: "Max", age: 2 }); // Error
```

### Example operation arguments

If you specified any args in your template builder you can assign these arguments like this:

```typescript
const greetUser = templateFn(
  "Hello, {{firstName}}. You are {{age#number|add(2)}} years old."
);
greetUser({ firstName: "Max", age: 12 }); // returns "Hello, Max. You are 14 years old."
// The existance of arguments is also validated. If you specified one argument. You HAVE to use it

// All arguments are parsed by your parsedValue fn and  validated by your validator fn.
// If the validator return false the engine will throw an error
// The template string validator can't validate the value of an argument for now.
const greetUser = templateFn(
  "Hello, {{firstName}}. You are {{age#number|add(something that is not a number)}} years old."
);
greetUser({ firstName: "Max", age: 12 }); // throws an error
```

### Examples suggestions:

With `?` you can force the template string validator to suggest a possible operation
or the type of an arg. If you use the `?` infront of a template key
it will mark this template key as optional.

```typescript
// Optional parameters
const greetUser = templateFn("Hello, {{firstName}} {{?lastName}}");
greetUser({ firstName: "Max" }); // returns "Hello, Max "
greetUser({ firstName: "Max", lastName: "Smith" }); // returns "Hello, Max Smith"

// suggestions
const greetUser = templateFn("Hello, {{firstName}} {{lastName|?}}");
// Will suggest:
//    "Hello, {{firstName}} {{lastName|upercase}}"
// |  "Hello, {{firstName}} {{lastName|lowercse}}"
// |  "Hello, {{firstName}} {{lastName|slice}}"

const greetUser = templateFn("Hello, {{firstName}} {{lastName|slice(?)}}");
// Will suggest:
//    "Hello, {{firstName}} {{lastName|slice([Expected Type:number])}}"
```

### More examples

```typescript
// We take the templateFn from the previous code block
// Create a simple template string

const greetUser = templateFn("Hello, {{user}}!");
greetUser({ user: "Max" });

// specify the type of the variable by append "#<SchemaType>"
// if you don't specify any type the default type from your TypeSchema is used
const greetUser1 = templateFn(
  "Hello, {{user|uppercase}}. Today is your {{birthday#date|iso}}!"
);
greetUser1({ user: "Max", birthday: new Date() });

// chain operation to modify the string
// Parserchaindefinition: |<ParserKey>|<ParserKey>| ... |<ParserKey>

const greetUser2 = templateFn(
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
