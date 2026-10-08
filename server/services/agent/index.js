import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import router from "./routes/agent.route.js";



let app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get("/", (req, res) => {
    res.json({message: "agent service is running"});
})

app.use("/", router)


app.listen(process.env.PORT, () => {
    console.log(`agent service is running on port ${process.env.PORT}`);
    connectDb();
})

