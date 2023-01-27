import express from "express";
import {
  getProjectById,
  getProjectByUserId,
  getTasksByProject,
  postFetchCurrentTask,
  postAddProject,
  postAddWorkers,
  postAddFirstTask,
  postAddDirectTask,
  patchAbortProject,
  patchUpdateTask,
  deleteProject,
  deleteTask,
} from "../controllers/projects-controllers.js";
import fileUpload from "../middleware/file-upload.js";
import authRequest from "../middleware/check-auth.js";

const projectRouter = express.Router();
// projectRouter.use(authRequest);
//routes with token protection

projectRouter.get("/:projectId", getProjectById);
projectRouter.get("/my-projects/:userId", getProjectByUserId);
projectRouter.get("/tasks/:projectId", getTasksByProject);

projectRouter.post("/fetch-task/:projectId", postFetchCurrentTask)
projectRouter.post("/add-project", fileUpload.single("image"), postAddProject);
projectRouter.post("/add-task", postAddFirstTask);
projectRouter.post("/add-task/:projectId", postAddDirectTask);
projectRouter.post("/add-workers", postAddWorkers);

projectRouter.patch("/abort-project/:projectId", patchAbortProject);
projectRouter.patch("/edit-task/:projectId", patchUpdateTask);

projectRouter.delete("/delete-project/:projectId", deleteProject);
projectRouter.delete("/delete-task/:projectId", deleteTask);

export default projectRouter;
