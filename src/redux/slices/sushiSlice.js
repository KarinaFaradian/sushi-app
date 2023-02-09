import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSushi = createAsyncThunk('sushi/fetchSushiStatus', async (params, thunkAPI) => {
  const { search, categoryId, currentPage, sort } = params;
  const { data } = await axios.get(
    `https://63c8592d5c0760f69aca662f.mockapi.io/Items?page=${currentPage}&limit=6&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sort.sortProperty}&order=desc${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading'
};

const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchSushi.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchSushi.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'succes';
    },
    [fetchSushi.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    }
  }
});

export const selectSushi = (state) => state.sushi;

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
