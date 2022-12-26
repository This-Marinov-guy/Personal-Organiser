import HttpError from "../models/Http-error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const authRequest = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            throw new Error("Authentication failed");
        }
        const decodedToken = jwt.verify(token, process.env.JWT_STRING);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        return next(new HttpError("Authentication failed", 401));
    }
};
export default authRequest;
//# sourceMappingURL=check-auth.js.map