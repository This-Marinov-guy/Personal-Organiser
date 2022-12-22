import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    logged: false,
    user: null,
  },
  reducers: {
    login: (state, action: any) => {
      state.logged = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.logged = false;
      state.user = null;
    },
  },
});

export const selectLogged = (state) => state.user.logged;
export const selectUser = (state) => state.user.user;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
