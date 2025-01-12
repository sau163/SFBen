import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});

export const getState = store.getState;
export const dispatch = store.dispatch;