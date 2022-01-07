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
    console.log(payload);
    const config = {
        headers: { Authorization: `Bearer ${payload.token}` },
    };
    try {
        const {
            data: {
                data: { content: data },
            },
        } = await axios.get(
            `https://instagram-test2.herokuapp.com/posts?page=${payload.page}&size=${payload.size}`,
            config,
        );
        return data;
    } catch (error) {
        console.log(error);
        ThunkOptions.rejectWithValue(error);
    }
});
