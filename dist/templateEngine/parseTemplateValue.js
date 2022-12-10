"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseTemplateValue = void 0;
const parseParserChain_1 = require("./parseParserChain");
function parseTemplateValue(k, schema) {
    const [def, ...operations] = k.split("|");
    const [key, type] = def?.split("#") ?? [null, null];
    if (!key)
        throw new Error("Invalid template value: " + k);
    return {
        key: key,
        operationChain: (0, parseParserChain_1.parseParserChain)(operations, type ?? null, schema),
    };
}
exports.parseTemplateValue = parseTemplateValue;
