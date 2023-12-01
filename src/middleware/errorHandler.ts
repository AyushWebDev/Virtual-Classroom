import { Context } from "koa";
import { z } from "zod";

export const errorHandler = async (ctx: Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      console.error("Validation failed. Errors:", error.errors);
      (ctx.status = 401),
        (ctx.body = { error: `Validation Error: ${error.errors[0].message}` });
      return;
      // Handle validation error for zod
    } else {
        console.error("Internal Server Error", error);
      (ctx.status = 500), (ctx.body = { error: `Internal Server Error` });
      return;
      // Handle other types of errors
    }
  }
};
