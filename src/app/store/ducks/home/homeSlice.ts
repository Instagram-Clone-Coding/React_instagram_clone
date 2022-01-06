import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

type storiesScrollPositionType = "left" | "right" | "center";

type activatedModalType =
    | "hover"
    | "unfollowing"
    | "report"
    | "articleMenu"
    | "shareWith"
    | null;

interface homeModalProps {
    activatedModal: activatedModalType;
    handledObj: null;
}

export interface homeStateProps {
    storiesScrollPosition: storiesScrollPositionType;
    articles: {
        imgs: string[];
        location: string;
        hashtags: string[];
        text: string;
        owner: {
            username: string;
            avatarUrl: string;
        };
        likes: string[];
        comments: {
            username: string;
            comment: string;
        }[];
        createdAt: number;
    }[]; // 백엔드에서 댓글과 이 게시물에 내가 좋아요를 눌렀는지까지 보내주는지 등등
    // request와 response에 대해 소통 필요
    hoveredUser: {
        avatarUrl: string;
        verified: boolean;
        isFollowing: boolean;
        realName: string;
        link: string;
        followingUsernames: string[];
        articlesNum: number;
        followersNum: number;
        followsNum: number;
        recentImgs: {
            src: string;
            param: string;
        }[]; // 최신 3개
    } | null;
    isCopiedNotification: boolean;
    homeModal: homeModalProps;
}

// 좋아요 여부를 따로? 아니면 내가 필터링?
// 좋아요 수를 따로? 아니면 내가 arr 길이 계산?

const initialState: homeStateProps = {
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
            action: PayloadAction<storiesScrollPositionType>,
        ) => {
            state.storiesScrollPosition = action.payload;
        },
        // 비동기 받아와야 함
        getArticles: (state) => {
            state.articles = DUMMY_ARTICLES;
        },
        startModal: (state, action: PayloadAction<homeModalProps>) => {
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
