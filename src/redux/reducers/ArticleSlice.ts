import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '../../types/types';

interface ArticlesState {
  articles: IBlog[];
  searchedArticles: IBlog[];
}

const initialState: ArticlesState = {
  articles: [],
  searchedArticles: [],
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    fetchedArticles: (state, action: PayloadAction<IBlog[]>) => {
      state.articles = action.payload;
      state.searchedArticles = action.payload;
    },
    updateArticles: (state, action: PayloadAction<IBlog>) => {
      // state.articles = action.payload;
    },
    postArticles: (state, action: PayloadAction<IBlog>) => {
      state.articles = [...state.articles, action.payload];
      state.searchedArticles = [...state.searchedArticles, action.payload];
    },
    deleteArticles: (state, action) => {
      const articleId = action.payload;
      const deletedArticle = state.articles?.filter(
        (ar) => ar.id !== articleId
      );
      const deletedArticleClone = state.searchedArticles?.filter(
        (ar) => ar.id !== articleId
      );
      state.articles = deletedArticle;
      state.searchedArticles = deletedArticleClone;
    },
    searchArticles: (state, action: PayloadAction<string>) => {
      const searchValue = action.payload;
      const filteredArticles = state.searchedArticles.filter((article) =>
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
