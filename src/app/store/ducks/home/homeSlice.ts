import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeType } from "@type";

const DUMMY_ARTICLES = [
    {
        imgs: [
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1", comment: "이게 첫 번째 댓글이다!!" },
            { username: "user2", comment: "이게 두 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
        ],
        createdAt: 1632738927077,
    },
    {
        imgs: [
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1", comment: "이게 첫 번째 댓글이다!!" },
            { username: "user2", comment: "이게 두 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
        ],
        createdAt: 1632638927077,
    },
    {
        imgs: [
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        ],
        location: "White Hart Lane Stadium",
        hashtags: ["#OnThisDay", "#안녕"],
        text: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        owner: {
            username: "spursofficial",
            avatarUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        },
        likes: ["like1", "like2", "like3", "like4"],
        comments: [
            { username: "user1", comment: "이게 첫 번째 댓글이다!!" },
            { username: "user2", comment: "이게 두 번째 댓글이다!!" },
            { username: "user3", comment: "이게 세 번째 댓글이다!!" },
        ],
        createdAt: 1632638927077,
    },
];

// 좋아요 여부를 따로? 아니면 내가 필터링?
// 좋아요 수를 따로? 아니면 내가 arr 길이 계산?

const initialState: HomeType.homeStateProps = {
    storiesScrollPosition: "left",
    articles: [],
    hoveredUser: null,
    isCopiedNotification: false,
    homeModal: {
        activatedModal: null,
        handledObj: null,
    },
};

const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {
        notificateIsCopied: (state) => {
            state.isCopiedNotification = true;
        },
        closeIsCopiedNotification: (state) => {
            state.isCopiedNotification = false;
        },
        changeStoriesScrollPosition: (
            state,
            action: PayloadAction<HomeType.storiesScrollPositionType>,
        ) => {
            state.storiesScrollPosition = action.payload;
        },
        // 비동기 받아와야 함
        getArticles: (state) => {
            state.articles = DUMMY_ARTICLES;
        },
        startModal: (state, action: PayloadAction<HomeType.homeModalProps>) => {
            state.homeModal = action.payload;
            // 비동기적으로 데이터를 가져옴
        },
        resetModal: (state) => {
            state.homeModal = {
                activatedModal: null,
                handledObj: null,
            };
        },
    },
});

export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;
