"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeSchemaBuilder = void 0;
function typeSchemaBuilder(types) {
    return {
        types,
        addType: (key, { isDefault, ...typeDefinition }) => {
            return typeSchemaBuilder(Object.assign(types, {
                [key]: { ...typeDefinition, isDefault: isDefault ?? false, key },
            }));
        },
        build() {
            const hasDefault = Object.values(types).find((type) => type.isDefault) ?? false;
            if (!hasDefault)
                throw new Error("No default type defined in build of typeSchemaBuilder");
            return types;
        },
    };
}
exports.typeSchemaBuilder = typeSchemaBuilder;
