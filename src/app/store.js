import { configureStore } from "@reduxjs/toolkit";
import postsReducer from '../features/posts/PostSlice'
import Userslice from "../features/posts/Userslice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        users: Userslice
    }
})