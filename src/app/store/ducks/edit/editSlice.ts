import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getEditItem } from "./editThunk";
export interface InitialStateType {
    currentMenu: EditType.menuType;
    editItem: EditType.editItemType;
}

const initialState: InitialStateType = {
    currentMenu: "프로필 편집",
    editItem: {
        memberUsername: "",
        memberImageUrl: "",
        memberName: "strin",
        memberWebsite: null,
        memberIntroduce: null,
        memberEmail: null,
        memberPhone: null,
        memberGender: "PRIVATE",
    },
};

const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        selectMenu: (state, action: PayloadAction<EditType.menuType>) => {
            state.currentMenu = action.payload;
        },
    },
    extraReducers: (build) => {
        build.addCase(getEditItem.fulfilled, (state, action) => {
            state.editItem = action.payload;
        });
    },
});

export const { selectMenu } = editSlice.actions;
export const editReducer = editSlice.reducer;
