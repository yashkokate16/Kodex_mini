import mongoose from "mongoose";

let messageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true
    },
    role:{
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content:{
        type: String,
    }

},{
    timestamps: true
})

let Message = mongoose.model("Message", messageSchema);

export default Message;