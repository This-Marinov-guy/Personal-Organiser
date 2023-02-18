"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projects_controllers_js_1 = require("../controllers/projects-controllers.js");
const file_upload_js_1 = __importDefault(require("../middleware/file-upload.js"));
const check_auth_js_1 = __importDefault(require("../middleware/check-auth.js"));
const projectRouter = express_1.default.Router();
projectRouter.get("/:projectId", projects_controllers_js_1.getProjectById);
projectRouter.get("/my-projects/:userId", projects_controllers_js_1.getProjectByUserId);
projectRouter.use(check_auth_js_1.default);
//routes with token protection
projectRouter.post("/add-project", file_upload_js_1.default.single("image"), projects_controllers_js_1.postAddProject);
projectRouter.post("/add-participants", projects_controllers_js_1.postAddParticipants);
projectRouter.patch("/abort-project/:projectId", projects_controllers_js_1.patchAbortProject);
projectRouter.delete("/delete-project/:projectId", projects_controllers_js_1.deleteProject);
exports.default = projectRouter;
