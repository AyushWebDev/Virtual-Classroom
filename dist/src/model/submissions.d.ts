import { z } from "zod";
export declare const CreateSubmissionRequestSchema: z.ZodObject<{
    userId: z.ZodString;
    assignmentId: z.ZodString;
    remark: z.ZodString;
}, "strip", z.ZodTypeAny, {
    remark: string;
    userId: string;
    assignmentId: string;
}, {
    remark: string;
    userId: string;
    assignmentId: string;
}>;
export type CreateSubmissionRequest = z.infer<typeof CreateSubmissionRequestSchema>;
//# sourceMappingURL=submissions.d.ts.map