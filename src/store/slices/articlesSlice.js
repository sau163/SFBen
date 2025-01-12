import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (filter = 'latest') => {
    const response = await fetch(`/api/articles/read.php?filter=${filter}`);
    if (!response.ok) {
      throw new Error('Failed to fetch articles');
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
    activeFilter: 'latest'
  },
  reducers: {
    setFilter: (state, action) => {
      state.activeFilter = action.payload;
    }
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
  },
});

export const { setFilter } = articlesSlice.actions;
export default articlesSlice.reducer;