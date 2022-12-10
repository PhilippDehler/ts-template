"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operationBuilder = void 0;
function operationBuilder(operation) {
    const self = {
        operation,
        addOperation(definition) {
            return operationBuilder(Object.assign(self.operation, {
                [definition.key]: definition,
            }));
        },
        build() {
            return self.operation;
        },
    };
    return self;
}
exports.operationBuilder = operationBuilder;
