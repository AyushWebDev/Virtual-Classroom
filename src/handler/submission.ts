import { Context } from "koa";
import { createSubmission, getSubmissions } from "../service/submission";
import { CreateSubmissionRequest, CreateSubmissionRequestSchema } from "../model/submissions";

export const createSubmissionHandler = async (ctx: Context) => {
    const reqBody = ctx.request.body as CreateSubmissionRequest
    const validatedRequest = CreateSubmissionRequestSchema.parse(reqBody)
    const response = await createSubmission(ctx, validatedRequest) 
    ctx.status = response.status
    ctx.body=response.body
}

export const getSubmissionsHandler = async (ctx: Context) => {
    const assignmentId = ctx.params.assignmentId
    const response = await getSubmissions(ctx, assignmentId)
    ctx.status = response.status
    ctx.body = response.body
}