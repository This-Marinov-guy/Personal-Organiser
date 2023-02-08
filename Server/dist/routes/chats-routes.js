import express from "express";
import { getChatMessages, patchAddChatMessage, } from "../controllers/chats-controllers.js";
const chatRouter = express.Router();
// chatRouter.use(authRequest);
// routes with token protection
chatRouter.get("/get-messages/:projectId", getChatMessages);
chatRouter.patch("/add-message/:projectId", patchAddChatMessage);
export default chatRouter;
//# sourceMappingURL=chats-routes.js.map