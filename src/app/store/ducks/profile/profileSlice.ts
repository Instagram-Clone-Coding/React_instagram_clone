import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getExtraPosts, getPosts, lookUpUserProfile } from "./profileThunk";

export interface InitialStateType {
    isLoading: boolean;
    memberProfile: Profile.MemberProfileProps | null;
    currentCategory: "" | "tagged" | "saved";
    posts: Profile.PostType[];
    isExtraPostLoading: boolean;
    extraPostPage: number;
    modal: Profile.modalType;
}

const initialState: InitialStateType = {
    isLoading: false,
    memberProfile: null,
    currentCategory: "",
    posts: [],
    isExtraPostLoading: false,
    extraPostPage: 0,
    modal: null,
};


const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        selectCategory: (state, action: PayloadAction<"" | "tagged" | "saved">) => {
            state.currentCategory = action.payload;
        },
        increaseExtraPostPage: (state) => {
            state.extraPostPage++;
        },
        resetExtraPostPage: (state) => {
            state.extraPostPage = 0;
        },
        selectModal: (state, action: PayloadAction<Profile.modalType>) => {
            state.modal = action.payload;
        },
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
            })
            .addCase(getPosts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.isLoading = false;
            })
            .addCase(getPosts.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(getExtraPosts.pending, (state) => {
                state.isExtraPostLoading = true;
            })
            .addCase(getExtraPosts.fulfilled, (state, action) => {
                state.isExtraPostLoading = false;
                state.posts = [...state.posts, ...action.payload];
            })
            .addCase(getExtraPosts.rejected, (state) => {
                state.isExtraPostLoading = false;
            });

    },
});
export const {
    selectCategory,
    increaseExtraPostPage,
    resetExtraPostPage,
    selectModal
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;