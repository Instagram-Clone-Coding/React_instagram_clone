import { createSlice } from "@reduxjs/toolkit";

export interface AlarmStateProps {}

const initialState: AlarmStateProps = {};

const alarmSlice = createSlice({
    name: " alarm",
    initialState,
    reducers: {},
    extraReducers: (build) => {},
});

export const alarmAction = alarmSlice.actions;

export const alarmReducer = alarmSlice.reducer;
