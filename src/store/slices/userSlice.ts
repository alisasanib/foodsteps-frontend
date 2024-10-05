import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "..";

export interface UserState {
  activeUser: string | null;
}

export const initialState: UserState = {
  activeUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.activeUser = action.payload;
    },
  },
});

export default userSlice.reducer;

export const { setUser } = userSlice.actions;

const selfSelector = (state: RootState) => state.user;

export const userIdSelector = createSelector(selfSelector, (state) => state.activeUser);
