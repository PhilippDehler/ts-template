declare const schema: {
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
    };
} & {
    string: {
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
        uppercase: {
            key: "uppercase";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        lowercase: {
            key: "lowercase";
            args: never[];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    };
} & {
    number: {
        square: {
            key: "square";
            args: never[];
            returnType: "number";
            operation: (input: number, args: {}) => number;
        };
    } & {
        add: {
            key: "add";
            args: [{
                key: "addend";
                type: "number";
            }];
            returnType: "number";
            operation: (input: number, args: {
                addend: number;
            }) => number;
        };
    };
} & {
    date: {
        iso: {
            key: "iso";
            args: never[];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    };
};
export type TestSchema = typeof schema;
export {};
