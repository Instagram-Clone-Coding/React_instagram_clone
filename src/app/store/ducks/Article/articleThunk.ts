import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";

// 각 게시물에서 필요한 곳에서 가져와 dispatch하면 되고,
// unwrap() 처리하여 state 및 error 핸들링하면 됩니다.
export const postSaveArticle = createAsyncThunk<
    { status: boolean },
    {
        token: string;
        postId: number;
    }
>("article/postSaveArticle", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
        params: { postId: payload.postId },
    };
    try {
        const {
            data: { data }, // status
        } = await axios.post(`${BASE_URL}/posts/save`, null, config);
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const deleteSaveArticle = createAsyncThunk<
    { status: boolean },
    {
        token: string;
        postId: number;
    }
>("article/deleteSaveArticle", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
        params: { postId: payload.postId },
    };
    try {
        const {
            data: { data }, // status
        } = await axios.delete(`${BASE_URL}/posts/save`, config);
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});
