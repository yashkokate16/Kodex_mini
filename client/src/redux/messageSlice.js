
import { createSlice } from "@reduxjs/toolkit";
import { getMessages, sendMessage } from "./messageThunk.js";

let messageSlice = createSlice({
    name: "message",

    initialState: {
        messages: [],
        isLoading: false,
        artifacts: []
    },

    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        setArtifacts: (state, action) => {
            state.artifacts = action.payload;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMessages.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getMessages.fulfilled, (state, action) => {
                state.messages = action.payload;
                state.isLoading = false;
            })
            .addCase(getMessages.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(sendMessage.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.artifacts = action.payload.artifacts ?? [];
                state.isLoading = false;
            })
            .addCase(sendMessage.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export let { setMessages, setArtifacts } = messageSlice.actions;

export default messageSlice.reducer;
