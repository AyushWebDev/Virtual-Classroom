import { Context } from "koa";
import { LoginRequest, RegisterRequest } from "../model/auth";
export declare const register: (ctx: Context, reqBody: RegisterRequest) => Promise<{
    status: number;
    body: string;
}>;
export declare const login: (ctx: Context, reqBody: LoginRequest) => Promise<{
    status: number;
    body: {
        token: string;
        userId: any;
        email: any;
        name: any;
        error?: undefined;
    };
} | {
    status: number;
    body: {
        error: string;
        token?: undefined;
        userId?: undefined;
        email?: undefined;
        name?: undefined;
    };
}>;
//# sourceMappingURL=auth.d.ts.map