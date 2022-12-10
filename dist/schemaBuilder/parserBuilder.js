"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parserBuilder = void 0;
function parserBuilder(parser) {
    const self = {
        parser,
        addParser(key, args, returnType, parser) {
            return parserBuilder(Object.assign(self.parser, {
                [key]: { parser, key, args, returnType },
            }));
        },
        build() {
            return self.parser;
        },
    };
    return self;
}
exports.parserBuilder = parserBuilder;
