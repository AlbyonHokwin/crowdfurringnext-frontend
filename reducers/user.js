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
            state.value.email = action.payload.email;
        },
        logout: (state, action) => {
            state.value.token = '';
            state.value.email = '';
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 