import { createAsyncThunk } from "@reduxjs/toolkit";
import { homeActions } from "app/store/ducks/home/homeSlice";
import {
    ExtraArticleProps,
    RecentArticlesProps,
} from "app/store/ducks/home/homeThunk.type";
import axios from "axios";

const BASE_URL =
    "http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080";

export const getHomeArticles = createAsyncThunk<
    HomeType.ArticleStateProps[],
    {
        token: string;
    }
>("home/getHomeArticles", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: { data },
        }: RecentArticlesProps = await axios.get(
            `${BASE_URL}/posts/recent`,
            config,
        );
        const articlesState: HomeType.ArticleStateProps[] = data.map(
            (article) => ({
                ...article,
                isFollowing: true,
                followLoading: false,
            }),
        );
        return articlesState;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const getExtraArticle = createAsyncThunk<
    HomeType.ArticleStateProps,
    {
        token: string;
        page: number;
    }
>("home/getExtraArticle", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: {
                data: { content: data, empty },
            },
        }: ExtraArticleProps = await axios.get(
            `${BASE_URL}/posts?page=${payload.page}`,
            config,
        ); // 단건 조회 api 추가

        if (empty) {
            throw ThunkOptions.rejectWithValue(
                "게시물이 더 이상 존재하지 않습니다.",
            );
        }
        ThunkOptions.dispatch(homeActions.increaseExtraArticlesCount());
        const articleState: HomeType.ArticleStateProps = {
            ...data[0],
            isFollowing: true,
            followLoading: false,
        };
        return articleState;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const postUnfollow = createAsyncThunk<
    string, // 이후 데이터 보고 수정
    {
        token: string;
        username: string;
    }
>("home/postUnfollow", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: { data },
        } = await axios.delete(
            `${BASE_URL}/${payload.username}/follow`,
            config,
        );
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const postFollow = createAsyncThunk<
    string, // 이후 데이터 보고 수정
    {
        token: string;
        username: string;
    }
>("home/postFollow", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: { data },
        } = await axios.post(
            `${BASE_URL}/${payload.username}/follow`,
            null,
            config,
        );
        return data;
    } catch (error) {
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
    { token: string; postId: number }
>("home/postLike", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
        params: {
            postId: payload.postId,
        },
    };
    try {
        const { data } = await axios.post(
            `${BASE_URL}/posts/like`,
            null,
            config,
        );
        return data;
    } catch (error) {
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
    // any,
    { token: string; postId: number }
>("home/deleteLike", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
        params: {
            postId: payload.postId,
        },
    };
    try {
        const { data } = await axios.delete(`${BASE_URL}/posts/like`, config);
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});
