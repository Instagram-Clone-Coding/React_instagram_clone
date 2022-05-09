import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { searchUser } from "./commonThunk";

export interface InitialStateType {
    searchUserKeyword: string;
    searchUsers: Common.searchUserType[];
    isLoading: boolean;
}

const initialState: InitialStateType = {
    searchUserKeyword: "",
    searchUsers: [],
    isLoading: false,
};

const commontSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        changeSearchUser: (state, action: PayloadAction<string>) => {
            state.searchUserKeyword = action.payload;
            if (state.searchUserKeyword === "") {
                state.searchUsers = [];
            }
        },
        resetSearch: (state) => {
            state.searchUserKeyword = "";
            state.searchUsers = [];
        },
    },
    extraReducers: (build) => {
        build
            .addCase(searchUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.searchUsers = action.payload;
            })
            .addCase(searchUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { changeSearchUser } = commontSlice.actions;

export const commonReducer = commontSlice.reducer;
