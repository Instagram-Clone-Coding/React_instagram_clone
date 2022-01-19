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
                { password: payload.password, username: payload.id },
                // payload를 그대로 이용하면 안됨
                // A non-serializable value was detected in an action, in the path: `payload`
            );
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
    // 고려해야할 것
    // 계정전환 -> 쿠키 복수로 저장** -> access refresh? 둘 다?

    // accessToken
    axios.defaults.headers.common[`Authorization`] = `${type} ${accessToken}`;

    // refreshToken

    // 토큰재발급
    const TOKEN_EXPIRY_TIME = 10 * 60;
    setTimeout(reissueToken, TOKEN_EXPIRY_TIME - 30000);
    // accessToken 만료기간 추가되면, 대체하기(다음 배포때 추가한다고 확인받음)
};
