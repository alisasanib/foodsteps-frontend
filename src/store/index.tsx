import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
