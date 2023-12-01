"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAssignmentRequestSchema = exports.CreateAssignmentRequestSchema = exports.SUBMISSION_STATUS = exports.ASSIGNMENT_STATUS = void 0;
const zod_1 = require("zod");
var ASSIGNMENT_STATUS;
(function (ASSIGNMENT_STATUS) {
    ASSIGNMENT_STATUS["SCHEDULED"] = "SCHEDULED";
    ASSIGNMENT_STATUS["ONGOING"] = "ONGOING";
})(ASSIGNMENT_STATUS || (exports.ASSIGNMENT_STATUS = ASSIGNMENT_STATUS = {}));
var SUBMISSION_STATUS;
(function (SUBMISSION_STATUS) {
    SUBMISSION_STATUS["PENDING"] = "PENDING";
    SUBMISSION_STATUS["SUBMITTED"] = "SUBMITTED";
    SUBMISSION_STATUS["OVERDUE"] = "OVERDUE";
})(SUBMISSION_STATUS || (exports.SUBMISSION_STATUS = SUBMISSION_STATUS = {}));
exports.CreateAssignmentRequestSchema = zod_1.z.object({
    description: zod_1.z.string({
        required_error: "Description is required",
        invalid_type_error: "Description is invalid",
    }),
    userId: zod_1.z
        .string({
        required_error: "tutorId is required",
        invalid_type_error: "tutorId is invalid",
    })
        .uuid({ message: "tutorId is invalid" }),
    publishedAt: zod_1.z
        .number({
        invalid_type_error: "publishedAt is invalid",
    })
        .optional(),
    deadline: zod_1.z.number({
        required_error: "deadline is required",
        invalid_type_error: "deadline is invalid",
    }),
    studentList: zod_1.z.array(zod_1.z.string().uuid()),
});
exports.UpdateAssignmentRequestSchema = zod_1.z
    .object({
    description: zod_1.z
        .string({
        invalid_type_error: "Description is invalid",
    })
        .optional(),
    deadline: zod_1.z
        .number({
        invalid_type_error: "deadline is invalid",
    })
        .optional(),
})
    .refine((obj) => {
    // validation for checking if request body is not empty
    return obj.description || obj.deadline;
}, { message: "Request body cannot be empty" });
//# sourceMappingURL=assignment.js.map