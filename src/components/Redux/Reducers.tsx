import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface posts {
  body: string;
}

interface DataState {
  data: posts[];
  isLoading: boolean;
  selectedCategory: string;
  page: number;
}

const initialState: DataState = {
  data: [],
  isLoading: false,
  selectedCategory: 'wallpapers',
  page: 1,
};

const DataSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveData: (state, action: PayloadAction<posts[]>) => {
      state.data = [...state.data, ...action.payload];
    },
    clearData: state => {
      state.data = [];
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const {saveData, clearData, setIsLoading, setSelectedCategory, setPage} =
  DataSlice.actions;
export default DataSlice.reducer;
