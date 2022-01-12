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
        // headers: { Authorization: `Bearer ${payload.token}` },
        headers: {
            Authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTY0MTk4NDYyNH0.DRxdk2XiiMajyFX47ZJXxtn6F1GJ9esiWXRPN90-vgrG0vsLTz6EAmkBUvwXWN6qylgC32fcVqGZODsHrPlD_g`,
        },
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
        console.log(data);
        return data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

// export const getExtraArticle = createAsyncThunk<
//     HomeType.ArticleProps,
//     {
//         token: string;
//         page: number;
//         size: number;
//     }
// >("home/getExtraArticle", async (payload, ThunkOptions) => {});
