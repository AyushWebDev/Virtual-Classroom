import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import {
  createAssignmentHandler,
  deleteAssignmentHandler,
  getAssignmentFeedsHandler,
  updateAssignmentHandler,
} from "./handler/assignment";
import {
  createSubmissionHandler,
  getSubmissionsHandler,
} from "./handler/submission";
import { errorHandler } from "./middleware/errorHandler";
import { loginHandler, registerHandler } from "./handler/auth";
import { authenticateToken, authenticateUser } from "./middleware/auth";
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, 'configs', `.${process.env.NODE_ENV}.env`) }) // load specified .env
dotenv.config({ path: path.resolve(__dirname, 'configs', '.env') }) // load .env
console.log("ENV", process.env)

//creating koa instance
const app = new Koa();
//creating router instance for handling route
const router = new Router();

// defining the bodyParser middleware to parse the request body
app.use(bodyParser());

//defining error handling middleware call
app.use(errorHandler);

// routes for registering and login user
router.post("/register", registerHandler);
router.post("/login", loginHandler);

//defining protected routes for assignments
router.post(
  "/assignment",
  authenticateToken,
  authenticateUser,
  createAssignmentHandler
);
router.patch(
  "/assignment/:id",
  authenticateToken,
  authenticateUser,
  updateAssignmentHandler
);
router.get("/assignment", authenticateToken, getAssignmentFeedsHandler);
router.delete(
  "/assignment/:id",
  authenticateToken,
  authenticateUser,
  deleteAssignmentHandler
);

//defining routes for submissions
router.patch(
  "/submission",
  authenticateToken,
  authenticateUser,
  createSubmissionHandler
);
router.get(
  "/submission/:assignmentId",
  authenticateToken,
  getSubmissionsHandler
);

//registering routes with app by passing it as middleware
app.use(router.routes());
app.use(router.allowedMethods());

//starting server on port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
