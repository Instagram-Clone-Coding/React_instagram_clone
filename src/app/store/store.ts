import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "app/store/ducks/auth/authSlice";
import { homeReducer } from "app/store/ducks/home/homeSlice";
import { modalReducer } from "app/store/ducks/modal/modalSlice";
import { directReducer } from "app/store/ducks/direct/DirectSlice";
import { uploadReducer } from "app/store/ducks/upload/uploadSlice";
import { profileReducer } from "app/store/ducks/profile/profileSlice";

export const store = configureStore({
    reducer: {
        direct: directReducer,
        auth: authReducer,
        home: homeReducer,
        modal: modalReducer,
        upload: uploadReducer,
        profile:profileReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
