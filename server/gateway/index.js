import express from "express";
import dotenv from "dotenv";
dotenv.config();
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getCurrentUser } from "./controllers/user.controller.js";
import middleware from "./middleware/auth.middleware.js";
import { proxyWithHeader } from "./utils/proxyWithHeader.js";
import morgan from "morgan";

let app = express();

let port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(morgan("dev"));
app.use(cookieParser());



app.get("/", (req, res) => {
  res.send("Gateway is running");
});

app.use("/api/auth", proxy(process.env.AUTH_SERVICE_URL));
app.get("/api/me", middleware, getCurrentUser)

app.use("/api/chat",middleware, proxyWithHeader(process.env.CHAT_SERVICE_URL));

app.use("/api/agent", middleware, proxy(process.env.AGENT_SERVICE_URL));

app.listen(port, () => {
  console.log(`Gateway is running on port ${port}`);
})


