import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequestType, Token } from "./signinThunk.type";

// 로그인(토큰최초발급)
export const signIn = createAsyncThunk<Token, SignInRequestType>(
    "auth/signIn",
    async (payload, ThunkOptions) => {
        try {
            const response = await axios.post(
                `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/login`,
                { password: payload.password, username: payload.username },
                // payload를 그대로 이용하면 안됨
                // A non-serializable value was detected in an action, in the path: `payload`
            );
            // response.data.status === 200 -> username dispatch 하기 **여기서 처리하기
            return response.data;
        } catch (error) {
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);

// 토큰재발급
export const reissueToken = createAsyncThunk<Token, void>(
    "auth/reissueToken",
    async () => {
        try {
            // 쿠키 -> query
            const response = await axios.post(
                `http://ec2-3-36-185-121.ap-northeast-2.compute.amazonaws.com:8080/reissue?refreshToken=AAA.BBB.CCC`,
            );
            return response.data;
        } catch (error) {}
    },
);

export const saveToken = (user: string, token: Token) => {
    const { type, accessToken, refreshToken } = token.data;

    // accessToken
    axios.defaults.headers.common[`Authorization`] = `${type} ${accessToken}`;

    // refreshToken
    // 백엔드에서 생성해, 공유함

    // 토큰재발급
    // jwt토큰 decode해서 accessToken 만료기간 파싱해 이용해야함
};
