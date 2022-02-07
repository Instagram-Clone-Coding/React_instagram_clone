import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "customAxios";

export const makeRoom = createAsyncThunk<Direct.RoomsProps,
    {
        username: string;
    }>("chat/rooms", async (payload, ThunkOptions) => {
    const config = {
        params: {
            username: payload.username,
        },
    };
    try {
        const { data } = await authorizedCustomAxios.post(
            `/chat/rooms`,
            null,
            config,
        );
        return data.data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }

});


// 백엔드 API 작동하면 response type 정해줘야함 현재는 any 로 임시로 선언

export const deleteRoom = createAsyncThunk<any, { roomId: number }>("chat/deleteRoom", async (payload, ThunkOpions) => {
    const config = {
        params: {
            roomId: payload.roomId,
        },
    };

    try {
        const {data} = await authorizedCustomAxios.delete(`/chat/rooms/hide`,config)
        return data;
    }catch (error) {
        throw ThunkOpions.rejectWithValue(error);
    }
});