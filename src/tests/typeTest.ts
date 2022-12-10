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
import {
  ValidateTemplate,
  ValidateTemplateValue,
} from "../templateStringValidator/templateValidator";
import { ValidateType } from "../templateStringValidator/typeValidator";
import { infer } from "../utils";

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

const { schema } = templateBuilder(typeSchema, {})
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

type TestSchema = typeof schema;
function test<T>(i: T) {
  return i;
}

type TestValidateOperations = ValidateOperations<
  "slice(0,1)|uppercas",
  TestSchema,
  "string"
>;
test<TestValidateOperations>("slice(0,1)|uppercase");

type TestValidateOperations0 = ValidateOperations<
  "iso|slice(0,)",
  TestSchema,
  "date"
>;
test<TestValidateOperations0>("iso|slice(0,[Expected Type:number])");

type TestValidateOperations1 = ValidateOperations<
  "uppercase|slice(?,)",
  TestSchema,
  "string"
>;
test<TestValidateOperations1>(
  "uppercase|slice(?[Expected Type:number],[Expected Type:number])"
);

type TestValidateOperations2 = ValidateOperations<
  "iso|uppercase|slice(?,)",
  TestSchema,
  "date"
>;
test<TestValidateOperations2>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])"
);

type TestValidateOperations3 = ValidateOperations<
  "iso|uppercase|slice(?,)|?",
  Omit<TestSchema, "DEFAULT">,
  "date"
>;
test<TestValidateOperations3>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|lowercase"
);
test<TestValidateOperations3>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|uppercase"
);
test<TestValidateOperations3>(
  "iso|uppercase|slice(?[Expected Type:number],[Expected Type:number])|slice"
);

type TestOperationLookUp = TestSchema["string"];

type TestValidateOperation0 = ValidateOperation<"a", TestOperationLookUp>;
test<TestValidateOperation0>("[Error:Didn't expect Operation Key |a|.]");

type TestValidateOperation1 = ValidateOperation<"iso", TestOperationLookUp>;
test<TestValidateOperation1>("[Error:Didn't expect Operation Key |iso|.]");

type TestValidateOperation2 = ValidateOperation<
  "uppercase",
  TestOperationLookUp
>;
test<TestValidateOperation2>("uppercase");

type TestValidateOperation3 = ValidateOperation<"up", TestOperationLookUp>;
test<TestValidateOperation3>("uppercase");

type TestValidateOperation4 = ValidateOperation<"lo", TestOperationLookUp>;
test<TestValidateOperation4>("lowercase");

type TestValidateOperation5 = ValidateOperation<
  "slice(0,)",
  TestOperationLookUp
>;
test<TestValidateOperation5>("slice(0,[Expected Type:number])");

type TestValidateOperation6 = ValidateOperation<
  "slice(0,1,1)",
  TestOperationLookUp
>;
test<TestValidateOperation6>("slice(0,1,[Error:Didn't expect Arg 1])");

type TestValidateOperation7 = ValidateOperation<"slice", TestOperationLookUp>;
test<TestValidateOperation7>(
  "slice[Expected Type:number],[Expected Type:number]"
);

type TestValidateOperationKey0 = ValidateOperationKey<
  "slicee",
  { slice: any; uppercase: any }
>;
test<TestValidateOperationKey0>(
  "[Error:Didn't expect Operation Key |slicee|.]"
);

type TestValidateOperationKey1 = ValidateOperationKey<
  "slicee?",
  { slice: any; uppercase: any }
>;
test<TestValidateOperationKey1>("slice");

type TestValidateOperationKey2 = ValidateOperationKey<
  "slic",
  { slice: any; uppercase: any }
>;
test<TestValidateOperationKey2>("slice");

test<TestValidateArg0>("?[Expected Type:string]");
type TestValidateArg0 = ValidateArg<"?", { key: "start"; type: "string" }>;

test<TestValidateArg1>("a");
type TestValidateArg1 = ValidateArg<"a", { key: "start"; type: "string" }>;

test<TestValidateArg2>("[Expected Type:string]");
type TestValidateArg2 = ValidateArg<"", { key: "start"; type: "string" }>;

type TestValidateArgs = ValidateArgs<
  "some,",
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
test<TestValidateArgs>("some,[Expected Type:number]");

