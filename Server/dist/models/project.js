import mongoose from "mongoose";
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tasks: [{ type: mongoose.Types.ObjectId, ref: "Task" }],
    workers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});
export default mongoose.model("Project", projectSchema);
//# sourceMappingURL=Project.js.map