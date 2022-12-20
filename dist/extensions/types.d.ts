export declare const extensionTypes: {
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
}>;
