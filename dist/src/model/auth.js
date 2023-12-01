"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequestSchema = exports.RegisterRequestSchema = exports.ROLE = void 0;
const zod_1 = require("zod");
var ROLE;
(function (ROLE) {
    ROLE["TUTOR"] = "tutor";
    ROLE["STUDENT"] = "student";
})(ROLE || (exports.ROLE = ROLE = {}));
exports.RegisterRequestSchema = zod_1.z.object({
    userName: zod_1.z.string({
        required_error: 'userName is required',
        invalid_type_error: 'invalid userName'
    }),
    userEmail: zod_1.z.string({
        required_error: 'userEmail is required',
        invalid_type_error: 'invalid userEmail'
    }),
    userPassword: zod_1.z.string({
        required_error: 'userPassword is required',
        invalid_type_error: 'invalid userPassword'
    }),
    userRole: zod_1.z.string({
        required_error: 'userRole is required',
        invalid_type_error: 'invalid userRole'
    })
        .refine((value) => Object.values(ROLE).includes(value), {
        message: "Invalid userRole"
    })
});
exports.LoginRequestSchema = zod_1.z.object({
    userEmail: zod_1.z.string({
        required_error: 'userEmail is required',
        invalid_type_error: 'invalid userEmail'
    }),
    userPassword: zod_1.z.string({
        required_error: 'userPassword is required',
        invalid_type_error: 'invalid userPassword'
    })
});
//# sourceMappingURL=auth.js.map