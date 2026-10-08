import { ChatGroq } from "@langchain/groq"
import { ChatGoogleGenerativeAI } from "@langchain/google-genai"
import dotenv from "dotenv";
dotenv.config();


const groq = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "openai/gpt-oss-120b",
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
    // other params...
})



const gemini = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0,
    maxRetries: 2,
    // other params...
})

export let getModel = async (agent) => {
    if(agent === "chat") {
        return groq;
    }
    if(agent === "search") {
        return groq;
    }
    if(agent === "coding") {
        return gemini;
    }
    else{
        return groq;
    }
}