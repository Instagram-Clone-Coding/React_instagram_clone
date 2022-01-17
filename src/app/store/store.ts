import { configureStore } from "@reduxjs/toolkit";
import { homeReducer } from "app/store/ducks/home/homeSlice";
import authSlice from "features/Auth/authSlice";
import { directReducer } from "app/ducks/direct/DirectSlice";

export const store = configureStore({
    reducer: {
        // auth: authSlice,
<<<<<<< HEAD:src/app/store.ts
        direct:directReducer
=======
        home: homeReducer,
>>>>>>> origin/feature/home-redux:src/app/store/store.ts
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
