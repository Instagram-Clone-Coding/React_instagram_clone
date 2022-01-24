import { createSlice } from "@reduxjs/toolkit";


type modalType = "deleteChat" | "block" | "report" | "newChat" | "convertAccount" | null;

export interface InitialStateType {
    modal: modalType;
    view : Direct.currentSectionViewType;

}


const initialState: InitialStateType = {
    modal: null,
    view: "chat"
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
        selectView : (state,action) => {
            state.view = action.payload
        }
    },
    extraReducers: (build) => {

    },
});
;

export const { openModal, closeModal,selectView } = directSlice.actions;
export const directReducer = directSlice.reducer;
