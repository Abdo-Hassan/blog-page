import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IBlog } from '../../types/types';

interface CounterState {
  articles: IBlog[];
}

const initialState: CounterState = {
  articles: [],
};

export const articleSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
});

// export const { increment, decrement, incrementByAmount } = articleSlice.actions;

export default articleSlice.reducer;
