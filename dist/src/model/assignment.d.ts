import { z } from "zod";
export declare enum ASSIGNMENT_STATUS {
    'SCHEDULED' = "SCHEDULED",
    'ONGOING' = "ONGOING"
}
export declare enum SUBMISSION_STATUS {
    'PENDING' = "PENDING",
    'SUBMITTED' = "SUBMITTED",
    'OVERDUE' = "OVERDUE"
}
export declare const CreateAssignmentRequestSchema: z.ZodObject<{
    description: z.ZodString;
    userId: z.ZodString;
    publishedAt: z.ZodOptional<z.ZodNumber>;
    deadline: z.ZodNumber;
    studentList: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    description: string;
    deadline: number;
    userId: string;
    studentList: string[];
    publishedAt?: number | undefined;
}, {
    description: string;
    deadline: number;
    userId: string;
    studentList: string[];
    publishedAt?: number | undefined;
}>;
export type CreateAssignmentRequest = z.infer<typeof CreateAssignmentRequestSchema>;
export declare const UpdateAssignmentRequestSchema: z.ZodEffects<z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    deadline: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    description?: string | undefined;
    deadline?: number | undefined;
}, {
    description?: string | undefined;
    deadline?: number | undefined;
}>, {
    description?: string | undefined;
    deadline?: number | undefined;
}, {
    description?: string | undefined;
    deadline?: number | undefined;
}>;
export type UpdateAssignmentFields = {
    description?: string;
    deadline?: Date;
};
export type UpdateAssignmentRequest = z.infer<typeof UpdateAssignmentRequestSchema>;
//# sourceMappingURL=assignment.d.ts.map