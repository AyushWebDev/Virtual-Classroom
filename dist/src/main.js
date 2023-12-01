"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const assignment_1 = require("./handler/assignment");
const submission_1 = require("./handler/submission");
const errorHandler_1 = require("./middleware/errorHandler");
const auth_1 = require("./handler/auth");
const auth_2 = require("./middleware/auth");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, 'configs', `.${process.env.NODE_ENV}.env`) }); // load specified .env
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, 'configs', '.env') }); // load .env
console.log("ENV", process.env);
//creating koa instance
const app = new koa_1.default();
//creating router instance for handling route
const router = new koa_router_1.default();
// defining the bodyParser middleware to parse the request body
app.use((0, koa_bodyparser_1.default)());
//defining error handling middleware call
app.use(errorHandler_1.errorHandler);
// routes for registering and login user
router.post("/register", auth_1.registerHandler);
router.post("/login", auth_1.loginHandler);
//defining protected routes for assignments
router.post("/assignment", auth_2.authenticateToken, auth_2.authenticateUser, assignment_1.createAssignmentHandler);
router.patch("/assignment/:id", auth_2.authenticateToken, auth_2.authenticateUser, assignment_1.updateAssignmentHandler);
router.get("/assignment", auth_2.authenticateToken, assignment_1.getAssignmentFeedsHandler);
router.delete("/assignment/:id", auth_2.authenticateToken, auth_2.authenticateUser, assignment_1.deleteAssignmentHandler);
//defining routes for submissions
router.patch("/submission", auth_2.authenticateToken, auth_2.authenticateUser, submission_1.createSubmissionHandler);
router.get("/submission/:assignmentId", auth_2.authenticateToken, submission_1.getSubmissionsHandler);
//registering routes with app by passing it as middleware
app.use(router.routes());
app.use(router.allowedMethods());
//starting server on port
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=main.js.map