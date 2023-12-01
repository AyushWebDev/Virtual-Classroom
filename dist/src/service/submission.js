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
exports.getSubmissions = exports.createSubmission = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
const auth_1 = require("../model/auth");
const assignment_1 = require("../model/assignment");
const query = (0, knex_1.default)(knexfile_1.default); // configuring knex and getting query builder
const validateAssignmentSubmission = (studentId, assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    //validate if assignment is assigned to student or not
    const studentAssignment = yield query("submissions")
        .select("student_id")
        .where({ student_id: studentId, assignment_id: assignmentId });
    const isAssigned = studentAssignment.length !== 0;
    return isAssigned;
});
const createSubmission = (ctx, reqBody) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, assignmentId, remark } = reqBody;
    const isValidSubmission = yield validateAssignmentSubmission(userId, assignmentId);
    if (!isValidSubmission) {
        return {
            status: 401,
            body: { error: "Invalid submission" },
        };
    }
    //check if deadline is not passed
    const assignment = yield query("assignments")
        .select("deadline")
        .where("assignment_id", assignmentId)
        .first();
    const status = Date.parse(assignment.deadline) >= Date.now()
        ? assignment_1.SUBMISSION_STATUS.SUBMITTED
        : assignment_1.SUBMISSION_STATUS.OVERDUE;
    //create submission
    yield query("submissions")
        .where({ assignment_id: assignmentId, student_id: userId })
        .update({
        remark,
        status,
    });
    return {
        status: 200,
        body: "Submission Done",
    };
});
exports.createSubmission = createSubmission;
const getSubmissions = (ctx, assignmentId) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = ctx.state.user;
    const user = yield query("users")
        .select("user_role")
        .where("user_id", userId)
        .first();
    if (user.user_role === auth_1.ROLE.STUDENT) {
        const submissions = yield query("submissions")
            .select("*")
            .where({ student_id: userId, assignment_id: assignmentId });
        return { status: 200, body: submissions };
    }
    const submissions = yield query("submissions")
        .select("*")
        .where("assignment_id", assignmentId);
    return { status: 200, body: submissions };
});
exports.getSubmissions = getSubmissions;
//# sourceMappingURL=submission.js.map