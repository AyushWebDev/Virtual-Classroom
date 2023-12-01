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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const query = (0, knex_1.default)(knexfile_1.default); // configuring knex and getting query builder
const register = (ctx, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const rows = yield query("users")
        .select("*")
        .where({ user_email: reqBody.userEmail });
    if (rows.length != 0)
        throw new Error();
    const { userEmail, userPassword, userName, userRole } = reqBody;
    // Hash the password before storing it in the database
    const hashedPassword = yield bcryptjs_1.default.hash(userPassword, 10);
    yield query("users").insert({
        user_email: userEmail,
        user_password: hashedPassword,
        user_name: userName,
        user_role: userRole,
    });
    return {
        status: 201,
        body: "User Created",
    };
});
exports.register = register;
const login = (ctx, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, userPassword } = reqBody;
    // Finding user by email
    const user = yield query('users').where('user_email', userEmail).first();
    //if user email and password matches create token
    if (user && (yield bcryptjs_1.default.compare(userPassword, user.user_password))) {
        ctx.body = { id: user.id, email: user.email, name: user.name };
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id, email: user.user_email }, `${process.env.SECRET_KEY}`, {
            expiresIn: '1h',
        });
        return {
            status: 200,
            body: { token, userId: user.user_id, email: user.user_email, name: user.user_name }
        };
    }
    else {
        return {
            status: 200,
            body: { error: 'Invalid credentials' }
        };
    }
});
exports.login = login;
//# sourceMappingURL=auth.js.map