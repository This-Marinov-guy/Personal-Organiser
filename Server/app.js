import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import HttpError from "./models/Http-error.js";
import userRouter from "./routes/users-routes.js";
import projectRouter from "./routes/projects-routes.js";
import chatRouter from "./routes/chats-routes.js";
import taskRouter from "./routes/task-routes.js";

const app = express();

//external packages setup

app.use(express.json);
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use("/uploads/images", express.static(path.join("uploads", "images")));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

//   next();
// });

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       callback(null, origin);
//     },
//     credentials: false,
//   })
// );


//routes
app.use("/api/user", userRouter);
app.use("/api/projects", projectRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/chats", chatRouter);

//no page found
app.use((req, res, next) => {
  const error = new HttpError("Page not found", 404);
  return next(error);
});

// error handling
app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

//db connection
mongoose
  .connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@test4.twugcuc.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 80);
    console.log(`Runnig on port ${process.env.PORT || 80}`);
  })
  .catch((err) => console.log("Failed to Connect ", err));
