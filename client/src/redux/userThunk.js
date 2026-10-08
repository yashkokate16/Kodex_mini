import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";



export let getCurrentUser =  createAsyncThunk(
    "auth/getCurrentUser",
    async (_, thunkAPI) => {
        try{
            let response = await axiosInstance.get("/api/me")
            console.log("Current user data:", response.data.user)
            return response.data.user
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to get user")
        }

    }
)


export let LogoutUser = createAsyncThunk(
    "auth/LogoutUser",
    async(_, thunkAPI) => {
        try{
            let response = await axiosInstance.get("/api/auth/logout")
            return response.data.message
        } catch(error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to logout user")
        }
    }
)

