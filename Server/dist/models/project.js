import mongoose from "mongoose";
const Schema = mongoose.Schema;
const projectSchema = new Schema({
    creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    tasks: [
        {
            creator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
            title: { type: String, required: true },
            content: { type: String, required: true },
            level: { type: String, required: true },
            status: { type: String, required: true },
        },
    ],
    status: { type: String, required: true },
    participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});
export default mongoose.model("Project", projectSchema);
//# sourceMappingURL=Project.js.map