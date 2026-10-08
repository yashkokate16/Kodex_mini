import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import conversationSlice from "./conversationSlice.js";
import messageSlice from "./messageSlice.js";

 let store = configureStore({
    reducer:{
        user: userSlice,
        conversation: conversationSlice,
        message: messageSlice,
    }
})


export default store;

