import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
    token: null,
    expiration: null,
  },
  reducers: {
    login: {
      reducer(state, action: any) {
        const { userId, token } = action.payload;
        state.userId = userId;
        state.token = token;
        state.expiration = new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
          "userData",
          JSON.stringify({
            userId: userId,
            token: token,
            expiration: state.expiration.toISOString(),
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
      state.expiration = null;
      localStorage.removeItem("userData");
    },
  },
});

export const selectUser = (state) => state.user;
export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
