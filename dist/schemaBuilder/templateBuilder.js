"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateBuilder = void 0;
const createTemplateFn_1 = require("../templateEngine/createTemplateFn");
const operationBuilder_1 = require("./operationBuilder");
const typeSchemaBuilder_1 = require("./typeSchemaBuilder");
function templateBuilder(input, operation, verbose) {
    const typeDefaultKey = (0, typeSchemaBuilder_1.getTypeSchemaDefaultKey)(input);
    const self = {
        operation,
        add: (key, operationDefinitions) => {
            const schemaKey = (0, typeSchemaBuilder_1.castSchemaKey)(key, input);
            const builder = (0, operationBuilder_1.operationBuilder)({}, typeDefaultKey);
            const builtOperations = operationDefinitions(builder).build();
            return templateBuilder(input, {
                ...self.operation,
                [key]: {
                    ...builtOperations,
                    ...(self.operation[schemaKey] ?? {}),
                },
            }, verbose);
        },
        build() {
            const defaultType = (0, typeSchemaBuilder_1.getTypeSchemaDefault)(input);
            const schema = {
                typeDefinition: {
                    ...input,
                    DEFAULT: defaultType,
                },
                ...self.operation,
            };
            const templateFn = (template) => (0, createTemplateFn_1.createTemplateFn)(template, schema);
            return {
                templateFn,
                schema,
            };
        },
    };
    return self;
}
exports.templateBuilder = templateBuilder;
