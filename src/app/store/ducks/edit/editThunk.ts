import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "../auth/authSlice";

export const getEditItem = createAsyncThunk<EditType.editItemType, void>(
    "edit/getEditItem",
    async (payload, ThunkOptions) => {
        try {
            const { data } = await authorizedCustomAxios.get("/accounts/edit");

            return data.data;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE &&
                ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);
