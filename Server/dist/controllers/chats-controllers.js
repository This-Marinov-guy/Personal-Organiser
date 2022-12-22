import { validationResult } from "express-validator";
import mongoose from "mongoose";
import Chat from "../models/Chat.js";
import HttpError from "../models/Http-error.js";
import User from "../models/User.js";
const getChatMessages = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs, please check your data", 422));
    }
    const participants = req.body.participants;
    let chat;
    try {
        chat = await Chat.find({ participants: participants });
    }
    catch (err) {
        return next(new HttpError("Fetching failed", 500));
    }
    if (!chat) {
        return next(new HttpError("Chat does not exist", 500));
    }
    res.json({ chat: chat.toObject({ getters: true }) });
};
const postAddChat = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs", 422));
    }
    const { participants, participantsIds } = req.body;
    const createdChat = new Chat({
        participants,
        messages: [],
    });
    try {
        await createdChat.save();
    }
    catch (err) {
        return next(new HttpError("Failed to create the chat", 500));
    }
    for (let i = 0; i <= participants.length; i++) {
        let userWithChat;
        try {
            userWithChat = await User.findById(participantsIds[i]);
        }
        catch (err) {
            return next(new HttpError("Adding chat to users failed", 500));
        }
        if (!userWithChat) {
            return next(new HttpError("Could not find user for provided id", 404));
        }
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            userWithChat.chats.push(createdChat);
            await userWithChat.save({ session: sess });
            await sess.commitTransaction();
        }
        catch (err) {
            return next(new HttpError("Creating Chat failed", 500));
        }
    }
    res.status(201).json({ chat: createdChat });
};
const patchAddChatMessage = async (req, res, next) => {
    //remove this if you dont have validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs", 422));
    }
    const { cid, sender, text } = req.body;
    let chat;
    try {
        chat = await Chat.findById(cid);
    }
    catch (err) {
        return next(new HttpError("Something went wrong, please try again", 500));
    }
    let message = {
        sender,
        text,
    };
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        chat.message.push(message);
        await chat.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError("Sending message failed, please try again", 500));
    }
    res.status(200).json({ message: "Message Sent" });
};
const deleteChat = async (req, res, next) => {
    const chatId = req.params.cid;
    let chat;
    try {
        chat = await Chat.findById(chatId);
    }
    catch (err) {
        return next(new HttpError("Something went wrong", 500));
    }
    if (!chat) {
        return next(new HttpError("Could not find chat", 404));
    }
    for (let i = 0; i <= chat.participants.length; i++) {
        let user;
        try {
            user = await User.findById(chat.participants[i]);
        }
        catch (err) {
            return next(new HttpError("Cannot find such user", 404));
        }
        try {
            const sess = await mongoose.startSession();
            sess.startTransaction();
            await user.chats.pull(chat);
            await user.save({ session: sess });
            await sess.commitTransaction();
        }
        catch (err) {
            return next(new HttpError("Something went wrong, please try again", 500));
        }
    }
    try {
        await chat.remove();
    }
    catch (err) {
        return next(new HttpError("Something went wrong, please try again", 500));
    }
    res.status(200).json({ message: "Chat deleted" });
};
export { getChatMessages, postAddChat, patchAddChatMessage, deleteChat };
//# sourceMappingURL=chats-controllers.js.map