"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//validate auth token
const authenticateToken = (ctx, next) => {
    const token = ctx.headers.authorization;
    if (!token) {
        ctx.status = 401;
        ctx.body = { error: "Unauthorized: Missing token" };
        return;
    }
    jsonwebtoken_1.default.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
        if (err) {
            ctx.status = 403;
            ctx.body = { error: "Forbidden: Invalid token" };
            return;
        }
        ctx.state.user = user;
    });
    if (ctx.status == 403)
        return;
    return next();
};
exports.authenticateToken = authenticateToken;
//validate if authenticated userId matches with request body userId
const authenticateUser = (ctx, next) => {
    const { userId } = ctx.request.body;
    const authUserId = ctx.state.user.userId;
    if (userId !== authUserId) {
        ctx.status = 401;
        ctx.body = { error: 'Unauthorized Request' };
        return;
    }
    return next();
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=auth.js.map