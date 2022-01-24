import { createSlice } from "@reduxjs/toolkit";


type modalType = "deleteChat" | "block" | "report" | "newChat" | "convertAccount" | null;

export interface InitialStateType {
    modal: modalType;
    view: Direct.currentSectionViewType;
    selectedChatItem: number | null;
}


const initialState: InitialStateType = {
    modal: null,
    view: "inbox",
    selectedChatItem : null
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
        selectChatItem:(state,action) => {
            state.selectedChatItem = action.payload;
        }
    },
    extraReducers: (build) => {

    },
});
;

export const { openModal, closeModal, selectView,selectChatItem } = directSlice.actions;
export const directReducer = directSlice.reducer;
