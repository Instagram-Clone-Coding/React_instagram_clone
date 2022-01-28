import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface InitialStateType {
    modal: Direct.modalType;
    view: Direct.currentSectionViewType;
    selectedChatItem: number | null;
    selectedNewChatUser: string | null;
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
        openModal: (state, action: PayloadAction<Direct.modalType>) => {
            state.modal = action.payload;
        },
        closeModal: (state) => {
            state.modal = null;
        },
        selectView: (state, action: PayloadAction<Direct.currentSectionViewType>) => {
            state.view = action.payload;
        },
        selectChatItem: (state, action: PayloadAction<number | null>) => {
            state.selectedChatItem = action.payload;
        },
        selectNewChatUser: (state, action: PayloadAction<string | null>) => {
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

export const {
    openModal,
    closeModal,
    selectView,
    selectChatItem,
    selectNewChatUser,
    unSelectNewChatUser,
} = directSlice.actions;
export const directReducer = directSlice.reducer;
