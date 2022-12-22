import express from "express";
import { deleteChat, getChatMessages, patchAddChatMessage, postAddChat, } from "../controllers/chats-controllers.js";
const chatRouter = express.Router();
chatRouter.get("/chats/:uid", getChatMessages);
//check the route
chatRouter.post("/:pid", postAddChat);
chatRouter.patch("/chats/:uid/:cid", patchAddChatMessage);
chatRouter.delete("/chats/:uid/:cid", deleteChat);
export default chatRouter;
//# sourceMappingURL=chats-routes.js.map