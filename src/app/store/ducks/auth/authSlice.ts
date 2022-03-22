import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FormState } from "./authThunk.type";
import { getUserInfo, signIn } from "./authThunk";
import { setAccessTokenInAxiosHeaders } from "customAxios";

export interface AuthStateProps {
    isLogin: boolean;
    isLoading: boolean;
    isAsyncReject: boolean;
    errorMessage: string | undefined;
    hasUsername: boolean | null;
    isRefreshTokenChecking: boolean;
    currentFormState: FormState;
    signUpUserData: AuthType.signUpUserData | null;
    userInfo: AuthType.UserInfo | null;
    hasNotification: boolean;
    resetPassword: AuthType.resetPasswordState;
}

const initialState: AuthStateProps = {
    isLogin: false,
    isLoading: false,
    isAsyncReject: false,
    errorMessage: "",
    hasUsername: null,
    isRefreshTokenChecking: true,
    currentFormState: "signIn",
    signUpUserData: null,
    userInfo: null,
    hasNotification: false,
    resetPassword: { email: undefined },
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
            // userData 가져오는 거, 헤더에서 작업하는게 나으려나
        },
        logout: (state) => {
            state.isLogin = false;
        },
        finishRefreshTokenChecking: (state) => {
            state.isRefreshTokenChecking = false;
        },
        hasUser: (state, action: PayloadAction<{ data: boolean }>) => {
            state.hasUsername = !action.payload.data;
        },
        changeFormState: (state, action: PayloadAction<FormState>) => {
            state.currentFormState = action.payload;
        },
        saveUserInputTemporary: (
            state,
            action: PayloadAction<AuthType.signUpUserData>,
        ) => {
            state.signUpUserData = action.payload;
        },
        resetUserInputData: (state) => {
            state.signUpUserData = null;
        },
        changeButtonLoadingState: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        insertUserEmail: (
            state,
            action: PayloadAction<AuthType.resetPasswordState>,
        ) => {
            state.resetPassword.email = action.payload.email;
        },
        resetUserEmail: (state) => {
            state.resetPassword.email = undefined;
        },
        showNotification: (state) => {
            state.hasNotification = true;
        },
        closeNotification: (state) => {
            state.hasNotification = false;
        },
    },
    extraReducers: (bulid) => {
        bulid
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.isAsyncReject = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLogin = true;
                setAccessTokenInAxiosHeaders(action.payload);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isAsyncReject = true;
                state.isLoading = false;
                if (action.payload && typeof action.payload === "string") {
                    state.errorMessage = action.payload;
                } else if (state.hasUsername) {
                    state.errorMessage = `잘못된 비밀번호입니다. 다시 확인하세요.`;
                } else {
                    state.errorMessage = `입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.`;
                }
            })
            .addCase(getUserInfo.pending, (state) => {})
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.userInfo = action.payload;
            });
    },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
