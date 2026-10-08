import mongoose from "mongoose";

let conversationSchema = new mongoose.Schema({
    title:{
        type: String,
        default: "New Chat"
    },
    userId:{
        type: String,
    }
    
},{
    timestamps: true
})

let Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;