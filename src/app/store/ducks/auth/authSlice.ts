import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken, signIn, reissueToken, checkUsername } from "./authThunk";

export interface AuthStateProps {
    username: string;
    isLogin: boolean;
    isLoading: boolean;
    isAsyncReject: boolean;
    errorMessage: string | undefined;
    hasUsername: boolean | null;
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
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<UserInfo>) => {
            state.username = action.payload.username;
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
            .addCase(signIn.rejected, (state) => {
                state.isAsyncReject = true;
                // null 일때 처리
                if (state.hasUsername) {
                    state.errorMessage = `잘못된 비밀번호입니다. \n다시 확인하세요.`;
                } else {
                    state.errorMessage = `입력한 사용자 이름을 사용하는 계정을 찾을 수 없습니다. 사용자 이름을 확인하고 다시 시도하세요.`;
                }
            })
            .addCase(reissueToken.fulfilled, (state, action) => {
                saveToken(action.payload);
            })
            .addCase(checkUsername.fulfilled, (state, action) => {
                state.hasUsername = !action.payload;
            });
    },
});

export const authAction = authSlice.actions;

export const authReducer = authSlice.reducer;
