"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserSchemaBuilder = void 0;
const createTemplateFn_1 = require("../templateEngine/createTemplateFn");
function parserSchemaBuilder(input, parser) {
    const self = {
        parser,
        add: (key, parserDefinitions) => {
            const builder = parserBuilder({});
            const parser = parserDefinitions(builder).build();
            return parserSchemaBuilder(input, Object.assign(self.parser, {
                [key]: parser,
            }));
        },
        build() {
            const defaultType = Object.values(input).find((v) => v.isDefault);
            if (!defaultType)
                throw new Error("No default type defined");
            const schema = {
                typeDefinition: {
                    ...input,
                    DEFAULT: defaultType,
                },
                ...self.parser,
            };
            const template = (0, createTemplateFn_1.createTemplateFn)(schema);
            return {
                template,
                schema,
            };
        },
    };
    return self;
}
exports.parserSchemaBuilder = parserSchemaBuilder;
function parserBuilder(parser) {
    const self = {
        parser,
        addParser(key, args, returnType, parser) {
            return parserBuilder(Object.assign(self.parser, {
                [key]: { parser, key, args, returnType },
            }));
        },
        build() {
            return self.parser;
        },
    };
    return self;
}
