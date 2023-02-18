"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chats_controllers_js_1 = require("../controllers/chats-controllers.js");
const check_auth_js_1 = __importDefault(require("../middleware/check-auth.js"));
const chatRouter = express_1.default.Router();
chatRouter.get("/get-messages/:projectId", chats_controllers_js_1.getChatMessages);
chatRouter.use(check_auth_js_1.default);
// routes with token protection
chatRouter.patch("/add-message/:projectId", chats_controllers_js_1.patchAddChatMessage);
exports.default = chatRouter;
