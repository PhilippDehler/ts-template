"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.templateFn = exports.schema = void 0;
const templateBuilder_1 = require("../schemaBuilder/templateBuilder");
const utils_1 = require("../utils");
const types_1 = require("./types");
_a = (0, templateBuilder_1.templateBuilder)(types_1.extensionTypes, {})
    .add("string", (_) => _.addOperation({
    key: "trim",
    args: [],
    returnType: "string",
    operation: (_) => _.trim(),
})
    .addOperation({
    key: "slice",
    args: (0, utils_1.infer)([
        { key: "start", type: "number" },
        { key: "end", type: "number" },
    ]),
    returnType: "string",
    operation: (_, { start, end }) => _.slice(start, end),
})
    .addOperation({
    key: "replace",
    args: (0, utils_1.infer)([
        { key: "searchValue", type: "string" },
        { key: "replaceValue", type: "string" },
    ]),
    returnType: "string",
    operation: (_, { replaceValue, searchValue }) => _.replace(searchValue, replaceValue),
})
    .addOperation({
    key: "toLower",
    args: [],
    returnType: "string",
    operation: (_) => _.toLowerCase(),
})
    .addOperation({
    key: "toUpper",
    args: [],
    returnType: "string",
    operation: (_) => _.toUpperCase(),
})
    .addOperation({
    key: "capitalize",
    args: [],
    returnType: "string",
    operation: (_) => _.charAt(0).toUpperCase() + _.slice(1),
})
    .addOperation({
    key: "startsWith",
    args: (0, utils_1.infer)([
        { key: "searchString", type: "string" },
        { key: "position", type: "number" },
    ]),
    returnType: "boolean",
    operation: (_, { searchString, position }) => _.startsWith(searchString, position),
})
    .addOperation({
    key: "endsWith",
    args: (0, utils_1.infer)([
        { key: "searchString", type: "string" },
        { key: "position", type: "number" },
    ]),
    returnType: "boolean",
    operation: (_, { searchString, position }) => _.endsWith(searchString, position),
})
    .addOperation({
    key: "includes",
    args: (0, utils_1.infer)([
        { key: "searchString", type: "string" },
        { key: "position", type: "number" },
    ]),
    returnType: "boolean",
    operation: (_, { searchString, position }) => _.includes(searchString, position),
})
    .addOperation({
    key: "repeat",
    args: (0, utils_1.infer)([{ key: "count", type: "number" }]),
    returnType: "string",
    operation: (_, { count }) => _.repeat(count),
})
    .addOperation({
    key: "padStart",
    args: (0, utils_1.infer)([
        { key: "targetLength", type: "number" },
        { key: "padString", type: "string" },
    ]),
    returnType: "string",
    operation: (_, { targetLength, padString }) => _.padStart(targetLength, padString),
})
    .addOperation({
    key: "padEnd",
    args: (0, utils_1.infer)([
        { key: "targetLength", type: "number" },
        { key: "padString", type: "string" },
    ]),
    returnType: "string",
    operation: (_, { targetLength, padString }) => _.padEnd(targetLength, padString),
})
    .addOperation({
    key: "truncate",
    args: (0, utils_1.infer)([
        { key: "length", type: "number" },
        { key: "end", type: "string" },
    ]),
    returnType: "string",
    operation: (_, { length, end }) => {
        if (_.length > length) {
            return _.slice(0, length) + end;
        }
        return _;
    },
})
    .addOperation({
    key: "toDate",
    args: [],
    returnType: "date",
    operation: (_) => new Date(_),
})
    .addOperation({
    key: "toNumber",
    args: [],
    returnType: "number",
    operation: (_) => Number(_),
})
    .addOperation({
    key: "toBoolean",
    args: [],
    returnType: "boolean",
    operation: (_) => (_ === "true" ? true : false),
})
    .addOperation({
    key: "urlEncode",
    args: [],
    returnType: "string",
    operation: (_) => encodeURIComponent(_),
})
    .addOperation({
    key: "urlDecode",
    args: [],
    returnType: "string",
    operation: (_) => decodeURIComponent(_),
})
    .addOperation({
    key: "base64Encode",
    args: [],
    returnType: "string",
    operation: (_) => Buffer.from(_).toString("base64"),
})
    .addOperation({
    key: "base64Decode",
    args: [],
    returnType: "string",
    operation: (_) => Buffer.from(_, "base64").toString("ascii"),
})
    .addOperation({
    key: "length",
    args: [],
    returnType: "number",
    operation: (_) => _.length,
}))
    .add("date", (_) => _.addOperation({
    key: "toNumber",
    args: [],
    returnType: "number",
    operation: (_) => _.getTime(),
})
    .addOperation({
    key: "toBoolean",
    args: [],
    returnType: "boolean",
    operation: (_) => Boolean(_),
})
    .addOperation({
    key: "toDateString",
    args: [],
    returnType: "string",
    operation: (_) => _.toDateString(),
})
    .addOperation({
    key: "toISOString",
    args: [],
    returnType: "string",
    operation: (_) => _.toISOString(),
})
    .addOperation({
    key: "toJSON",
    args: [],
    returnType: "string",
    operation: (_) => _.toJSON(),
})
    .addOperation({
    key: "toLocaleDateString",
    args: (0, utils_1.infer)([{ key: "locales", type: "string" }]),
    returnType: "string",
    operation: (_, { locales }) => _.toLocaleDateString(locales),
})
    .addOperation({
    key: "toLocaleString",
    args: (0, utils_1.infer)([{ key: "locales", type: "string" }]),
    returnType: "string",
    operation: (_, { locales }) => _.toLocaleString(locales),
})
    .addOperation({
    key: "toLocaleTimeString",
    args: (0, utils_1.infer)([{ key: "locales", type: "string" }]),
    returnType: "string",
    operation: (_, { locales }) => _.toLocaleTimeString(locales),
})
    .addOperation({
    key: "toString",
    args: [],
    returnType: "string",
    operation: (_) => _.toString(),
})
    .addOperation({
    key: "toTimeString",
    args: [],
    returnType: "string",
    operation: (_) => _.toTimeString(),
})
    .addOperation({
    key: "toUTCString",
    args: [],
    returnType: "string",
    operation: (_) => _.toUTCString(),
})
    .addOperation({
    key: "valueOf",
    args: [],
    returnType: "number",
    operation: (_) => _.valueOf(),
})
    .addOperation({
    key: "getDay",
    args: [],
    returnType: "number",
    operation: (_) => _.getDay(),
})
    .addOperation({
    key: "getDate",
    args: [],
    returnType: "number",
    operation: (_) => _.getDate(),
})
    .addOperation({
    key: "getFullYear",
    args: [],
    returnType: "number",
    operation: (_) => _.getFullYear(),
})
    .addOperation({
    key: "getHours",
    args: [],
    returnType: "number",
    operation: (_) => _.getHours(),
})
    .addOperation({
    key: "getMilliseconds",
    args: [],
    returnType: "number",
    operation: (_) => _.getMilliseconds(),
})
    .addOperation({
    key: "getMinutes",
    args: [],
    returnType: "number",
    operation: (_) => _.getMinutes(),
})
    .addOperation({
    key: "getMonth",
    args: [],
    returnType: "number",
    operation: (_) => _.getMonth(),
})
    .addOperation({
    key: "getSeconds",
    args: [],
    returnType: "number",
    operation: (_) => _.getSeconds(),
})
    .addOperation({
    key: "getTime",
    args: [],
    returnType: "number",
    operation: (_) => _.getTime(),
})
    .addOperation({
    key: "getTimezoneOffset",
    args: [],
    returnType: "number",
    operation: (_) => _.getTimezoneOffset(),
})
    .addOperation({
    key: "getUTCDate",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCDate(),
})
    .addOperation({
    key: "getUTCFullYear",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCFullYear(),
})
    .addOperation({
    key: "getUTCHours",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCHours(),
})
    .addOperation({
    key: "getUTCMilliseconds",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCMilliseconds(),
})
    .addOperation({
    key: "getUTCMinutes",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCMinutes(),
})
    .addOperation({
    key: "getUTCMonth",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCMonth(),
})
    .addOperation({
    key: "getUTCSeconds",
    args: [],
    returnType: "number",
    operation: (_) => _.getUTCSeconds(),
})
    .addOperation({
    key: "mmddyyyy",
    args: (0, utils_1.infer)([{ key: "separator", type: "string" }]),
    returnType: "string",
    operation: (_, { separator }) => `${_.getMonth() + 1}${separator}${_.getDate()}${separator}${_.getFullYear()}`,
})
    .addOperation({
    key: "ddmmyyyy",
    args: (0, utils_1.infer)([{ key: "separator", type: "string" }]),
    returnType: "string",
    operation: (_, { separator }) => `${_.getDate()}${separator}${_.getMonth() + 1}${separator}${_.getFullYear()}`,
})
    .addOperation({
    key: "ddyyyymm",
    args: (0, utils_1.infer)([{ key: "separator", type: "string" }]),
    returnType: "string",
    operation: (_, { separator }) => `${_.getDate()}${separator}${_.getFullYear()}${separator}${_.getMonth() + 1}`,
})
    .addOperation({
    key: "yyyyddmm",
    args: (0, utils_1.infer)([{ key: "separator", type: "string" }]),
    returnType: "string",
    operation: (_, { separator }) => `${_.getFullYear()}${separator}${_.getDate()}${separator}${_.getMonth() + 1}`,
}))
    .add("number", (_) => _.addOperation({
    key: "toExponential",
    args: (0, utils_1.infer)([{ key: "fractionDigits", type: "number" }]),
    returnType: "string",
    operation: (_, { fractionDigits }) => _.toExponential(fractionDigits),
})
    .addOperation({
    key: "toFixed",
    args: (0, utils_1.infer)([{ key: "fractionDigits", type: "number" }]),
    returnType: "string",
    operation: (_, { fractionDigits }) => _.toFixed(fractionDigits),
})
    .addOperation({
    key: "toPrecision",
    args: (0, utils_1.infer)([{ key: "precision", type: "number" }]),
    returnType: "string",
    operation: (_, { precision }) => _.toPrecision(precision),
})
    .addOperation({
    key: "toString",
    args: (0, utils_1.infer)([{ key: "radix", type: "number" }]),
    returnType: "string",
    operation: (_, { radix }) => _.toString(radix),
})
    .addOperation({
    key: "valueOf",
    args: [],
    returnType: "number",
    operation: (_) => _.valueOf(),
})
    .addOperation({
    key: "add",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => _ + value,
})
    .addOperation({
    key: "subtract",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => _ + value,
})
    .addOperation({
    key: "multiply",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => _ + value,
})
    .addOperation({
    key: "divide",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => _ + value,
})
    .addOperation({
    key: "root",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.pow(_, 1 / value),
})
    .addOperation({
    key: "power",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.pow(_, value),
})
    .addOperation({
    key: "log",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.log(value) / Math.log(_),
})
    .addOperation({
    key: "log10",
    args: [],
    returnType: "number",
    operation: (_) => Math.log10(_),
})
    .addOperation({
    key: "log2",
    args: [],
    returnType: "number",
    operation: (_) => Math.log2(_),
})
    .addOperation({
    key: "log1p",
    args: [],
    returnType: "number",
    operation: (_) => Math.log1p(_),
})
    .addOperation({
    key: "exp",
    args: [],
    returnType: "number",
    operation: (_) => Math.exp(_),
})
    .addOperation({
    key: "expm1",
    args: [],
    returnType: "number",
    operation: (_) => Math.expm1(_),
})
    .addOperation({
    key: "sin",
    args: [],
    returnType: "number",
    operation: (_) => Math.sin(_),
})
    .addOperation({
    key: "cos",
    args: [],
    returnType: "number",
    operation: (_) => Math.cos(_),
})
    .addOperation({
    key: "tan",
    args: [],
    returnType: "number",
    operation: (_) => Math.tan(_),
})
    .addOperation({
    key: "asin",
    args: [],
    returnType: "number",
    operation: (_) => Math.asin(_),
})
    .addOperation({
    key: "acos",
    args: [],
    returnType: "number",
    operation: (_) => Math.acos(_),
})
    .addOperation({
    key: "atan",
    args: [],
    returnType: "number",
    operation: (_) => Math.atan(_),
})
    .addOperation({
    key: "atan2",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.atan2(_, value),
})
    .addOperation({
    key: "sinh",
    args: [],
    returnType: "number",
    operation: (_) => Math.sinh(_),
})
    .addOperation({
    key: "cosh",
    args: [],
    returnType: "number",
    operation: (_) => Math.cosh(_),
})
    .addOperation({
    key: "tanh",
    args: [],
    returnType: "number",
    operation: (_) => Math.tanh(_),
})
    .addOperation({
    key: "asinh",
    args: [],
    returnType: "number",
    operation: (_) => Math.asinh(_),
})
    .addOperation({
    key: "acosh",
    args: [],
    returnType: "number",
    operation: (_) => Math.acosh(_),
})
    .addOperation({
    key: "atanh",
    args: [],
    returnType: "number",
    operation: (_) => Math.atanh(_),
})
    .addOperation({
    key: "hypot",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.hypot(_, value),
})
    .addOperation({
    key: "trunc",
    args: [],
    returnType: "number",
    operation: (_) => Math.trunc(_),
})
    .addOperation({
    key: "sign",
    args: [],
    returnType: "number",
    operation: (_) => Math.sign(_),
})
    .addOperation({
    key: "cbrt",
    args: [],
    returnType: "number",
    operation: (_) => Math.cbrt(_),
})
    .addOperation({
    key: "ceil",
    args: [],
    returnType: "number",
    operation: (_) => Math.ceil(_),
})
    .addOperation({
    key: "floor",
    args: [],
    returnType: "number",
    operation: (_) => Math.floor(_),
})
    .addOperation({
    key: "round",
    args: [],
    returnType: "number",
    operation: (_) => Math.round(_),
})
    .addOperation({
    key: "imul",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.imul(_, value),
})
    .addOperation({
    key: "fround",
    args: [],
    returnType: "number",
    operation: (_) => Math.fround(_),
})
    .addOperation({
    key: "clz32",
    args: [],
    returnType: "number",
    operation: (_) => Math.clz32(_),
})
    .addOperation({
    key: "random",
    args: [],
    returnType: "number",
    operation: (_) => Math.random(),
})
    .addOperation({
    key: "abs",
    args: [],
    returnType: "number",
    operation: (_) => Math.abs(_),
})
    .addOperation({
    key: "max",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.max(_, value),
})
    .addOperation({
    key: "min",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.min(_, value),
})
    .addOperation({
    key: "hypot",
    args: (0, utils_1.infer)([{ key: "value", type: "number" }]),
    returnType: "number",
    operation: (_, { value }) => Math.hypot(_, value),
})
    .addOperation({
    key: "sqrt",
    args: [],
    returnType: "number",
    operation: (_) => Math.sqrt(_),
})
    .addOperation({
    key: "square",
    args: [],
    returnType: "number",
    operation: (_) => Math.pow(_, 2),
}))
    .add("boolean", (_) => _.addOperation({
    key: "not",
    args: [],
    returnType: "boolean",
    operation: (_) => !_,
})
    .addOperation({
    key: "and",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => _ && value,
})
    .addOperation({
    key: "or",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => _ || value,
})
    .addOperation({
    key: "xor",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => _ !== value,
})
    .addOperation({
    key: "nand",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => !(_ && value),
})
    .addOperation({
    key: "nor",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => !(_ || value),
})
    .addOperation({
    key: "xnor",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => _ === value,
})
    .addOperation({
    key: "equals",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => _ === value,
})
    .addOperation({
    key: "notEquals",
    args: (0, utils_1.infer)([{ key: "value", type: "boolean" }]),
    returnType: "boolean",
    operation: (_, { value }) => _ !== value,
}))
    .build(), exports.schema = _a.schema, exports.templateFn = _a.templateFn;
