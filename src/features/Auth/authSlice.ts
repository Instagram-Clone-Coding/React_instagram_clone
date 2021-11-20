import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState {
    userInfo: any;
}

interface UserInfo {
    name: string;
}

const initialState: AuthState = {
    userInfo: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo>) => {
            state.userInfo = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setUserInfo } = authSlice.actions;

export default authSlice.reducer;
