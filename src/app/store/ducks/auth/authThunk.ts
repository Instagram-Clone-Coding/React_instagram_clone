import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequestType, Token } from "./authThunk.type";

axios.defaults.withCredentials = true; // 백엔드와 쿠키공유 허용

// 로그인(토큰최초발급)
export const signIn = createAsyncThunk<Token, SignInRequestType>(
    "auth/signIn",
    async (payload, ThunkOptions) => {
        try {
            const response = await axios.post(
                `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/login`,
                { password: payload.password, username: payload.username },
            );
            return response.data;
        } catch (error) {
            throw ThunkOptions.rejectWithValue(error); // 로그인 실패 | 네트워크 문제 | 서버 내부에러
        }
    },
);

// 토큰재발급
export const reissueToken = createAsyncThunk<Token, void>(
    "auth/reissueToken",
    async () => {
        try {
            const response = await axios.post(
                `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/reissue`,
            );
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);

export const saveToken = (user: string, token: Token) => {
    const { type, accessToken } = token.data;
    const TOKEN_EXPIRY_TIME = 10 * 60 * 1000;

    axios.defaults.headers.common[`Authorization`] = `${type} ${accessToken}`;
    setTimeout(reissueToken, 2000); // 계정 전환 구현해야함**
};
