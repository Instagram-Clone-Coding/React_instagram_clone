import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios, customAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "../auth/authSlice";

export const lookUpUserProfile = createAsyncThunk<any,
    {
        username: string
    }>("profile/lookUpUserProfile", async (payload, ThunkOptions) => {

    try {
        const { data } = await authorizedCustomAxios.get(`/accounts/${payload.username}`);
        return data.data
    }catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const getPosts = createAsyncThunk<Profile.PostType[],
    {
        page: number,
        username:string
    }>("profile/getPost", async (payload, ThunkOptions) => {

    try {
        const { data } = await customAxios.get(`/accounts/${payload.username}/posts/recent`);
        return data.data
    }catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});