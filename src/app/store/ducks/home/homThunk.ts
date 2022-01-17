import { createAsyncThunk } from "@reduxjs/toolkit";
import { HomeType } from "@type";
import axios from "axios";

export const getHomeArticles = createAsyncThunk<
    HomeType.ArticleProps[],
    {
        token: string;
        page: number;
        size: number;
    }
>("home/getHomeArticles", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: {
                data: { content: data },
            },
        } = await axios.get(
            `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/posts?page=${payload.page}&size=${payload.size}`,
            config,
        );
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const getExtraArticle = createAsyncThunk<
    // HomeType.ArticleProps,
    null,
    {
        token: string;
    }
>("home/getExtraArticle", async (payload, ThunkOptions) => {
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: {
                data: { content: data },
            },
        } = await axios.get(""); // 단건 조회 api 추가
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});
