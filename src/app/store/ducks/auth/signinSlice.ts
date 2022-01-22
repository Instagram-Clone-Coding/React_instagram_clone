import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken, signIn } from "./signinThunk";

export interface AuthStateProps {
    username: string;
    isLogin: boolean;
    isLoading: boolean;
    isAsyncError: boolean;
}

interface UserInfo {
    username: string;
}

const initialState: AuthStateProps = {
    username: "",
    isLoading: false,
    isLogin: false,
    isAsyncError: false,
};

export const authSlice = createSlice({
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
                state.isAsyncError = false;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLogin = true;
                saveToken(state.username, action.payload);
            })
            .addCase(signIn.rejected, (state) => {
                state.isAsyncError = true;
            });
    },
});

export const { setUserName } = authSlice.actions;

export default authSlice.reducer;
