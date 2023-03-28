import { modalActions } from "app/store/ducks/modal/modalSlice";
import { RootState } from "app/store/store";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAction } from "app/store/ducks/auth/authSlice";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";

interface GetMiniProfileResponseType extends AxiosType.ResponseType {
    data: ModalType.MiniProfileProps;
}

export const getMiniProfile = createAsyncThunk<
    ModalType.MiniProfileStateProps,
    {
        memberUsername: string;
        modalPosition: ModalType.ModalPositionProps;
    },
    { state: RootState }
>(
    "modal/getMiniProfile",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        const currentMinProfileState = getState().modal.miniProfile;
        if (currentMinProfileState?.memberUsername === payload.memberUsername)
            return {
                ...currentMinProfileState,
                isLoading: false,
                modalPosition: payload.modalPosition,
            };
        try {
            const {
                data: { data },
            } = await authorizedCustomAxios.get<GetMiniProfileResponseType>(
                `/accounts/${payload.memberUsername}/mini`,
            );

            return {
                ...data,
                isLoading: false,
                modalPosition: payload.modalPosition,
            };
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);
