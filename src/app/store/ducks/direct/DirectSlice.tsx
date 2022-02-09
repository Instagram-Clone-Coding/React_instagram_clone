import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteRoom, makeRoom } from "./DirectThunk";


export interface InitialStateType {
    modal: Direct.modalType;
    view: Direct.currentSectionViewType;
    selectedChatItem: number | null;
    selectedNewChatUser: string | null;
    selectedRoom: Direct.RoomsProps | null;
    isLoading: boolean;
}


const initialState: InitialStateType = {
    modal: null,
    view: "inbox",
    selectedChatItem: null,
    selectedNewChatUser: null,
    selectedRoom: null,
    isLoading: false,
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
        build
            .addCase(makeRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makeRoom.fulfilled, (state,action) => {
                state.isLoading = false;
                state.selectedRoom = action.payload;
            })
            .addCase(makeRoom.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRoom.fulfilled, (state)=> {
                state.selectedRoom = null;
                state.modal = null;
                state.view = "inbox";
                state.isLoading = true;
            })

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
