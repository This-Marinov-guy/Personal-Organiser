"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http_error_js_1 = __importDefault(require("../models/Http-error.js"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRequest = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Authentication failed due to lack of token");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_STRING);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Authentication failed", 401));
    }
};
exports.default = authRequest;
