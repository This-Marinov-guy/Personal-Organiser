import express from "express";
import { deleteProject, getProjectById, getProjectByUserId, patchUpdateProject, postAddProject, } from "../controllers/projects-controllers.js";
import { deleteTask, getTasksByProject, putUpdateSubtasks, patchUpdateTask, postAddSubtask, postAddTask, } from "../controllers/tasks-controllers.js";
import fileUpload from "../middleware/file-upload.js";
const projectRouter = express.Router();
projectRouter.get("/:pid", getProjectById);
projectRouter.get("/:pid", getProjectByUserId);
projectRouter.get("/:pid", getTasksByProject);
projectRouter.post("/add-project", fileUpload.single('image'), postAddProject);
projectRouter.post("/:pid/add-task", postAddTask);
projectRouter.post("/:pid/:tid", postAddSubtask);
projectRouter.patch("/:pid", patchUpdateProject);
projectRouter.patch("/:pid/:tid", patchUpdateTask);
projectRouter.patch("/:pid/:tid", putUpdateSubtasks);
projectRouter.delete("/:pid", deleteProject);
projectRouter.delete("/:pid", deleteTask);
export default projectRouter;
//# sourceMappingURL=projects-routes.js.map