import express from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import HttpError from "../models/Http-error.js";
import Project from "../models/Project.js";

const getTasksByProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const projectId = req.params.projectId;

  let projectWithTasks;
  try {
    projectWithTasks = await Project.findById(projectId).populate("tasks");
  } catch (err) {
    return next(new HttpError("Fetching tasks failed", 500));
  }

  if (!projectWithTasks) {
    return next(new HttpError("Error with finding project", 404));
  }

  res.json({
    tasks: projectWithTasks.tasks.map((t: any) =>
      t.toObject({ getters: true })
    ),
    projectCreator: projectWithTasks.creator,
  });
};

const postFetchCurrentTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const taskId = req.body.taskId;
  const projectId = req.params.projectId;

  let project: any;
  let targetTask: any;

  try {
    project = await Project.findById(projectId);
    targetTask = await project.tasks.find((task) => task.id === taskId);
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  res.json({
    targetTask: targetTask.toObject({ getters: true }),
  });
};

const postAddFirstTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let { creator, projectId, title, content, level } = req.body;

  if (!title) {
    title = "Nameless";
  }

  if (!projectId) {
    return next(
      new HttpError("Please create a project and then assign it tasks", 500)
    );
  }

  const createdTask = {
    creator,
    status: "active",
    title,
    content,
    level,
  };

  let projectOfTask: any;
  try {
    projectOfTask = await Project.findById(projectId);
  } catch (err) {
    return next(new HttpError("Creating task failed, please try again", 500));
  }

  if (!projectOfTask) {
    return next(
      new HttpError("Could not find a project with provided id", 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    projectOfTask.tasks.push(createdTask);
    await projectOfTask.save();
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Creating task failed, please try again", 500));
  }
  res.status(201).json({ task: createdTask });
};

const postAddDirectTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let { creator, title, content, level } = req.body;
  const projectId = req.params.projectId;

  if (!title) {
    title = "Nameless";
  }

  if (!projectId) {
    return next(
      new HttpError("Please create a project and then assign it tasks", 500)
    );
  }

  const createdTask = {
    creator,
    status: "active",
    title,
    content,
    level,
  };

  let projectOfTask: any;
  try {
    projectOfTask = await Project.findById(projectId);
  } catch (err) {
    return next(new HttpError("Creating task failed, please try again", 500));
  }

  if (!projectOfTask) {
    return next(
      new HttpError("Could not find a project with provided id", 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    projectOfTask.tasks.push(createdTask);
    await projectOfTask.save();
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Creating task failed, please try again later", 500)
    );
  }
  res.status(201).json({ task: createdTask });
};

const patchUpdateTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //remove this if you dont have validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { taskId, title, content, level } = req.body;
  const projectId = req.params.projectId;

  let project: any;
  let targetTask: any;

  try {
    project = await Project.findById(projectId);
    targetTask = await project.tasks.find((task) => task.id === taskId);
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  targetTask.title = title;
  targetTask.content = content;
  targetTask.level = level;

  try {
    await project.save();
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  res.status(200).json({ targetTask: targetTask.toObject({ getters: true }) });
};

const patchAbortTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //remove this if you dont have validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { taskId } = req.body;
  const projectId = req.params.projectId;

  let project: any;
  let targetTask: any;

  try {
    project = await Project.findById(projectId);
    targetTask = await project.tasks.find((task) => task.id === taskId);
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  targetTask.level = "-1";
  targetTask.status = "aborted";

  try {
    await project.save();
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  res.status(200).json({ targetTask: targetTask.toObject({ getters: true }) });
};

const patchCompleteTask = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  //remove this if you dont have validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const { taskId } = req.body;
  const projectId = req.params.projectId;

  let project: any;
  let targetTask: any;

  try {
    project = await Project.findById(projectId);
    targetTask = await project.tasks.find((task) => task.id === taskId);
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  targetTask.level = "0";
  targetTask.status = "completed";

  try {
    await project.save();
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  res.status(200).json({ targetTask: targetTask.toObject({ getters: true }) });
};

export {
  getTasksByProject,
  postFetchCurrentTask,
  postAddFirstTask,
  postAddDirectTask,
  patchAbortTask,
  patchCompleteTask,
  patchUpdateTask,
};
