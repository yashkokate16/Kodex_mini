import {createAsyncThunk} from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axios.js"


export let createConversation = createAsyncThunk(
    "conversation/createConversation",
    async (_, thunkAPI) => {
        try{
            let response = await axiosInstance.get("/api/chat/create-conversation")
            console.log("Conversation created:", response.data.conversation)
            return response.data.conversation
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create conversation")
        }

    })




export let getConversations = createAsyncThunk(
    "conversation/getConversations",
    async (_, thunkAPI) => { 
        try{
            let response = await axiosInstance.get("/api/chat/get-conversations")
            console.log("Fetched conversations:", response.data.conversations)
            return response.data.conversations
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch conversations")
        }
    })

    