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
    fetchedArticles: (state, action: PayloadAction<IBlog[]>) => {
      state.articles = action.payload;
    },
    updateArticles: (state, action: PayloadAction<IBlog[]>) => {
      state.articles = action.payload;
    },
    postArticles: (state, action: PayloadAction<IBlog>) => {
      state.articles = [...state.articles, action.payload];
    },
    deleteArticles: (state, action) => {
      const articleId = action.payload;
      const deletedArticle = state.articles?.filter(
        (ar) => ar.id !== articleId
      );
      state.articles = deletedArticle;
    },
    searchArticles: (state, action) => {
      const searchValue = action.payload;
      const filteredArticles = state.articles.filter((article) =>
        article?.title.toLowerCase().includes(searchValue?.toLowerCase())
      );
      state.articles = filteredArticles;
    },
  },
});

export const {
  fetchedArticles,
  updateArticles,
  deleteArticles,
  postArticles,
  searchArticles,
} = articleSlice.actions;

export default articleSlice.reducer;
