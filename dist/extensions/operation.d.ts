export declare const schema: {
    typeDefinition: {
        DEFAULT: {
            key: "string";
            isDefault: true;
            validator: (input: string) => boolean;
            parseValue: (value: string) => string;
        } & {
            key: "string";
        };
    } & {
        string: {
            key: "string";
            isDefault: true;
            validator: (input: string) => boolean;
            parseValue: (value: string) => string;
        };
    } & {
        number: {
            key: "number";
            isDefault: false;
            validator: (input: number) => boolean;
            parseValue: (value: string) => number;
        };
    } & {
        date: {
            key: "date";
            isDefault: false;
            validator: (input: Date) => boolean;
            parseValue: (value: string) => Date;
        };
    } & {
        boolean: {
            key: "boolean";
            isDefault: false;
            validator: (input: boolean) => boolean;
            parseValue: (value: string) => boolean;
        };
    };
} & {
    string: {
        trim: {
            key: "trim";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        slice: {
            key: "slice";
            args: [{
                key: "start";
                type: "number";
            }, {
                key: "end";
                type: "number";
            }];
            returnType: "string";
            operation: (input: string, args: {
                start: number;
            } & {
                end: number;
            }) => string;
        };
    } & {
        replace: {
            key: "replace";
            args: [{
                key: "searchValue";
                type: "string";
            }, {
                key: "replaceValue";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                searchValue: string;
            } & {
                replaceValue: string;
            }) => string;
        };
    } & {
        toLower: {
            key: "toLower";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        toUpper: {
            key: "toUpper";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        capitalize: {
            key: "capitalize";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        startsWith: {
            key: "startsWith";
            args: [{
                key: "searchString";
                type: "string";
            }, {
                key: "position";
                type: "number";
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                searchString: string;
            } & {
                position: number;
            }) => boolean;
        };
    } & {
        endsWith: {
            key: "endsWith";
            args: [{
                key: "searchString";
                type: "string";
            }, {
                key: "position";
                type: "number";
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                searchString: string;
            } & {
                position: number;
            }) => boolean;
        };
    } & {
        includes: {
            key: "includes";
            args: [{
                key: "searchString";
                type: "string";
            }, {
                key: "position";
                type: "number";
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                searchString: string;
            } & {
                position: number;
            }) => boolean;
        };
    } & {
        repeat: {
            key: "repeat";
            args: [{
                key: "count";
                type: "number";
            }];
            returnType: "string";
            operation: (input: string, args: {
                count: number;
            }) => string;
        };
    } & {
        padStart: {
            key: "padStart";
            args: [{
                key: "targetLength";
                type: "number";
            }, {
                key: "padString";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                targetLength: number;
            } & {
                padString: string;
            }) => string;
        };
    } & {
        padEnd: {
            key: "padEnd";
            args: [{
                key: "targetLength";
                type: "number";
            }, {
                key: "padString";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                targetLength: number;
            } & {
                padString: string;
            }) => string;
        };
    } & {
        truncate: {
            key: "truncate";
            args: [{
                key: "length";
                type: "number";
            }, {
                key: "end";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                length: number;
            } & {
                end: string;
            }) => string;
        };
    } & {
        toDate: {
            key: "toDate";
            args: never[];
            returnType: "date";
            operation: (input: string, args: {}) => Date;
        };
    } & {
        toNumber: {
            key: "toNumber";
            args: never[];
            returnType: "number";
            operation: (input: string, args: {}) => number;
        };
    } & {
        toBoolean: {
            key: "toBoolean";
            args: never[];
            returnType: "boolean";
            operation: (input: string, args: {}) => boolean;
        };
    } & {
        urlEncode: {
            key: "urlEncode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        urlDecode: {
            key: "urlDecode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        base64Encode: {
            key: "base64Encode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        base64Decode: {
            key: "base64Decode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        length: {
            key: "length";
            args: never[];
            returnType: "number";
            operation: (input: string, args: {}) => number;
        };
    };
} & {
    date: {
        toNumber: {
            key: "toNumber";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        toBoolean: {
            key: "toBoolean";
            args: never[];
            returnType: "boolean";
            operation: (input: Date, args: {}) => boolean;
        };
    } & {
        toDateString: {
            key: "toDateString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toISOString: {
            key: "toISOString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toJSON: {
            key: "toJSON";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toLocaleDateString: {
            key: "toLocaleDateString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                locales: string;
            }) => string;
        };
    } & {
        toLocaleString: {
            key: "toLocaleString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                locales: string;
            }) => string;
        };
    } & {
        toLocaleTimeString: {
            key: "toLocaleTimeString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                locales: string;
            }) => string;
        };
    } & {
        toString: {
            key: "toString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toTimeString: {
            key: "toTimeString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toUTCString: {
            key: "toUTCString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        valueOf: {
            key: "valueOf";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getDay: {
            key: "getDay";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getDate: {
            key: "getDate";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getFullYear: {
            key: "getFullYear";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getHours: {
            key: "getHours";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMilliseconds: {
            key: "getMilliseconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMinutes: {
            key: "getMinutes";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMonth: {
            key: "getMonth";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getSeconds: {
            key: "getSeconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getTime: {
            key: "getTime";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getTimezoneOffset: {
            key: "getTimezoneOffset";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCDate: {
            key: "getUTCDate";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCFullYear: {
            key: "getUTCFullYear";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCHours: {
            key: "getUTCHours";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMilliseconds: {
            key: "getUTCMilliseconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMinutes: {
            key: "getUTCMinutes";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMonth: {
            key: "getUTCMonth";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCSeconds: {
            key: "getUTCSeconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        mmddyyyy: {
            key: "mmddyyyy";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    } & {
        ddmmyyyy: {
            key: "ddmmyyyy";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    } & {
        ddyyyymm: {
            key: "ddyyyymm";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    } & {
        yyyyddmm: {
            key: "yyyyddmm";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    };
} & {
    number: {
        toExponential: {
            key: "toExponential";
            args: [{
                key: "fractionDigits";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                fractionDigits: number;
            }) => string;
        };
    } & {
        toFixed: {
            key: "toFixed";
            args: [{
                key: "fractionDigits";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                fractionDigits: number;
            }) => string;
        };
    } & {
        toPrecision: {
            key: "toPrecision";
            args: [{
                key: "precision";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                precision: number;
            }) => string;
        };
    } & {
        toString: {
            key: "toString";
            args: [{
                key: "radix";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                radix: number;
            }) => string;
        };
    } & {
        valueOf: {
            key: "valueOf";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        add: {
            key: "add";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        subtract: {
            key: "subtract";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        multiply: {
            key: "multiply";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        divide: {
            key: "divide";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        root: {
            key: "root";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        power: {
            key: "power";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        log: {
            key: "log";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        log10: {
            key: "log10";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        log2: {
            key: "log2";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        log1p: {
            key: "log1p";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        exp: {
            key: "exp";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        expm1: {
            key: "expm1";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        sin: {
            key: "sin";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cos: {
            key: "cos";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        tan: {
            key: "tan";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        asin: {
            key: "asin";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        acos: {
            key: "acos";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atan: {
            key: "atan";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atan2: {
            key: "atan2";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        sinh: {
            key: "sinh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cosh: {
            key: "cosh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        tanh: {
            key: "tanh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        asinh: {
            key: "asinh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        acosh: {
            key: "acosh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atanh: {
            key: "atanh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        hypot: {
            key: "hypot";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        trunc: {
            key: "trunc";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        sign: {
            key: "sign";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cbrt: {
            key: "cbrt";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        ceil: {
            key: "ceil";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        floor: {
            key: "floor";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        round: {
            key: "round";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        imul: {
            key: "imul";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        fround: {
            key: "fround";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        clz32: {
            key: "clz32";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        random: {
            key: "random";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        abs: {
            key: "abs";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        max: {
            key: "max";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        min: {
            key: "min";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        hypot: {
            key: "hypot";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        sqrt: {
            key: "sqrt";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        square: {
            key: "square";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    };
} & {
    boolean: {
        not: {
            key: "not";
            args: never[];
            returnType: "boolean";
            operation: (input: boolean, args: {}) => boolean;
        };
    } & {
        and: {
            key: "and";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        or: {
            key: "or";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        xor: {
            key: "xor";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        nand: {
            key: "nand";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        nor: {
            key: "nor";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        xnor: {
            key: "xnor";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        equals: {
            key: "equals";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        notEquals: {
            key: "notEquals";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    };
}, templateFn: import("../templateEngine/createTemplateFn").TemplateFn<{
    typeDefinition: {
        DEFAULT: {
            key: "string";
            isDefault: true;
            validator: (input: string) => boolean;
            parseValue: (value: string) => string;
        } & {
            key: "string";
        };
    } & {
        string: {
            key: "string";
            isDefault: true;
            validator: (input: string) => boolean;
            parseValue: (value: string) => string;
        };
    } & {
        number: {
            key: "number";
            isDefault: false;
            validator: (input: number) => boolean;
            parseValue: (value: string) => number;
        };
    } & {
        date: {
            key: "date";
            isDefault: false;
            validator: (input: Date) => boolean;
            parseValue: (value: string) => Date;
        };
    } & {
        boolean: {
            key: "boolean";
            isDefault: false;
            validator: (input: boolean) => boolean;
            parseValue: (value: string) => boolean;
        };
    };
} & {
    string: {
        trim: {
            key: "trim";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        slice: {
            key: "slice";
            args: [{
                key: "start";
                type: "number";
            }, {
                key: "end";
                type: "number";
            }];
            returnType: "string";
            operation: (input: string, args: {
                start: number;
            } & {
                end: number;
            }) => string;
        };
    } & {
        replace: {
            key: "replace";
            args: [{
                key: "searchValue";
                type: "string";
            }, {
                key: "replaceValue";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                searchValue: string;
            } & {
                replaceValue: string;
            }) => string;
        };
    } & {
        toLower: {
            key: "toLower";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        toUpper: {
            key: "toUpper";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        capitalize: {
            key: "capitalize";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        startsWith: {
            key: "startsWith";
            args: [{
                key: "searchString";
                type: "string";
            }, {
                key: "position";
                type: "number";
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                searchString: string;
            } & {
                position: number;
            }) => boolean;
        };
    } & {
        endsWith: {
            key: "endsWith";
            args: [{
                key: "searchString";
                type: "string";
            }, {
                key: "position";
                type: "number";
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                searchString: string;
            } & {
                position: number;
            }) => boolean;
        };
    } & {
        includes: {
            key: "includes";
            args: [{
                key: "searchString";
                type: "string";
            }, {
                key: "position";
                type: "number";
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                searchString: string;
            } & {
                position: number;
            }) => boolean;
        };
    } & {
        repeat: {
            key: "repeat";
            args: [{
                key: "count";
                type: "number";
            }];
            returnType: "string";
            operation: (input: string, args: {
                count: number;
            }) => string;
        };
    } & {
        padStart: {
            key: "padStart";
            args: [{
                key: "targetLength";
                type: "number";
            }, {
                key: "padString";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                targetLength: number;
            } & {
                padString: string;
            }) => string;
        };
    } & {
        padEnd: {
            key: "padEnd";
            args: [{
                key: "targetLength";
                type: "number";
            }, {
                key: "padString";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                targetLength: number;
            } & {
                padString: string;
            }) => string;
        };
    } & {
        truncate: {
            key: "truncate";
            args: [{
                key: "length";
                type: "number";
            }, {
                key: "end";
                type: "string";
            }];
            returnType: "string";
            operation: (input: string, args: {
                length: number;
            } & {
                end: string;
            }) => string;
        };
    } & {
        toDate: {
            key: "toDate";
            args: never[];
            returnType: "date";
            operation: (input: string, args: {}) => Date;
        };
    } & {
        toNumber: {
            key: "toNumber";
            args: never[];
            returnType: "number";
            operation: (input: string, args: {}) => number;
        };
    } & {
        toBoolean: {
            key: "toBoolean";
            args: never[];
            returnType: "boolean";
            operation: (input: string, args: {}) => boolean;
        };
    } & {
        urlEncode: {
            key: "urlEncode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        urlDecode: {
            key: "urlDecode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        base64Encode: {
            key: "base64Encode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        base64Decode: {
            key: "base64Decode";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        length: {
            key: "length";
            args: never[];
            returnType: "number";
            operation: (input: string, args: {}) => number;
        };
    };
} & {
    date: {
        toNumber: {
            key: "toNumber";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        toBoolean: {
            key: "toBoolean";
            args: never[];
            returnType: "boolean";
            operation: (input: Date, args: {}) => boolean;
        };
    } & {
        toDateString: {
            key: "toDateString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toISOString: {
            key: "toISOString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toJSON: {
            key: "toJSON";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toLocaleDateString: {
            key: "toLocaleDateString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                locales: string;
            }) => string;
        };
    } & {
        toLocaleString: {
            key: "toLocaleString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                locales: string;
            }) => string;
        };
    } & {
        toLocaleTimeString: {
            key: "toLocaleTimeString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                locales: string;
            }) => string;
        };
    } & {
        toString: {
            key: "toString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toTimeString: {
            key: "toTimeString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toUTCString: {
            key: "toUTCString";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        valueOf: {
            key: "valueOf";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getDay: {
            key: "getDay";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getDate: {
            key: "getDate";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getFullYear: {
            key: "getFullYear";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getHours: {
            key: "getHours";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMilliseconds: {
            key: "getMilliseconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMinutes: {
            key: "getMinutes";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMonth: {
            key: "getMonth";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getSeconds: {
            key: "getSeconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getTime: {
            key: "getTime";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getTimezoneOffset: {
            key: "getTimezoneOffset";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCDate: {
            key: "getUTCDate";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCFullYear: {
            key: "getUTCFullYear";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCHours: {
            key: "getUTCHours";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMilliseconds: {
            key: "getUTCMilliseconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMinutes: {
            key: "getUTCMinutes";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMonth: {
            key: "getUTCMonth";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCSeconds: {
            key: "getUTCSeconds";
            args: never[];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        mmddyyyy: {
            key: "mmddyyyy";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    } & {
        ddmmyyyy: {
            key: "ddmmyyyy";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    } & {
        ddyyyymm: {
            key: "ddyyyymm";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    } & {
        yyyyddmm: {
            key: "yyyyddmm";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string";
            operation: (input: Date, args: {
                separator: string;
            }) => string;
        };
    };
} & {
    number: {
        toExponential: {
            key: "toExponential";
            args: [{
                key: "fractionDigits";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                fractionDigits: number;
            }) => string;
        };
    } & {
        toFixed: {
            key: "toFixed";
            args: [{
                key: "fractionDigits";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                fractionDigits: number;
            }) => string;
        };
    } & {
        toPrecision: {
            key: "toPrecision";
            args: [{
                key: "precision";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                precision: number;
            }) => string;
        };
    } & {
        toString: {
            key: "toString";
            args: [{
                key: "radix";
                type: "number";
            }];
            returnType: "string";
            operation: (input: number, args: {
                radix: number;
            }) => string;
        };
    } & {
        valueOf: {
            key: "valueOf";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        add: {
            key: "add";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        subtract: {
            key: "subtract";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        multiply: {
            key: "multiply";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        divide: {
            key: "divide";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        root: {
            key: "root";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        power: {
            key: "power";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        log: {
            key: "log";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        log10: {
            key: "log10";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        log2: {
            key: "log2";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        log1p: {
            key: "log1p";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        exp: {
            key: "exp";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        expm1: {
            key: "expm1";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        sin: {
            key: "sin";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cos: {
            key: "cos";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        tan: {
            key: "tan";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        asin: {
            key: "asin";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        acos: {
            key: "acos";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atan: {
            key: "atan";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atan2: {
            key: "atan2";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        sinh: {
            key: "sinh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cosh: {
            key: "cosh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        tanh: {
            key: "tanh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        asinh: {
            key: "asinh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        acosh: {
            key: "acosh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atanh: {
            key: "atanh";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        hypot: {
            key: "hypot";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        trunc: {
            key: "trunc";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        sign: {
            key: "sign";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cbrt: {
            key: "cbrt";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        ceil: {
            key: "ceil";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        floor: {
            key: "floor";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        round: {
            key: "round";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        imul: {
            key: "imul";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        fround: {
            key: "fround";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        clz32: {
            key: "clz32";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        random: {
            key: "random";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        abs: {
            key: "abs";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        max: {
            key: "max";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        min: {
            key: "min";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        hypot: {
            key: "hypot";
            args: [{
                key: "value";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                value: number;
            }) => number;
        };
    } & {
        sqrt: {
            key: "sqrt";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        square: {
            key: "square";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    };
} & {
    boolean: {
        not: {
            key: "not";
            args: never[];
            returnType: "boolean";
            operation: (input: boolean, args: {}) => boolean;
        };
    } & {
        and: {
            key: "and";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        or: {
            key: "or";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        xor: {
            key: "xor";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        nand: {
            key: "nand";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        nor: {
            key: "nor";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        xnor: {
            key: "xnor";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        equals: {
            key: "equals";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    } & {
        notEquals: {
            key: "notEquals";
            args: [{
                key: "value";
                type: "boolean";
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                value: boolean;
            }) => boolean;
        };
    };
}>;
