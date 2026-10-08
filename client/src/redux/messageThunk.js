import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios.js";


export let getMessages = createAsyncThunk(
    "message/getMessages",
    async(conversationId, thunkAPI) => {
        try{
            let response = await axiosInstance.get(`/api/chat/get-messages/${conversationId}`);
            console.log("Fetched messages:", response.data.messages);
            return response.data.messages;
        } catch(error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to fetch messages");
        }
    })


export let sendMessage = createAsyncThunk(
    "message/sendMessage",
    async(data, thunkAPI) => {
        try {
            let response = await axiosInstance.post("/api/agent/chat", data);
            console.log("Message sent and response received:", response);
            return response.data.response;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "Failed to send message");
        }   
    }
)
