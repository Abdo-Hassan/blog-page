import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '../../types/types';

interface ArticlesState {
  articles: IBlog[];
}

const initialState: ArticlesState = {
  articles: [],
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchedArticles: (state, action: PayloadAction<any[]>) => {
      state.articles = action.payload;
    },
  },
});

export const { fetchedArticles } = articleSlice.actions;

export default articleSlice.reducer;
