import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "app/store/ducks/home/homeSlice";
import { modalReducer } from "app/store/ducks/modal/modalSlice";

export const store = configureStore({
    reducer: {
        home: homeReducer,
        modal: modalReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
