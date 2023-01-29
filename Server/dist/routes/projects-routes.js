import express from "express";
import { getProjectById, getProjectByUserId, postAddProject, postAddWorkers, patchAbortProject, deleteProject, } from "../controllers/projects-controllers.js";
import fileUpload from "../middleware/file-upload.js";
const projectRouter = express.Router();
// projectRouter.use(authRequest);
//routes with token protection
projectRouter.get("/:projectId", getProjectById);
projectRouter.get("/my-projects/:userId", getProjectByUserId);
projectRouter.post("/add-project", fileUpload.single("image"), postAddProject);
projectRouter.post("/add-workers", postAddWorkers);
projectRouter.patch("/abort-project/:projectId", patchAbortProject);
projectRouter.delete("/delete-project/:projectId", deleteProject);
export default projectRouter;
//# sourceMappingURL=projects-routes.js.map