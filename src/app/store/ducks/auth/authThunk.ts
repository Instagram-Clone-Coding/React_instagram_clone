import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignInRequestType, LoginDevice } from "./authThunk.type";
import { authorizedCustomAxios, customAxios } from "customAxios";
import { authAction } from "app/store/ducks/auth/authSlice";

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
            const response = await authorizedCustomAxios.get(
                "/accounts/profile",
            );
            return response.data.data;
        } catch (error) {
            // error === FAIL_TO_REISSUE_MESSAGE &&
            //     ThunkOptions.dispatch(authAction.logout());
            throw ThunkOptions.rejectWithValue(error);
        }
    },
);

export const getLoginDevice = createAsyncThunk<LoginDevice[], void>(
    "auth/loginDevice",
    async (payload, ThunkOptions) => {
        try {
            const response = await authorizedCustomAxios.get(
                `/accounts/login/device`,
            );
            return response.data.data;
        } catch (error) {}
    },
);

export const checkCurrentURL = createAsyncThunk<
    void,
    { code: string; username: string }
>("auth/checkResetPassword", async (payload, ThunkOptions) => {
    try {
        const config = {
            params: {
                code: payload.code,
                username: payload.username,
            },
        };
        const { data } = await customAxios.get(
            `/accounts/password/reset`,
            config,
        );
        console.log(data);
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const resetPassword = createAsyncThunk<
    AuthType.Token,
    { code: string; username: string; newPassword: string }
>("auth/resetPassword", async (payload, ThunkOptions) => {
    try {
        const { data } = await customAxios.put(`/accounts/password/reset`, {
            code: payload.code,
            username: payload.username,
            newPassword: payload.newPassword,
        });
        return data.data;
    } catch (error) {
        throw ThunkOptions.rejectWithValue(error);
    }
});

export const signInUseCode = createAsyncThunk<
    AuthType.Token,
    { code: string; username: string }
>("auth/signInUseCode", async (payload, ThunkOptions) => {
    const { data } = await customAxios.post(`/login/recovery`, {
        code: payload.code,
        username: payload.username,
    });
    return data.data;
});

export const logout = createAsyncThunk<void, void>(
    "auth/logout",
    async (payload, ThunkOptions) => {
        try {
            await authorizedCustomAxios.post(`/logout`);
        } catch (error) {
            ThunkOptions.rejectWithValue(error);
        }
    },
);

export const deviceLogout = createAsyncThunk<
    void,
    { tokenId: string; current: boolean }
>("auth/deviceLogout", async (payload, ThunkOptions) => {
    try {
        await authorizedCustomAxios.post(`logout/device`, null, {
            params: { tokenId: payload.tokenId },
        });
        if (payload.current) {
            ThunkOptions.dispatch(authAction.logout());
        } else {
            ThunkOptions.dispatch(getLoginDevice());
        }
    } catch (error) {
        ThunkOptions.rejectWithValue(error);
    }
});
