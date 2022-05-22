import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "app/store/store";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "../auth/authSlice";

export const searchUser = createAsyncThunk<
    Common.searchUserType[],
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
            const myUsername = getState().auth.userInfo?.memberUsername;

            const { data } = await authorizedCustomAxios.get(
                `/topsearch`,
                config,
            );

            // 검색해서 나온 결과중에 자기 자신을 제외해줍니다.
            return data.data.filter(
                (user: Common.searchUserType) =>
                    user.member.username !== myUsername,
            );
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);

export const getSearchRecord = createAsyncThunk<
    Common.searchUserType[],
    void,
    { state: RootState }
>(
    "common/getSearchRecord",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        try {
            const myUsername = getState().auth.userInfo?.memberUsername;

            const { data } = await authorizedCustomAxios.get(
                "/topsearch/recent/top",
            );

            return data.data.content.filter(
                (user: Common.searchUserType) =>
                    user.member.username !== myUsername,
            );
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);
