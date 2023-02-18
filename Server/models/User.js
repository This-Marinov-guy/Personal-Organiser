import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  image: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  projects: [{ type: mongoose.Types.ObjectId, required: true, ref: "Project" }],
  chats: [{ type: mongoose.Types.ObjectId, ref: "User" }],
});

userSchema.plugin(uniqueValidator);

export default mongoose.model("User", userSchema);
