import { z } from "zod";

export const CreateSubmissionRequestSchema = z.object({
    userId: z
      .string({
        required_error: "studentId is required",
        invalid_type_error: "studentId is invalid",
      })
      .uuid({ message: "studentId is invalid" }),
    assignmentId: z
    .string({
      required_error: "assignmentId is required",
      invalid_type_error: "assignmentId is invalid",
    })
    .uuid({ message: "tutorId is invalid" }),
    remark: z.string({
      required_error: "remark is required",
      invalid_type_error: "remark is invalid",
    })
  });
  
  export type CreateSubmissionRequest = z.infer<
    typeof CreateSubmissionRequestSchema
  >;