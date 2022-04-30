import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchUser } from "./commonThunk";

export interface InitialStateType {
    searchUserKeyword: string;
    isLoading: boolean;
}

const initialState: InitialStateType = {
    searchUserKeyword: "",
    isLoading: false,
};

const commontSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        changeSearchUser: (state, action: PayloadAction<string>) => {
            state.searchUserKeyword = action.payload;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(searchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action);
            })
            .addCase(searchUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { changeSearchUser } = commontSlice.actions;

export const commonReducer = commontSlice.reducer;
