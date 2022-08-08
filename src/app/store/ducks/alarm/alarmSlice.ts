import { AlarmItem } from "./alarmThunk.d";
import { createSlice } from "@reduxjs/toolkit";
import { loadAlarmList } from "app/store/ducks/alarm/alarmThunk";
export interface AlarmStateProps {
    alarmList: AlarmItem[] | null;
}

const initialState: AlarmStateProps = {
    alarmList: null,
};

const alarmSlice = createSlice({
    name: " alarm",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build //
            .addCase(loadAlarmList.fulfilled, (state, action) => {
                state.alarmList = action.payload;
            });
    },
});

export const alarmAction = alarmSlice.actions;

export const alarmReducer = alarmSlice.reducer;
