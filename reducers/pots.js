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
      state.value.request.push(...action.payload);
    },
    addContributors: (state, action) => {
      state.value.contributor.push(...action.payload);
    },
    replacePots: (state, action) => {
      state.value.request = action.payload;
    },
    removeAll: (state, action) => {
      state.value.request = [];
      state.value.contributor = [];
    }
  },
});

export const { addPots, addContributors, replacePots, removeAll } = potsSlice.actions;
export default potsSlice.reducer;
