import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export let createConversation = async (req, res) => {
    try{
        let userId = req.headers["x-user-id"];
        console.log("userId", userId);

        let conversation = await Conversation.create({
            userId: userId
        })
 
        return res.status(201).json({
            message: "Conversation created successfully",
            conversation
        });

    } catch(error) {
        return res.status(500).json({
            message: "Error creating conversation",
            error: error.message
        });
    }
}

export let getConversations = async (req, res) => {
    try{

        let userId = req.headers["x-user-id"];
        console.log("userId", userId);

        let conversations = await Conversation.find({
            userId: userId
        }).sort({updatedAt: -1});

        return res.status(200).json({
            message: "Conversations found successfully",
            conversations
        });

    } catch(error) {
        console.error("Error fetching conversations:", error);
        return res.status(500).json({
            message: "Error fetching conversations",
            error: error.message
        });
    }
}

export let saveMessage = async (req, res) => {
    try{
        let {conversationId, role, content} = req.body;

        if(!conversationId || !role || !content){
            return res.status(400).json({
                message: "conversationId, role and content are required"
            });
        }

        let message = await Message.create({
            conversationId,
            role,
            content
        })

        return res.status(201).json({
            message: "Message saved successfully",
            message
        });

    } catch(error) {
        return res.status(500).json({
            message: "Error saving message",
            error: error.message
        });
    }
}


export let getMessages = async (req, res) =>{
    try{
        let {conversationId} = req.params;

        if(!conversationId){
            return res.status(400).json({
                message: "conversationId is required"
            });
        }

        let messages = await Message.find({
            conversationId: conversationId
        }).sort({createdAt: 1});

        return res.status(200).json({
            message: "Messages found successfully",
            messages
        });
    } catch(error) {
        return res.status(500).json({
            message: "Error fetching messages",
            error: error.message
        });
    }
}
export let updateConversation = async (req, res) => {
    try{
        let {id, title} = req.body;

        if(!id || !title){
            return res.status(400).json({
                message: "conversationId and title are required"
            });
        }

        let conversation = await Conversation.findByIdAndUpdate(id, {
            title: title
        }, {new: true});

        return res.status(200).json({
            message: "Conversation updated successfully",
            conversation
        }); 

    } catch(error) {
        return res.status(500).json({
            message: "Error updating conversation",
            error: error.message
        });
    }   
}
