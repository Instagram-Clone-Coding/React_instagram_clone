import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios, customAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "../auth/authSlice";
import { RootState } from "app/store/store";
import { increaseExtraPostPage } from "./profileSlice";

export const lookUpUserProfile = createAsyncThunk<any,
    {
        username: string
    }>("profile/lookUpUserProfile", async (payload, ThunkOptions) => {

    try {
        const { data } = await authorizedCustomAxios.get(`/accounts/${payload.username}`);
        return data.data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const getPosts = createAsyncThunk<Profile.PostType[],
    {
        username: string
    }, { state: RootState }>("profile/getPost", async (payload, { getState, dispatch, rejectWithValue }) => {

    try {
        const currentCategory = getState().profile.currentCategory;
        let url = `/accounts/${payload.username}/posts/recent`;
        switch (currentCategory) {
            case "":
                url = `/accounts/${payload.username}/posts/recent`;
                break;
            case "tagged":
                url = `/accounts/${payload.username}/posts/tagged/recent`;
                break;
            case "saved":
                url = `/accounts/${payload.username}/posts/saved/recent`;
                break;

        }
        const { data } = await customAxios.get(url);
        return data.data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        dispatch(authAction.logout());
        throw rejectWithValue(error);
    }
});

export const getExtraPosts = createAsyncThunk<Profile.PostType[],
    {
        page: number,
        username: string
    }, { state: RootState }>("profile/getExtraPosts", async (payload, { getState, dispatch, rejectWithValue }) => {
    const config = {
        params: {
            page: payload.page,
        },
    };
    try {
        const currentCategory = getState().profile.currentCategory;
        let url = `/accounts/${payload.username}/posts`;
        switch (currentCategory) {
            case "":
                url = `/accounts/${payload.username}/posts`;
                break;
            case "tagged":
                url = `/accounts/${payload.username}/posts/tagged`;
                break;
            case "saved":
                url = `/accounts/${payload.username}/posts/saved`;
                break;

        }
        const {
            data: {
                data: { content: data, empty },
            },
        } = await customAxios.get(url, config);

        if (empty) {
            throw rejectWithValue(
                "게시물이 더 이상 존재하지 않습니다.",
            );
        }
        dispatch(increaseExtraPostPage())
        return data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        dispatch(authAction.logout());
        throw rejectWithValue(error);
    }
});