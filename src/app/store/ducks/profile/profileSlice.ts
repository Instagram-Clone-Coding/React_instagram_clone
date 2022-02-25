import { createSlice } from "@reduxjs/toolkit";
import { lookUpUserProfile } from "./profileThunk";

export interface InitialStateType {
    isLoading: boolean;
    memberProfile: Profile.MemberProfileProps | null;
}

const initialState: InitialStateType = {
    isLoading: false,
    memberProfile: null,
};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(lookUpUserProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpUserProfile.fulfilled, (state, action) => {
                state.memberProfile = action.payload;
                state.isLoading = false;
            })
            .addCase(lookUpUserProfile.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const profileReducer = profileSlice.reducer;