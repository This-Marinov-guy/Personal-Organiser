import express from "express";
// import {
//   deleteChat,
//   getChatMessages,
//   patchAddChatMessage,
//   postAddChat,
// } from "../controllers/chats-controllers.js";
import authRequest from "../middleware/check-auth.js";

const chatRouter = express.Router();

// chatRouter.use(authRequest);
// //routes with token protection

// chatRouter.get("/chats/:userId", getChatMessages);

// //check the route
// chatRouter.post("/:projectId", postAddChat);

// chatRouter.patch("/chats/:userId/:chatId", patchAddChatMessage);

// chatRouter.delete("/chats/:userId/:chatId", deleteChat);

export default chatRouter;
