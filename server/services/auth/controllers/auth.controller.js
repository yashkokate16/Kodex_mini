import { getAuth } from "firebase-admin/auth";
import { app } from "../config/firebase.js";
import User from "../models/user.model.js";
import crypto from "crypto";
import redis from "../../../shared/redis/redis.js";



export let login = async (req, res) => {
    try{
        let {token} = req.body;
        console.log("token", token);
        let decoded = await getAuth(app).verifyIdToken(token);
        console.log(decoded); 

        let user = await User.findOne({firebaseUid: decoded.uid});

        if(!user){
            user = await User.create({
                firebaseUid: decoded.uid,
                email: decoded.email,
                name: decoded.name,
                avatar: decoded.picture
            });
        }

        let sessionId = crypto.randomUUID()

        await redis.set(`session-${sessionId}`, JSON.stringify({
            userId: user._id, 
            name: user.name, 
            email: user.email, 
            avatar: user.avatar}), "EX", 60 * 60 * 24 * 7); // 7 days


        res.cookie("session" , sessionId, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
        });

        return res.status(200).json({
            message: "Login successful",
             user
            });

    } catch(error){
        console.log("error", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

export let logout = async (req, res) => {
    try{
        let sessionId = req.cookies.session;
        await redis.del(`session-${sessionId}`);
        res.clearCookie("session");

        return res.status(200).json({
            message: "Logout successful"
        });
        
    } catch(error){
        console.log("error", error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}