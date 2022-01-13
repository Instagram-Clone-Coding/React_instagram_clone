import { createSlice } from "@reduxjs/toolkit";
import { openModals } from "app/ducks/direct/DirectThunk";

export interface InitialStateType {
    deleteChat: boolean;
    block: boolean;
    report: boolean;
    newChat: boolean;
}

const initialState: InitialStateType = {
    deleteChat: false,
    block: false,
    report: false,
    newChat: false,
};

const directSlice = createSlice({
    name: "direct",
    initialState,
    reducers: {
        hehehe : (state,action) => {
            console.log(state);
            console.log(action);
        }
    },
    extraReducers: (build) => {
        build.addCase(openModals.pending, (state, action) => {
                console.log(state);
                console.log(action);
                console.log(action.payload);

            },
        ).addCase(openModals.fulfilled, (state, action) => {
                state.deleteChat = true;
                console.log(state);
                console.log(action.payload);
            },
        ).addCase(openModals.rejected, (state, action) => {
                console.log(state);
                console.log(action);
                console.log(action.payload);
            },
        );
    },
});

export const directReducer = directSlice.reducer;
export const directActions = directSlice.actions