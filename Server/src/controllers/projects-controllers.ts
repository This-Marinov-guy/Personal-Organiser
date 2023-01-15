import express from "express";
import { validationResult } from "express-validator";
import fs from "fs";
import mongoose from "mongoose";
import HttpError from "../models/Http-error.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const getProjectById = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const projectId = req.params.pid;

  let project;
  try {
    project = await Project.findById(projectId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong, could not find project", 500)
    );
  }

  if (!project) {
    return next(new HttpError("No such project", 404));
  }

  res.json({ project: project.toObject({ getters: true }) });
};

const getProjectByUserId = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = req.params.uid;

  let userWithProjects;
  try {
    userWithProjects = await User.findById(userId).populate("projects");
  } catch (err) {
    return next(
      new HttpError("Fetching projects failed, please try again", 500)
    );
  }

  if (!userWithProjects || userWithProjects.projects.length === 0) {
    return next(new HttpError("User has no projects", 404));
  }

  res.json({
    projects: userWithProjects.projects.map((p: any) =>
      p.toObject({ getters: true })
    ),
  });
};

const postAddProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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

  let user: any;
  try {
    user = await User.findById(creator);
  } catch (err) {
    return next(
      new HttpError("Creating project failed, please try again", 500)
    );
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
  } catch (err) {
    return next(
      new HttpError("Creating project failed, please try again", 500)
    );
  }

  res.status(201).json({ projectId: createdProject._id });
  
};

const postAddWorkers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { projectId, workers } = req.body;

  if (!projectId) {
    return next(
      new HttpError("Please create a project and then assign it workers", 500)
    );
  }
 
  let projectOfTask: any;
  try {
    projectOfTask = await Project.findById(projectId);
  } catch (err) {
    return next(new HttpError("Adding workers failed, please try again", 500));
  }

  if (!projectOfTask) {
    return next(
      new HttpError("Could not find a project with provided id", 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    projectOfTask.workers.push(workers);
    await projectOfTask.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Creating task failed, please try again", 500));
  }
  res.status(201).json({ workers: workers });
};

const patchUpdateProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please change your data", 422)
    );
  }

  const { pid, title, description } = req.body;

  let project: any;
  try {
    project = await Project.findById(pid);
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  project.title = title;
  project.description = description;

  try {
    await project.save();
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  res.status(200).json({ project: project.toObject({ getters: true }) });
};

const deleteProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const projectId = req.params.pid;

  let project: any;
  try {
    project = await Project.findById(projectId).populate("creator");
  } catch (err) {
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
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  res.status(200).json({ message: "Project deleted" });
};

// request to add workers

export {
  getProjectById,
  getProjectByUserId,
  postAddProject,
  postAddWorkers,
  patchUpdateProject,
  deleteProject,
};
