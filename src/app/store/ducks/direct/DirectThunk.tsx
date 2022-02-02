import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";


export const makeRoom = createAsyncThunk<Direct.RoomsProps,
    {
        token: string;
        username: string;
    }>("chat/rooms", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
        params: {
            username: payload.username,
        },
    };
    try {
        const { data } = await axios.post(
            `${BASE_URL}/chat/rooms`,
            null,
            config,
        );
        return data.data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }

});


// 백엔드 API 작동하면 response type 정해줘야함 현재는 any 로 임시로 선언

export const deleteRoom = createAsyncThunk<any, { token: string, roomId: number }>("chat/deleteRoom", async (payload, ThunkOpions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
        params: {
            roomId: payload.roomId,
        },
    };

    try {
        const {data} = await axios.delete(`${BASE_URL}/chat/rooms/hide`,config)
        return data;
    }catch (error) {
        throw ThunkOpions.rejectWithValue(error);
    }
});