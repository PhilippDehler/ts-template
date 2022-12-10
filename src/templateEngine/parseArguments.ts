import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";

export function parseArguments<
  TSchema extends { typeDefinition: TypeDefinitions }
>(
  operationTemplateString: string,
  argsDefinition: {
    key: string;
    type: keyof TSchema["typeDefinition"] & string;
  }[],
  schema: TSchema
): any {
  const res: { key: string; value: unknown }[] = [];
  const args = getArgsFromOperationTemplate(operationTemplateString);
  if (args.length !== argsDefinition.length)
    throw new Error("Invalid number of arguments");

  const schemaTypes = schema["typeDefinition"];
  for (let i = 0; i < argsDefinition.length; i++) {
    const definition = argsDefinition[i]!;
    const argString = args[i];

    if (!argString) throw new Error("Missing argument: " + definition.key);

    const type = schemaTypes[definition.type];
    if (!type) throw new Error("Invalid type: " + definition.type);

    const parsedValue = type.parseValue(argString);
    console.log(parsedValue);
    if (!type.validator(parsedValue))
      throw new Error(
        "Invalid value: " + argString + " for type: " + definition.type + ""
      );
    res.push({
      key: definition.key,
      value: type.parseValue(argString),
    });
  }
  return res.reduce((agg, { key, value }) => ({ ...agg, [key]: value }), {});
}

function getArgsFromOperationTemplate(
  operationTemplateString: string
): string[] {
  const [_, argString] = operationTemplateString.split("(");
  const args = argString?.slice(0, argString.length - 1);
  if (!args) return [];
  return args.split(",");
}
