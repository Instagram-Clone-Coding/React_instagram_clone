import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface homeState {
    isCopiedNotification: boolean;
}

// interface isCopiedNotificationProp {
//     isCopiedNotification: boolean;
// }

const initialState: homeState = {
    isCopiedNotification: false,
};
const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        notificateIsCopied: (state) => {
            state.isCopiedNotification = true;
        },
        closeIsCopiedNotification: (state) => {
            state.isCopiedNotification = false;
        },
    },
});

export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;
