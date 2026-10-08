import {createSlice} from "@reduxjs/toolkit";
import { getCurrentUser } from "./userThunk.js";
import { LogoutUser } from "./userThunk.js";



let userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        isLoading:false,
    },
    reducers:{
        setUser:(state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        },
        removeUser:(state) => {
            state.user = null;
            state.isLoading = false;
        }
    },
    extraReducers:(builder) => {
        builder.addCase(getCurrentUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCurrentUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
        })
        .addCase(getCurrentUser.rejected, (state, action) => {
            state.user = null;
            state.isLoading = false;
        })
        .addCase(LogoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(LogoutUser.fulfilled, (state, action) => {
            state.user = null;
            state.isLoading = false;
        })
        .addCase(LogoutUser.rejected, (state, action) => {
            state.isLoading = false;
        })

    }

    
})

export let {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;


