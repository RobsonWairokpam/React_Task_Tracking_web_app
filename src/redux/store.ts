import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slicer/counter/counter';
import taskSlice from "./slicer/task/index";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    task: taskSlice
  }
});

// Infer RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
