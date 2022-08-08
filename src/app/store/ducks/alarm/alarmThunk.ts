import { authorizedCustomAxios } from "customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadAlarmList = createAsyncThunk<Alarm.AlarmItem[], void>(
    "alarm/loadList",
    async (payload, ThunkOptions) => {
        try {
            const config = {
                params: {
                    page: 1,
                    size: 10,
                },
            };
            const {
                data: { data },
            } = await authorizedCustomAxios.get(`/alarms`, config);

            return data.content;
        } catch (error) {
            ThunkOptions.rejectWithValue(error);
        }
    },
);
