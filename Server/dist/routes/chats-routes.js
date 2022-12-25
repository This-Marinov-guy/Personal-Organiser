import express from "express";
import { deleteChat, getChatMessages, patchAddChatMessage, postAddChat, } from "../controllers/chats-controllers.js";
import authRequest from "../middleware/check-auth.js";
const chatRouter = express.Router();
chatRouter.use(authRequest);
//routes with token protection
chatRouter.get("/chats/:uid", getChatMessages);
//check the route
chatRouter.post("/:pid", postAddChat);
chatRouter.patch("/chats/:uid/:cid", patchAddChatMessage);
chatRouter.delete("/chats/:uid/:cid", deleteChat);
export default chatRouter;
//# sourceMappingURL=chats-routes.js.map