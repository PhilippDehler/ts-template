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
    // isDefault is optional, the default value is false
    isDefault: false,
    validator: (input: number) => typeof input === "number",
    parseValue: (value: string) => Number(value),
  })
  .addType("date", {
    isDefault: false,
    validator: (input: Date) =>
      input instanceof Date && !isNaN(input.getTime()),
    parseValue: (value: string) => new Date(value),
  })
  .build();
```

### Create your custom template function

Note: For this engine to work you have to use the `infer` function

```typescript
import { infer, templateBuilder } from "template-ts";

// requires an typeschema and all previous operations
// you can also specify a verbosity level possible values are 0 | 1 | 2 | 3
const { schema, templateFn } = templateBuilder(typeSchema, {}, 3)
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
        // Optional: if not specified the default schema type is used here
        returnType: "string",
        // define the executable operation, if everything is setup correctly all your types will be inferred
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
      operation: (input) => input.toISOString(),
    })
  )
  // build your template function
  .build();
```

### Verbosity example

Within the `templateBuilder´-function you can specify a verbosity level from 0 to 3

Verbosity-level:

- `0`: the `templateFn`-function will accept any string. This could break your parameter inferance. If the template string is not valid
- `1`: the `templateFn`-function shows the first error-string as your input
- `2`: the `templateFn`-function shows everything until the first error-string as your input
- `3`: the `templateFn`-function shows the fully validated string

```typescript
import { typeSchemaBuilder, buildTemplateFn } from "template-ts";

const typeSchema = typeSchemaBuilder({})
  .addType("string", {
    isDefault: true,
    validator: (input: string) => typeof input === "string",
    parseValue: (value: string) => value,
  })
  .addType("date", {
    validator: (input: Date) =>
      input instanceof Date && !isNaN(input.getTime()),
    parseValue: (value: string) => new Date(value),
  })
  .build();

const operations = templateBuilder(typeSchema, {}, 0)
  .add("string", (b) =>
    b.addOperation({
      key: "uppercase",
      args: [],
      returnType: "string",
      operation: (input) => input.toUpperCase(),
    })
  )
  .add("date", (b) =>
    b.addOperation({
      key: "iso",
      args: [],
      operation: (input) => input.toISOString(),
    })
  ).operation;

// ALL Examples will throw runtime errors

const template_verbose0 = buildTemplateFn(typeSchema, operations, 0);
// default type is "string" therefore "iso" should not be valid here
template_verbose0.templateFn("Hello {{name|iso}}"); // ts thinks this is valid
//  type "#date" is missing so the arguments are inferred as "string"
template_verbose0.templateFn("Hello {{name|iso}}")({ name: "string" }); // ts thinks this is valid
const template_verbose1 = buildTemplateFn(typeSchema, operations, 1);

// templateFn expect this input "[Error:Didn't expect Operation Key |iso|.]"
// verbose 1 is usefull for debugging large templates
template_verbose1.templateFn("Hello {{name|iso|iso}}"); // invalid

// templateFn expect this input "Hello {{name|[Error:Didn't expect Operation Key |iso|.]"
const template_verbose2 = buildTemplateFn(typeSchema, operations, 2);
template_verbose2.templateFn("Hello {{name|iso|iso}}"); // invalid

// templateFn expect this input "Hello {{name|[Error:Didn't expect Operation Key |iso|.]|[Error:Didn't expect Operation Key |iso|.]}}"
const template_verbose3 = buildTemplateFn(typeSchema, operations, 3);
template_verbose3.templateFn("Hello {{name|iso}}"); // invalid
```

## Usage

If you want to specify a replacable value in the template string, start by wrapping `{{` and `}}` around your template value.

After opening the template value scope you can prepend your `TemplateKey` by an `?`
to indicate that this value is optional in the resulting templateFn.

### All the following examples will use this setup

```typescript
import { infer, templateBuilder, typeSchemaBuilder } from "template-ts";

const typeSchema = typeSchemaBuilder({})
  .addType("string", {
    isDefault: true,
    validator: (input: string) => typeof input === "string",
    parseValue: (value: string) => value,
  })
  .addType("number", {
    // isDefault is optional, the default value is false
    isDefault: false,
    validator: (input: number) => typeof input === "number",
    parseValue: (value: string) => Number(value),
  })
  .addType("date", {
    isDefault: false,
    validator: (input: Date) =>
      input instanceof Date && !isNaN(input.getTime()),
    parseValue: (value: string) => new Date(value),
  })
  .build();

const { schema, templateFn } = templateBuilder(typeSchema, {})
  .add("string", (b) =>
    b
      .addParser({
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
        operation: (input) => input.toUpperCase(),
      })
      .addOperation({
        key: "lowercase",
        args: [],
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
      operation: (input) => input.toISOString(),
    })
  )
  .build();
```

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
test<RebuildTemplateString<TestValidateTemplate>>("");

