import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    token: "",
    email: "",
    picture: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.email = action.payload.email;
      state.value.picture = action.payload.picture;
    },
    updatePicture: (state, action) => {
      state.value.picture = action.payload;
    },
    logout: (state, action) => {
      state.value.token = "";
      state.value.email = "";
      state.value.picture = "";
    },
  },
});

export const { login, updatePicture, logout } = userSlice.actions;
export default userSlice.reducer;
