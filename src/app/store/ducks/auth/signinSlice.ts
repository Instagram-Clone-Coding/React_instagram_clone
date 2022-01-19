import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { saveToken, signIn } from "./signinThunk";
import { Token } from "./signinThunk.type";

export interface AuthState {
    username: string;
    isLogin: boolean;
    isLoading: boolean;
    isAsyncError: boolean;
}

interface UserInfo {
    username: string;
}

const initialState: AuthState = {
    username: "",
    isLoading: false,
    isLogin: false,
    isAsyncError: false,
};

export const signInSlice = createSlice({
    name: "signIn",
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
            })
            .addCase(
                signIn.fulfilled,
                (state, action: PayloadAction<Token>) => {
                    state.isLoading = false;
                    state.isLogin = true;
                    saveToken(state.username, action.payload);
                },
            )
            .addCase(signIn.rejected, (state) => {
                state.isAsyncError = true;
            });
    },
});

export const { setUserName } = signInSlice.actions;

export default signInSlice.reducer;