type TestValidateArgs0 = ValidateArgs<
  "some,4",
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
test<TestValidateArgs0>("some,4");

type TestValidateArgs1 = ValidateArgs<"some,4", [{ type: "string"; key: "a" }]>;
test<TestValidateArgs1>("some,[Error:Didn't expect Arg 4]");

type TestValidateArgs2 = ValidateArgs<
  "some",
  [{ type: "string"; key: "a" }, { type: "number"; key: "b" }]
>;
test<TestValidateArgs2>("some,[Expected Type:number]");

type TestValidateTemplateValue = ValidateTemplateValue<"", TestSchema>;
test<TestValidateTemplateValue>("[Error:Expected non-empty-value]");

type TestValidateTemplateValue1 = ValidateTemplateValue<"name", TestSchema>;
test<TestValidateTemplateValue1>("name");

type TestValidateTemplateValue2 = ValidateTemplateValue<"name", TestSchema>;
test<TestValidateTemplateValue2>("name");

type TestValidateTemplateValue3 = ValidateTemplateValue<
  "name|uppercase",
  TestSchema
>;
test<TestValidateTemplateValue3>("name|uppercase");

type TestValidateTemplateValue4 = ValidateTemplateValue<
  "birthday#date|iso|uppercase|slice(0,1)",
  TestSchema
>;
test<TestValidateTemplateValue4>("birthday#date|iso|uppercase|slice(0,1)");

type TestValidateTemplateValue5 = ValidateTemplateValue<
  "birthday#date|iso|uppercase|slice(0,)|",
  TestSchema
>;
test<TestValidateTemplateValue5>(
  "birthday#date|iso|uppercase|slice(0,[Expected Type:number])"
);

type TestValidateTemplateValue6 = ValidateTemplateValue<
  "birthday#date|uppercase|iso|",
  TestSchema
>;
test<TestValidateTemplateValue6>(
  "birthday#date|[Error:Didn't expect Operation Key |uppercase|.]|[Error:Didn't expect Operation Key |iso|.]"
);

type TestValidateTemplateValue7 = ValidateTemplateValue<
  "birthday#string|uppercase|iso|",
  TestSchema
>;
test<TestValidateTemplateValue7>(
  "birthday#string|uppercase|[Error:Didn't expect Operation Key |iso|.]"
);

type TestValidateTemplateValue8 = ValidateTemplateValue<
  "name#string|uppercase|slice(0,1)",
  TestSchema
>;
test<TestValidateTemplateValue8>("name#string|uppercase|slice(0,1)");

type TestValidateTemplateValue9 = ValidateTemplateValue<
  "name|?|slice(0,?)|",
  TestSchema
>;
test<TestValidateTemplateValue9>(
  "name|lowercase|slice(0,?[Expected Type:number])"
);

type TestValidateTemplate = ValidateTemplate<"", TestSchema>;
test<TestValidateTemplate>("");

type TestValidateTemplate1 = ValidateTemplate<"Hallo {{name}}", TestSchema>;
test<TestValidateTemplate1>("Hallo {{name}}");

type TestValidateTemplate2 = ValidateTemplate<
  "Hallo {{name|uppercase}}",
  TestSchema
>;
test<TestValidateTemplate2>("Hallo {{name|uppercase}}");

type TestValidateTemplate3 = ValidateTemplate<"{{name|uppercase}}", TestSchema>;
test<TestValidateTemplate3>("{{name|uppercase}}");

type TestValidateTemplate4 = ValidateTemplate<
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?",
  TestSchema
>;
test<TestValidateTemplate4>(
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso}} Geburtstag?"
);

type TestValidateTemplate5 = ValidateTemplate<
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)|}} Geburtstag?",
  TestSchema
>;
test<TestValidateTemplate5>(
  "Hallo {{name|uppercase}}, hast du am {{birthday#date|iso|uppercase|slice(0,1)}} Geburtstag?"
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

type TestValidateType0 = ValidateType<"dat", TestSchema["typeDefinition"]>;
test<TestValidateType0>("date");

type TestValidateType1 = ValidateType<"datee", TestSchema["typeDefinition"]>;
test<TestValidateType1>("date");
test<TestValidateType1>("DEFAULT");
test<TestValidateType1>("string");

type TestValidateType2 = ValidateType<"date?", TestSchema["typeDefinition"]>;
test<TestValidateType2>("string");
