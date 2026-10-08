import express from "express";
import { agent } from "../controllers/agent.controller.js";


let router = express.Router();



router.post("/chat", agent)



export default router;