import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAction } from "app/store/ducks/auth/authSlice";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";

// 각 게시물에서 필요한 곳에서 가져와 dispatch하면 되고,
// unwrap() 처리하여 state 및 error 핸들링하면 됩니다.
export const postSaveArticle = createAsyncThunk<
    { status: boolean },
    {
        postId: number;
    }
>("article/postSaveArticle", async (payload, ThunkOptions) => {
    const config = {
        params: { postId: payload.postId },
    };
    try {
        const {
            data: { data }, // status
        } = await authorizedCustomAxios.post(`/posts/save`, null, config);
        return data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const deleteSaveArticle = createAsyncThunk<
    { status: boolean },
    {
        postId: number;
    }
>("article/deleteSaveArticle", async (payload, ThunkOptions) => {
    const config = {
        params: { postId: payload.postId },
    };
    try {
        const {
            data: { data }, // status
        } = await authorizedCustomAxios.delete(`/posts/save`, config);
        return data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});
