import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import router from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

app.get("/", (req, res) => {
    res.json({message: "Auth service is running"});
})



app.use("/", router);

app.listen(process.env.PORT, () => {
  console.log(`Auth service is running on port ${process.env.PORT}`);
  connectDb();
})

