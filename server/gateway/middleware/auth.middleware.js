import redis from "../../shared/redis/redis.js";


let middleware = async (req, res, next) => {
    try{

        let sessionId = req.cookies?.session;
        if(!sessionId){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        let session = await redis.get(`session-${sessionId}`)
        if(!session){
            return res.status(401).json({
                message: "Unauthorized"
            });
        }

        req.user = JSON.parse(session);
        next();



    } catch(error) {
        
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }

}


export default middleware;