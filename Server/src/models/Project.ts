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
      subtasks: [
        {
          id: { type: String, required: true },
          subtask: { type: String, required: true },
        },
      ],
    },
  ],
  workers: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

export default mongoose.model("Project", projectSchema);
