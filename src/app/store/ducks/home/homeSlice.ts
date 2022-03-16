import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    deleteLike,
    getExtraArticle,
    getHomeArticles,
    postFollow,
    postUnfollow,
    postLike,
} from "app/store/ducks/home/homThunk";
import { stat } from "fs";

// const DUMMY_ARTICLES: HomeType.ArticleStateProps[] = [
//     {
//         followLoading: false,
//         isFollowing: true,
//         postId: 10,
//         followingMemberUsernameLikedPost: null,
//         memberImageUrl:
//             "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//         memberNickname: "spursofficial",
//         memberUsername: "Tottenham Hotspur",
//         postBookmarkFlag: false,
//         postCommentsCount: 0,
//         postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
//         postImageDTOs: [
//             {
//                 id: 12,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 13,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 70,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 14,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//         ],
//         postLikeFlag: true,
//         postLikesCount: 24,
//         postUploadDate: "2022-01-03T13:33:00",
//     },
//     {
//         followLoading: false,
//         isFollowing: true,
//         postId: 11,
//         followingMemberUsernameLikedPost: "followingUser",
//         memberImageUrl:
//             "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//         memberNickname: "spursofficial",
//         memberUsername: "Tottenham Hotspur",
//         postBookmarkFlag: false,
//         postCommentsCount: 0,
//         postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
//         postImageDTOs: [
//             {
//                 id: 12,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 13,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 70,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 14,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//         ],
//         postLikeFlag: true,
//         postLikesCount: 24,
//         postUploadDate: "2022-01-03T13:33:00",
//     },
//     {
//         followLoading: false,
//         isFollowing: true,
//         postId: 12,
//         followingMemberUsernameLikedPost: null,
//         memberImageUrl:
//             "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//         memberNickname: "spursofficial",
//         memberUsername: "Tottenham Hotspur",
//         postBookmarkFlag: false,
//         postCommentsCount: 0,
//         postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
//         postImageDTOs: [
//             {
//                 id: 12,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 13,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 70,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 14,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//         ],
//         postLikeFlag: true,
//         postLikesCount: 24,
//         postUploadDate: "2022-01-03T13:33:00",
//     },
//     {
//         followLoading: false,
//         isFollowing: true,
//         postId: 13,
//         followingMemberUsernameLikedPost: null,
//         memberImageUrl:
//             "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//         memberNickname: "spursofficial",
//         memberUsername: "Tottenham Hotspur",
//         postBookmarkFlag: false,
//         postCommentsCount: 0,
//         postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
//         postImageDTOs: [
//             {
//                 id: 12,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 13,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 70,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 14,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//         ],
//         postLikeFlag: true,
//         postLikesCount: 24,
//         postUploadDate: "2022-01-03T13:33:00",
//     },
//     {
//         followLoading: false,
//         isFollowing: true,
//         postId: 14,
//         followingMemberUsernameLikedPost: null,
//         memberImageUrl:
//             "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//         memberNickname: "spursofficial",
//         memberUsername: "Tottenham Hotspur",
//         postBookmarkFlag: false,
//         postCommentsCount: 0,
//         postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
//         postImageDTOs: [
//             {
//                 id: 12,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 13,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 70,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 14,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//         ],
//         postLikeFlag: true,
//         postLikesCount: 24,
//         postUploadDate: "2022-01-03T13:33:00",
//     },
//     {
//         followLoading: false,
//         isFollowing: true,
//         postId: 15,
//         followingMemberUsernameLikedPost: null,
//         memberImageUrl:
//             "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//         memberNickname: "spursofficial",
//         memberUsername: "Tottenham Hotspur",
//         postBookmarkFlag: false,
//         postCommentsCount: 0,
//         postContent: `이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.
//         이 영역은 토트넘 핫스퍼 공식 계정 글입니다.`,
//         postImageDTOs: [
//             {
//                 id: 12,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 13,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 70,
//                         },
//                     },
//                 ],
//             },
//             {
//                 id: 14,

//                 postImageUrl:
//                     "https://images.unsplash.com/photo-1497316730643-415fac54a2af?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80",
//                 postTagDTOs: [
//                     {
//                         id: 12,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 30,
//                             y: 40,
//                         },
//                     },
//                     {
//                         id: 13,
//                         tag: {
//                             username: "dummyUsername",
//                             x: 60,
//                             y: 60,
//                         },
//                     },
//                 ],
//             },
//         ],
//         postLikeFlag: true,
//         postLikesCount: 24,
//         postUploadDate: "2022-01-03T13:33:00",
//     },
// ];

const initialState: HomeType.homeStateProps = {
    storiesScrollPosition: "left",
    articles: [],
    isLoading: true,
    isExtraArticleLoading: false,
    extraArticlesCount: 0,
    isAsyncError: false,
    hoveredUser: null,
    isCopiedNotification: false,
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
            .addCase(getHomeArticles.fulfilled, (state, action) => {
                state.articles = action.payload;
                state.isLoading = false;
            })
            .addCase(getHomeArticles.rejected, (state) => {
                state.isLoading = false;
                state.isAsyncError = true;
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
            })
            .addCase(postUnfollow.fulfilled, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.isFollowing = false;
                    }
                });
            })
            .addCase(postUnfollow.rejected, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.isFollowing = true;
                    }
                });
            })
            .addCase(postFollow.pending, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.followLoading = true;
                    }
                });
            })
            .addCase(postFollow.fulfilled, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.followLoading = false;
                        article.isFollowing = true;
                    }
                });
            })
            .addCase(postFollow.rejected, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.followLoading = false;
                        article.isFollowing = false;
                    }
                });
            })
            .addCase(postLike.pending, (state) => {
                state.isAsyncError = false;
            })
            .addCase(postLike.rejected, (state, action) => {
                state.isAsyncError = true;
            })
            .addCase(deleteLike.pending, (state) => {
                state.isAsyncError = false;
            })
            .addCase(deleteLike.rejected, (state, action) => {
                state.isAsyncError = true;
            });
    },
});

export const homeReducer = homeSlice.reducer;

export const homeActions = homeSlice.actions;
