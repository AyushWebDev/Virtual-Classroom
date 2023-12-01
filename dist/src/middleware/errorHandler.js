"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const zod_1 = require("zod");
const errorHandler = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            console.error("Validation failed. Errors:", error.errors);
            (ctx.status = 401),
                (ctx.body = { error: `Validation Error: ${error.errors[0].message}` });
            return;
            // Handle validation error for zod
        }
        else {
            console.error("Internal Server Error", error);
            (ctx.status = 500), (ctx.body = { error: `Internal Server Error` });
            return;
            // Handle other types of errors
        }
    }
});
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map