"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSubmissionRequestSchema = void 0;
const zod_1 = require("zod");
exports.CreateSubmissionRequestSchema = zod_1.z.object({
    userId: zod_1.z
        .string({
        required_error: "studentId is required",
        invalid_type_error: "studentId is invalid",
    })
        .uuid({ message: "studentId is invalid" }),
    assignmentId: zod_1.z
        .string({
        required_error: "assignmentId is required",
        invalid_type_error: "assignmentId is invalid",
    })
        .uuid({ message: "tutorId is invalid" }),
    remark: zod_1.z.string({
        required_error: "remark is required",
        invalid_type_error: "remark is invalid",
    })
});
//# sourceMappingURL=submissions.js.map