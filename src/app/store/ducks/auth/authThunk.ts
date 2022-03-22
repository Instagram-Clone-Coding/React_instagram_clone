import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequestType } from "./authThunk.type";
import { authAction } from "./authSlice";
import { authorizedCustomAxios, customAxios } from "customAxios";
import { FAIL_TO_REISSUE_MESSAGE } from "../../../../utils/constant";

// 로그인(토큰최초발급) + 토큰만료 시, 로그인 홈페이지로 **
export const signIn = createAsyncThunk<AuthType.Token, SignInRequestType>(
    "auth/signIn",
    async (payload, ThunkOptions) => {
        try {
            const {
                data: { data },
            } = await customAxios.post(`/login`, {
                password: payload.password,
                username: payload.username,
            });
            return data;
        } catch (error) {
            if (!window.navigator.onLine) {
                throw ThunkOptions.rejectWithValue(`네트워크 연결 확인하세요`);
            } else {
                const checkUsername = async () => {
                    try {
                        const config = {
                            params: {
                                username: payload.username,
                            },
                        };
                        const { data } = await customAxios.get(
                            `/accounts/check`,
                            config,
                        );
                        return data;
                    } catch (error) {
                        throw ThunkOptions.rejectWithValue(error);
                    }
                };
                await ThunkOptions.dispatch(checkUsername).then((result) => {
                    ThunkOptions.dispatch(authAction.hasUser(result));
                });
                throw ThunkOptions.rejectWithValue(error);
            }
        }
    },
);

export const getUserInfo = createAsyncThunk<AuthType.UserInfo>(
    "auth/userInfo",
    async (payload, ThunkOptions) => {
        try {
            const response = await authorizedCustomAxios.get("/menu/profile");
            return response.data.data;
        } catch (error) {
            error === FAIL_TO_REISSUE_MESSAGE &&
                ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);
