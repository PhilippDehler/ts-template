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
            returnType: "string";
            operation: (input: string, args: {}) => string;
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
            returnType: "string";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string;
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
            returnType: "string";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string;
        };
    } & {
        toLower: {
            key: "toLower";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        toUpper: {
            key: "toUpper";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        capitalize: {
            key: "capitalize";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
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
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: string, args: {
                [x: string]: any;
            }) => string;
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
            returnType: "string";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string;
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
            returnType: "string";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string;
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
            returnType: "string";
            operation: (input: string, args: {
                [x: string]: any;
            } & {
                [x: string]: any;
            }) => string;
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
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        urlDecode: {
            key: "urlDecode";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        base64Encode: {
            key: "base64Encode";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        base64Decode: {
            key: "base64Decode";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
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
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toISOString: {
            key: "toISOString";
            args: [];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toJSON: {
            key: "toJSON";
            args: [];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toLocaleDateString: {
            key: "toLocaleDateString";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        toLocaleString: {
            key: "toLocaleString";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        toLocaleTimeString: {
            key: "toLocaleTimeString";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        toString: {
            key: "toString";
            args: [];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toTimeString: {
            key: "toTimeString";
            args: [];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    } & {
        toUTCString: {
            key: "toUTCString";
            args: [];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
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
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        ddmmyyyy: {
            key: "ddmmyyyy";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        ddyyyymm: {
            key: "ddyyyymm";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        yyyyddmm: {
            key: "yyyyddmm";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: Date, args: {
                [x: string]: any;
            }) => string;
        };
    };
} & {
    number: {
        toExponential: {
            key: "toExponential";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: number, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        toFixed: {
            key: "toFixed";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: number, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        toPrecision: {
            key: "toPrecision";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: number, args: {
                [x: string]: any;
            }) => string;
        };
    } & {
        toString: {
            key: "toString";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "string";
            operation: (input: number, args: {
                [x: string]: any;
            }) => string;
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
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        subtract: {
            key: "subtract";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        multiply: {
            key: "multiply";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        divide: {
            key: "divide";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        root: {
            key: "root";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        power: {
            key: "power";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        log: {
            key: "log";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
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
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
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
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
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
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
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
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        min: {
            key: "min";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
            }) => number;
        };
    } & {
        hypot: {
            key: "hypot";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "number";
            operation: (input: number, args: {
                [x: string]: any;
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
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        or: {
            key: "or";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        xor: {
            key: "xor";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        nand: {
            key: "nand";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        nor: {
            key: "nor";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        xnor: {
            key: "xnor";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        equals: {
            key: "equals";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    } & {
        notEquals: {
            key: "notEquals";
            args: [{
                key: string;
                type: string;
            }];
            returnType: "boolean";
            operation: (input: boolean, args: {
                [x: string]: any;
            }) => boolean;
        };
    };
};
