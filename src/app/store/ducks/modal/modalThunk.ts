import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { authorizedCustomAxios } from "customAxios";

export const getMiniProfile = createAsyncThunk<
    ModalType.MiniProfileStateProps,
    {
        memberUsername: string;
        modalPosition: ModalType.ModalPositionProps;
    }
>("modal/getMiniProfile", async (payload, ThunkOptions) => {
    try {
        const {
            data: { data },
        } = await authorizedCustomAxios.get(
            `/accounts/${payload.memberUsername}/mini`,
        );
        return {
            ...data,
            isLoading: false,
            modalPosition: payload.modalPosition,
        };
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});
