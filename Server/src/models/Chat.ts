import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const chatSchema = new Schema({
    participants: [{type: mongoose.Types.ObjectId, required:true, ref: 'User'}],
    messages: [
        {
            sender: {type: mongoose.Types.ObjectId, required:true, ref: 'User'},
            text: {type: String, required:true}
        }
    ]
})

export default mongoose.model("Chat", chatSchema)