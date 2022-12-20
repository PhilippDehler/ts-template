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
        uppercase: {
            key: "uppercase";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    } & {
        lowercase: {
            key: "lowercase";
            args: [];
            returnType: "string";
            operation: (input: string, args: {}) => string;
        };
    };
} & {
    number: {
        square: {
            key: "square";
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
    };
} & {
    date: {
        iso: {
            key: "iso";
            args: [];
            returnType: "string";
            operation: (input: Date, args: {}) => string;
        };
    };
};
export type TestSchema = typeof schema;
export {};
