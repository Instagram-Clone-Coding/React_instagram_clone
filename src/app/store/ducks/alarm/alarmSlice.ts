import { createSlice } from "@reduxjs/toolkit";
import { loadAlarmList } from "app/store/ducks/alarm/alarmThunk";

export interface AlarmStateProps {
    alarmList: AlarmType.AlarmContent[] | null;
    totalPage: number;
}

const initialState: AlarmStateProps = {
    alarmList: null,
    totalPage: 0,
};

const alarmSlice = createSlice({
    name: " alarm",
    initialState,
    reducers: {
        clearAlarmList: (state) => {
            state.alarmList = null;
        },
    },
    extraReducers: (build) => {
        build //
            .addCase(loadAlarmList.fulfilled, (state, action) => {
                if (action.payload.currentPage === 1) {
                    state.alarmList = action.payload.content;
                    state.totalPage = action.payload.totalPages;
                } else {
                    state.alarmList?.push(...action.payload.content);
                }
            });
    },
});

export const alarmAction = alarmSlice.actions;

export const alarmReducer = alarmSlice.reducer;
