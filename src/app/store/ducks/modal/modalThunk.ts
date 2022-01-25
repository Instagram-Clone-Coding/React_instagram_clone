import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";

export const getMiniProfile = createAsyncThunk<
    ModalType.MiniProfileProps,
    { token: string; memberUsername: string }
>("modal/getMiniProfile", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: { data },
        } = await axios.get(
            `${BASE_URL}/accounts/${payload.memberUsername}/mini`,
            config,
        );
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});
