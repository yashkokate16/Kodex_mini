export let getCurrentUser = async (req, res) => {
    try{
        let user = req.user;
        return res.status(200).json({
            message: "User fetched successfully",
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

