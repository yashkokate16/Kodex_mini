import mongoose from "mongoose";


let userScehema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
    },
    firebaseUid: {
        type: String,
        unique: true,
    },
    avatar:{
        type: String,
    }

},{
    timestamps: true
})

let User = mongoose.model("User", userScehema);

export default User;