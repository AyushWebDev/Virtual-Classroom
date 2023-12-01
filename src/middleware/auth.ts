import { Context } from "koa";
import jwt from "jsonwebtoken";

//validate auth token
export const authenticateToken = (ctx: Context, next: () => Promise<any>) => {
  const token = ctx.headers.authorization;
  if (!token) {
    ctx.status = 401;
    ctx.body = { error: "Unauthorized: Missing token" };
    return;
  }

  jwt.verify(token, `${process.env.SECRET_KEY}`, (err, user) => {
    if (err) {
      ctx.status = 403;
      ctx.body = { error: "Forbidden: Invalid token" };
      return;
    }
    ctx.state.user = user;
  });

  if (ctx.status == 403) return;

  return next();
};

//validate if authenticated userId matches with request body userId
export const authenticateUser = (ctx: Context, next: () => Promise<any>) => {
    const { userId } = ctx.request.body as { userId: string };
    const authUserId = ctx.state.user.userId
    if (userId !== authUserId) {
        ctx.status = 401
        ctx.body = { error: 'Unauthorized Request' }
        return 
    }
    return next()
};
