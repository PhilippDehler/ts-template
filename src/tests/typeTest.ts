import { templateBuilder } from "../schemaBuilder/templateBuilder";
import { typeSchemaBuilder } from "../schemaBuilder/typeSchemaBuilder";
import {
  ValidateArg,
  ValidateArgs,
} from "../templateStringValidator/argsValidator";
import {
  ValidateOperation,
  ValidateOperationKey,
  ValidateOperations,
} from "../templateStringValidator/operationValidator";
import { RebuildTemplateString } from "../templateStringValidator/rebuildTemplateString";
import {
  ValidateTemplate,
  ValidateTemplateValue,
} from "../templateStringValidator/templateValidator";
import { AutoComplete, Split } from "../ts-utils/string";
import { infer } from "../utils";

const typeSchema = typeSchemaBuilder({})
  .addType("string", {
    isDefault: true,
    validator: (input: string) => typeof input === "string",
    parseValue: (value: string) => value,
  })
  .addType("number", {
    validator: (input: number) => typeof input === "number",
    parseValue: (value: string) => Number(value),
  })
  .addType("date", {
    validator: (input: Date) => input instanceof Date,
    parseValue: (value: string) => new Date(value),
  })
  .build();
const { schema } = templateBuilder(typeSchema, {}, 1)
  .add("string", (b) =>
    b
      .addOperation({
        key: "slice",
        args: infer([
          { key: "start", type: "number" },
          { key: "end", type: "number" },
        ]),
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

export type TestSchema = typeof schema;
function test<T>(i: T) {
  return i;
}

type TestValidateOperations = ValidateOperations<
  Split<"slice(0,1)|uppercas", "|">,
  TestSchema,
  "string"
>;
test<RebuildTemplateString<TestValidateOperations>>("slice(0,1)|uppercase");

type TestValidateOperations0 = ValidateOperations<
  Split<"iso|slice(0,)", "|">,
  TestSchema,
  "date"
>;
test<RebuildTemplateString<TestValidateOperations0>>(
  "iso|slice(0,[Error:Expected Type:number])"
);

type TestValidateOperations1 = ValidateOperations<
  Split<"uppercase|slice(?,)", "|">,
  TestSchema,
  "string"
>;
test<RebuildTemplateString<TestValidateOperations1>>(
  "uppercase|slice([Error:Expected Type:number],[Error:Expected Type:number])"
);

type TestValidateOperations2 = ValidateOperations<
  Split<"iso|uppercase|slice(?,)", "|">,
  TestSchema,
  "date"
>;
test<RebuildTemplateString<TestValidateOperations2>>(
  "iso|uppercase|slice([Error:Expected Type:number],[Error:Expected Type:number])"
);

type TestValidateOperations2_0 =
  `iso|uppercase|slice([Error:Expected Type:${string}],[Error:Expected Type:number])` extends RebuildTemplateString<TestValidateOperations2>
    ? "valid"
    : "invalid";
const testValidateOperations2_0: TestValidateOperations2_0 = "invalid";
testValidateOperations2_0;
type TestValidateOperations3 = ValidateOperations<
  Split<"iso|uppercase|slice(?,)|?", "|">,
  Omit<TestSchema, "DEFAULT">,
  "date"
>;
test<RebuildTemplateString<TestValidateOperations3>>(
  "iso|uppercase|slice([Error:Expected Type:number],[Error:Expected Type:number])|lowercase"
);
test<RebuildTemplateString<TestValidateOperations3>>(
  "iso|uppercase|slice([Error:Expected Type:number],[Error:Expected Type:number])|uppercase"
);
test<RebuildTemplateString<TestValidateOperations3>>(
  "iso|uppercase|slice([Error:Expected Type:number],[Error:Expected Type:number])|slice"
);

type TestOperationLookUp = TestSchema["string"];

type TestValidateOperation0 = ValidateOperation<"a", TestOperationLookUp>;
test<RebuildTemplateString<TestValidateOperation0>>(
  "[Error:Didn't expect Operation Key |a|.]"
);

type TestValidateOperation1 = ValidateOperation<"iso", TestOperationLookUp>;
test<RebuildTemplateString<TestValidateOperation1>>(
  "[Error:Didn't expect Operation Key |iso|.]"
);

type TestValidateOperation2 = ValidateOperation<
  "uppercase",
  TestOperationLookUp
>;
test<RebuildTemplateString<TestValidateOperation2>>("uppercase");

type TestValidateOperation3 = ValidateOperation<"up", TestOperationLookUp>;
test<RebuildTemplateString<TestValidateOperation3>>("uppercase");

type TestValidateOperation4 = ValidateOperation<"lo", TestOperationLookUp>;
test<RebuildTemplateString<TestValidateOperation4>>("lowercase");

type TestValidateOperation5 = ValidateOperation<
  "slice(0,)",
  TestOperationLookUp
>;
test<RebuildTemplateString<TestValidateOperation5>>(
  "slice(0,[Error:Expected Type:number])"
);

type TestValidateOperation6 = ValidateOperation<
  "slice(0,1,1)",
  TestOperationLookUp
>;
test<RebuildTemplateString<TestValidateOperation6>>(
  "slice(0,1,[Error:Didn't expect Arg 1])"
);

type TestValidateOperation7 = ValidateOperation<"slice", TestOperationLookUp>;
test<RebuildTemplateString<TestValidateOperation7>>(
  "slice([Error:Expected Type:number],[Error:Expected Type:number])"
);

type TestValidateOperationKey0 = ValidateOperationKey<
  "slicee",
  { slice: any; uppercase: any }
>;
test<RebuildTemplateString<[TestValidateOperationKey0]>>(
  "[Error:Didn't expect Operation Key |slicee|.]"
);

type TestValidateOperationKey1 = ValidateOperationKey<
  "slicee?",
  { slice: any; uppercase: any }
>;
test<RebuildTemplateString<[TestValidateOperationKey1]>>("slice");

type TestValidateOperationKey2 = ValidateOperationKey<
  "slic",
  { slice: any; uppercase: any }
>;
test<RebuildTemplateString<[TestValidateOperationKey2]>>("slice");

test<RebuildTemplateString<[TestValidateArg0]>>("[Error:Expected Type:string]");
type TestValidateArg0 = ValidateArg<"?", { key: "start"; type: "string" }>;

test<RebuildTemplateString<[TestValidateArg1]>>("a");
type TestValidateArg1 = ValidateArg<"a", { key: "start"; type: "string" }>;

test<RebuildTemplateString<[TestValidateArg2]>>("[Error:Expected Type:string]");
type TestValidateArg2 = ValidateArg<"", { key: "start"; type: "string" }>;

type TestValidateArgs = ValidateArgs<
  Split<"some,", ",">,
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
test<RebuildTemplateString<TestValidateArgs>>(
  "some,[Error:Expected Type:number]"
);

type TestValidateArgs0 = ValidateArgs<
  Split<"some,4", ",">,
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
test<RebuildTemplateString<TestValidateArgs0>>("some,4");

type TestValidateArgs1 = ValidateArgs<
  Split<"some,4", ",">,
  [{ type: "string"; key: "a" }]
>;
test<RebuildTemplateString<TestValidateArgs1>>(
  "some,[Error:Didn't expect Arg 4]"
);

type TestValidateArgs2 = ValidateArgs<
  Split<"some", ",">,
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
test<RebuildTemplateString<TestValidateArgs2>>(
  "some,[Error:Expected Type:number]"
);

type TestValidateTemplateValue = ValidateTemplateValue<"", TestSchema>;
test<RebuildTemplateString<TestValidateTemplateValue>>(
  "[Error:Expected non-empty-value]"
);

type TestValidateTemplateValue1 = ValidateTemplateValue<"name", TestSchema>;
test<RebuildTemplateString<TestValidateTemplateValue1>>("name");

type TestValidateTemplateValue2 = ValidateTemplateValue<"name", TestSchema>;
test<RebuildTemplateString<TestValidateTemplateValue2>>("name");

type TestValidateTemplateValue3 = ValidateTemplateValue<
  "name|uppercase",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue3>>("name|uppercase");

type TestValidateTemplateValue4 = ValidateTemplateValue<
  "birthday#date|iso|uppercase|slice(0,1)",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue4>>(
  "birthday#date|iso|uppercase|slice(0,1)"
);

type TestValidateTemplateValue5 = ValidateTemplateValue<
  "birthday#date|iso|uppercase|slice(0,)",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue5>>(
  "birthday#date|iso|uppercase|slice(0,[Error:Expected Type:number])"
);

type TestValidateTemplateValue6 = ValidateTemplateValue<
  "birthday#date|uppercase|iso",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue6>>(
  "birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]"
);

type TestValidateTemplateValue7 = ValidateTemplateValue<
  "birthday#string|uppercase|iso",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue7>>(
  "birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]"
);

type TestValidateTemplateValue8 = ValidateTemplateValue<
  "name#string|uppercase|slice(0,1)",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue8>>(
  "name#string|uppercase|slice(0,1)"
);

type TestValidateTemplateValue9 = ValidateTemplateValue<
  "name|?|slice(0,?)",
  TestSchema
>;
test<RebuildTemplateString<TestValidateTemplateValue9>>(
  "name|lowercase|slice(0,[Error:Expected Type:number])"
);

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

type TestValidateType0 = AutoComplete<"dat", TestSchema["typeDefinition"]>;
test<RebuildTemplateString<[TestValidateType0]>>("date");

type TestValidateType1 = AutoComplete<"datee", TestSchema["typeDefinition"]>;
test<RebuildTemplateString<[TestValidateType1]>>("date");
test<RebuildTemplateString<[TestValidateType1]>>("DEFAULT");
test<RebuildTemplateString<[TestValidateType1]>>("string");

type TestValidateType2 = AutoComplete<"date?", TestSchema["typeDefinition"]>;
test<RebuildTemplateString<[TestValidateType2]>>("string");
