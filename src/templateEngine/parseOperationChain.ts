import { Schema } from "../schemaBuilder/extendableSchema";
import { TypeDefinitions } from "../schemaBuilder/typeSchemaBuilder";
import { parseArguments } from "./parseArguments";
import { parseSchemaType } from "./parseSchemaType";

export function parseOperationChain<
  Type extends string,
  TSchema extends Schema<{ typeDefinition: TypeDefinitions }>
>(input: string[], type: Type | null, schema: TSchema) {
  const schemaType = parseSchemaType(type, schema);
  const operationChain: ((input: any) => any)[] = [];
  for (let i = 0; i < input.length; i++) {
    const currentOperation = input[i]!;
    let [operationKey, _] = currentOperation.split("(");
    if (!operationKey)
      throw new Error("Invalid operation: " + currentOperation);

    const operationOnType = schema[schemaType];
    if (!operationOnType) throw new Error("Invalid type: " + schemaType);
    const operationChainItem = operationOnType[operationKey];
    if (!operationChainItem)
      throw new Error("Invalid operation: " + operationKey);
    const args = parseArguments(
      currentOperation,
      operationChainItem.args,
      schema
    );
    operationChain.push((input: any) =>
      operationChainItem.operation(input, args)
    );
  }
  return operationChain;
}
