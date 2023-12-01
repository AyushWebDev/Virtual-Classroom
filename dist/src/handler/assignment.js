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
exports.getAssignmentFeedsHandler = exports.deleteAssignmentHandler = exports.updateAssignmentHandler = exports.createAssignmentHandler = void 0;
const assignment_1 = require("../service/assignment");
const assignment_2 = require("../model/assignment");
const createAssignmentHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = ctx.request.body;
    //validating request body using zod schema
    const validatedRequest = assignment_2.CreateAssignmentRequestSchema.parse(reqBody);
    // service func call
    const response = yield (0, assignment_1.createAssignment)(ctx, validatedRequest);
    //creating response
    ctx.body = response.body;
    ctx.status = response.status;
});
exports.createAssignmentHandler = createAssignmentHandler;
const updateAssignmentHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = ctx.request.body;
    const validatedRequest = assignment_2.UpdateAssignmentRequestSchema.parse(reqBody);
    const assignmentId = ctx.params.id;
    const response = yield (0, assignment_1.updateAssignment)(ctx, validatedRequest, assignmentId);
    //creating response
    ctx.body = response.body;
    ctx.status = response.status;
});
exports.updateAssignmentHandler = updateAssignmentHandler;
const deleteAssignmentHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const assignmentId = ctx.params.id;
    if (!assignmentId)
        throw new Error();
    const response = yield (0, assignment_1.deleteAssignment)(ctx, assignmentId);
    ctx.status = response.status;
});
exports.deleteAssignmentHandler = deleteAssignmentHandler;
const getAssignmentFeedsHandler = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield (0, assignment_1.getAssignmentFeeds)(ctx);
    ctx.status = response.status;
    ctx.body = response.body;
});
exports.getAssignmentFeedsHandler = getAssignmentFeedsHandler;
//# sourceMappingURL=assignment.js.map