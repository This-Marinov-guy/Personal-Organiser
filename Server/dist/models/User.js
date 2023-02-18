"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    image: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    projects: [{ type: mongoose_1.default.Types.ObjectId, required: true, ref: "Project" }],
    chats: [{ type: mongoose_1.default.Types.ObjectId, ref: "User" }],
});
userSchema.plugin(mongoose_unique_validator_1.default);
exports.default = mongoose_1.default.model("User", userSchema);
