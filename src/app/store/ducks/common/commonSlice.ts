import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSearchRecord, searchUser } from "./commonThunk";

export interface InitialStateType {
    isLoading: boolean;
    searchUserKeyword: string;
    searchUsers: CommonType.searchResultType[];
    recordedUsers: CommonType.searchResultType[];
}

const initialState: InitialStateType = {
    isLoading: false,
    searchUserKeyword: "",
    searchUsers: [],
    recordedUsers: [],
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
        resetRecordedUsers: (state) => {
            state.recordedUsers = [];
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
            })
            .addCase(getSearchRecord.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSearchRecord.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recordedUsers = action.payload;
            })
            .addCase(getSearchRecord.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { changeSearchUser, resetRecordedUsers, resetSearch } =
    commontSlice.actions;

export const commonReducer = commontSlice.reducer;
