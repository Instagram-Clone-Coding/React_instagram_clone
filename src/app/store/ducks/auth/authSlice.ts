import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken } from "customAxios";
import { signIn } from "./authThunk";

export interface AuthStateProps {
    isLogin: boolean;
    isLoading: boolean;
    isAsyncReject: boolean;
    errorMessage: string | undefined;
    hasUsername: boolean | null;
    isRefreshTokenChecking: boolean;
    currentFormState: "signUp" | "confirmEmail" | null;
    signUpUserData: signUpUserData | null;
}

interface signUpUserData {
    email: string;
    name: string;
    password: string;
    username: string;
}

const initialState: AuthStateProps = {
    isLoading: false,
    isLogin: false,
    isAsyncReject: false,
    errorMessage: "",
    hasUsername: null,
    isRefreshTokenChecking: true,
    currentFormState: null,
    signUpUserData: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
        finishRefreshTokenChecking: (state) => {
            state.isRefreshTokenChecking = false;
        },
        hasUser: (state, action: { payload: { data: boolean } }) => {
            state.hasUsername = !action.payload.data;
        },
        changeFormState: (
            state,
            action: PayloadAction<"signUp" | "confirmEmail" | null>,
        ) => {
            state.currentFormState = action.payload;
        },
        saveUserInputTemporary: (
            state,
            action: PayloadAction<signUpUserData | null>,
        ) => {
            state.signUpUserData = action.payload;
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
                saveToken(action.payload);
            })
            .addCase(signIn.rejected, (state) => {
                state.isAsyncReject = true;
                if (state.hasUsername) {
                    state.errorMessage = `잘못된 비밀번호입니다. 다시 확인하세요.`;
                } else {
                    state.errorMessage = `입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.`;
                }
            });
    },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
