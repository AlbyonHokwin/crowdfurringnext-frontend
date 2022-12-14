import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: [],
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserToStore: (state, action) => {
            console.log('Add user', action.payload);
            state.value.push(action.payload);
        },
    },
});

export const { addUserToStore } = userSlice.actions;
export default userSlice.reducer; 