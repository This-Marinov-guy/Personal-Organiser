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
exports.patchUpdateTask = exports.patchCompleteTask = exports.patchAbortTask = exports.postAddDirectTask = exports.postAddFirstTask = exports.postFetchCurrentTask = exports.getTasksByProject = void 0;
const express_validator_1 = require("express-validator");
const mongoose_1 = __importDefault(require("mongoose"));
const Http_error_js_1 = __importDefault(require("../models/Http-error.js"));
const Project_js_1 = __importDefault(require("../models/Project.js"));
const getTasksByProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    let projectWithTasks;
    try {
        projectWithTasks = yield Project_js_1.default.findById(projectId).populate("tasks");
    }
    catch (err) {
        return next(new Http_error_js_1.default("Fetching tasks failed", 500));
    }
    if (!projectWithTasks) {
        return next(new Http_error_js_1.default("Error with finding project", 404));
    }
    res.json({
        tasks: projectWithTasks.tasks.map((t) => t.toObject({ getters: true })),
        projectCreator: projectWithTasks.creator,
    });
});
exports.getTasksByProject = getTasksByProject;
const postFetchCurrentTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.body.taskId;
    const projectId = req.params.projectId;
    let project;
    let targetTask;
    try {
        project = yield Project_js_1.default.findById(projectId);
        targetTask = yield project.tasks.find((task) => task.id === taskId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    res.json({
        targetTask: targetTask.toObject({ getters: true }),
    });
});
exports.postFetchCurrentTask = postFetchCurrentTask;
const postAddFirstTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { creator, projectId, title, content, level } = req.body;
    if (!title) {
        title = "Nameless";
    }
    if (!projectId) {
        return next(new Http_error_js_1.default("Please create a project and then assign it tasks", 500));
    }
    const createdTask = {
        creator,
        status: "active",
        title,
        content,
        level,
    };
    let projectOfTask;
    try {
        projectOfTask = yield Project_js_1.default.findById(projectId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Creating task failed, please try again", 500));
    }
    if (!projectOfTask) {
        return next(new Http_error_js_1.default("Could not find a project with provided id", 404));
    }
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        projectOfTask.tasks.push(createdTask);
        yield projectOfTask.save();
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Creating task failed, please try again", 500));
    }
    res.status(201).json({ task: createdTask });
});
exports.postAddFirstTask = postAddFirstTask;
const postAddDirectTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let { creator, title, content, level } = req.body;
    const projectId = req.params.projectId;
    if (!title) {
        title = "Nameless";
    }
    if (!projectId) {
        return next(new Http_error_js_1.default("Please create a project and then assign it tasks", 500));
    }
    const createdTask = {
        creator,
        status: "active",
        title,
        content,
        level,
    };
    let projectOfTask;
    try {
        projectOfTask = yield Project_js_1.default.findById(projectId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Creating task failed, please try again", 500));
    }
    if (!projectOfTask) {
        return next(new Http_error_js_1.default("Could not find a project with provided id", 404));
    }
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        projectOfTask.tasks.push(createdTask);
        yield projectOfTask.save();
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Creating task failed, please try again later", 500));
    }
    res.status(201).json({ task: createdTask });
});
exports.postAddDirectTask = postAddDirectTask;
const patchUpdateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //remove this if you dont have validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new Http_error_js_1.default("Invalid inputs", 422));
    }
    const { taskId, title, content, level } = req.body;
    const projectId = req.params.projectId;
    let project;
    let targetTask;
    try {
        project = yield Project_js_1.default.findById(projectId);
        targetTask = yield project.tasks.find((task) => task.id === taskId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    targetTask.title = title;
    targetTask.content = content;
    targetTask.level = level;
    try {
        yield project.save();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    res.status(200).json({ targetTask: targetTask.toObject({ getters: true }) });
});
exports.patchUpdateTask = patchUpdateTask;
const patchAbortTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //remove this if you dont have validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new Http_error_js_1.default("Invalid inputs", 422));
    }
    const { taskId } = req.body;
    const projectId = req.params.projectId;
    let project;
    let targetTask;
    try {
        project = yield Project_js_1.default.findById(projectId);
        targetTask = yield project.tasks.find((task) => task.id === taskId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    targetTask.level = "-1";
    targetTask.status = "aborted";
    try {
        yield project.save();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    res.status(200).json({ targetTask: targetTask.toObject({ getters: true }) });
});
exports.patchAbortTask = patchAbortTask;
const patchCompleteTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //remove this if you dont have validation
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new Http_error_js_1.default("Invalid inputs", 422));
    }
    const { taskId } = req.body;
    const projectId = req.params.projectId;
    let project;
    let targetTask;
    try {
        project = yield Project_js_1.default.findById(projectId);
        targetTask = yield project.tasks.find((task) => task.id === taskId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    targetTask.level = "0";
    targetTask.status = "completed";
    try {
        yield project.save();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, please try again", 500));
    }
    res.status(200).json({ targetTask: targetTask.toObject({ getters: true }) });
});
exports.patchCompleteTask = patchCompleteTask;
