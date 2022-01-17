import { createSlice } from "@reduxjs/toolkit";


type modalType = "deleteChat" | "block" | "report" | "newChat" | "convertAccount" | null;

export interface InitialStateType {
    modal: modalType;
}


const initialState: InitialStateType = {
    modal: null,
};

const directSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload
        },
        closeModal: (state) => {
            state.modal = null;
        },
    },
    extraReducers: (build) => {

    },
});
;

export const { openModal, closeModal } = directSlice.actions;
export const directReducer = directSlice.reducer;
