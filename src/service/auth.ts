import { Context } from "koa";
import { LoginRequest, RegisterRequest } from "../model/auth";
import knex from "knex";
import config from "../../knexfile";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const query = knex(config); // configuring knex and getting query builder

export const register = async (ctx: Context, reqBody: RegisterRequest) => {
  const rows = await query("users")
    .select("*")
    .where({ user_email: reqBody.userEmail })
  if (rows.length != 0) throw new Error();
  const { userEmail, userPassword, userName, userRole } = reqBody

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(userPassword, 10);
  await query("users").insert({
    user_email: userEmail,
    user_password: hashedPassword,
    user_name: userName,
    user_role: userRole,
  })

  return {
    status: 201,
    body: "User Created",
  }
};

export const login = async (ctx: Context, reqBody: LoginRequest) => {
    const { userEmail, userPassword } = reqBody;

  // Finding user by email
    const user = await query('users').where('user_email', userEmail).first();

  //if user email and password matches create token
  if (user && (await bcrypt.compare(userPassword, user.user_password))) {
      ctx.body = { id: user.id, email: user.email, name: user.name };
      const token = jwt.sign({ userId: user.user_id, email: user.user_email }, `${process.env.SECRET_KEY}`, {
        expiresIn: '1h',
      })
      return {
          status: 200,
          body: { token, userId: user.user_id, email: user.user_email, name: user.user_name }
      }
  } else {
    return {
        status: 200,
        body: { error: 'Invalid credentials' }
    }
  }
}
