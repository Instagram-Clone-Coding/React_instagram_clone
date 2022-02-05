import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequestType, Token } from "./authThunk.type";
import { customAxios } from "customAxios";

axios.defaults.withCredentials = true; // 백엔드와 쿠키공유 허용 -> 글로벌?

export const checkUsername = createAsyncThunk<boolean, { username: string }>(
    "auth/checkUsername",
    async (payload, ThunkOptions) => {
        try {
            const {
                data: { data },
            } = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/accounts/check?username=${payload.username}`,
            );
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

// 토큰재발급
export const reissueToken = createAsyncThunk<Token, void>(
    "auth/reissueToken",
    async () => {
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_BASE_URL}/reissue`,
            );
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    },
);
