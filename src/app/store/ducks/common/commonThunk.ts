import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "../auth/authSlice";

export const searchUser = createAsyncThunk<
    CommonType.searchResultType[],
    {
        keyword: string;
    },
    { state: RootState }
>(
    "common/searchUser",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        const config = {
            params: { text: payload.keyword },
        };
        try {
            const { data } = await authorizedCustomAxios.get(
                `/topsearch`,
                config,
            );

            return data.data;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);

export const getSearchRecord = createAsyncThunk<
    CommonType.searchResultType[],
    void,
    { state: RootState }
>(
    "common/getSearchRecord",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        try {
            const { data } = await authorizedCustomAxios.get(
                "/topsearch/recent/top",
            );

            return data.data.content;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);
