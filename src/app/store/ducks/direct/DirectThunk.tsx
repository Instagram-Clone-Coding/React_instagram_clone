import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "app/store/ducks/auth/authSlice";
export const makeRoom = createAsyncThunk<
    Direct.RoomsProps,
    {
        username: string;
    }
>("chat/rooms", async (payload, ThunkOptions) => {
    const config = {
        params: {
            username: payload.username,
        },
    };
    try {
        console.log("나 챗 룸 만들어");
        const { data } = await authorizedCustomAxios.post(
            `/chat/rooms`,
            null,
            config,
        );
        console.log(data.data);
        return data.data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
        ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

// 백엔드 API 작동하면 response type 정해줘야함 현재는 any 로 임시로 선언

export const deleteRoom = createAsyncThunk<any, { roomId: number }>(
    "chat/deleteRoom",
    async (payload, ThunkOptions) => {
        const config = {
            params: {
                roomId: payload.roomId,
            },
        };

        try {
            const { data } = await authorizedCustomAxios.delete(
                `/chat/rooms/hide`,
                config,
            );
            return data;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);        }
    },
);
