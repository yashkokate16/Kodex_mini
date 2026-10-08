import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import cookieParser from "cookie-parser";
// import cors from "cors";
import router from "./routes/chat.routes.js";

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// app.use(cors({
//     origin: process.env.CLIENT_URL,
//     credentials: true
// }))

app.get("/", (req, res) => {
    res.json({message: "Chat service is running"});
})



app.listen(process.env.PORT, () => {
    console.log(`Chat service is running on port ${process.env.PORT}`);
    connectDb();
})

app.use("/", router);
