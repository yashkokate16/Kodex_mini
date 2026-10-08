import Redis from "ioredis";


let redis = new Redis({
    url: process.env.REDIS_URL
})

redis.on("connect", () => {
    console.log("Connected to Redis");
})

redis.on("error", (err) => {
    console.log("Error connecting to Redis", err);
})




export default redis;

