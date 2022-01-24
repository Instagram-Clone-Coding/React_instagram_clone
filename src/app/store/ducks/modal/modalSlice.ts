import { createSlice } from "@reduxjs/toolkit";

const initialState: ModalType.ModalStateProps = {
    activatedModal: null,
    memberNickname: undefined,
    memberImageUrl: undefined,
    modalPosition: undefined,
    postId: undefined,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        startModal: (state, action) => {
            return {
                ...state,
                ...action.payload,
            }; // 전달한 modalDTO 값만 변경
        },
        resetModal: (state) => {
            return {
                activatedModal: null,
                memberNickname: undefined,
                modalPosition: undefined,
                postId: undefined,
            };
        },
    },
});

export const modalReducer = modalSlice.reducer;

export const modalActions = modalSlice.actions;
