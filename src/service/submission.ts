import { Context } from "koa";
import knex from "knex";
import config from "../../knexfile";
import { CreateSubmissionRequest } from "../model/submissions";
import { ROLE } from "../model/auth";
import { SUBMISSION_STATUS } from "../model/assignment";

const query = knex(config); // configuring knex and getting query builder

const validateAssignmentSubmission = async (
  studentId: string,
  assignmentId: string
) => {
  //validate if assignment is assigned to student or not
  const studentAssignment = await query("submissions")
    .select("student_id")
    .where({ student_id: studentId, assignment_id: assignmentId });
  const isAssigned = studentAssignment.length !== 0;
  return isAssigned;
};

export const createSubmission = async (
  ctx: Context,
  reqBody: CreateSubmissionRequest
) => {
  const { userId, assignmentId, remark } = reqBody;
  const isValidSubmission = await validateAssignmentSubmission(
    userId,
    assignmentId
  );
  if (!isValidSubmission) {
    return {
      status: 401,
      body: { error: "Invalid submission" },
    };
  }
  //check if deadline is not passed
  const assignment = await query("assignments")
    .select("deadline")
    .where("assignment_id", assignmentId)
    .first();
  const status =
    Date.parse(assignment.deadline) >= Date.now()
      ? SUBMISSION_STATUS.SUBMITTED
      : SUBMISSION_STATUS.OVERDUE;
  //create submission
  await query("submissions")
    .where({ assignment_id: assignmentId, student_id: userId })
    .update({
      remark,
      status,
    });
  return {
    status: 200,
    body: "Submission Done",
  };
};

export const getSubmissions = async (ctx: Context, assignmentId: string) => {
  const { userId } = ctx.state.user;
  const user = await query("users")
    .select("user_role")
    .where("user_id", userId)
    .first();
  if (user.user_role === ROLE.STUDENT) {
    const submissions = await query("submissions")
      .select("*")
      .where({ student_id: userId, assignment_id: assignmentId });
    return { status: 200, body: submissions };
  }

  const submissions = await query("submissions")
    .select("*")
    .where("assignment_id", assignmentId);
  return { status: 200, body: submissions };
};
