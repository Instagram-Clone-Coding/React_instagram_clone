import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAction } from "app/store/ducks/auth/authSlice";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";

export const getMiniProfile = createAsyncThunk<
    ModalType.MiniProfileStateProps,
    {
        memberNickname: string;
        modalPosition: ModalType.ModalPositionProps;
    }
>("modal/getMiniProfile", async (payload, ThunkOptions) => {
    try {
        const {
            data: { data },
        } = await authorizedCustomAxios.get(
            `/accounts/${payload.memberNickname}/mini`,
        );
        return {
            ...data,
            isLoading: false,
            modalPosition: payload.modalPosition,
        };
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});
