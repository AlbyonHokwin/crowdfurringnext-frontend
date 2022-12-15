import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        token: '',
        email: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.value.token = action.payload.token;
        },
    },
});

export const { login } = userSlice.actions;
export default userSlice.reducer; 