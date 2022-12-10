"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateBuilder = void 0;
const createTemplateFn_1 = require("../templateEngine/createTemplateFn");
const parserBuilder_1 = require("./parserBuilder");
function templateBuilder(input, parser) {
    const self = {
        parser,
        add: (key, parserDefinitions) => {
            const builder = (0, parserBuilder_1.parserBuilder)({});
            const parser = parserDefinitions(builder).build();
            return templateBuilder(input, Object.assign(self.parser, {
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
exports.templateBuilder = templateBuilder;
