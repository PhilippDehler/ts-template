"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeSchemaBuilder = void 0;
function typeSchemaBuilder(types) {
    const self = {
        types,
        addType(key, typeDefinition) {
            return typeSchemaBuilder(Object.assign(self.types, {
                [key]: { ...typeDefinition, key },
            }));
        },
        build() {
            return self.types;
        },
    };
    return self;
}
exports.typeSchemaBuilder = typeSchemaBuilder;
