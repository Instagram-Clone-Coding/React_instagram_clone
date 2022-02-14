import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteRoom, lookUpChatList, lookUpChatMessageList, lookUpChatRoom, makeRoom } from "./DirectThunk";


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
    typingRoomList: {timer:NodeJS.Timeout,roomId:number}[];
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
        addChatMessageItem: (state, action: PayloadAction<any>) => {
            state.chatMessageList.push(action.payload.data);
        },
        addTyping: (state, action: PayloadAction<{timer:NodeJS.Timeout,roomId:number}>) => {
            if (!state.typingRoomList.includes(action.payload)) {
                state.typingRoomList.push(action.payload);
            }
        },
        removeTyping: (state, action: PayloadAction<number>) => {
            state.typingRoomList = state.typingRoomList.filter(typingRoom => {
                return typingRoom.roomId !== action.payload
            })
        },
        reissueTyping : (state,action:PayloadAction<{timer:NodeJS.Timeout,roomId:number}>) => {
            console.log("리이슈해주자");
            state.typingRoomList = state.typingRoomList.map(typingRoom => {
                return typingRoom.roomId === action.payload.roomId ? {roomId:action.payload.roomId , timer:action.payload.timer} : typingRoom
            })
        }
    },
    extraReducers: (build) => {
        build
            .addCase(makeRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(makeRoom.fulfilled, (state, action) => {
                state.isLoading = false;
                console.log(action.payload);
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
                state.isLoading = true;
            })
            .addCase(deleteRoom.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatRoom.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatRoom.fulfilled, (state, action) => {
                state.selectedChatItem = action.payload;
            })
            .addCase(lookUpChatRoom.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatList.fulfilled, (state, action) => {
                action.payload.content.forEach((chatListItem: any) => {
                    state.chatList.push(chatListItem);
                });
                state.chatListPage = state.chatListPage + 1;
            })
            .addCase(lookUpChatList.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(lookUpChatMessageList.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(lookUpChatMessageList.fulfilled, (state, action) => {
                action.payload.content.forEach((chatMessageListItem: Direct.MessageDTO) => {
                    state.chatMessageList.push(chatMessageListItem);
                });
                state.chatListPage = state.chatListPage + 1;
            })
            .addCase(lookUpChatMessageList.rejected, (state) => {
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
    addTyping,
    removeTyping,reissueTyping

} = directSlice.actions;
export const directReducer = directSlice.reducer;
