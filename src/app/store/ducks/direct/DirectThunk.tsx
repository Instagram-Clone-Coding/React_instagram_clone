import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "app/store/ducks/auth/authSlice";
import { RootState } from "../../store";

export const makeRoom = createAsyncThunk<
    Direct.RoomsProps,
    {
        usernames: string[];
    }
>("chat/rooms", async (payload, ThunkOptions) => {
    const config = {
        params: { usernames: payload.usernames },
        // 배열을 알맞은 형태로 axios 호출하도록 만들어주는 부분입니다.
        paramsSerializer: (paramObj: { [x: string]: string }) => {
            const params = new URLSearchParams();
            for (const key in paramObj) {
                params.append(key, paramObj[key]);
            }

            return params.toString();
        },
    };
    try {
        const { data } = await authorizedCustomAxios.post(
            `/chat/rooms`,
            null,
            config,
        );
        console.log(data);
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
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);

// 채팅방 클릭시 채팅방조회(채팅방을 클릭하면 unseen count를 감소시키는 API) 호출

export const lookUpChatRoom = createAsyncThunk<
    any,
    { roomId: number },
    { state: RootState }
>(
    "chat/rooms/lookUp",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        const selectedRoom = getState().direct.selectedRoom;
        try {
            if (selectedRoom?.chatRoomId === payload.roomId) {
                const { data } = await authorizedCustomAxios.delete(
                    `/chat/rooms/${payload.roomId}`,
                );
            }
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);

// 채팅방 목록 페이징 조회 API
// 1. `DM 페이지 입장(새로고침)`
// 2. `DB의 JoinRoom 테이블에 본인이 추가되는 상황`
// - `채팅방 생성`
// - `상대방과 참여한 채팅방이 없는 상황에서, 상대방이 본인에게 메시지 송신`

export const lookUpChatList = createAsyncThunk<
    Direct.ChatItem[],
    number,
    { state: RootState }
>("chat/rooms/lookUpList", async (payload, ThunkOptions) => {
    try {
        const {
            data: { data },
        } = await authorizedCustomAxios.get(`/chat/rooms?page=${payload}`);
        return data.content;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

// 채팅방 목록 재발급 페이징 조회 API
// 1. `DM 페이지 입장(새로고침)`
// 2. `DB의 JoinRoom 테이블에 본인이 추가되는 상황`
// - `채팅방 생성`
// - `상대방과 참여한 채팅방이 없는 상황에서, 상대방이 본인에게 메시지 송신`

export const reissueChatList = createAsyncThunk<
    Direct.ChatItem[],
    number,
    { state: RootState }
>("chat/rooms/reissueChatList", async (payload, ThunkOptions) => {
    try {
        const {
            data: { data },
        } = await authorizedCustomAxios.get(`/chat/rooms?page=${payload - 1}`);
        return data.content;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

// /chat/rooms/{roomId}/messages
// 채팅방 메시지 목록 페이징 조회
// 페이지당 10개씩 조회할 수 있습니다.
export const lookUpChatMessageList = createAsyncThunk<
    { content: Direct.MessageDTO[]; last: boolean },
    { page: number; roomId: number },
    { state: RootState }
>(
    "chat/rooms/lookUpChatList",
    async (payload, { getState, dispatch, rejectWithValue }) => {
        const subChatCount = getState().direct.subChatCount;
        const newPage = parseInt(`${payload.page + subChatCount / 10}`);
        try {
            const config = {
                params: {
                    page: newPage,
                },
            };
            const {
                data: { data },
            } = await authorizedCustomAxios.get(
                `/chat/rooms/${payload.roomId}/messages`,
                config,
            );
            console.log(data.content);
            return { content: data.content, last: data.last };
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE && dispatch(authAction.logout());
            throw rejectWithValue(error);
        }
    },
);

export const addTyping = createAsyncThunk<any, number, { state: RootState }>(
    "chat/addTyping",
    async (payload, { getState, dispatch }) => {
        try {
            const state = getState();
            const typingRoomList = state.direct.typingRoomList;

            typingRoomList.forEach((typingRoom) => {
                // 이미 있으므로 갱신해줘야함
                if (typingRoom.roomId === payload) {
                    reissueTyping(payload);
                }
            });
            const timer = window.setTimeout(() => {
                dispatch(removeTyping(payload));
            }, 12000);

            return { roomId: payload, timer };
        } catch (error) {
            console.log(error);
        }
    },
);

export const removeTyping = createAsyncThunk<any, number, { state: RootState }>(
    "chat/removeTyping",
    async (payload, { getState }) => {
        try {
            return payload;
        } catch (error) {
            console.log(error);
        }
    },
);

export const reissueTyping = createAsyncThunk<
    any,
    number,
    { state: RootState }
>("chat/reissueTyping", async (payload, { dispatch }) => {
    try {
        const timer = window.setTimeout(() => {
            dispatch(removeTyping(payload));
        }, 12000);

        return { roomId: payload, timer };
    } catch (error) {
        console.log(error);
    }
});
