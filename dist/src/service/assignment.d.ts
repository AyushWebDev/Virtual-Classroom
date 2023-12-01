import { Context } from "koa";
import { CreateAssignmentRequest, UpdateAssignmentRequest } from "../model/assignment";
export declare const createAssignment: (ctx: Context, req: CreateAssignmentRequest) => Promise<{
    status: number;
    body: string;
}>;
export declare const updateAssignment: (ctx: Context, reqBody: UpdateAssignmentRequest, assignmentId: string) => Promise<{
    status: number;
    body: string;
}>;
export declare const deleteAssignment: (ctx: Context, assignmentId: string) => Promise<{
    status: number;
}>;
export declare const getAssignmentFeeds: (ctx: Context) => Promise<{
    status: number;
    body: any[];
}>;
//# sourceMappingURL=assignment.d.ts.map