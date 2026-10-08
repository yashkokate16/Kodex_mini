import {createSlice} from "@reduxjs/toolkit"
import { createConversation } from "./conversationThunk.js";
import { getConversations } from "./conversationThunk.js";



let conversationSlice = createSlice({
    name:"conversation",
    initialState:{
        conversations:[],
        isLoading:false,
        isCreating:false,
        selectedConversation:null
    },
    reducers:{
        setConversations:(state, action) => {
            state.conversations = action.payload;
            state.isLoading = false;
        },
        setSelectedConversation:(state, action) => {
            state.selectedConversation = action.payload;
        }
    },
    // CREATE CONVERSATION //
    extraReducers:(builder) => {
        builder.addCase(createConversation.pending, (state) => {
            state.isCreating = true;
        })
        .addCase(createConversation.fulfilled, (state, action) => {
            state.conversations.unshift(action.payload);
            state.selectedConversation = action.payload;
            state.isCreating = false;

        })
        .addCase(createConversation.rejected, (state, action) => {
            state.isCreating = false;
        })

        // GET CONVERSATIONS //
        .addCase(getConversations.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getConversations.fulfilled, (state, action) => {
            state.conversations = action.payload;
            state.isLoading = false;
        })
        .addCase(getConversations.rejected, (state, action) => {
            state.isLoading = false;
        })

    }
})

export let {setConversations, setSelectedConversation} = conversationSlice.actions;

export default conversationSlice.reducer;