import {configureStore} from '@reduxjs/toolkit';
import DataSlice from './Reducers';

const store = configureStore({
  reducer: {
    data: DataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
