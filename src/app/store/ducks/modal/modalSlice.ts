import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMiniProfile } from "app/store/ducks/modal/modalThunk";

const initialState: ModalType.ModalStateProps = {
    activatedModal: null,
    memberUsername: undefined,
    memberImageUrl: undefined,
    modalPosition: undefined,
    postId: undefined,
    miniProfile: undefined,
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
        resetModal: (state) => {
            return {
                activatedModal: null,
                memberUsername: undefined,
                modalPosition: undefined,
                postId: undefined,
                miniProfile: undefined,
            };
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getMiniProfile.pending, (state, payload) => {})
            .addCase(getMiniProfile.fulfilled, (state, action) => {
                state.miniProfile = action.payload;
            })
            .addCase(getMiniProfile.rejected, (state, action) => {});
    },
});

export const modalReducer = modalSlice.reducer;

export const modalActions = modalSlice.actions;
