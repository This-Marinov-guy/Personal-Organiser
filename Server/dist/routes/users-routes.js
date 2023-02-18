"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const users_controllers_js_1 = require("../controllers/users-controllers.js");
const file_upload_js_1 = __importDefault(require("../middleware/file-upload.js"));
const userRouter = express_1.default.Router();
userRouter.get("/:userId", users_controllers_js_1.getCurrentUser);
userRouter.get("/search/all-users", users_controllers_js_1.getUsers);
userRouter.get("/project-users/:projectId", users_controllers_js_1.getUsersByProject);
userRouter.post("/signup", file_upload_js_1.default.single("image"), [
    (0, express_validator_1.check)("name").notEmpty(),
    (0, express_validator_1.check)("surname").notEmpty(),
    (0, express_validator_1.check)("email").normalizeEmail().isEmail(),
    (0, express_validator_1.check)("password").isLength({ min: 5 }),
], users_controllers_js_1.signup);
userRouter.post("/login", users_controllers_js_1.login);
exports.default = userRouter;
