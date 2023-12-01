import { z } from "zod";

export enum ASSIGNMENT_STATUS{
    'SCHEDULED' = 'SCHEDULED',
    'ONGOING'= 'ONGOING'
}

export enum SUBMISSION_STATUS{
    'PENDING' = 'PENDING',
    'SUBMITTED' = 'SUBMITTED',
    'OVERDUE'= 'OVERDUE'
}

export const CreateAssignmentRequestSchema = z.object({
  description: z.string({
    required_error: "Description is required",
    invalid_type_error: "Description is invalid",
  }),
  userId: z
    .string({
      required_error: "tutorId is required",
      invalid_type_error: "tutorId is invalid",
    })
    .uuid({ message: "tutorId is invalid" }),
  publishedAt: z
    .number({
      invalid_type_error: "publishedAt is invalid",
    })
    .optional(),
  deadline: z.number({
    required_error: "deadline is required",
    invalid_type_error: "deadline is invalid",
  }),
  studentList: z.array(z.string().uuid()),
});

export type CreateAssignmentRequest = z.infer<
  typeof CreateAssignmentRequestSchema
>;

export const UpdateAssignmentRequestSchema = z
  .object({
    description: z
      .string({
        invalid_type_error: "Description is invalid",
      })
      .optional(),
    deadline: z
      .number({
        invalid_type_error: "deadline is invalid",
      })
      .optional(),
  })
  .refine(
    (obj) => {
      // validation for checking if request body is not empty
      return obj.description || obj.deadline;
    },
    { message: "Request body cannot be empty" }
  );

export type UpdateAssignmentFields = { description?: string; deadline?: Date };

export type UpdateAssignmentRequest = z.infer<
  typeof UpdateAssignmentRequestSchema
>;
