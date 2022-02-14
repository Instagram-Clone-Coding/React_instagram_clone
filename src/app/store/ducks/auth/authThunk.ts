import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequestType, Token } from "./authThunk.type";
import { authorizedCustomAxios, customAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "../../../../utils/constant";
import { authAction } from "./authSlice";

export const checkUsername = createAsyncThunk<boolean, { username: string }>(
    "auth/checkUsername",
    async (payload, ThunkOptions) => {
        try {
            const config = {
                params: {
                    username: payload.username,
                },
            };
            const {
                data: { data },
            } = await customAxios.post(`/accounts/check`, config);
            return data;
        } catch (error) {
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);

// 로그인(토큰최초발급) + 토큰만료 시, 로그인 홈페이지로 **
export const signIn = createAsyncThunk<Token, SignInRequestType>(
    "auth/signIn",
    async (payload, ThunkOptions) => {
        try {
            const response = await customAxios.post(`/login`, {
                password: payload.password,
                username: payload.username,
            });
            return response.data;
        } catch (error) {
            if (String(error).includes("Network")) {
                // eventHandler -> network 에러처리하는 거 알려줌 navigator.online
                throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`); // 로그인 실패 | 네트워크 문제 | 서버 내부에러(status=500)
            } else {
                await ThunkOptions.dispatch(
                    checkUsername({ username: payload.username }),
                );
                throw ThunkOptions.rejectWithValue(error);
            }
        }
    },
);


export const getUserInfo = createAsyncThunk<AuthType.UserInfo>("auth/userInfo",async (payload,ThunkOptions) => {
    try{
        const response = await authorizedCustomAxios.get("/menu/profile")
        return response.data.data
    }catch (error){
        error === FAIL_TO_REISSUE_MESSAGE &&
        ThunkOptions.dispatch(authAction.logout());
        throw ThunkOptions.rejectWithValue(error);
    }
})