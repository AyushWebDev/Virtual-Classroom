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
exports.getSubmissionsHandler = exports.createSubmissionHandler = void 0;
const submission_1 = require("../service/submission");
const submissions_1 = require("../model/submissions");
const createSubmissionHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = ctx.request.body;
    const validatedRequest = submissions_1.CreateSubmissionRequestSchema.parse(reqBody);
    const response = yield (0, submission_1.createSubmission)(ctx, validatedRequest);
    ctx.status = response.status;
    ctx.body = response.body;
});
exports.createSubmissionHandler = createSubmissionHandler;
const getSubmissionsHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = ctx.params.assignmentId;
    const response = yield (0, submission_1.getSubmissions)(ctx, assignmentId);
    ctx.status = response.status;
    ctx.body = response.body;
});
exports.getSubmissionsHandler = getSubmissionsHandler;
//# sourceMappingURL=submission.js.map