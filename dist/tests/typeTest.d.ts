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
            returnType: "string" | "number" | "date";
            operation: (input: string, args: {
                start: number;
            } & {
                end: number;
            }) => string | number | Date;
        };
    } & {
        uppercase: {
            key: "uppercase";
            args: [];
            returnType: "string" | "number" | "date";
            operation: (input: string, args: {}) => string | number | Date;
        };
    } & {
        lowercase: {
            key: "lowercase";
            args: [];
            returnType: "string" | "number" | "date";
            operation: (input: string, args: {}) => string | number | Date;
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
            args: [];
            returnType: "string" | "number" | "date";
            operation: (input: Date, args: {}) => string | number | Date;
        };
    };
};
export type TestSchema = typeof schema;
export {};
