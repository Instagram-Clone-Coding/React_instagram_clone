import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HomeType } from "@type";
import {
    getExtraArticle,
    getHomeArticles,
} from "app/store/ducks/home/homThunk";

const DUMMY_ARTICLES: HomeType.ArticleProps[] = [
    {
        postId: 10,
        followingMemberUsernameLikedPost: null,
        memberImageUrl:
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        memberNickname: "spursofficial",
        memberUsername: "Tottenham Hotspur",
        postBookmarkFlag: false,
        postCommentsCount: 0,
        postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        postImageDTOs: [
            {
                id: 12,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
            {
                id: 13,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 70,
                        },
                    },
                ],
            },
            {
                id: 14,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
        ],
        postLikeFlag: true,
        postLikesCount: 24,
        postUploadDate: "2022-01-03T13:33:00",
    },
    {
        postId: 11,
        followingMemberUsernameLikedPost: "followingUser",
        memberImageUrl:
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        memberNickname: "spursofficial",
        memberUsername: "Tottenham Hotspur",
        postBookmarkFlag: false,
        postCommentsCount: 0,
        postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        postImageDTOs: [
            {
                id: 12,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
            {
                id: 13,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 70,
                        },
                    },
                ],
            },
            {
                id: 14,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
        ],
        postLikeFlag: true,
        postLikesCount: 24,
        postUploadDate: "2022-01-03T13:33:00",
    },
    {
        postId: 12,
        followingMemberUsernameLikedPost: null,
        memberImageUrl:
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        memberNickname: "spursofficial",
        memberUsername: "Tottenham Hotspur",
        postBookmarkFlag: false,
        postCommentsCount: 0,
        postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        postImageDTOs: [
            {
                id: 12,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
            {
                id: 13,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 70,
                        },
                    },
                ],
            },
            {
                id: 14,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
        ],
        postLikeFlag: true,
        postLikesCount: 24,
        postUploadDate: "2022-01-03T13:33:00",
    },
    {
        postId: 13,
        followingMemberUsernameLikedPost: null,
        memberImageUrl:
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        memberNickname: "spursofficial",
        memberUsername: "Tottenham Hotspur",
        postBookmarkFlag: false,
        postCommentsCount: 0,
        postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        postImageDTOs: [
            {
                id: 12,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
            {
                id: 13,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 70,
                        },
                    },
                ],
            },
            {
                id: 14,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
        ],
        postLikeFlag: true,
        postLikesCount: 24,
        postUploadDate: "2022-01-03T13:33:00",
    },
    {
        postId: 14,
        followingMemberUsernameLikedPost: null,
        memberImageUrl:
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        memberNickname: "spursofficial",
        memberUsername: "Tottenham Hotspur",
        postBookmarkFlag: false,
        postCommentsCount: 0,
        postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        postImageDTOs: [
            {
                id: 12,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
            {
                id: 13,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 70,
                        },
                    },
                ],
            },
            {
                id: 14,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
        ],
        postLikeFlag: true,
        postLikesCount: 24,
        postUploadDate: "2022-01-03T13:33:00",
    },
    {
        postId: 15,
        followingMemberUsernameLikedPost: null,
        memberImageUrl:
            "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
        memberNickname: "spursofficial",
        memberUsername: "Tottenham Hotspur",
        postBookmarkFlag: false,
        postCommentsCount: 0,
        postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
        이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
        postImageDTOs: [
            {
                id: 12,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
            {
                id: 13,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 70,
                        },
                    },
                ],
            },
            {
                id: 14,

                postImageUrl:
                    "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
                postTagDTOs: [
                    {
                        id: 12,
                        tag: {
                            username: "dummyUsername",
                            x: 30,
                            y: 40,
                        },
                    },
                    {
                        id: 13,
                        tag: {
                            username: "dummyUsername",
                            x: 60,
                            y: 60,
                        },
                    },
                ],
            },
        ],
        postLikeFlag: true,
        postLikesCount: 24,
        postUploadDate: "2022-01-03T13:33:00",
    },
];

const EXTRA_ARTICLES: HomeType.ArticleProps = {
    postId: 102,
    followingMemberUsernameLikedPost: null,
    memberImageUrl:
        "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
    memberNickname: "spursofficial",
    memberUsername: "Tottenham Hotspur",
    postBookmarkFlag: false,
    postCommentsCount: 0,
    postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
    postImageDTOs: [
        {
            id: 12,
            postImageUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",

            postTagDTOs: [
                {
                    id: 12,
                    tag: {
                        username: "dummyUsername",
                        x: 30,
                        y: 40,
                    },
                },
                {
                    id: 13,
                    tag: {
                        username: "dummyUsername",
                        x: 60,
                        y: 60,
                    },
                },
            ],
        },
        {
            id: 13,
            postImageUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",

            postTagDTOs: [
                {
                    id: 12,
                    tag: {
                        username: "dummyUsername",
                        x: 60,
                        y: 70,
                    },
                },
            ],
        },
        {
            id: 14,
            postImageUrl:
                "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
            postTagDTOs: [
                {
                    id: 12,
                    tag: {
                        username: "dummyUsername",
                        x: 30,
                        y: 40,
                    },
                },
                {
                    id: 13,
                    tag: {
                        username: "dummyUsername",
                        x: 60,
                        y: 60,
                    },
                },
            ],
        },
    ],
    postLikeFlag: true,
    postLikesCount: 24,
    postUploadDate: "2022-01-03T13:33:00",
};

// 좋아요 여부를 따로? 아니면 내가 필터링?
// 좋아요 수를 따로? 아니면 내가 arr 길이 계산?

const initialState: HomeType.homeStateProps = {
    storiesScrollPosition: "left",
    articles: [],
    isLoading: true, /// dummy
    isExtraArticleLoading: false,
    extraArticlesCount: 0,
    isAsyncError: false,
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
            action: PayloadAction<HomeType.StoriesScrollPositionType>,
        ) => {
            state.storiesScrollPosition = action.payload;
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
        increaseExtraArticlesCount: (state) => {
            state.extraArticlesCount++;
        },
    },
    extraReducers: (build) => {
        build
            .addCase(getHomeArticles.pending, (state) => {
                state.isLoading = true;
                state.isAsyncError = false;
            })
            .addCase(
                getHomeArticles.fulfilled,
                (state, action: PayloadAction<HomeType.ArticleProps[]>) => {
                    state.articles = action.payload;
                    state.isLoading = false;
                },
            )
            .addCase(getHomeArticles.rejected, (state) => {
                state.isLoading = false;
                state.isAsyncError = true;
                state.articles = DUMMY_ARTICLES; // 엑세스 토큰 관련 코드 받으면 수정
            })
            .addCase(getExtraArticle.pending, (state, action) => {
                state.isExtraArticleLoading = true;
                state.isAsyncError = false;
            })
            .addCase(getExtraArticle.fulfilled, (state, action) => {
                state.isExtraArticleLoading = false;
                state.articles.push(action.payload);
            })
            .addCase(getExtraArticle.rejected, (state, action) => {
                state.isExtraArticleLoading = false;
                state.isAsyncError = true;
            });
    },
});

export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;
