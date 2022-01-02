import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type storiesScrollPositionType = "left" | "right" | "center";

export interface homeStateProps {
    isCopiedNotification: boolean;
    storiesScrollPosition: storiesScrollPositionType;
}

const initialState: homeStateProps = {
    isCopiedNotification: false,
    storiesScrollPosition: "left",
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
        changeStoriesScrollPosition: (
            state,
            action: PayloadAction<storiesScrollPositionType>,
        ) => {
            state.storiesScrollPosition = action.payload;
        },
    },
});

export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;
