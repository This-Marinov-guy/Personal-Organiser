import express from "express";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import HttpError from "../models/Http-error.js";
import Project from "../models/Project.js";
import User from "../models/User.js";

const getChatMessages = async (
  req, res, next
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs, please check your data", 422));
  }

  const projectId = req.params.projectId;

  let project;
  let participants;
  try {
    project = await Project.findById(projectId);
    participants = await project.populate("participants");
  } catch (err) {
    return next(new HttpError("Fetching failed", 500));
  }

  if (!project) {
    return next(new HttpError("Project chat does not exist", 500));
  }

  res.json({
    chat: project.chat.toObject({ getters: true }),
    title: project.title,
    participants: participants.participants.map((user) =>
      user.toObject({ getters: true })
    ),
  });
};

const patchAddChatMessage = async (
  req, res, next
) => {
  //remove this if you dont have validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs", 422));
  }

  const projectId = req.params.projectId;
  const { senderId, text } = req.body;

  let user;
  let project;
  try {
    user = await User.findById(senderId);
    project = await Project.findById(projectId);
  } catch (err) {
    return next(new HttpError("Something went wrong, please try again", 500));
  }

  if (!user || !project) {
    return next(
      new HttpError("Something went wrong, please try again later", 500)
    );
  }

  let message = {
    sender: user,
    senderName: user.name + " " + user.surname,
    text,
  };

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    project.chat.push(message);
    await project.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    return next(new HttpError("Sending message failed, please try again", 500));
  }

  res.status(200).json({ message: "Message Sent" });
};

export { getChatMessages, patchAddChatMessage };
