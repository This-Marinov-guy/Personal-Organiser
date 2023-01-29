import express from "express";
import { check } from "express-validator";
import {
  signup,
  login,
  getUsers,
  getCurrentUser,
  getUsersByProject,
} from "../controllers/users-controllers.js";
import fileUpload from "../middleware/file-upload.js";

const userRouter = express.Router();

userRouter.get("/:userId", getCurrentUser);
userRouter.get("/users", getUsers);
userRouter.get("/project-users/:projectId", getUsersByProject);
// userRouter.get("/:userId", getTasksByUser);

userRouter.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").notEmpty(),
    check("surname").notEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 8 }),
  ],
  signup
);

userRouter.post("/login", login);

export default userRouter;
