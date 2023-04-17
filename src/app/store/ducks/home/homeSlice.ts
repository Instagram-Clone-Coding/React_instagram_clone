import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
    deleteLike,
    getExtraArticle,
    getHomeArticles,
    postFollow,
    postUnfollow,
    postLike,
} from "app/store/ducks/home/homThunk";

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
        updateUploadedArticle: (
            state,
            action: PayloadAction<PostType.ArticleProps>,
        ) => {
            state.articles.unshift({
                ...action.payload,
                followLoading: false,
            });
        },
        updateRecentComments: (
            state,
            action: PayloadAction<{
                comment: PostType.CommentType;
                postId: number;
            }>,
        ) => {
            state.articles.forEach((article) => {
                if (article.postId === action.payload.postId) {
                    article.recentComments.unshift(action.payload.comment);
                }
            });
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
                        article.following = false;
                    }
                });
            })
            .addCase(postUnfollow.rejected, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.following = true;
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
                        article.following = true;
                    }
                });
            })
            .addCase(postFollow.rejected, (state, action) => {
                state.articles.forEach((article) => {
                    if (article.member.username === action.meta.arg.username) {
                        article.followLoading = false;
                        article.following = false;
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
