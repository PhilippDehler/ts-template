"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castSchemaKey = exports.getTypeSchemaDefaultKey = exports.getTypeSchemaDefault = exports.typeSchemaBuilder = void 0;
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
function getTypeSchemaDefault(typeSchema) {
    const typeDefault = Object.values(typeSchema).find((v) => v.isDefault);
    if (!typeDefault)
        throw new Error("No default type defined");
    return typeDefault;
}
exports.getTypeSchemaDefault = getTypeSchemaDefault;
function getTypeSchemaDefaultKey(typeSchema) {
    const typeDefault = getTypeSchemaDefault(typeSchema);
    if (Object.keys(typeSchema).includes(typeDefault.key))
        return typeDefault.key;
    throw new Error(`Default type key ${typeDefault.key} not found in type schema`);
}
exports.getTypeSchemaDefaultKey = getTypeSchemaDefaultKey;
function castSchemaKey(key, typeSchema) {
    if (Object.keys(typeSchema).includes(key))
        return key;
    throw new Error(`Key ${key} not found in type schema`);
}
exports.castSchemaKey = castSchemaKey;
