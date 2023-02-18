"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchAddChatMessage = exports.getChatMessages = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const Http_error_js_1 = __importDefault(require("../models/Http-error.js"));
const Project_js_1 = __importDefault(require("../models/Project.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const getChatMessages = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new Http_error_js_1.default("Invalid inputs, please check your data", 422));
    }
    const projectId = req.params.projectId;
    let project;
    let participants;
    try {
        project = yield Project_js_1.default.findById(projectId);
        participants = yield project.populate("participants");
    }
    catch (err) {
        return next(new Http_error_js_1.default("Fetching failed", 500));
    }
    if (!project) {
        return next(new Http_error_js_1.default("Project chat does not exist", 500));
    }
    res.json({
        chat: project.chat.toObject({ getters: true }),
        title: project.title,
        participants: participants.participants.map((user) => user.toObject({ getters: true })),
    });
});
exports.getChatMessages = getChatMessages;
const patchAddChatMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //remove this if you dont have validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new Http_error_js_1.default("Invalid inputs", 422));
    }
    const projectId = req.params.projectId;
    const { senderId, text } = req.body;
    let user;
    let project;
    try {
        user = yield User_js_1.default.findById(senderId);
        project = yield Project_js_1.default.findById(projectId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    if (!user || !project) {
        return next(new Http_error_js_1.default("Something went wrong, please try again later", 500));
    }
    let message = {
        sender: user,
        senderName: user.name + " " + user.surname,
        text,
    };
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        project.chat.push(message);
        yield project.save({ session: sess });
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Sending message failed, please try again", 500));
    }
    res.status(200).json({ message: "Message Sent" });
});
exports.patchAddChatMessage = patchAddChatMessage;
