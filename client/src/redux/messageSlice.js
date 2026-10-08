import {createSlice} from "@reduxjs/toolkit";
import {getMessages} from "./messageThunk.js";
import { sendMessage } from "./messageThunk.js";

let messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[],
        isLoading:false,
    
    },
    reducers:{
        setMessages:(state, action) => {
            state.messages = action.payload;
        },
    },
    extraReducers:(builder) => {
        builder.addCase(getMessages.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getMessages.fulfilled, (state, action) => {
            state.messages = action.payload;
            state.isLoading = false;
        })
        .addCase(getMessages.rejected, (state, action) => {
            state.isLoading = false;
        })
        .addCase(sendMessage.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.messages.push(action.payload);
            state.isLoading = false;
        })
        .addCase(sendMessage.rejected, (state, action) => {
            state.isLoading = false;
        })


    }
    
})

export let {setMessages} = messageSlice.actions;

export default messageSlice.reducer;