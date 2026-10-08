import { MongoDBSaver } from "@langchain/langgraph-checkpoint-mongodb";
import { MongoClient } from "mongodb";


let client = new MongoClient(process.env.MONGODB_URI)

await client.connect()


// let db = client.db("Kodex")

export let checkpointer = new MongoDBSaver({
    client, 
    dbName : "Kodex",
})