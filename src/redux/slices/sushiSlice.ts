import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from './../store';

type Sushi = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'succes',
  ERROR = 'error',
}

interface SushiSliceState {
  items: Sushi[];
  status: Status;
}

const initialState: SushiSliceState = {
  items: [],
  status: Status.LOADING,
};

export const fetchSushi = createAsyncThunk<Sushi[], Record<string, string | number>>(
  'sushi/fetchSushiStatus',
  async (params) => {
    const { search, categoryId, currentPage, sortBy } = params;

    const { data } = await axios.get<Sushi[]>(
      `https://63c8592d5c0760f69aca662f.mockapi.io/Items?page=${currentPage}&limit=6&${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortBy}&order=desc${search}`,
    );
    return data;
  },
);

const sushiSlice = createSlice({
  name: 'sushi',
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Sushi[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSushi.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectSushi = (state: RootState) => state.sushi;

export const { setItems } = sushiSlice.actions;

export default sushiSlice.reducer;
