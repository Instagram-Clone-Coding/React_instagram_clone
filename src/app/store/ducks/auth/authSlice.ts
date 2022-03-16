import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken } from "customAxios";
import { FormState } from "./authThunk.type";
import { getUserInfo, signIn } from "./authThunk";

export interface AuthStateProps {
    isLogin: boolean;
    isLoading: AuthType.Loading;
    isAsyncReject: boolean;
    errorMessage: string | undefined;
    hasUsername: boolean | null;
    isRefreshTokenChecking: boolean;
    currentFormState: FormState;
    signUpUserData: AuthType.signUpUserData | null;
    userInfo: AuthType.UserInfo | null;
    resetPassword: AuthType.resetPasswordState;
    // login, signup, resetPassword로 분류해서 상태값 관리 vs 비슷한 기능끼리 분류(isLoading, userData)
    // 앞에꺼로 해야지, 왜냐면 상태값을 직관적으로 찾을 수 있을 거 같아서
}

const initialState: AuthStateProps = {
    isLogin: false,
    isLoading: {
        login: false,
        signUp: false,
        checkEmailCode: false,
        resetPasswordEmail: false,
    },
    isAsyncReject: false,
    errorMessage: "",
    hasUsername: null,
    isRefreshTokenChecking: true,
    currentFormState: "signIn",
    signUpUserData: null,
    userInfo: null,
    resetPassword: { email: "" },
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
        signUpButtonLoading: (state) => {
            state.isLoading.signUp = true;
        },
        signUpButtonLoadingEnd: (state) => {
            state.isLoading.signUp = false;
        },
        checkEmailCodeButtonLoading: (state) => {
            state.isLoading.checkEmailCode = true;
        },
        checkEmailCodeButtonLoadingEnd: (state) => {
            state.isLoading.checkEmailCode = false;
        },
        resetPasswordEmailLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading.resetPasswordEmail = action.payload;
        },
        insertUserEmail: (
            state,
            action: PayloadAction<AuthType.resetPasswordState>,
        ) => {
            state.resetPassword.email = action.payload.email;
        },
    },
    extraReducers: (bulid) => {
        bulid
            .addCase(signIn.pending, (state) => {
                state.isLoading.login = true;
                state.isAsyncReject = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading.login = false;
                state.isLogin = true;
                saveToken(action.payload);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isAsyncReject = true;
                state.isLoading.login = false;
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
