import { validationResult } from "express-validator";
import mongoose from "mongoose";
import HttpError from "../models/Http-error.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
const getChatsByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    if (!userId) {
        return next(new HttpError("User not found", 404));
    }
    let projectsOfUser;
    try {
        projectsOfUser = await User.findById(userId);
        console.log('chats', projectsOfUser);
    }
    catch (err) { }
    res.json({
        chats: projectsOfUser.projects.map((p) => {
            p.chat.toObject({ getters: true });
        }),
    });
};
const getChatMessages = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs, please check your data", 422));
    }
    const projectId = req.params.projectId;
    let chat;
    try {
        chat = await Project.findById(projectId).populate("chat");
    }
    catch (err) {
        return next(new HttpError("Fetching failed", 500));
    }
    if (!chat) {
        return next(new HttpError("Chat does not exist", 500));
    }
    res.json({ chat: chat.toObject({ getters: true }) });
};
const patchAddChatMessage = async (req, res, next) => {
    //remove this if you dont have validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs", 422));
    }
    const projectId = req.params.projectId;
    const { senderId, text } = req.body;
    let user;
    let project;
    let chat;
    try {
        user = await User.findById(senderId);
        project = await Project.findById(projectId);
        chat = await project.populate("chat");
    }
    catch (err) {
        return next(new HttpError("Something went wrong, please try again", 500));
    }
    if (!user || !project || !chat) {
        return next(new HttpError("Something went wrong, please try again later", 500));
    }
    let message = {
        sender: user.name + " " + user.surname,
        text,
    };
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        chat.push(message);
        await project.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError("Sending message failed, please try again", 500));
    }
    res.status(200).json({ message: "Message Sent" });
};
export { getChatsByUserId, getChatMessages, patchAddChatMessage };
//# sourceMappingURL=chats-controllers.js.map