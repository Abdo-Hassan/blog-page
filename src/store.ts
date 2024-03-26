import { configureStore } from '@reduxjs/toolkit';
import ArticleSlice from './redux/reducers/ArticleSlice';

export const store = configureStore({
  reducer: {
    articles: ArticleSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
