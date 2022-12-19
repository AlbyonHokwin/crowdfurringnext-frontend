import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const potsSlice = createSlice({
    name: 'pots',
    initialState,
    reducers: {
        addPots: (state, action) => {
            state.value.push(action.payload);
        },
    },
});

export const { addPots } = potsSlice.actions;
export default potsSlice.reducer;