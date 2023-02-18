import express from "express";
import {
  getTasksByProject,
  postFetchCurrentTask,
  postAddFirstTask,
  postAddDirectTask,
  patchUpdateTask,
  patchAbortTask,
  patchCompleteTask,
} from "../controllers/task-controllers.js";
import authRequest from "../middleware/check-auth.js";

const taskRouter = express.Router();

taskRouter.get("/:projectId", getTasksByProject);

taskRouter.use(authRequest);
//routes with token protection

taskRouter.post("/fetch-task/:projectId", postFetchCurrentTask);
taskRouter.post("/add-task", postAddFirstTask);
taskRouter.post("/add-task/:projectId", postAddDirectTask);

taskRouter.patch("/edit-task/:projectId", patchUpdateTask);
taskRouter.patch("/abort-task/:projectId", patchAbortTask);
taskRouter.patch("/complete-task/:projectId", patchCompleteTask);

export default taskRouter;
