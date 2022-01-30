import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken, signIn, reissueToken } from "./authThunk";

export interface AuthStateProps {
    username: string;
    isLogin: boolean;
    isLoading: boolean;
    isAsyncReject: boolean;
    errorMessage: string | undefined;
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
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserName: (state, action: PayloadAction<UserInfo>) => {
            state.username = action.payload.username;
        }, // thunkQption.dispatch
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
                saveToken(state.username, action.payload);
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isAsyncReject = true;
                if (String(action.payload).includes("Network")) {
                    state.errorMessage = `네트워크 연결을 확인해주세요`;
                } else {
                    state.errorMessage = `사용자 이름과 비밀번호를 확인하고 다시 시도해주세요`;
                } // 아이디 유무로 에러 나누기
            })
            .addCase(reissueToken.fulfilled, (state, action) => {
                saveToken(state.username, action.payload);
            })
            .addCase(reissueToken.rejected, (state, action) => {});
    },
});

export const { setUserName } = authSlice.actions;

export const authReducer = authSlice.reducer;
