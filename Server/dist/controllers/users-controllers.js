import { validationResult } from "express-validator";
import HttpError from "../models/Http-error.js";
import User from "../models/User.js";
const getUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({}, "-password");
    }
    catch (err) {
        const error = new HttpError("Could not fetch users", 500);
        return next(error);
    }
    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};
const signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError("Invalid inputs passed", 422);
        console.log(error);
        return next(error);
    }
    const { name, surname, age, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        const error = new HttpError("Signing up failed", 500);
        return next(error);
    }
    if (existingUser) {
        const error = new HttpError("User exists already", 422);
        return next(error);
    }
    const createUser = new User({
        name,
        surname,
        age,
        image: req.file.path,
        email,
        password,
        projects: [],
        chats: [],
    });
    try {
        await createUser.save();
    }
    catch (err) {
        const error = new HttpError("Signing up failed", 500);
        return next(error);
    }
    res.status(201).json({ user: createUser.toObject({ getters: true }) });
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        const error = new HttpError("Logging in failed", 500);
        return next(error);
    }
    if (!existingUser || existingUser.password != password) {
        const error = new HttpError("Invalid credentials", 401);
        return next(error);
    }
    res.json({ message: "Logged in" });
};
export { signup, login, getUsers };
//# sourceMappingURL=users-controllers.js.map