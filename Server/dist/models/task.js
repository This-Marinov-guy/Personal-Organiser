import mongoose from "mongoose";
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    project: { type: mongoose.Types.ObjectId, required: true, ref: "Project" },
    title: { type: String, required: true },
    subtasks: [{ type: String }],
});
export default mongoose.model("Task", taskSchema);
//# sourceMappingURL=Task.js.map