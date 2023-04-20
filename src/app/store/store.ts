import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "app/store/ducks/auth/authSlice";
import { homeReducer } from "app/store/ducks/home/homeSlice";
import { modalReducer } from "app/store/ducks/modal/modalSlice";
import { directReducer } from "app/store/ducks/direct/DirectSlice";
import { uploadReducer } from "app/store/ducks/upload/uploadSlice";
import { profileReducer } from "app/store/ducks/profile/profileSlice";
import { editReducer } from "./ducks/edit/editSlice";
import { commonReducer } from "./ducks/common/commonSlice";
import { paragraphReducer } from "app/store/ducks/paragraph/paragraphSlice";

export const store = configureStore({
    reducer: {
        direct: directReducer,
        auth: authReducer,
        home: homeReducer,
        paragraph: paragraphReducer,
        modal: modalReducer,
        upload: uploadReducer,
        profile: profileReducer,
        edit: editReducer,
        common: commonReducer,
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
