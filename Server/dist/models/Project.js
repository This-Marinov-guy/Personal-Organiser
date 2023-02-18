"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const projectSchema = new Schema({
    creator: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tasks: [
        {
            creator: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" },
            title: { type: String, required: true },
            content: { type: String, required: true },
            level: { type: String, required: true },
            status: { type: String, required: true },
        },
    ],
    status: { type: String, required: true },
    participants: [{ type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" }],
    chat: [
        {
            sender: { type: mongoose_1.default.Types.ObjectId, required: true, ref: "User" },
            senderName: { type: String, required: true },
            text: { type: String, required: true },
        },
    ],
});
exports.default = mongoose_1.default.model("Project", projectSchema);
