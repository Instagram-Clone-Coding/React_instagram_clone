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
        console.log(data);
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }

});