import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "pJWhSZdxbKTE3_U8QEUyS5XIgbLQRMCT",
    email: "marcillaud.jeremy@gmail.com",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
    },
    logout: (state, action) => {
      state.value.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
