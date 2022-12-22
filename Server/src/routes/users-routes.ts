import express from "express";
import { check } from "express-validator";
import { getTasksByUser } from "../controllers/tasks-controllers.js";
import { signup, login, getUsers } from "../controllers/users-controllers.js";
import fileUpload from "../middleware/file-upload.js";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.get("/:uid", getTasksByUser);

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
