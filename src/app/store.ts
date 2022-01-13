import { configureStore } from "@reduxjs/toolkit";
import authSlice from "features/Auth/authSlice";
import { directReducer } from "app/ducks/direct/DirectSlice";

export const store = configureStore({
    reducer: {
        // auth: authSlice,
        direct:directReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
