export declare const builtInTypes: {
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
