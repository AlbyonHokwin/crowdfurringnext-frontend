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
        logout: (state) => {
            state.value.isConnected = false;
            state.value.username = null;
        }
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer; 