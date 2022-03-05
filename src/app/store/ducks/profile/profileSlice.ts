import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { lookUpUserProfile } from "./profileThunk";

export interface InitialStateType {
    isLoading: boolean;
    memberProfile: Profile.MemberProfileProps | null;
    currentCategory : "normal" | "tag" | "video"
}

const initialState: InitialStateType = {
    isLoading: false,
    memberProfile: null,
    currentCategory : "normal"
};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        selectCategory:(state,action:PayloadAction<"normal" | "tag" | "video">) => {
            state.currentCategory = action.payload
        }
    },
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
export const {
    selectCategory
} = profileSlice.actions
export const profileReducer = profileSlice.reducer;