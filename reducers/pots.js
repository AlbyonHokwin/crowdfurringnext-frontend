import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    request: [],
    contributor: [],
  },
};

export const potsSlice = createSlice({
  name: "pots",
  initialState,
  reducers: {
    addPots: (state, action) => {
      state.value.request = action.payload;
    },
    addContributors: (state, action) => {
      state.value.contributor = action.payload;
    },
  },
});

export const { addPots, addContributors } = potsSlice.actions;
export default potsSlice.reducer;