type TestValidateTemplate1 = ValidateTemplate<"Hallo {{name}}", TestSchema>;
test<RebuildTemplateString<TestValidateTemplate1>>("Hallo {{name}}");

type TestValidateTemplate2 = ValidateTemplate<
  "Hallo {{?name|uppercase}}",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate2>>("Hallo {{?name|uppercase}}");

type TestValidateTemplate3 = ValidateTemplate<"{{name|uppercase}}", TestSchema>;
test<RebuildTemplateString<TestValidateTemplate3>>("{{name|uppercase}}");

type TestValidateTemplate4 = ValidateTemplate<
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate4>>(
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?"
);

type TestValidateTemplate5 = ValidateTemplate<
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)}} Geburtstag?",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate5>>(
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)}} Geburtstag?"
);

type TestValidateTemplate6 = ValidateTemplate<
  "{{birthday#date|uppercase|iso|?}}",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate6>>(
  "{{birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]|lowercase}}"
);

type TestValidateTemplate7 = ValidateTemplate<
  "{{birthday#string|uppercase|iso}}",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate7>>(
  "{{birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]}}"
);

type TestValidateTemplate8 = ValidateTemplate<
  "Hallo {{name#string|uppercase|slice(0,1)}}",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate8>>(
  "Hallo {{name#string|uppercase|slice(0,1)}}"
);

type TestValidateTemplate9 = ValidateTemplate<
  "Hallo {{name|uppercase|slice(0,?)}}",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate9>>(
  "Hallo {{name|uppercase|slice(0,[Error:Expected Type:number])}}"
);

type TestValidateTemplate10 = ValidateTemplate<
  "Hallo {{name|slice|slice(0,)}}",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplate10>>(
  "Hallo {{name|slice([Error:Expected Type:number],[Error:Expected Type:number])|slice(0,[Error:Expected Type:number])}}"
);
```

## built-ins

Here are some prebuild types and operations. You can copy them or import them directly

```typescript
import { templateBuilder, typeSchemaBuilder } from "ts-template";
import { infer } from "../utils";

export const builtInTypes = typeSchemaBuilder({})
  .addType("string", {
    isDefault: true,
    parseValue: (value) => value,
    validator: (value) => typeof value === "string",
  })
  .addType("number", {
    parseValue: (value) => Number(value),
    validator: (value) => typeof value === "number",
  })
  .addType("date", {
    parseValue: (value) => new Date(value),
    validator: (value) => value instanceof Date && !isNaN(value.getTime()),
  })
  .addType("boolean", {
    parseValue: (value) => Boolean(value),
    validator: (value) => typeof value === "boolean",
  })
  .build();

