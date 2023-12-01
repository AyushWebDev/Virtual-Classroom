import { Context } from "koa";
import { LoginRequest, LoginRequestSchema, RegisterRequest, RegisterRequestSchema } from "../model/auth";
import { login, register } from "../service/auth";

export const registerHandler = async (ctx: Context) => {
    const reqBody = ctx.request.body as RegisterRequest
    const validatedRequest = RegisterRequestSchema.parse(reqBody)
    const response = await register(ctx, validatedRequest)
    ctx.status = response.status
    ctx.body = response.body
}

export const loginHandler = async (ctx: Context) => {
    const reqBody = ctx.request.body as LoginRequest
    const validatedRequest = LoginRequestSchema.parse(reqBody)
    const response = await login(ctx, validatedRequest)
    ctx.status = response.status
    ctx.body = response.body
}