import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    addTyping,
    deleteRoom,
    lookUpChatList,
    lookUpChatMessageList,
    lookUpChatRoom,
    makeRoom, reissueTyping,
    removeTyping,
} from "./DirectThunk";


export interface InitialStateType {
    modal: Direct.modalType;
    view: Direct.currentSectionViewType;
    selectedChatItem: number | null;
    selectedNewChatUser: string | null;
    selectedRoom: Direct.RoomsProps | null;
    isLoading: boolean;
    chatList: Direct.ChatItem[];
    chatListPage: number;
    chatMessageList: Direct.MessageDTO[];
    chatMessageListPage: number;
    typingRoomList: { roomId: number, timer: number }[];
    renewScroll: boolean;
    subChatCount: number; // 채팅메시지 subscribe 를 통해서 읽은 개수입니다.
}


const initialState: InitialStateType = {
    modal: null,
    view: "inbox",
    selectedChatItem: null,
    selectedNewChatUser: null,
    selectedRoom: null,
    isLoading: false,
    chatList: [],
    chatMessageList: [],
    chatListPage: 1,
    chatMessageListPage: 1,
    typingRoomList: [],
    renewScroll: false,
    subChatCount: 0,
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
        selectView: (state, action: PayloadAction<Direct.currentSectionViewType>) => {
            state.view = action.payload;
        },
        selectChatItem: (state, action: PayloadAction<number | null>) => {
            state.selectedChatItem = action.payload;
        },
        selectNewChatUser: (state, action: PayloadAction<string | null>) => {
            state.selectedNewChatUser = action.payload;
        },
        unSelectNewChatUser: (state) => {
            state.selectedNewChatUser = null;
        },
        resetChatMessageList: (state) => {
            state.chatMessageList = [];
            state.chatListPage = 1;
        },
        resetChatMessagePage: (state) => {
            state.chatMessageListPage = 1;
        },
        addChatMessageItem: (state, action: PayloadAction<any>) => {
            // state.renewScroll = true;
            state.chatMessageList.push(action.payload.data);
        },
        addSubChatCount: (state) => {
            state.subChatCount = state.subChatCount + 1;
        },
        resetSubChatCount : (state) => {
            state.subChatCount = 0;
        },
        resetSelectedRoom : (state) => {
            state.selectedRoom = null
        }
    },
    extraReducers: (build) => {
        build
            .addCase(makeRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makeRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                state.selectedRoom = action.payload;
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
                if (action.payload.pageUp) {
                    action.payload.content.forEach((chatListItem: any) => {
                        state.chatList.push(chatListItem);
                    });
                    state.chatListPage = state.chatListPage + 1;
                } else {
                    // 웹소켓을 통해 알림이 와서 채팅방 목록의 unseenFlag 와 마지막 메세지를 갱신해줄 경우
                    // 10개 넘어가면 바꿔쳐주는 로직 필요함 .
                    state.chatList = action.payload.content;
                }
                state.isLoading = false;

            })
            .addCase(lookUpChatList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatMessageList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatMessageList.fulfilled, (state, action) => {
                state.isLoading = false

                // 첫번째 page 일땐 13시에보낸거 14시에버낸거 15시에보낸거 순서대로 오고 두번째부터는 리버스 할 필요가없다
                // 13시 부터 뿌려줘야되죠
                // 15 14 13
                // [10시에보낸거 11시에보낸거 12시에보낸거]
                // [13시에보낸거, 14시에보낸거, 15시에보낸거]

                state.renewScroll = false;
                if (state.chatMessageListPage === 1) {
                    action.payload.reverse().forEach((chatMessageListItem: Direct.MessageDTO) => {
                        state.chatMessageList.push(chatMessageListItem);
                    });
                } else {
                    action.payload.forEach((chatMessageListItem: Direct.MessageDTO) => {
                        state.chatMessageList.unshift(chatMessageListItem);
                    });
                    // 추가로 받은 메세지 정보중에 기존의 정보가 있을 수 있다 페이지 단위로 메세지를 10개씩 받고있기 때문
                    // 중복 id 를 가진것은 제거해주자!
                    state.chatMessageList = state.chatMessageList.filter(
                        (chatMessageListItem,index,callback) => index === callback.findIndex(t => t.messageId === chatMessageListItem.messageId)
                    )
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
                state.typingRoomList.push({ roomId: action.payload.roomId, timer: action.payload.timer });
            })
            .addCase(addTyping.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(removeTyping.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(removeTyping.fulfilled, (state, action) => {
                state.typingRoomList = state.typingRoomList.filter(typingRoom => {
                    if (typingRoom.roomId === action.payload) {
                        clearTimeout(typingRoom.timer);
                    }
                    return typingRoom.roomId !== action.payload;
                });
            })
            .addCase(removeTyping.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(reissueTyping.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(reissueTyping.fulfilled, (state, action) => {

                // 타이머 제거해주기
                state.typingRoomList.forEach(typingRoom => {
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
    resetSelectedRoom

} = directSlice.actions;
export const directReducer = directSlice.reducer;
