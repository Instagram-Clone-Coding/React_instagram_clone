import { createSlice } from "@reduxjs/toolkit";


type modalType = "deleteChat" | "block" | "report" | "newChat" | "convertAccount" | null;

export interface InitialStateType {
    modal: modalType;
    view: Direct.currentSectionViewType;
    selectedChatItem: number | null;
    selectedNewChatUser?: string | null;
}


const initialState: InitialStateType = {
    modal: null,
    view: "inbox",
    selectedChatItem: null,
    selectedNewChatUser: null,
};

const directSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action) => {
            state.modal = action.payload;
        },
        closeModal: (state) => {
            state.modal = null;
        },
        selectView: (state, action) => {
            state.view = action.payload;
        },
        selectChatItem: (state, action) => {
            state.selectedChatItem = action.payload;
        },
        selectNewChatUser: (state, action) => {
            state.selectedNewChatUser = action.payload;
        },
        unSelectNewChatUser: (state) => {
            state.selectedNewChatUser = null;
        },
    },
    extraReducers: (build) => {

    },
});
;

export const { openModal, closeModal, selectView, selectChatItem, selectNewChatUser ,unSelectNewChatUser} = directSlice.actions;
export const directReducer = directSlice.reducer;
