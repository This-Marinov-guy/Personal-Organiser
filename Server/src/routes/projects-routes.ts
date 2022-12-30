import express from "express";
import {
  deleteProject,
  getProjectById,
  getProjectByUserId,
  patchUpdateProject,
  postAddProject,
} from "../controllers/projects-controllers.js";
import {
  deleteTask,
  getTasksByProject,
  putUpdateSubtasks,
  patchUpdateTask,
  postAddSubtask,
  postAddTask,
} from "../controllers/tasks-controllers.js";
import fileUpload from "../middleware/file-upload.js";
import authRequest from "../middleware/check-auth.js";


const projectRouter = express.Router();
projectRouter.use(authRequest);
//routes with token protection

projectRouter.get("/:projectId", getProjectById);
projectRouter.get("/:projectId", getProjectByUserId);
projectRouter.get("/:projectId", getTasksByProject);

projectRouter.post("/add-project", fileUpload.single('image'), postAddProject);
projectRouter.post("/:projectId/add-task", postAddTask);
projectRouter.post("/:projectId/:tid", postAddSubtask);

projectRouter.patch("/:projectId", patchUpdateProject);
projectRouter.patch("/:projectId/:tid", patchUpdateTask);
projectRouter.patch("/:projectId/:tid", putUpdateSubtasks);

projectRouter.delete("/:projectId", deleteProject);
projectRouter.delete("/:projectId", deleteTask);

export default projectRouter;
