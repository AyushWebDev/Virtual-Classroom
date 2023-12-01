import { Context } from "koa";
import { CreateSubmissionRequest } from "../model/submissions";
export declare const createSubmission: (ctx: Context, reqBody: CreateSubmissionRequest) => Promise<{
    status: number;
    body: {
        error: string;
    };
} | {
    status: number;
    body: string;
}>;
export declare const getSubmissions: (ctx: Context, assignmentId: string) => Promise<{
    status: number;
    body: any[];
}>;
//# sourceMappingURL=submission.d.ts.map