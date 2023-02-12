import express from "express";
import { getChatMessages, patchAddChatMessage, } from "../controllers/chats-controllers.js";
import authRequest from "../middleware/check-auth.js";
const chatRouter = express.Router();
chatRouter.get("/get-messages/:projectId", getChatMessages);
chatRouter.use(authRequest);
// routes with token protection
chatRouter.patch("/add-message/:projectId", patchAddChatMessage);
export default chatRouter;
//# sourceMappingURL=chats-routes.js.map