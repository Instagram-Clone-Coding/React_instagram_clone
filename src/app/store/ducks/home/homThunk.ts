import { createAsyncThunk } from "@reduxjs/toolkit";
import { authorizedCustomAxios } from "customAxios";
import { homeActions } from "app/store/ducks/home/homeSlice";
import {
    ExtraArticleProps,
    RecentArticlesProps,
} from "app/store/ducks/home/homeThunk.type";
import { FAIL_TO_REISSUE_MESSAGE } from "utils/constant";
import { authAction } from "app/store/ducks/auth/authSlice";

export const getHomeArticles = createAsyncThunk<PostType.ArticleStateProps[]>(
    "home/getHomeArticles",
    async (payload, ThunkOptions) => {
        try {
            const {
                data: { data },
            }: RecentArticlesProps = await authorizedCustomAxios.get(
                `/posts/recent`,
            );
            const articlesState: PostType.ArticleStateProps[] = data.map(
                (article) => ({
                    ...article,
                    followLoading: false,
                }),
            );
            return articlesState;
        } catch (error) {
            // error === FAIL_TO_REISSUE_MESSAGE &&
            //     ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);

export const getExtraArticle = createAsyncThunk<
    PostType.ArticleStateProps,
    {
        page: number;
    }
>("home/getExtraArticle", async (payload, ThunkOptions) => {
    const config = {
        params: {
            page: payload.page,
        },
    };
    try {
        const {
            data: {
                data: { content: data, empty },
            },
        }: ExtraArticleProps = await authorizedCustomAxios.get(
            `/posts`,
            config,
        ); // 단건 조회 api 추가

        if (empty) {
            throw ThunkOptions.rejectWithValue(
                "게시물이 더 이상 존재하지 않습니다.",
            );
        }
        ThunkOptions.dispatch(homeActions.increaseExtraArticlesCount());
        const articleState: PostType.ArticleStateProps = {
            ...data[0],
            // isFollowing: true,
            followLoading: false,
        };
        return articleState;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const postUnfollow = createAsyncThunk<
    string, // 이후 데이터 보고 수정
    {
        username: string;
    }
>("home/postUnfollow", async (payload, ThunkOptions) => {
    try {
        const {
            data: { data },
        } = await authorizedCustomAxios.delete(`/${payload.username}/follow`);

        return data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const postFollow = createAsyncThunk<
    string, // 이후 데이터 보고 수정
    {
        username: string;
    }
>("home/postFollow", async (payload, ThunkOptions) => {
    try {
        const {
            data: { data: isSuccess },
            data,
        } = await authorizedCustomAxios.post(
            `/${payload.username}/follow`,
            null,
        );
        if (
            data.code === "F006" ||
            data.message === "팔로우할 수 없는 대상입니다."
        ) {
            throw ThunkOptions.rejectWithValue("차단");
        }
        return isSuccess;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const postLike = createAsyncThunk<
    {
        status: number;
        code: string;
        message: string;
        errors?: [];
        data?: {
            status: boolean;
        };
    },
    // any,
    { postId: number }
>("home/postLike", async (payload, ThunkOptions) => {
    const config = {
        params: {
            postId: payload.postId,
        },
    };
    try {
        const { data } = await authorizedCustomAxios.post(
            `/posts/like`,
            null,
            config,
        );
        return data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const deleteLike = createAsyncThunk<
    {
        status: number;
        code: string;
        message: string;
        errors?: [];
        data?: {
            status: boolean;
        };
    },
    { postId: number }
>("home/deleteLike", async (payload, ThunkOptions) => {
    const config = {
        params: {
            postId: payload.postId,
        },
    };
    try {
        const { data } = await authorizedCustomAxios.delete(
            `/posts/like`,
            config,
        );
        return data;
    } catch (error) {
        error === FAIL_TO_REISSUE_MESSAGE &&
            ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
});
