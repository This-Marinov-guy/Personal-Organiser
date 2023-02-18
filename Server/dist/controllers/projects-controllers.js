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
exports.deleteProject = exports.patchAbortProject = exports.postAddParticipants = exports.postAddProject = exports.getProjectByUserId = exports.getProjectById = void 0;
const express_validator_1 = require("express-validator");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = __importDefault(require("mongoose"));
const Http_error_js_1 = __importDefault(require("../models/Http-error.js"));
const Project_js_1 = __importDefault(require("../models/Project.js"));
const User_js_1 = __importDefault(require("../models/User.js"));
const getProjectById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    let project;
    try {
        project = yield Project_js_1.default.findById(projectId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong, could not find project", 500));
    }
    if (!project) {
        return next(new Http_error_js_1.default("No such project", 404));
    }
    res.json({ project: project.toObject({ getters: true }) });
});
exports.getProjectById = getProjectById;
const getProjectByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let userWithProjects;
    try {
        userWithProjects = yield User_js_1.default.findById(userId).populate("projects");
    }
    catch (err) {
        return next(new Http_error_js_1.default("Fetching projects failed, please try again", 500));
    }
    if (!userWithProjects) {
        return next(new Http_error_js_1.default("No such user", 404));
    }
    res.json({
        projects: userWithProjects.projects.map((p) => p.toObject({ getters: true })),
    });
});
exports.getProjectByUserId = getProjectByUserId;
const postAddProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new Http_error_js_1.default("Invalid inputs, please check your data", 422));
    }
    const { creator, title, description } = req.body;
    let user;
    try {
        user = yield User_js_1.default.findById(creator);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Creating project failed, please try again", 500));
    }
    const createdProject = new Project_js_1.default({
        creator: user,
        status: "active",
        title,
        description,
        image: req.file.path,
        tasks: [],
        participants: [user],
        chat: [],
    });
    if (!user) {
        return next(new Http_error_js_1.default("Could not find user for provided id", 404));
    }
    try {
        //adding project to user with session
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        yield createdProject.save({ session: sess });
        user.projects.push(createdProject);
        yield user.save({ session: sess });
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Creating project failed, please try again", 500));
    }
    res.status(201).json({ projectId: createdProject._id });
});
exports.postAddProject = postAddProject;
const postAddParticipants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, participants } = req.body;
    if (!projectId) {
        return next(new Http_error_js_1.default("Please create a project and then assign it participants", 500));
    }
    let project;
    try {
        project = yield Project_js_1.default.findById(projectId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Adding participants failed, please try again", 500));
    }
    if (!project) {
        return next(new Http_error_js_1.default("Could not find a project with provided id", 404));
    }
    let listOfparticipants = [project.creator];
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        for (let i = 0; i < participants.length; i++) {
            let participant;
            participant = yield User_js_1.default.findById(participants[i].id);
            participant.projects.push(project);
            participant.projects = participant.projects.filter((value, index) => {
                const _value = JSON.stringify(value);
                return (index ===
                    participant.projects.findIndex((obj) => {
                        return JSON.stringify(obj) === _value;
                    }));
            });
            yield participant.save({ session: sess });
            listOfparticipants.push(participant);
        }
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Could not find one of the users", 500));
    }
    //addding participants does not work the way below
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        project.participants.push(...listOfparticipants);
        project.participants = project.participants.filter((value, index) => {
            const _value = JSON.stringify(value);
            return (index ===
                project.participants.findIndex((obj) => {
                    return JSON.stringify(obj) === _value;
                }));
        });
        yield project.save({ session: sess });
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Adding participants failed, please try again", 500));
    }
    res.status(201).json({ participants: participants });
});
exports.postAddParticipants = postAddParticipants;
const patchAbortProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    const projectId = req.params.projectId;
    let currentUser;
    let project;
    try {
        project = yield Project_js_1.default.findById(projectId);
        currentUser = yield User_js_1.default.findById(userId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong", 500));
    }
    if (!project) {
        return next(new Http_error_js_1.default("Could not find a project with such id", 404));
    }
    if (!currentUser) {
        return next(new Http_error_js_1.default("Could not find you in the database", 404));
    }
    try {
        const sess = yield mongoose_1.default.startSession();
        sess.startTransaction();
        currentUser.projects.pull(project);
        project.participants.pull(currentUser);
        yield currentUser.save();
        yield project.save();
        yield sess.commitTransaction();
    }
    catch (err) {
        return next(new Http_error_js_1.default("Aborting failed, please try again later", 500));
    }
    res.status(200).json({ message: "Project aborted" });
});
exports.patchAbortProject = patchAbortProject;
const deleteProject = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const projectId = req.params.projectId;
    let project;
    try {
        project = yield Project_js_1.default.findByIdAndDelete(projectId);
    }
    catch (err) {
        return next(new Http_error_js_1.default("Something went wrong", 500));
    }
    if (!project) {
        return next(new Http_error_js_1.default("Could not find a project with such id", 404));
    }
    fs_1.default.unlink(project.image, (err) => {
        console.log(err);
    });
    res.status(200).json({ message: "Project deleted" });
});
exports.deleteProject = deleteProject;
