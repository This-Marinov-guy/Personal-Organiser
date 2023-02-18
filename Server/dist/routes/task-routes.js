"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controllers_js_1 = require("../controllers/task-controllers.js");
const check_auth_js_1 = __importDefault(require("../middleware/check-auth.js"));
const taskRouter = express_1.default.Router();
taskRouter.get("/:projectId", task_controllers_js_1.getTasksByProject);
taskRouter.use(check_auth_js_1.default);
//routes with token protection
taskRouter.post("/fetch-task/:projectId", task_controllers_js_1.postFetchCurrentTask);
taskRouter.post("/add-task", task_controllers_js_1.postAddFirstTask);
taskRouter.post("/add-task/:projectId", task_controllers_js_1.postAddDirectTask);
taskRouter.patch("/edit-task/:projectId", task_controllers_js_1.patchUpdateTask);
taskRouter.patch("/abort-task/:projectId", task_controllers_js_1.patchAbortTask);
taskRouter.patch("/complete-task/:projectId", task_controllers_js_1.patchCompleteTask);
exports.default = taskRouter;
