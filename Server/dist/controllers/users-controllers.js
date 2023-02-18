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
exports.getUsersByProject = exports.getCurrentUser = exports.getUsers = exports.login = exports.signup = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
const Http_error_js_1 = __importDefault(require("../models/Http-error.js"));
const Project_js_1 = __importDefault(require("../models/Project.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const getCurrentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let user;
    try {
        user = yield User_js_1.default.findById(userId);
    }
    catch (err) {
        const error = new Http_error_js_1.default("Could not fetch user", 500);
        return next(error);
    }
    res.json({ user: user.toObject({ getters: true }) });
});
exports.getCurrentUser = getCurrentUser;
const getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield User_js_1.default.find({}, "-password");
    }
    catch (err) {
        console.log(err);
        const error = new Http_error_js_1.default("Could not fetch users", 500);
        return next(error);
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
});
exports.getUsers = getUsers;
const getUsersByProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    let projectwithUsers;
    try {
        projectwithUsers = yield Project_js_1.default.findById(projectId).populate("participants");
    }
    catch (err) {
        const error = new Http_error_js_1.default("Could not find Project", 500);
        return next(error);
    }
    res.json({
        users: projectwithUsers.participants.map((user) => user.toObject({ getters: true })),
    });
});
exports.getUsersByProject = getUsersByProject;
const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = new Http_error_js_1.default("Invalid inputs passed", 422);
        console.log(error);
        return next(error);
    }
    const { name, surname, age, email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield User_js_1.default.findOne({ email: email });
    }
    catch (err) {
        const error = new Http_error_js_1.default("Signing up failed", 500);
        return next(error);
    }
    if (existingUser) {
        const error = new Http_error_js_1.default("User exists already", 422);
        return next(error);
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcryptjs_1.default.hash(password, 12);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Could not create a new user", 500));
    }
    const createUser = new User_js_1.default({
        name,
        surname,
        age,
        image: "https://project-organiser.herokuapp.com/",
        email,
        password: hashedPassword,
        projects: [],
        chats: [],
    });
    try {
        yield createUser.save();
    }
    catch (err) {
        const error = new Http_error_js_1.default("Signing up failed", 500);
        return next(error);
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: createUser.id, email: createUser.email }, process.env.JWT_STRING, { expiresIn: "1h" });
    }
    catch (err) {
        const error = new Http_error_js_1.default("Signing up failed", 500);
        return next(error);
    }
    res
        .status(201)
        .json({ userId: createUser.id, email: createUser.email, token: token });
});
exports.signup = signup;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield User_js_1.default.findOne({ email: email });
    }
    catch (err) {
        const error = new Http_error_js_1.default("Logging in failed", 500);
        return next(error);
    }
    if (!existingUser) {
        const error = new Http_error_js_1.default("Invalid credentials", 401);
        return next(error);
    }
    let isValidPassword = false;
    try {
        isValidPassword = yield bcryptjs_1.default.compare(password, existingUser.password);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Could not log you in, please check your credentials", 500));
    }
    if (!isValidPassword) {
        const error = new Http_error_js_1.default("Invalid credentials", 401);
        return next(error);
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_STRING, { expiresIn: "1h" });
    }
    catch (err) {
        const error = new Http_error_js_1.default("Logging in failed", 500);
        return next(error);
    }
    res
        .status(201)
        .json({ userId: existingUser.id, email: existingUser.email, token: token });
});
exports.login = login;
