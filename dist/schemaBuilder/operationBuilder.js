"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationBuilder = void 0;
function operationBuilder(operation, typeDefault) {
    const self = {
        operation,
        addOperation: ({ returnType, ...definition }) => {
            const operationDefinition = {
                ...definition,
                returnType: returnType ?? typeDefault,
            };
            const operationDefinitions = {
                ...self.operation,
                [definition.key]: operationDefinition,
            };
            return operationBuilder(operationDefinitions, typeDefault);
        },
        build() {
            return self.operation;
        },
    };
    return self;
}
exports.operationBuilder = operationBuilder;