export const { schema: builtInTemplateSchema } = templateBuilder(
  builtInTypes,
  {}
)
  .add("string", (_) =>
    _.addOperation({
      key: "trim",
      args: [],
      operation: (_) => _.trim(),
    })
      .addOperation({
        key: "slice",
        args: [
          { key: "start", type: "number" },
          { key: "end", type: "number" },
        ],
        operation: (_, { start, end }) => _.slice(start, end),
      })
      .addOperation({
        key: "replace",
        args: [
          { key: "searchValue", type: "string" },
          { key: "replaceValue", type: "string" },
        ],
        operation: (_, { replaceValue, searchValue }) =>
          _.replace(searchValue, replaceValue),
      })
      .addOperation({
        key: "toLower",
        args: [],
        operation: (_) => _.toLowerCase(),
      })
      .addOperation({
        key: "toUpper",
        args: [],
        operation: (_) => _.toUpperCase(),
      })
      .addOperation({
        key: "capitalize",
        args: [],
        operation: (_) => _.charAt(0).toUpperCase() + _.slice(1),
      })
      .addOperation({
        key: "startsWith",
        args: [
          { key: "searchString", type: "string" },
          { key: "position", type: "number" },
        ],
        returnType: "boolean",
        operation: (_, { searchString, position }) =>
          _.startsWith(searchString, position),
      })
      .addOperation({
        key: "endsWith",
        args: [
          { key: "searchString", type: "string" },
          { key: "position", type: "number" },
        ],
        returnType: "boolean",
        operation: (_, { searchString, position }) =>
          _.endsWith(searchString, position),
      })
      .addOperation({
        key: "includes",
        args: [
          { key: "searchString", type: "string" },
          { key: "position", type: "number" },
        ],
        returnType: "boolean",
        operation: (_, { searchString, position }) =>
          _.includes(searchString, position),
      })
      .addOperation({
        key: "repeat",
        args: infer([{ key: "count", type: "number" }]),
        operation: (_, { count }) => _.repeat(count),
      })
      .addOperation({
        key: "padStart",
        args: [
          { key: "targetLength", type: "number" },
          { key: "padString", type: "string" },
        ],
        operation: (_, { targetLength, padString }) =>
          _.padStart(targetLength, padString),
      })
      .addOperation({
        key: "padEnd",
        args: [
          { key: "targetLength", type: "number" },
          { key: "padString", type: "string" },
        ],
        operation: (_, { targetLength, padString }) =>
          _.padEnd(targetLength, padString),
      })
      .addOperation({
        key: "truncate",
        args: [
          { key: "length", type: "number" },
          { key: "end", type: "string" },
        ],
        operation: (_, { length, end }) => {
          if (_.length > length) {
            return _.slice(0, length) + end;
          }
          return _;
        },
      })
      .addOperation({
        key: "toDate",
        args: [],
        returnType: "date",
        operation: (_) => new Date(_),
      })
      .addOperation({
        key: "toNumber",
        args: [],
        returnType: "number",
        operation: (_) => Number(_),
      })
      .addOperation({
        key: "toBoolean",
        args: [],
        returnType: "boolean",
        operation: (_) => (_ === "true" ? true : false),
      })
      .addOperation({
        key: "urlEncode",
        args: [],
        operation: (_) => encodeURIComponent(_),
      })
      .addOperation({
        key: "urlDecode",
        args: [],
        operation: (_) => decodeURIComponent(_),
      })
      .addOperation({
        key: "base64Encode",
        args: [],
        operation: (_) => Buffer.from(_).toString("base64"),
      })
      .addOperation({
        key: "base64Decode",
        args: [],
        operation: (_) => Buffer.from(_, "base64").toString("ascii"),
      })
      .addOperation({
        key: "length",
        args: [],
        returnType: "number",
        operation: (_) => _.length,
      })
  )
  .add("date", (_) =>
    _.addOperation({
      key: "toNumber",
      args: [],
      returnType: "number",
      operation: (_) => _.getTime(),
    })
      .addOperation({
        key: "toBoolean",
        args: [],
        returnType: "boolean",
        operation: (_) => Boolean(_),
      })
      .addOperation({
        key: "toDateString",
        args: [],
        operation: (_) => _.toDateString(),
      })
      .addOperation({
        key: "toISOString",
        args: [],
        operation: (_) => _.toISOString(),
      })
      .addOperation({
        key: "toJSON",
        args: [],
        operation: (_) => _.toJSON(),
      })
      .addOperation({
        key: "toLocaleDateString",
        args: infer([{ key: "locales", type: "string" }]),
        operation: (_, { locales }) => _.toLocaleDateString(locales),
      })
      .addOperation({
        key: "toLocaleString",
        args: infer([{ key: "locales", type: "string" }]),
        operation: (_, { locales }) => _.toLocaleString(locales),
      })
      .addOperation({
        key: "toLocaleTimeString",
        args: infer([{ key: "locales", type: "string" }]),
        operation: (_, { locales }) => _.toLocaleTimeString(locales),
      })
      .addOperation({
        key: "toString",
        args: [],
        operation: (_) => _.toString(),
      })
      .addOperation({
        key: "toTimeString",
        args: [],
        operation: (_) => _.toTimeString(),
      })
      .addOperation({
        key: "toUTCString",
        args: [],
        operation: (_) => _.toUTCString(),
      })
      .addOperation({
        key: "valueOf",
        args: [],
        returnType: "number",
        operation: (_) => _.valueOf(),
      })
      .addOperation({
        key: "getDay",
        args: [],
        returnType: "number",
        operation: (_) => _.getDay(),
      })
      .addOperation({
        key: "getDate",
        args: [],
        returnType: "number",
        operation: (_) => _.getDate(),
      })
      .addOperation({
        key: "getFullYear",
        args: [],
        returnType: "number",
        operation: (_) => _.getFullYear(),
      })
      .addOperation({
        key: "getHours",
        args: [],
        returnType: "number",
        operation: (_) => _.getHours(),
      })
      .addOperation({
        key: "getMilliseconds",
        args: [],
        returnType: "number",
        operation: (_) => _.getMilliseconds(),
      })
      .addOperation({
        key: "getMinutes",
        args: [],
        returnType: "number",
        operation: (_) => _.getMinutes(),
      })
      .addOperation({
        key: "getMonth",
        args: [],
        returnType: "number",
        operation: (_) => _.getMonth(),
      })
      .addOperation({
        key: "getSeconds",
        args: [],
        returnType: "number",
        operation: (_) => _.getSeconds(),
      })
      .addOperation({
        key: "getTime",
        args: [],
        returnType: "number",
        operation: (_) => _.getTime(),
      })
      .addOperation({
        key: "getTimezoneOffset",
        args: [],
        returnType: "number",
        operation: (_) => _.getTimezoneOffset(),
      })
      .addOperation({
        key: "getUTCDate",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCDate(),
      })
      .addOperation({
        key: "getUTCFullYear",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCFullYear(),
      })
      .addOperation({
        key: "getUTCHours",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCHours(),
      })
      .addOperation({
        key: "getUTCMilliseconds",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCMilliseconds(),
      })
      .addOperation({
        key: "getUTCMinutes",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCMinutes(),
      })
      .addOperation({
        key: "getUTCMonth",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCMonth(),
      })
      .addOperation({
        key: "getUTCSeconds",
        args: [],
        returnType: "number",
        operation: (_) => _.getUTCSeconds(),
      })
      .addOperation({
        key: "mmddyyyy",
        args: infer([{ key: "separator", type: "string" }]),
        operation: (_, { separator }) =>
          `${
            _.getMonth() + 1
          }${separator}${_.getDate()}${separator}${_.getFullYear()}`,
      })
      .addOperation({
        key: "ddmmyyyy",
        args: infer([{ key: "separator", type: "string" }]),
        operation: (_, { separator }) =>
          `${_.getDate()}${separator}${
            _.getMonth() + 1
          }${separator}${_.getFullYear()}`,
      })
      .addOperation({
        key: "ddyyyymm",
        args: infer([{ key: "separator", type: "string" }]),
        operation: (_, { separator }) =>
          `${_.getDate()}${separator}${_.getFullYear()}${separator}${
            _.getMonth() + 1
          }`,
      })
      .addOperation({
        key: "yyyyddmm",
        args: infer([{ key: "separator", type: "string" }]),
        operation: (_, { separator }) =>
          `${_.getFullYear()}${separator}${_.getDate()}${separator}${
            _.getMonth() + 1
          }`,
      })
  )
  .add("number", (_) =>
    _.addOperation({
      key: "toExponential",
      args: infer([{ key: "fractionDigits", type: "number" }]),
      operation: (_, { fractionDigits }) => _.toExponential(fractionDigits),
    })
      .addOperation({
        key: "toFixed",
        args: infer([{ key: "fractionDigits", type: "number" }]),
        operation: (_, { fractionDigits }) => _.toFixed(fractionDigits),
      })
      .addOperation({
        key: "toPrecision",
        args: infer([{ key: "precision", type: "number" }]),
        operation: (_, { precision }) => _.toPrecision(precision),
      })
      .addOperation({
        key: "toString",
        args: infer([{ key: "radix", type: "number" }]),
        operation: (_, { radix }) => _.toString(radix),
      })
      .addOperation({
        key: "valueOf",
        args: [],
        returnType: "number",
        operation: (_) => _.valueOf(),
      })
      .addOperation({
        key: "add",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => _ + value,
      })
      .addOperation({
        key: "subtract",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => _ + value,
      })
      .addOperation({
        key: "multiply",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => _ + value,
      })
      .addOperation({
        key: "divide",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => _ + value,
      })
      .addOperation({
        key: "root",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.pow(_, 1 / value),
      })
      .addOperation({
        key: "power",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.pow(_, value),
      })
      .addOperation({
        key: "log",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.log(value) / Math.log(_),
      })
      .addOperation({
        key: "log10",
        args: [],
        returnType: "number",
        operation: (_) => Math.log10(_),
      })
      .addOperation({
        key: "log2",
        args: [],
        returnType: "number",
        operation: (_) => Math.log2(_),
      })
      .addOperation({
        key: "log1p",
        args: [],
        returnType: "number",
        operation: (_) => Math.log1p(_),
      })
      .addOperation({
        key: "exp",
        args: [],
        returnType: "number",
        operation: (_) => Math.exp(_),
      })
      .addOperation({
        key: "expm1",
        args: [],
        returnType: "number",
        operation: (_) => Math.expm1(_),
      })
      .addOperation({
        key: "sin",
        args: [],
        returnType: "number",
        operation: (_) => Math.sin(_),
      })
      .addOperation({
        key: "cos",
        args: [],
        returnType: "number",
        operation: (_) => Math.cos(_),
      })
      .addOperation({
        key: "tan",
        args: [],
        returnType: "number",
        operation: (_) => Math.tan(_),
      })
      .addOperation({
        key: "asin",
        args: [],
        returnType: "number",
        operation: (_) => Math.asin(_),
      })
      .addOperation({
        key: "acos",
        args: [],
        returnType: "number",
        operation: (_) => Math.acos(_),
      })
      .addOperation({
        key: "atan",
        args: [],
        returnType: "number",
        operation: (_) => Math.atan(_),
      })
      .addOperation({
        key: "atan2",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.atan2(_, value),
      })
      .addOperation({
        key: "sinh",
        args: [],
        returnType: "number",
        operation: (_) => Math.sinh(_),
      })
      .addOperation({
        key: "cosh",
        args: [],
        returnType: "number",
        operation: (_) => Math.cosh(_),
      })
      .addOperation({
        key: "tanh",
        args: [],
        returnType: "number",
        operation: (_) => Math.tanh(_),
      })
      .addOperation({
        key: "asinh",
        args: [],
        returnType: "number",
        operation: (_) => Math.asinh(_),
      })
      .addOperation({
        key: "acosh",
        args: [],
        returnType: "number",
        operation: (_) => Math.acosh(_),
      })
      .addOperation({
        key: "atanh",
        args: [],
        returnType: "number",
        operation: (_) => Math.atanh(_),
      })
      .addOperation({
        key: "hypot",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.hypot(_, value),
      })
      .addOperation({
        key: "trunc",
        args: [],
        returnType: "number",
        operation: (_) => Math.trunc(_),
      })
      .addOperation({
        key: "sign",
        args: [],
        returnType: "number",
        operation: (_) => Math.sign(_),
      })
      .addOperation({
        key: "cbrt",
        args: [],
        returnType: "number",
        operation: (_) => Math.cbrt(_),
      })
      .addOperation({
        key: "ceil",
        args: [],
        returnType: "number",
        operation: (_) => Math.ceil(_),
      })
      .addOperation({
        key: "floor",
        args: [],
        returnType: "number",
        operation: (_) => Math.floor(_),
      })
      .addOperation({
        key: "round",
        args: [],
        returnType: "number",
        operation: (_) => Math.round(_),
      })
      .addOperation({
        key: "imul",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.imul(_, value),
      })
      .addOperation({
        key: "fround",
        args: [],
        returnType: "number",
        operation: (_) => Math.fround(_),
      })
      .addOperation({
        key: "clz32",
        args: [],
        returnType: "number",
        operation: (_) => Math.clz32(_),
      })
      .addOperation({
        key: "random",
        args: [],
        returnType: "number",
        operation: (_) => Math.random(),
      })
      .addOperation({
        key: "abs",
        args: [],
        returnType: "number",
        operation: (_) => Math.abs(_),
      })
      .addOperation({
        key: "max",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.max(_, value),
      })
      .addOperation({
        key: "min",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.min(_, value),
      })
      .addOperation({
        key: "hypot",
        args: infer([{ key: "value", type: "number" }]),
        returnType: "number",
        operation: (_, { value }) => Math.hypot(_, value),
      })
      .addOperation({
        key: "sqrt",
        args: [],
        returnType: "number",
        operation: (_) => Math.sqrt(_),
      })
      .addOperation({
        key: "square",
        args: [],
        returnType: "number",
        operation: (_) => Math.pow(_, 2),
      })
  )
  .add("boolean", (_) =>
    _.addOperation({
      key: "not",
      args: [],
      returnType: "boolean",
      operation: (_) => !_,
    })
      .addOperation({
        key: "and",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => _ && value,
      })
      .addOperation({
        key: "or",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => _ || value,
      })
      .addOperation({
        key: "xor",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => _ !== value,
      })
      .addOperation({
        key: "nand",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => !(_ && value),
      })
      .addOperation({
        key: "nor",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => !(_ || value),
      })
      .addOperation({
        key: "xnor",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => _ === value,
      })
      .addOperation({
        key: "equals",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => _ === value,
      })
      .addOperation({
        key: "notEquals",
        args: infer([{ key: "value", type: "boolean" }]),
        returnType: "boolean",
        operation: (_, { value }) => _ !== value,
      })
  )
  .build();
```
