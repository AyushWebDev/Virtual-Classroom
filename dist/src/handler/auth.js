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
exports.loginHandler = exports.registerHandler = void 0;
const auth_1 = require("../model/auth");
const auth_2 = require("../service/auth");
const registerHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = ctx.request.body;
    const validatedRequest = auth_1.RegisterRequestSchema.parse(reqBody);
    const response = yield (0, auth_2.register)(ctx, validatedRequest);
    ctx.status = response.status;
    ctx.body = response.body;
});
exports.registerHandler = registerHandler;
const loginHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = ctx.request.body;
    const validatedRequest = auth_1.LoginRequestSchema.parse(reqBody);
    const response = yield (0, auth_2.login)(ctx, validatedRequest);
    ctx.status = response.status;
    ctx.body = response.body;
});
exports.loginHandler = loginHandler;
//# sourceMappingURL=auth.js.map