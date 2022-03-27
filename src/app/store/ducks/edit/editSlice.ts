import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEditItem } from "./editThunk";
export interface InitialStateType {
    currentMenu: EditType.menuType;
    editItem: EditType.editItemType;
    modal: EditType.modalType;
}

const initialState: InitialStateType = {
    currentMenu: "프로필 편집",
    editItem: {
        memberUsername: "",
        memberName: "",
        memberWebsite: null,
        memberIntroduce: null,
        memberEmail: null,
        memberPhone: null,
        memberGender: "비공개",
    },
    modal: null,
};

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        selectMenu: (state, action: PayloadAction<EditType.menuType>) => {
            state.currentMenu = action.payload;
        },
        changeEditItem: (
            state,
            action: PayloadAction<{
                name: EditType.editItemKeyType;
                value: string;
            }>,
        ) => {
            const { name, value } = action.payload;

            state.editItem = { ...state.editItem, [name]: value };
        },
        selectModal: (state, action: PayloadAction<EditType.modalType>) => {
            state.modal = action.payload;
        },
    },
    extraReducers: (build) => {
        build.addCase(getEditItem.fulfilled, (state, action) => {
            state.editItem = action.payload;
        });
    },
});

export const { selectMenu, changeEditItem, selectModal } = editSlice.actions;
export const editReducer = editSlice.reducer;
