import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (filter = 'latest') => {
    const response = await fetch(`http://localhost/project/api/articles/read.php?filter=${filter}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
    }
    return response.json();
  }
);

export const fetchArticleById = createAsyncThunk(
  'articles/fetchArticleById',
  async (articleId) => {
    const response = await fetch(`http://localhost/project/api/articles/read_single.php?id=${articleId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch article');
    }
    return response.json();
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    activeFilter: 'latest',
    singleArticle: null,
    singleArticleStatus: 'idle',
    singleArticleError: null,
  },
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.records;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.singleArticleStatus = 'loading';
      })
      .addCase(fetchArticleById.fulfilled, (state, action) => {
        state.singleArticleStatus = 'succeeded';
        state.singleArticle = action.payload;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.singleArticleStatus = 'failed';
        state.singleArticleError = action.error.message;
      });
  },
});

export const { setFilter } = articlesSlice.actions;
export default articlesSlice.reducer;
