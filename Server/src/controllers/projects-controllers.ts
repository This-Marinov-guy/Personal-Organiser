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
  const projectId = req.params.projectId;

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
  const userId = req.params.userId;

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
    status: "active",
    title,
    description,
    image: "http://localhost:5000/" + req.file.path,
    tasks: [],
    participants: [],
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

const postAddParticipants = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const { projectId, participants } = req.body;

  if (!projectId) {
    return next(
      new HttpError(
        "Please create a project and then assign it participants",
        500
      )
    );
  }

  let projectOfTask: any;
  try {
    projectOfTask = await Project.findById(projectId);
  } catch (err) {
    return next(
      new HttpError("Adding participants failed, please try again", 500)
    );
  }

  if (!projectOfTask) {
    return next(
      new HttpError("Could not find a project with provided id", 404)
    );
  }

  let listOfparticipants = [];
  participants.forEach(async (user) => {
    console.log("user", user);
    let participant: any;
    try {
      participant = await User.findById(user.id);
      listOfparticipants.push(participant);
    } catch (err) {
      return next(new HttpError("Could not find one of the users", 500));
    }
  });

  //addding participants does not work the way below
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    projectOfTask.participants.push(...listOfparticipants);
    await projectOfTask.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(
      new HttpError("Adding participants failed, please try again", 500)
    );
  }
  res.status(201).json({ participants: participants });
};

const patchAbortProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const userId = req.body.userId;
  const projectId = req.params.projectId;

  let currentUser: any;
  let project: any;
  try {
    project = await Project.findById(projectId);
    currentUser = await User.findById(userId);
  } catch (err) {
    return next(new HttpError("Something went wrong", 500));
  }

  if (!project) {
    return next(new HttpError("Could not find a project with such id", 404));
  }

  if (!currentUser) {
    return next(new HttpError("Could not find you in the database", 404));
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    currentUser.projects.pull(project);
    project.partcipants.pull(currentUser);
    await currentUser.save();
    await project.save();
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Aborting failed, please try again later", 500));
  }

  res.status(200).json({ message: "Project aborted" });
};

const deleteProject = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const projectId = req.params.projectId;
  console.log(projectId);

  let project: any;
  try {
    project = await Project.findByIdAndDelete(projectId);
  } catch (err) {
    return next(new HttpError("Something went wrong", 500));
  }

  if (!project) {
    return next(new HttpError("Could not find a project with such id", 404));
  }

  fs.unlink(project.image, (err) => {
    console.log(err);
  });

  res.status(200).json({ message: "Project deleted" });
};

export {
  getProjectById,
  getProjectByUserId,
  postAddProject,
  postAddParticipants,
  patchAbortProject,
  deleteProject,
};
