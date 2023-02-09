import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postFollow, postUnfollow } from "app/store/ducks/home/homThunk";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";

const initialState: ModalType.ModalStateProps = {
    activatedModal: null,
    memberUsername: "",
    memberImageUrl: "",
    memberNickname: "",
    postId: undefined,
    miniProfile: undefined,
    isOnMiniProfile: false,
    isArticleAloneModalOn: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        startModal: (
            state,
            action: PayloadAction<ModalType.ModalStateProps>,
        ) => {
            return {
                ...state,
                ...action.payload,
            }; // 전달한 modalDTO 값만 변경
        },
        changeActivatedModal: (
            state,
            action: PayloadAction<ModalType.ActivatedModalType>,
        ) => {
            state.activatedModal = action.payload;
        },
        mouseOnHoverModal: (state) => {
            state.isOnMiniProfile = true;
        },
        mouseNotOnHoverModal: (state) => {
            state.isOnMiniProfile = false;
        },
        maintainModalon: (
            state,
            action: PayloadAction<ModalType.ActivatedModalType>,
        ) => {
            if (action.payload === "unfollowing" && state.isOnMiniProfile) {
                state.isOnMiniProfile = true;
                state.activatedModal = "unfollowing";
            } else {
                state.activatedModal = action.payload;
            }
        },
        resetModal: (state) => {
            return initialState;
        },
        checkMouseOnHoverModal: (state) => {
            if (
                !state.isOnMiniProfile &&
                state.activatedModal !== "unfollowing" // hover에서 팔로잉 클릭해서 언팔로우 모달이 켜질 경우 유지
            ) {
                return initialState;
            } else {
                return state;
            }
        },
        changeHoverModalPosition: (
            state,
            action: PayloadAction<ModalType.ModalPositionProps>,
        ) => {
            if (state.miniProfile) {
                state.miniProfile.modalPosition = action.payload;
            }
        },
        startArticleAloneModal: (state) => {
            state.isArticleAloneModalOn = true;
        },
        stopArticleAloneModal: (state) => {
            state.isArticleAloneModalOn = false;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getMiniProfile.pending, (state) => {
                state.miniProfile = undefined;
            })
            .addCase(getMiniProfile.fulfilled, (state, action) => {
                state.miniProfile = action.payload;
            })
            // .addCase(getMiniProfile.rejected, (state, action) => {

            // });
            .addCase(postUnfollow.pending, (state) => {
                if (state.miniProfile) {
                    state.miniProfile.isLoading = true;
                    state.isOnMiniProfile = true; // 로딩동안 미니프로필 유지
                    state.activatedModal = null;
                }
            })
            .addCase(postUnfollow.fulfilled, (state) => {
                if (state.miniProfile) {
                    state.miniProfile.isLoading = false;
                    state.miniProfile.following = false;
                }
            })
            .addCase(postUnfollow.rejected, (state) => {
                if (state.miniProfile) {
                    state.miniProfile.isLoading = false;
                    state.miniProfile.following = true;
                }
            })
            .addCase(postFollow.pending, (state) => {
                if (state.miniProfile) {
                    state.miniProfile.isLoading = true;
                    state.isOnMiniProfile = true; // 로딩동안 미니프로필 유지
                    state.activatedModal = null;
                }
            })
            .addCase(postFollow.fulfilled, (state) => {
                if (state.miniProfile) {
                    state.miniProfile.isLoading = false;
                    state.miniProfile.following = true;
                }
            })
            .addCase(postFollow.rejected, (state) => {
                if (state.miniProfile) {
                    state.miniProfile.isLoading = false;
                    state.miniProfile.following = false;
                }
            });
    },
});

export const modalReducer = modalSlice.reducer;

export const modalActions = modalSlice.actions;
