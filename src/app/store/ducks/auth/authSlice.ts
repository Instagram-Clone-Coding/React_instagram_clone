import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken } from "customAxios";
import { getUserInfo, signIn } from "./authThunk";

export interface AuthStateProps {
    username: string;
    isLogin: boolean;
    isLoading: boolean;
    isAsyncReject: boolean;
    errorMessage: string | undefined;
    hasUsername: boolean | null;
    isRefreshTokenChecking: boolean;
    userInfo:AuthType.UserInfo | null;
}

interface UserInfo {
    username: string;
}

const initialState: AuthStateProps = {
    username: "",
    isLoading: false,
    isLogin: false,
    isAsyncReject: false,
    errorMessage: "",
    hasUsername: null,
    isRefreshTokenChecking: true,
    userInfo:null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<UserInfo>) => {
            state.username = action.payload.username;
        },
        login: (state) => {
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
        },
        finishRefreshTokenChecking: (state) => {
            state.isRefreshTokenChecking = false;
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
                state.username = action.meta.arg.username;
                saveToken(action.payload);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isAsyncReject = true;
                if (action.payload) {
                    state.errorMessage = `잘못된 비밀번호입니다. 다시 확인하세요.`;
                } else {
                    state.errorMessage = `입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.`;
                }
            })
            .addCase(getUserInfo.pending,(state)=>{

            })
            .addCase(getUserInfo.fulfilled,(state,action) => {
                state.userInfo = action.payload;
            })
    },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
