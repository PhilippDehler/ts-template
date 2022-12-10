import { Narrow } from "../utilityTypes";
export interface TypeDefinition {
    key: string;
    isDefault: boolean;
    validator: (input: any) => boolean;
    parseValue: (value: string) => unknown;
}
export type TypeDefinitions = Record<string, TypeDefinition>;
export declare function typeSchemaBuilder<T extends TypeDefinitions>(types: T): {
    types: T;
    addType<Key extends string, TDefault extends boolean, TReturn>(key: Narrow<Key>, typeDefinition: {
        isDefault: TDefault;
        validator: (input: TReturn) => boolean;
        parseValue: (value: string) => TReturn;
    }): {
        types: T & { [K in Key]: {
            key: K & string;
            isDefault: TDefault;
            validator: (input: TReturn) => boolean;
            parseValue: (value: string) => TReturn;
        }; };
        addType<Key_1 extends string, TDefault_1 extends boolean, TReturn_1>(key: Narrow<Key_1>, typeDefinition: {
            isDefault: TDefault_1;
            validator: (input: TReturn_1) => boolean;
            parseValue: (value: string) => TReturn_1;
        }): {
            types: T & { [K in Key]: {
                key: K & string;
                isDefault: TDefault;
                validator: (input: TReturn) => boolean;
                parseValue: (value: string) => TReturn;
            }; } & { [K_1 in Key_1]: {
                key: K_1 & string;
                isDefault: TDefault_1;
                validator: (input: TReturn_1) => boolean;
                parseValue: (value: string) => TReturn_1;
            }; };
            addType<Key_2 extends string, TDefault_2 extends boolean, TReturn_2>(key: Narrow<Key_2>, typeDefinition: {
                isDefault: TDefault_2;
                validator: (input: TReturn_2) => boolean;
                parseValue: (value: string) => TReturn_2;
            }): {
                types: T & { [K in Key]: {
                    key: K & string;
                    isDefault: TDefault;
                    validator: (input: TReturn) => boolean;
                    parseValue: (value: string) => TReturn;
                }; } & { [K_1 in Key_1]: {
                    key: K_1 & string;
                    isDefault: TDefault_1;
                    validator: (input: TReturn_1) => boolean;
                    parseValue: (value: string) => TReturn_1;
                }; } & { [K_2 in Key_2]: {
                    key: K_2 & string;
                    isDefault: TDefault_2;
                    validator: (input: TReturn_2) => boolean;
                    parseValue: (value: string) => TReturn_2;
                }; };
                addType<Key_3 extends string, TDefault_3 extends boolean, TReturn_3>(key: Narrow<Key_3>, typeDefinition: {
                    isDefault: TDefault_3;
                    validator: (input: TReturn_3) => boolean;
                    parseValue: (value: string) => TReturn_3;
                }): {
                    types: T & { [K in Key]: {
                        key: K & string;
                        isDefault: TDefault;
                        validator: (input: TReturn) => boolean;
                        parseValue: (value: string) => TReturn;
                    }; } & { [K_1 in Key_1]: {
                        key: K_1 & string;
                        isDefault: TDefault_1;
                        validator: (input: TReturn_1) => boolean;
                        parseValue: (value: string) => TReturn_1;
                    }; } & { [K_2 in Key_2]: {
                        key: K_2 & string;
                        isDefault: TDefault_2;
                        validator: (input: TReturn_2) => boolean;
                        parseValue: (value: string) => TReturn_2;
                    }; } & { [K_3 in Key_3]: {
                        key: K_3 & string;
                        isDefault: TDefault_3;
                        validator: (input: TReturn_3) => boolean;
                        parseValue: (value: string) => TReturn_3;
                    }; };
                    addType<Key_4 extends string, TDefault_4 extends boolean, TReturn_4>(key: Narrow<Key_4>, typeDefinition: {
                        isDefault: TDefault_4;
                        validator: (input: TReturn_4) => boolean;
                        parseValue: (value: string) => TReturn_4;
                    }): {
                        types: T & { [K in Key]: {
                            key: K & string;
                            isDefault: TDefault;
                            validator: (input: TReturn) => boolean;
                            parseValue: (value: string) => TReturn;
                        }; } & { [K_1 in Key_1]: {
                            key: K_1 & string;
                            isDefault: TDefault_1;
                            validator: (input: TReturn_1) => boolean;
                            parseValue: (value: string) => TReturn_1;
                        }; } & { [K_2 in Key_2]: {
                            key: K_2 & string;
                            isDefault: TDefault_2;
                            validator: (input: TReturn_2) => boolean;
                            parseValue: (value: string) => TReturn_2;
                        }; } & { [K_3 in Key_3]: {
                            key: K_3 & string;
                            isDefault: TDefault_3;
                            validator: (input: TReturn_3) => boolean;
                            parseValue: (value: string) => TReturn_3;
                        }; } & { [K_4 in Key_4]: {
                            key: K_4 & string;
                            isDefault: TDefault_4;
                            validator: (input: TReturn_4) => boolean;
                            parseValue: (value: string) => TReturn_4;
                        }; };
                        addType<Key_5 extends string, TDefault_5 extends boolean, TReturn_5>(key: Narrow<Key_5>, typeDefinition: {
                            isDefault: TDefault_5;
                            validator: (input: TReturn_5) => boolean;
                            parseValue: (value: string) => TReturn_5;
                        }): {
                            types: T & { [K in Key]: {
                                key: K & string;
                                isDefault: TDefault;
                                validator: (input: TReturn) => boolean;
                                parseValue: (value: string) => TReturn;
                            }; } & { [K_1 in Key_1]: {
                                key: K_1 & string;
                                isDefault: TDefault_1;
                                validator: (input: TReturn_1) => boolean;
                                parseValue: (value: string) => TReturn_1;
                            }; } & { [K_2 in Key_2]: {
                                key: K_2 & string;
                                isDefault: TDefault_2;
                                validator: (input: TReturn_2) => boolean;
                                parseValue: (value: string) => TReturn_2;
                            }; } & { [K_3 in Key_3]: {
                                key: K_3 & string;
                                isDefault: TDefault_3;
                                validator: (input: TReturn_3) => boolean;
                                parseValue: (value: string) => TReturn_3;
                            }; } & { [K_4 in Key_4]: {
                                key: K_4 & string;
                                isDefault: TDefault_4;
                                validator: (input: TReturn_4) => boolean;
                                parseValue: (value: string) => TReturn_4;
                            }; } & { [K_5 in Key_5]: {
                                key: K_5 & string;
                                isDefault: TDefault_5;
                                validator: (input: TReturn_5) => boolean;
                                parseValue: (value: string) => TReturn_5;
                            }; };
                            addType<Key_6 extends string, TDefault_6 extends boolean, TReturn_6>(key: Narrow<Key_6>, typeDefinition: {
                                isDefault: TDefault_6;
                                validator: (input: TReturn_6) => boolean;
                                parseValue: (value: string) => TReturn_6;
                            }): {
                                types: T & { [K in Key]: {
                                    key: K & string;
                                    isDefault: TDefault;
                                    validator: (input: TReturn) => boolean;
                                    parseValue: (value: string) => TReturn;
                                }; } & { [K_1 in Key_1]: {
                                    key: K_1 & string;
                                    isDefault: TDefault_1;
                                    validator: (input: TReturn_1) => boolean;
                                    parseValue: (value: string) => TReturn_1;
                                }; } & { [K_2 in Key_2]: {
                                    key: K_2 & string;
                                    isDefault: TDefault_2;
                                    validator: (input: TReturn_2) => boolean;
                                    parseValue: (value: string) => TReturn_2;
                                }; } & { [K_3 in Key_3]: {
                                    key: K_3 & string;
                                    isDefault: TDefault_3;
                                    validator: (input: TReturn_3) => boolean;
                                    parseValue: (value: string) => TReturn_3;
                                }; } & { [K_4 in Key_4]: {
                                    key: K_4 & string;
                                    isDefault: TDefault_4;
                                    validator: (input: TReturn_4) => boolean;
                                    parseValue: (value: string) => TReturn_4;
                                }; } & { [K_5 in Key_5]: {
                                    key: K_5 & string;
                                    isDefault: TDefault_5;
                                    validator: (input: TReturn_5) => boolean;
                                    parseValue: (value: string) => TReturn_5;
                                }; } & { [K_6 in Key_6]: {
                                    key: K_6 & string;
                                    isDefault: TDefault_6;
                                    validator: (input: TReturn_6) => boolean;
                                    parseValue: (value: string) => TReturn_6;
                                }; };
                                addType<Key_7 extends string, TDefault_7 extends boolean, TReturn_7>(key: Narrow<Key_7>, typeDefinition: {
                                    isDefault: TDefault_7;
                                    validator: (input: TReturn_7) => boolean;
                                    parseValue: (value: string) => TReturn_7;
                                }): {
                                    types: T & { [K in Key]: {
                                        key: K & string;
                                        isDefault: TDefault;
                                        validator: (input: TReturn) => boolean;
                                        parseValue: (value: string) => TReturn;
                                    }; } & { [K_1 in Key_1]: {
                                        key: K_1 & string;
                                        isDefault: TDefault_1;
                                        validator: (input: TReturn_1) => boolean;
                                        parseValue: (value: string) => TReturn_1;
                                    }; } & { [K_2 in Key_2]: {
                                        key: K_2 & string;
                                        isDefault: TDefault_2;
                                        validator: (input: TReturn_2) => boolean;
                                        parseValue: (value: string) => TReturn_2;
                                    }; } & { [K_3 in Key_3]: {
                                        key: K_3 & string;
                                        isDefault: TDefault_3;
                                        validator: (input: TReturn_3) => boolean;
                                        parseValue: (value: string) => TReturn_3;
                                    }; } & { [K_4 in Key_4]: {
                                        key: K_4 & string;
                                        isDefault: TDefault_4;
                                        validator: (input: TReturn_4) => boolean;
                                        parseValue: (value: string) => TReturn_4;
                                    }; } & { [K_5 in Key_5]: {
                                        key: K_5 & string;
                                        isDefault: TDefault_5;
                                        validator: (input: TReturn_5) => boolean;
                                        parseValue: (value: string) => TReturn_5;
                                    }; } & { [K_6 in Key_6]: {
                                        key: K_6 & string;
                                        isDefault: TDefault_6;
                                        validator: (input: TReturn_6) => boolean;
                                        parseValue: (value: string) => TReturn_6;
                                    }; } & { [K_7 in Key_7]: {
                                        key: K_7 & string;
                                        isDefault: TDefault_7;
                                        validator: (input: TReturn_7) => boolean;
                                        parseValue: (value: string) => TReturn_7;
                                    }; };
                                    addType<Key_8 extends string, TDefault_8 extends boolean, TReturn_8>(key: Narrow<Key_8>, typeDefinition: {
                                        isDefault: TDefault_8;
                                        validator: (input: TReturn_8) => boolean;
                                        parseValue: (value: string) => TReturn_8;
                                    }): {
                                        types: T & { [K in Key]: {
                                            key: K & string;
                                            isDefault: TDefault;
                                            validator: (input: TReturn) => boolean;
                                            parseValue: (value: string) => TReturn;
                                        }; } & { [K_1 in Key_1]: {
                                            key: K_1 & string;
                                            isDefault: TDefault_1;
                                            validator: (input: TReturn_1) => boolean;
                                            parseValue: (value: string) => TReturn_1;
                                        }; } & { [K_2 in Key_2]: {
                                            key: K_2 & string;
                                            isDefault: TDefault_2;
                                            validator: (input: TReturn_2) => boolean;
                                            parseValue: (value: string) => TReturn_2;
                                        }; } & { [K_3 in Key_3]: {
                                            key: K_3 & string;
                                            isDefault: TDefault_3;
                                            validator: (input: TReturn_3) => boolean;
                                            parseValue: (value: string) => TReturn_3;
                                        }; } & { [K_4 in Key_4]: {
                                            key: K_4 & string;
                                            isDefault: TDefault_4;
                                            validator: (input: TReturn_4) => boolean;
                                            parseValue: (value: string) => TReturn_4;
                                        }; } & { [K_5 in Key_5]: {
                                            key: K_5 & string;
                                            isDefault: TDefault_5;
                                            validator: (input: TReturn_5) => boolean;
                                            parseValue: (value: string) => TReturn_5;
                                        }; } & { [K_6 in Key_6]: {
                                            key: K_6 & string;
                                            isDefault: TDefault_6;
                                            validator: (input: TReturn_6) => boolean;
                                            parseValue: (value: string) => TReturn_6;
                                        }; } & { [K_7 in Key_7]: {
                                            key: K_7 & string;
                                            isDefault: TDefault_7;
                                            validator: (input: TReturn_7) => boolean;
                                            parseValue: (value: string) => TReturn_7;
                                        }; } & { [K_8 in Key_8]: {
                                            key: K_8 & string;
                                            isDefault: TDefault_8;
                                            validator: (input: TReturn_8) => boolean;
                                            parseValue: (value: string) => TReturn_8;
                                        }; };
                                        addType<Key_9 extends string, TDefault_9 extends boolean, TReturn_9>(key: Narrow<Key_9>, typeDefinition: {
                                            isDefault: TDefault_9;
                                            validator: (input: TReturn_9) => boolean;
                                            parseValue: (value: string) => TReturn_9;
                                        }): {
                                            types: T & { [K in Key]: {
                                                key: K & string;
                                                isDefault: TDefault;
                                                validator: (input: TReturn) => boolean;
                                                parseValue: (value: string) => TReturn;
                                            }; } & { [K_1 in Key_1]: {
                                                key: K_1 & string;
                                                isDefault: TDefault_1;
                                                validator: (input: TReturn_1) => boolean;
                                                parseValue: (value: string) => TReturn_1;
                                            }; } & { [K_2 in Key_2]: {
                                                key: K_2 & string;
                                                isDefault: TDefault_2;
                                                validator: (input: TReturn_2) => boolean;
                                                parseValue: (value: string) => TReturn_2;
                                            }; } & { [K_3 in Key_3]: {
                                                key: K_3 & string;
                                                isDefault: TDefault_3;
                                                validator: (input: TReturn_3) => boolean;
                                                parseValue: (value: string) => TReturn_3;
                                            }; } & { [K_4 in Key_4]: {
                                                key: K_4 & string;
                                                isDefault: TDefault_4;
                                                validator: (input: TReturn_4) => boolean;
                                                parseValue: (value: string) => TReturn_4;
                                            }; } & { [K_5 in Key_5]: {
                                                key: K_5 & string;
                                                isDefault: TDefault_5;
                                                validator: (input: TReturn_5) => boolean;
                                                parseValue: (value: string) => TReturn_5;
                                            }; } & { [K_6 in Key_6]: {
                                                key: K_6 & string;
                                                isDefault: TDefault_6;
                                                validator: (input: TReturn_6) => boolean;
                                                parseValue: (value: string) => TReturn_6;
                                            }; } & { [K_7 in Key_7]: {
                                                key: K_7 & string;
                                                isDefault: TDefault_7;
                                                validator: (input: TReturn_7) => boolean;
                                                parseValue: (value: string) => TReturn_7;
                                            }; } & { [K_8 in Key_8]: {
                                                key: K_8 & string;
                                                isDefault: TDefault_8;
                                                validator: (input: TReturn_8) => boolean;
                                                parseValue: (value: string) => TReturn_8;
                                            }; } & { [K_9 in Key_9]: {
                                                key: K_9 & string;
                                                isDefault: TDefault_9;
                                                validator: (input: TReturn_9) => boolean;
                                                parseValue: (value: string) => TReturn_9;
                                            }; };
                                            addType<Key_10 extends string, TDefault_10 extends boolean, TReturn_10>(key: Narrow<Key_10>, typeDefinition: {
                                                isDefault: TDefault_10;
                                                validator: (input: TReturn_10) => boolean;
                                                parseValue: (value: string) => TReturn_10;
                                            }): any;
                                            build(): T & { [K in Key]: {
                                                key: K & string;
                                                isDefault: TDefault;
                                                validator: (input: TReturn) => boolean;
                                                parseValue: (value: string) => TReturn;
                                            }; } & { [K_1 in Key_1]: {
                                                key: K_1 & string;
                                                isDefault: TDefault_1;
                                                validator: (input: TReturn_1) => boolean;
                                                parseValue: (value: string) => TReturn_1;
                                            }; } & { [K_2 in Key_2]: {
                                                key: K_2 & string;
                                                isDefault: TDefault_2;
                                                validator: (input: TReturn_2) => boolean;
                                                parseValue: (value: string) => TReturn_2;
                                            }; } & { [K_3 in Key_3]: {
                                                key: K_3 & string;
                                                isDefault: TDefault_3;
                                                validator: (input: TReturn_3) => boolean;
                                                parseValue: (value: string) => TReturn_3;
                                            }; } & { [K_4 in Key_4]: {
                                                key: K_4 & string;
                                                isDefault: TDefault_4;
                                                validator: (input: TReturn_4) => boolean;
                                                parseValue: (value: string) => TReturn_4;
                                            }; } & { [K_5 in Key_5]: {
                                                key: K_5 & string;
                                                isDefault: TDefault_5;
                                                validator: (input: TReturn_5) => boolean;
                                                parseValue: (value: string) => TReturn_5;
                                            }; } & { [K_6 in Key_6]: {
                                                key: K_6 & string;
                                                isDefault: TDefault_6;
                                                validator: (input: TReturn_6) => boolean;
                                                parseValue: (value: string) => TReturn_6;
                                            }; } & { [K_7 in Key_7]: {
                                                key: K_7 & string;
                                                isDefault: TDefault_7;
                                                validator: (input: TReturn_7) => boolean;
                                                parseValue: (value: string) => TReturn_7;
                                            }; } & { [K_8 in Key_8]: {
                                                key: K_8 & string;
                                                isDefault: TDefault_8;
                                                validator: (input: TReturn_8) => boolean;
                                                parseValue: (value: string) => TReturn_8;
                                            }; } & { [K_9 in Key_9]: {
                                                key: K_9 & string;
                                                isDefault: TDefault_9;
                                                validator: (input: TReturn_9) => boolean;
                                                parseValue: (value: string) => TReturn_9;
                                            }; };
                                        };
                                        build(): T & { [K in Key]: {
                                            key: K & string;
                                            isDefault: TDefault;
                                            validator: (input: TReturn) => boolean;
                                            parseValue: (value: string) => TReturn;
                                        }; } & { [K_1 in Key_1]: {
                                            key: K_1 & string;
                                            isDefault: TDefault_1;
                                            validator: (input: TReturn_1) => boolean;
                                            parseValue: (value: string) => TReturn_1;
                                        }; } & { [K_2 in Key_2]: {
                                            key: K_2 & string;
                                            isDefault: TDefault_2;
                                            validator: (input: TReturn_2) => boolean;
                                            parseValue: (value: string) => TReturn_2;
                                        }; } & { [K_3 in Key_3]: {
                                            key: K_3 & string;
                                            isDefault: TDefault_3;
                                            validator: (input: TReturn_3) => boolean;
                                            parseValue: (value: string) => TReturn_3;
                                        }; } & { [K_4 in Key_4]: {
                                            key: K_4 & string;
                                            isDefault: TDefault_4;
                                            validator: (input: TReturn_4) => boolean;
                                            parseValue: (value: string) => TReturn_4;
                                        }; } & { [K_5 in Key_5]: {
                                            key: K_5 & string;
                                            isDefault: TDefault_5;
                                            validator: (input: TReturn_5) => boolean;
                                            parseValue: (value: string) => TReturn_5;
                                        }; } & { [K_6 in Key_6]: {
                                            key: K_6 & string;
                                            isDefault: TDefault_6;
                                            validator: (input: TReturn_6) => boolean;
                                            parseValue: (value: string) => TReturn_6;
                                        }; } & { [K_7 in Key_7]: {
                                            key: K_7 & string;
                                            isDefault: TDefault_7;
                                            validator: (input: TReturn_7) => boolean;
                                            parseValue: (value: string) => TReturn_7;
                                        }; } & { [K_8 in Key_8]: {
                                            key: K_8 & string;
                                            isDefault: TDefault_8;
                                            validator: (input: TReturn_8) => boolean;
                                            parseValue: (value: string) => TReturn_8;
                                        }; };
                                    };
                                    build(): T & { [K in Key]: {
                                        key: K & string;
                                        isDefault: TDefault;
                                        validator: (input: TReturn) => boolean;
                                        parseValue: (value: string) => TReturn;
                                    }; } & { [K_1 in Key_1]: {
                                        key: K_1 & string;
                                        isDefault: TDefault_1;
                                        validator: (input: TReturn_1) => boolean;
                                        parseValue: (value: string) => TReturn_1;
                                    }; } & { [K_2 in Key_2]: {
                                        key: K_2 & string;
                                        isDefault: TDefault_2;
                                        validator: (input: TReturn_2) => boolean;
                                        parseValue: (value: string) => TReturn_2;
                                    }; } & { [K_3 in Key_3]: {
                                        key: K_3 & string;
                                        isDefault: TDefault_3;
                                        validator: (input: TReturn_3) => boolean;
                                        parseValue: (value: string) => TReturn_3;
                                    }; } & { [K_4 in Key_4]: {
                                        key: K_4 & string;
                                        isDefault: TDefault_4;
                                        validator: (input: TReturn_4) => boolean;
                                        parseValue: (value: string) => TReturn_4;
                                    }; } & { [K_5 in Key_5]: {
                                        key: K_5 & string;
                                        isDefault: TDefault_5;
                                        validator: (input: TReturn_5) => boolean;
                                        parseValue: (value: string) => TReturn_5;
                                    }; } & { [K_6 in Key_6]: {
                                        key: K_6 & string;
                                        isDefault: TDefault_6;
                                        validator: (input: TReturn_6) => boolean;
                                        parseValue: (value: string) => TReturn_6;
                                    }; } & { [K_7 in Key_7]: {
                                        key: K_7 & string;
                                        isDefault: TDefault_7;
                                        validator: (input: TReturn_7) => boolean;
                                        parseValue: (value: string) => TReturn_7;
                                    }; };
                                };
                                build(): T & { [K in Key]: {
                                    key: K & string;
                                    isDefault: TDefault;
                                    validator: (input: TReturn) => boolean;
                                    parseValue: (value: string) => TReturn;
                                }; } & { [K_1 in Key_1]: {
                                    key: K_1 & string;
                                    isDefault: TDefault_1;
                                    validator: (input: TReturn_1) => boolean;
                                    parseValue: (value: string) => TReturn_1;
                                }; } & { [K_2 in Key_2]: {
                                    key: K_2 & string;
                                    isDefault: TDefault_2;
                                    validator: (input: TReturn_2) => boolean;
                                    parseValue: (value: string) => TReturn_2;
                                }; } & { [K_3 in Key_3]: {
                                    key: K_3 & string;
                                    isDefault: TDefault_3;
                                    validator: (input: TReturn_3) => boolean;
                                    parseValue: (value: string) => TReturn_3;
                                }; } & { [K_4 in Key_4]: {
                                    key: K_4 & string;
                                    isDefault: TDefault_4;
                                    validator: (input: TReturn_4) => boolean;
                                    parseValue: (value: string) => TReturn_4;
                                }; } & { [K_5 in Key_5]: {
                                    key: K_5 & string;
                                    isDefault: TDefault_5;
                                    validator: (input: TReturn_5) => boolean;
                                    parseValue: (value: string) => TReturn_5;
                                }; } & { [K_6 in Key_6]: {
                                    key: K_6 & string;
                                    isDefault: TDefault_6;
                                    validator: (input: TReturn_6) => boolean;
                                    parseValue: (value: string) => TReturn_6;
                                }; };
                            };
                            build(): T & { [K in Key]: {
                                key: K & string;
                                isDefault: TDefault;
                                validator: (input: TReturn) => boolean;
                                parseValue: (value: string) => TReturn;
                            }; } & { [K_1 in Key_1]: {
                                key: K_1 & string;
                                isDefault: TDefault_1;
                                validator: (input: TReturn_1) => boolean;
                                parseValue: (value: string) => TReturn_1;
                            }; } & { [K_2 in Key_2]: {
                                key: K_2 & string;
                                isDefault: TDefault_2;
                                validator: (input: TReturn_2) => boolean;
                                parseValue: (value: string) => TReturn_2;
                            }; } & { [K_3 in Key_3]: {
                                key: K_3 & string;
                                isDefault: TDefault_3;
                                validator: (input: TReturn_3) => boolean;
                                parseValue: (value: string) => TReturn_3;
                            }; } & { [K_4 in Key_4]: {
                                key: K_4 & string;
                                isDefault: TDefault_4;
                                validator: (input: TReturn_4) => boolean;
                                parseValue: (value: string) => TReturn_4;
                            }; } & { [K_5 in Key_5]: {
                                key: K_5 & string;
                                isDefault: TDefault_5;
                                validator: (input: TReturn_5) => boolean;
                                parseValue: (value: string) => TReturn_5;
                            }; };
                        };
                        build(): T & { [K in Key]: {
                            key: K & string;
                            isDefault: TDefault;
                            validator: (input: TReturn) => boolean;
                            parseValue: (value: string) => TReturn;
                        }; } & { [K_1 in Key_1]: {
                            key: K_1 & string;
                            isDefault: TDefault_1;
                            validator: (input: TReturn_1) => boolean;
                            parseValue: (value: string) => TReturn_1;
                        }; } & { [K_2 in Key_2]: {
                            key: K_2 & string;
                            isDefault: TDefault_2;
                            validator: (input: TReturn_2) => boolean;
                            parseValue: (value: string) => TReturn_2;
                        }; } & { [K_3 in Key_3]: {
                            key: K_3 & string;
                            isDefault: TDefault_3;
                            validator: (input: TReturn_3) => boolean;
                            parseValue: (value: string) => TReturn_3;
                        }; } & { [K_4 in Key_4]: {
                            key: K_4 & string;
                            isDefault: TDefault_4;
                            validator: (input: TReturn_4) => boolean;
                            parseValue: (value: string) => TReturn_4;
                        }; };
                    };
                    build(): T & { [K in Key]: {
                        key: K & string;
                        isDefault: TDefault;
                        validator: (input: TReturn) => boolean;
                        parseValue: (value: string) => TReturn;
                    }; } & { [K_1 in Key_1]: {
                        key: K_1 & string;
                        isDefault: TDefault_1;
                        validator: (input: TReturn_1) => boolean;
                        parseValue: (value: string) => TReturn_1;
                    }; } & { [K_2 in Key_2]: {
                        key: K_2 & string;
                        isDefault: TDefault_2;
                        validator: (input: TReturn_2) => boolean;
                        parseValue: (value: string) => TReturn_2;
                    }; } & { [K_3 in Key_3]: {
                        key: K_3 & string;
                        isDefault: TDefault_3;
                        validator: (input: TReturn_3) => boolean;
                        parseValue: (value: string) => TReturn_3;
                    }; };
                };
                build(): T & { [K in Key]: {
                    key: K & string;
                    isDefault: TDefault;
                    validator: (input: TReturn) => boolean;
                    parseValue: (value: string) => TReturn;
                }; } & { [K_1 in Key_1]: {
                    key: K_1 & string;
                    isDefault: TDefault_1;
                    validator: (input: TReturn_1) => boolean;
                    parseValue: (value: string) => TReturn_1;
                }; } & { [K_2 in Key_2]: {
                    key: K_2 & string;
                    isDefault: TDefault_2;
                    validator: (input: TReturn_2) => boolean;
                    parseValue: (value: string) => TReturn_2;
                }; };
            };
            build(): T & { [K in Key]: {
                key: K & string;
                isDefault: TDefault;
                validator: (input: TReturn) => boolean;
                parseValue: (value: string) => TReturn;
            }; } & { [K_1 in Key_1]: {
                key: K_1 & string;
                isDefault: TDefault_1;
                validator: (input: TReturn_1) => boolean;
                parseValue: (value: string) => TReturn_1;
            }; };
        };
        build(): T & { [K in Key]: {
            key: K & string;
            isDefault: TDefault;
            validator: (input: TReturn) => boolean;
            parseValue: (value: string) => TReturn;
        }; };
    };
    build(): T;
};
