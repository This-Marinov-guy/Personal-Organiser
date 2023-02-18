"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config;
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const Http_error_js_1 = __importDefault(require("./models/Http-error.js"));
const users_routes_js_1 = __importDefault(require("./routes/users-routes.js"));
const projects_routes_js_1 = __importDefault(require("./routes/projects-routes.js"));
const chats_routes_js_1 = __importDefault(require("./routes/chats-routes.js"));
const task_routes_js_1 = __importDefault(require("./routes/task-routes.js"));
//start with npm start
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
//external packages setup
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, 'uploads', 'images')));
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       callback(null, origin);
//     },
//     credentials: false,
//   })
// );
//routes
app.use("/api/user", users_routes_js_1.default);
app.use("/api/projects", projects_routes_js_1.default);
app.use("/api/tasks", task_routes_js_1.default);
app.use("/api/chats", chats_routes_js_1.default);
//no page found
app.use((req, res, next) => {
    const error = new Http_error_js_1.default("Page not found", 404);
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
mongoose_1.default
    .connect(process.env.DB_CONNECTION)
    .then(() => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || 80);
    console.log(`Runnig on port ${process.env.PORT || 80}`);
})
    .catch((err) => console.log("Failed to Connect ", err));
