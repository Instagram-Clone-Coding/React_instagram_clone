import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getExtraPosts, getPosts, lookUpUserProfile } from "./profileThunk";

export interface InitialStateType {
    isLoading: boolean;
    memberProfile: Profile.MemberProfileProps | null;
    currentCategory: Profile.currentCategoryType;
    posts: Profile.PostType[];
    isExtraPostLoading: boolean;
    extraPostPage: number;
    modal: Profile.modalType;
    unFollowSelectedUser: { imageUrl: string; username: string };
}

const initialState: InitialStateType = {
    isLoading: false,
    memberProfile: null,
    currentCategory: "uploaded",
    posts: [],
    isExtraPostLoading: false,
    extraPostPage: 0,
    modal: null,
    unFollowSelectedUser: { imageUrl: "", username: "" },
};

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        selectCategory: (
            state,
            action: PayloadAction<Profile.currentCategoryType>,
        ) => {
            state.currentCategory = action.payload;
            if (state.currentCategory !== action.payload) state.posts = [];
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
        setUnFollowSelectedUser: (
            state,
            action: PayloadAction<{ imageUrl: string; username: string }>,
        ) => {
            state.unFollowSelectedUser = action.payload;
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
    selectModal,
    setUnFollowSelectedUser,
} = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
