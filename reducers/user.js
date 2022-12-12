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
        login: (state, action) => {
            state.value.token = action.payload.token;
            state.value.email = action.payload.email;
          },
    },
});

export const { addUserToStore, login } = userSlice.actions;
export default userSlice.reducer; 