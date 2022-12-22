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
    updatePot: (state, action) => {
      const newPots = state.value.request.filter(pot => pot._id !== action.payload._id);
      newPots.push(action.payload);
      state.value.request = newPots;
    },
    removePot: (state, action) => {
      state.value.request = state.value.request.filter(pot => pot._id !== action.payload);
    },
    removeAll: (state, action) => {
      state.value.request = [];
      state.value.contributor = [];
    }
  },
});

export const { addPots, addContributors, updatePot, replacePots, removePot, removeAll } = potsSlice.actions;
export default potsSlice.reducer;
