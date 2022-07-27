import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addTyping,
    deleteRoom,
    lookUpChatList,
    lookUpChatMessageList,
    lookUpChatRoom,
    makeRoom,
    reissueChatList,
    reissueTyping,
    removeTyping,
} from "./DirectThunk";

export interface InitialStateType {
    modal: Direct.modalType;
    view: Direct.currentSectionViewType;
    selectedChatItem: number | null;
    selectedNewChatUsers: string[];
    selectedRoom: Direct.RoomsProps | null;
    isLoading: boolean;
    chatList: Direct.ChatItem[];
    chatListPage: number;
    chatMessageList: Direct.MessageDTO[];
    chatMessageListPage: number;
    typingRoomList: { roomId: number; timer: number }[];
    renewScroll: boolean;
    subChatCount: number; // 채팅메시지 subscribe 를 통해서 읽은 개수입니다.
    messageScrollable: boolean;
    selectedMessageId: number | null; // 메세지 옆에 3개의 점을 클릭했을때 여러가지 action 을 처리해주기 위함입니다.
    closeModalSelectedMessageId: number | null; // 취소 모달을 위해.
}

const initialState: InitialStateType = {
    modal: null,
    view: "inbox",
    selectedChatItem: null,
    selectedNewChatUsers: [],
    selectedRoom: null,
    isLoading: false,
    chatList: [],
    chatMessageList: [],
    chatListPage: 1,
    chatMessageListPage: 1,
    typingRoomList: [],
    renewScroll: false,
    subChatCount: 0,
    messageScrollable: true,
    selectedMessageId: null,
    closeModalSelectedMessageId: null,
};

const directSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<Direct.modalType>) => {
            state.modal = action.payload;
        },
        closeModal: (state) => {
            state.modal = null;
        },
        selectView: (
            state,
            action: PayloadAction<Direct.currentSectionViewType>,
        ) => {
            state.view = action.payload;
        },
        selectChatItem: (state, action: PayloadAction<number | null>) => {
            state.selectedChatItem = action.payload;
        },
        // DM 추천 클릭하면 사람 이름 추가
        selectNewChatUser: (state, action: PayloadAction<string>) => {
            state.selectedNewChatUsers?.push(action.payload);
        },
        // DM 추천된사람 클릭하면 사람 이름 제거
        unSelectNewChatUser: (state, action: PayloadAction<string>) => {
            state.selectedNewChatUsers = state.selectedNewChatUsers.filter(
                (username) => username !== action.payload,
            );
        },
        // DM 추천된사람 목록 모달창 remount 시 빈배열로
        resetSelectNewChatUser: (state) => {
            state.selectedNewChatUsers = [];
        },
        resetChatMessageList: (state) => {
            state.chatMessageList = [];
            state.chatMessageListPage = 1;
        },
        resetChatMessagePage: (state) => {
            state.chatMessageListPage = 1;
        },
        addChatMessageItem: (state, action: PayloadAction<any>) => {
            state.renewScroll = true;
            state.chatMessageList.push(action.payload.data);
        },
        addSubChatCount: (state) => {
            state.subChatCount = state.subChatCount + 1;
        },
        resetSubChatCount: (state) => {
            state.subChatCount = 0;
        },
        resetSelectedRoom: (state) => {
            state.selectedRoom = null;
        },
        resetChatList: (state) => {
            state.chatList = [];
            state.chatListPage = 1;
        },
        setSelectedMessageId: (state, action: PayloadAction<number | null>) => {
            state.selectedMessageId = action.payload;
        },
        setCloseModalSelectedMessageId: (state) => {
            state.closeModalSelectedMessageId = state.selectedMessageId;
        },
        likeChatMessageItem: (
            state,
            action: PayloadAction<{
                messageId: number;
                userInfo: AuthType.UserInfo;
            }>,
        ) => {
            // 내가 좋아요 누른 메세지의 likemembers 에 내 정보를 추가해준다. 그래야 바로 반영이된다.
            state.chatMessageList.forEach((chatMessageItem) => {
                if (chatMessageItem.messageId === action.payload.messageId) {
                    chatMessageItem.likeMembers.push({
                        hasStory: false,
                        id: action.payload.userInfo.memberId,
                        image: {
                            imageName: "dummy",
                            imageType: "JPG",
                            imageUUID: "dasda-123-13",
                            imageUrl: action.payload.userInfo.memberImageUrl,
                        },
                        name: action.payload.userInfo.memberName,
                        username: action.payload.userInfo.memberUsername,
                    });
                    return;
                }
            });
        },
        unLikeChatMessageItem: (
            state,
            action: PayloadAction<{ messageId: number; memberId: number }>,
        ) => {
            // 내가 좋아요 취소 누른 메세지의 likemembers 에 내 정보를 삭제해준다. 그래야 바로 반영이된다.
            state.chatMessageList.forEach((chatMessageItem) => {
                // 내가 찾는 메세지라면
                if (chatMessageItem.messageId === action.payload.messageId) {
                    chatMessageItem.likeMembers =
                        chatMessageItem.likeMembers.filter((member) => {
                            return member.id !== action.payload.memberId;
                        });
                    return;
                }
            });
        },
        deleteChatMessageItem: (state, action: PayloadAction<number>) => {
            state.chatMessageList = state.chatMessageList.filter(
                (chatMessageListItem) => {
                    return chatMessageListItem.messageId !== action.payload;
                },
            );
        },
    },
    extraReducers: (build) => {
        build
            .addCase(makeRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makeRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedRoom = action.payload;
                state.view = "chat";
            })
            .addCase(makeRoom.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(deleteRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteRoom.fulfilled, (state) => {
                state.selectedRoom = null;
                state.modal = null;
                state.view = "inbox";
                state.isLoading = false;
            })
            .addCase(deleteRoom.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatRoom.fulfilled, (state, action) => {
                state.selectedChatItem = action.payload;
                state.isLoading = false;
            })
            .addCase(lookUpChatRoom.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatList.fulfilled, (state, action) => {
                // 스크롤을 아래로 하여 더받아올 경우
                action.payload.forEach((chatListItem: any) => {
                    state.chatList.push(chatListItem);
                });
                state.chatListPage = state.chatListPage + 1;
                state.isLoading = false;
            })
            .addCase(lookUpChatList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(reissueChatList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reissueChatList.fulfilled, (state, action) => {
                // 어떠한 액션이 일어나서 새로운(업데이트된) chatList 정보를 받아와야함
                state.chatList = action.payload;
                state.isLoading = false;
            })
            .addCase(reissueChatList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatMessageList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatMessageList.fulfilled, (state, action) => {
                state.isLoading = false;

                if (action.payload.last) {
                    state.messageScrollable = false;
                } else {
                    state.messageScrollable = true;
                }

                // 첫번째 page 일땐 13시에보낸거 14시에버낸거 15시에보낸거 순서대로 오고 두번째부터는 리버스 할 필요가없다
                // 13시 부터 뿌려줘야되죠
                // 15 14 13
                // [10시에보낸거 11시에보낸거 12시에보낸거]
                // [13시에보낸거, 14시에보낸거, 15시에보낸거]

                state.renewScroll = false;
                if (state.chatMessageListPage === 1) {
                    action.payload.content
                        .reverse()
                        .forEach((chatMessageListItem: Direct.MessageDTO) => {
                            state.chatMessageList.push(chatMessageListItem);
                        });
                } else {
                    action.payload.content.forEach(
                        (chatMessageListItem: Direct.MessageDTO) => {
                            state.chatMessageList.unshift(chatMessageListItem);
                        },
                    );
                    // 추가로 받은 메세지 정보중에 기존의 정보가 있을 수 있다 페이지 단위로 메세지를 10개씩 받고있기 때문
                    // 중복 id 를 가진것은 제거해주자!
                    state.chatMessageList = state.chatMessageList.filter(
                        (chatMessageListItem, index, callback) =>
                            index ===
                            callback.findIndex(
                                (t) =>
                                    t.messageId ===
                                    chatMessageListItem.messageId,
                            ),
                    );
                }
                state.chatMessageListPage = state.chatMessageListPage + 1;
            })
            .addCase(lookUpChatMessageList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(addTyping.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(addTyping.fulfilled, (state, action) => {
                state.typingRoomList.push({
                    roomId: action.payload.roomId,
                    timer: action.payload.timer,
                });
            })
            .addCase(addTyping.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(removeTyping.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeTyping.fulfilled, (state, action) => {
                state.typingRoomList = state.typingRoomList.filter(
                    (typingRoom) => {
                        if (typingRoom.roomId === action.payload) {
                            clearTimeout(typingRoom.timer);
                        }
                        return typingRoom.roomId !== action.payload;
                    },
                );
            })
            .addCase(removeTyping.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(reissueTyping.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reissueTyping.fulfilled, (state, action) => {
                // 타이머 제거해주기
                state.typingRoomList.forEach((typingRoom) => {
                    clearTimeout(typingRoom.timer);
                });

                state.typingRoomList.push(action.payload);
            })
            .addCase(reissueTyping.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const {
    openModal,
    closeModal,
    selectView,
    selectChatItem,
    selectNewChatUser,
    unSelectNewChatUser,
    resetChatMessageList,
    addChatMessageItem,
    addSubChatCount,
    resetSubChatCount,
    resetChatMessagePage,
    resetSelectedRoom,
    resetChatList,
    setSelectedMessageId,
    likeChatMessageItem,
    unLikeChatMessageItem,
    deleteChatMessageItem,
    resetSelectNewChatUser,
    setCloseModalSelectedMessageId,
} = directSlice.actions;
export const directReducer = directSlice.reducer;
