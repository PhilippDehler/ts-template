export declare const builtInTemplateSchema: {
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
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        slice: {
            key: "slice";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string | number | boolean | Date;
        };
    } & {
        replace: {
            key: "replace";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string | number | boolean | Date;
        };
    } & {
        toLower: {
            key: "toLower";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        toUpper: {
            key: "toUpper";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        capitalize: {
            key: "capitalize";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        startsWith: {
            key: "startsWith";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        endsWith: {
            key: "endsWith";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        includes: {
            key: "includes";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        repeat: {
            key: "repeat";
            args: [{
                key: "count";
                type: "number";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {
                count: number;
            }) => string | number | boolean | Date;
        };
    } & {
        padStart: {
            key: "padStart";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string | number | boolean | Date;
        };
    } & {
        padEnd: {
            key: "padEnd";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string | number | boolean | Date;
        };
    } & {
        truncate: {
            key: "truncate";
            args: [{
                key: string;
                type: string;
            }, {
                key: string;
                type: string;
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string | number | boolean | Date;
        };
    } & {
        toDate: {
            key: "toDate";
            args: [];
            returnType: "date";
            operation: (input: string, args: {}) => Date;
        };
    } & {
        toNumber: {
            key: "toNumber";
            args: [];
            returnType: "number";
            operation: (input: string, args: {}) => number;
        };
    } & {
        toBoolean: {
            key: "toBoolean";
            args: [];
            returnType: "boolean";
            operation: (input: string, args: {}) => boolean;
        };
    } & {
        urlEncode: {
            key: "urlEncode";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        urlDecode: {
            key: "urlDecode";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        base64Encode: {
            key: "base64Encode";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        base64Decode: {
            key: "base64Decode";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: string, args: {}) => string | number | boolean | Date;
        };
    } & {
        length: {
            key: "length";
            args: [];
            returnType: "number";
            operation: (input: string, args: {}) => number;
        };
    };
} & {
    date: {
        toNumber: {
            key: "toNumber";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        toBoolean: {
            key: "toBoolean";
            args: [];
            returnType: "boolean";
            operation: (input: Date, args: {}) => boolean;
        };
    } & {
        toDateString: {
            key: "toDateString";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {}) => string | number | boolean | Date;
        };
    } & {
        toISOString: {
            key: "toISOString";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {}) => string | number | boolean | Date;
        };
    } & {
        toJSON: {
            key: "toJSON";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {}) => string | number | boolean | Date;
        };
    } & {
        toLocaleDateString: {
            key: "toLocaleDateString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                locales: string;
            }) => string | number | boolean | Date;
        };
    } & {
        toLocaleString: {
            key: "toLocaleString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                locales: string;
            }) => string | number | boolean | Date;
        };
    } & {
        toLocaleTimeString: {
            key: "toLocaleTimeString";
            args: [{
                key: "locales";
                type: "string";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                locales: string;
            }) => string | number | boolean | Date;
        };
    } & {
        toString: {
            key: "toString";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {}) => string | number | boolean | Date;
        };
    } & {
        toTimeString: {
            key: "toTimeString";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {}) => string | number | boolean | Date;
        };
    } & {
        toUTCString: {
            key: "toUTCString";
            args: [];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {}) => string | number | boolean | Date;
        };
    } & {
        valueOf: {
            key: "valueOf";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getDay: {
            key: "getDay";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getDate: {
            key: "getDate";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getFullYear: {
            key: "getFullYear";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getHours: {
            key: "getHours";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMilliseconds: {
            key: "getMilliseconds";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMinutes: {
            key: "getMinutes";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getMonth: {
            key: "getMonth";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getSeconds: {
            key: "getSeconds";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getTime: {
            key: "getTime";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getTimezoneOffset: {
            key: "getTimezoneOffset";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCDate: {
            key: "getUTCDate";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCFullYear: {
            key: "getUTCFullYear";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCHours: {
            key: "getUTCHours";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMilliseconds: {
            key: "getUTCMilliseconds";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMinutes: {
            key: "getUTCMinutes";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCMonth: {
            key: "getUTCMonth";
            args: [];
            returnType: "number";
            operation: (input: Date, args: {}) => number;
        };
    } & {
        getUTCSeconds: {
            key: "getUTCSeconds";
            args: [];
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
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                separator: string;
            }) => string | number | boolean | Date;
        };
    } & {
        ddmmyyyy: {
            key: "ddmmyyyy";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                separator: string;
            }) => string | number | boolean | Date;
        };
    } & {
        ddyyyymm: {
            key: "ddyyyymm";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                separator: string;
            }) => string | number | boolean | Date;
        };
    } & {
        yyyyddmm: {
            key: "yyyyddmm";
            args: [{
                key: "separator";
                type: "string";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: Date, args: {
                separator: string;
            }) => string | number | boolean | Date;
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
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: number, args: {
                fractionDigits: number;
            }) => string | number | boolean | Date;
        };
    } & {
        toFixed: {
            key: "toFixed";
            args: [{
                key: "fractionDigits";
                type: "number";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: number, args: {
                fractionDigits: number;
            }) => string | number | boolean | Date;
        };
    } & {
        toPrecision: {
            key: "toPrecision";
            args: [{
                key: "precision";
                type: "number";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: number, args: {
                precision: number;
            }) => string | number | boolean | Date;
        };
    } & {
        toString: {
            key: "toString";
            args: [{
                key: "radix";
                type: "number";
            }];
            returnType: "string" | "number" | "boolean" | "date";
            operation: (input: number, args: {
                radix: number;
            }) => string | number | boolean | Date;
        };
    } & {
        valueOf: {
            key: "valueOf";
            args: [];
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
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        log2: {
            key: "log2";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        log1p: {
            key: "log1p";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        exp: {
            key: "exp";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        expm1: {
            key: "expm1";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        sin: {
            key: "sin";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cos: {
            key: "cos";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        tan: {
            key: "tan";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        asin: {
            key: "asin";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        acos: {
            key: "acos";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atan: {
            key: "atan";
            args: [];
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
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cosh: {
            key: "cosh";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        tanh: {
            key: "tanh";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        asinh: {
            key: "asinh";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        acosh: {
            key: "acosh";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        atanh: {
            key: "atanh";
            args: [];
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
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        sign: {
            key: "sign";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        cbrt: {
            key: "cbrt";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        ceil: {
            key: "ceil";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        floor: {
            key: "floor";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        round: {
            key: "round";
            args: [];
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
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        clz32: {
            key: "clz32";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        random: {
            key: "random";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        abs: {
            key: "abs";
            args: [];
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
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        square: {
            key: "square";
            args: [];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    };
} & {
    boolean: {
        not: {
            key: "not";
            args: [];
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
};
