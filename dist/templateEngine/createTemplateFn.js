"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTemplateFn = void 0;
const parseTemplateValue_1 = require("./parseTemplateValue");
function createTemplateFn(schema) {
    /**
     * @param template The template string
     * @returns A function that takes the params and returns the string
     * @example
     * const template = template("Hallo {{name}}!");
     * const result = template({name: "Max"});
     */
    return function template(template) {
        if (typeof template !== "string")
            throw new Error("Template is not a string");
        const matches = template.match(/{{.*?}}/g);
        //@ts-ignore
        if (!matches)
            return (params) => template;
        const chains = matches.map((m) => {
            const k = m.slice(2, -2);
            const { key, operationChain } = (0, parseTemplateValue_1.parseTemplateValue)(k, schema);
            return {
                key,
                chain: (replaceValue) => operationChain.reduce((v, chain) => chain(v), replaceValue),
            };
        });
        return (params) => {
            let i = 0;
            return template.replace(/{{.*?}}/g, () => {
                const { key, chain } = chains[i++];
                const replaceValue = params[key];
                if (replaceValue === undefined)
                    throw new Error("Key is missing in Translation:" + key);
                const result = chain(replaceValue);
                if (typeof result !== "string" && typeof result !== "number")
                    return JSON.stringify(result);
                return result + "";
            });
        };
    };
}
exports.createTemplateFn = createTemplateFn;
