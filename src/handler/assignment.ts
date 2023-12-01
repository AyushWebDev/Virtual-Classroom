import { Context } from "koa";
import {
  createAssignment,
  deleteAssignment,
  getAssignmentFeeds,
  updateAssignment,
} from "../service/assignment";
import {
  CreateAssignmentRequest,
  CreateAssignmentRequestSchema,
  UpdateAssignmentRequest,
  UpdateAssignmentRequestSchema,
} from "../model/assignment";

export const createAssignmentHandler = async (ctx: Context) => {
  const reqBody = ctx.request.body as CreateAssignmentRequest;
  //validating request body using zod schema
  const validatedRequest = CreateAssignmentRequestSchema.parse(reqBody);
  // service func call
  const response = await createAssignment(ctx, validatedRequest);
  //creating response
  ctx.body = response.body;
  ctx.status = response.status;
};

export const updateAssignmentHandler = async (ctx: Context) => {
  const reqBody = ctx.request.body as UpdateAssignmentRequest;
  const validatedRequest = UpdateAssignmentRequestSchema.parse(reqBody);
  const assignmentId = ctx.params.id;
  const response = await updateAssignment(ctx, validatedRequest, assignmentId);
  //creating response
  ctx.body = response.body;
  ctx.status = response.status;
};

export const deleteAssignmentHandler = async (ctx: Context) => {
  const assignmentId = ctx.params.id;
  if (!assignmentId) throw new Error();
  const response = await deleteAssignment(ctx, assignmentId);
  ctx.status = response.status;
};

export const getAssignmentFeedsHandler = async (ctx: Context) => {
  const response = await getAssignmentFeeds(ctx);
  ctx.status = response.status;
  ctx.body = response.body;
};
