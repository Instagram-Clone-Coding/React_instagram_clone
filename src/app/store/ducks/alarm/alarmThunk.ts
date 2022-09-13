import { authorizedCustomAxios } from "customAxios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const loadAlarmList = createAsyncThunk<
    Alarm.AlarmItem,
    { page: number }
>("alarm/loadList", async (payload, ThunkOptions) => {
    try {
        const config = {
            params: {
                page: payload.page,
                size: 10,
            },
        };
        const {
            data: { data },
        } = await authorizedCustomAxios.get(`/alarms`, config);

        console.log(data);
        return { ...data, currentPage: payload.page };
    } catch (error) {
        ThunkOptions.rejectWithValue(error);
    }
});
