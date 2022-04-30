import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "../auth/authSlice";

export const searchUser = createAsyncThunk<
    Profile.MemberProfileProps,
    {
        keyword: string;
    }
>("common/searchUser", async (payload, ThunkOptions) => {
    const config = {
        params: { text: payload.keyword },
    };
    try {
        const { data } = await authorizedCustomAxios.get(`/topsearch`, config);
        return data.data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});
