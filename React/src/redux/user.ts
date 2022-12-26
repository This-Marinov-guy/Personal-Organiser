import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    token: null,
  },
  reducers: {
    login: {
      reducer(state, action: any) {
        const { userId, token, expiration } = action.payload;
        state.userId = userId;
        state.token = token;
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: userId,
            token: token,
            expiration: expiration.toISOString(),
          })
        );
      },
      prepare(values) {
        return {
          payload: {
            ...values,
          },
        };
      },
    },
    logout: (state) => {
      state.userId = null;
      state.token = null;
      localStorage.removeItem("userData");
    },
  },
});

export const selectUser = (state) => state.user;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
