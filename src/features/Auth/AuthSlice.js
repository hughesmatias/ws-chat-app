import { createSlice } from '@reduxjs/toolkit';

const USERNAME = "username";

export const authSlice = createSlice({
  initialState: {
    username: null,
  },
  name: "auth",
  reducers: {
    login: (state, action) => {
      const username = action.payload;
      localStorage.setItem(USERNAME, username);
      state.username = username;
    },
    logout: state => {
      localStorage.removeItem(USERNAME);
      state.username = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
