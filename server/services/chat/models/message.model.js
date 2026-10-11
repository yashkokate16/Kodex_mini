import mongoose from "mongoose";


let fileSchema = new mongoose.Schema({
    name:String,
    content:String,
},{
    _id:false
})

let artifactSchema = new mongoose.Schema({
    id:Number,
    type:String,
    files:[fileSchema]
},{
    _id:false
})

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
    },
    artifacts: [artifactSchema]
},{
    timestamps: true
})

let Message = mongoose.model("Message", messageSchema);

export default Message;