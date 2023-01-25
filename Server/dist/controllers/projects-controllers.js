import { validationResult } from "express-validator";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import mongoose from "mongoose";
import HttpError from "../models/Http-error.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
const getProjectById = async (req, res, next) => {
    const projectId = req.params.pid;
    let project;
    try {
        project = await Project.findById(projectId);
    }
    catch (err) {
        return next(new HttpError("Something went wrong, could not find project", 500));
    }
    if (!project) {
        return next(new HttpError("No such project", 404));
    }
    res.json({ project: project.toObject({ getters: true }) });
};
const getProjectByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId);
    let userWithProjects;
    try {
        userWithProjects = await User.findById(userId).populate("projects");
    }
    catch (err) {
        return next(new HttpError("Fetching projects failed, please try again", 500));
    }
    if (!userWithProjects || userWithProjects.projects.length === 0) {
        return next(new HttpError("User has no projects", 404));
    }
    res.json({
        projects: userWithProjects.projects.map((p) => p.toObject({ getters: true })),
    });
};
const getTasksByProject = async (req, res, next) => {
    const projectId = req.params.projectId;
    console.log(projectId);
    let projectWithTasks;
    try {
        projectWithTasks = await Project.findById(projectId).populate("tasks");
    }
    catch (err) {
        return next(new HttpError("Fetching tasks failed", 500));
    }
    if (!projectWithTasks) {
        return next(new HttpError("Error with finding project", 404));
    }
    res.json({
        tasks: projectWithTasks.tasks.map((t) => t.toObject({ getters: true })),
    });
};
const postAddProject = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs, please check your data", 422));
    }
    const { creator, title, description } = req.body;
    const createdProject = new Project({
        creator,
        title,
        description,
        image: "http://localhost:5000/" + req.file.path,
        tasks: [],
        workers: [],
    });
    let user;
    try {
        user = await User.findById(creator);
    }
    catch (err) {
        return next(new HttpError("Creating project failed, please try again", 500));
    }
    if (!user) {
        return next(new HttpError("Could not find user for provided id", 404));
    }
    try {
        //adding project to user with session
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdProject.save({ session: sess });
        user.projects.push(createdProject);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError("Creating project failed, please try again", 500));
    }
    res.status(201).json({ projectId: createdProject._id });
};
const postAddWorkers = async (req, res, next) => {
    const { projectId, workers } = req.body;
    if (!projectId) {
        return next(new HttpError("Please create a project and then assign it workers", 500));
    }
    let projectOfTask;
    try {
        projectOfTask = await Project.findById(projectId);
    }
    catch (err) {
        return next(new HttpError("Adding workers failed, please try again", 500));
    }
    if (!projectOfTask) {
        return next(new HttpError("Could not find a project with provided id", 404));
    }
    let listOfWorkers;
    for (let i = 0; i < workers.length; i++) {
        let workerId;
        try {
            workerId = await (await User.findOne({
                name: workers[i].split(" ")[0],
                surname: workers[i].split(" ")[1],
            }))._id;
            listOfWorkers.push(workerId);
        }
        catch (err) {
            return next(new HttpError("Could not find one of the users", 500));
        }
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        projectOfTask.workers.push(listOfWorkers);
        await projectOfTask.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError("Adding workers failed, please try again", 500));
    }
    res.status(201).json({ workers: workers });
};
const postAddTask = async (req, res, next) => {
    let { creator, projectId, title, subtasks } = req.body;
    if (!title) {
        title = "Nameless";
    }
    if (!projectId) {
        return next(new HttpError("Please create a project and then assign it tasks", 500));
    }
    const createdTask = {
        id: uuidv4(),
        creator,
        title,
        subtasks,
    };
    let projectOfTask;
    try {
        projectOfTask = await Project.findById(projectId);
    }
    catch (err) {
        return next(new HttpError("Creating task failed, please try again", 500));
    }
    if (!projectOfTask) {
        return next(new HttpError("Could not find a project with provided id", 404));
    }
    console.log(projectOfTask);
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        console.log("tasks", projectOfTask.tasks);
        projectOfTask.tasks.push(createdTask);
        await projectOfTask.save();
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError("Creating task failed, please try again", 500));
    }
    res.status(201).json({ task: createdTask });
};
const patchUpdateProject = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError("Invalid inputs passed, please change your data", 422));
    }
    const { pid, title, description } = req.body;
    let project;
    try {
        project = await Project.findById(pid);
    }
    catch (err) {
        return next(new HttpError("Something went wrong, please try again", 500));
    }
    project.title = title;
    project.description = description;
    try {
        await project.save();
    }
    catch (err) {
        return next(new HttpError("Something went wrong, please try again", 500));
    }
    res.status(200).json({ project: project.toObject({ getters: true }) });
};
// const patchUpdateTask = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   //remove this if you dont have validation
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return next(new HttpError("Invalid inputs", 422));
//   }
//   const { tid, title, subtasks } = req.body;
//   let task: any;
//   try {
//     task = await Task.findById(tid);
//   } catch (err) {
//     return next(new HttpError("Something went wrong, please try again", 500));
//   }
//   task.title = title;
//   task.subtasks = subtasks;
//   try {
//     await task.save();
//   } catch (err) {
//     return next(new HttpError("Something went wrong, please try again", 500));
//   }
//   res.status(200).json({ task: task.toObject({ getters: true }) });
// };
// const putUpdateSubtasks = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const { taskId, subtasks } = req.body;
//   let task: any;
//   try {
//     task = await Task.findById(taskId);
//   } catch (err) {
//     return next(
//       new HttpError("Creating subtask failed, please try again", 500)
//     );
//   }
//   task.subtasks = subtasks;
//   try {
//     await task.save();
//   } catch (err) {
//     return next(new HttpError("Something went wrong", 500));
//   }
//   res.status(200).json({ subtasks: subtasks.toObject({ getters: true }) });
// };
const deleteProject = async (req, res, next) => {
    const projectId = req.params.pid;
    let project;
    try {
        project = await Project.findById(projectId).populate("creator");
    }
    catch (err) {
        return next(new HttpError("Something went wrong", 500));
    }
    if (!project) {
        return next(new HttpError("Could not find a project with such id", 404));
    }
    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await project.remove({ session: sess });
        fs.unlinkSync("./public/uploads/" + project.image);
        project.creator.projects.pull(project);
        await project.creator.save({ session: sess });
        await sess.commitTransaction();
    }
    catch (err) {
        return next(new HttpError("Something went wrong, please try again", 500));
    }
    res.status(200).json({ message: "Project deleted" });
};
// const deleteTask = async (
//   req: express.Request,
//   res: express.Response,
//   next: express.NextFunction
// ) => {
//   const taskid = req.params.tid;
//   let task: any;
//   try {
//     task = await Task.findById(taskid).populate("project");
//   } catch (err) {
//     return next(new HttpError("Something went wrong", 500));
//   }
//   if (!task) {
//     return next(new HttpError("Could not find a task", 404));
//   }
//   try {
//     const sess = await mongoose.startSession();
//     sess.startTransaction();
//     await task.remove({ session: sess });
//     task.project.tasks.pull(task);
//     await task.project.save({ session: sess });
//     await sess.commitTransaction();
//   } catch (err) {
//     return next(new HttpError("Something went wrong, please try again", 500));
//   }
//   res.status(200).json({ message: "Task deleted" });
// };
export { getProjectById, getProjectByUserId, getTasksByProject, postAddProject, postAddWorkers, postAddTask, patchUpdateProject, 
// putUpdateSubtasks,
// patchUpdateTask,
deleteProject,
// deleteTask
 };
//# sourceMappingURL=projects-controllers.js.map