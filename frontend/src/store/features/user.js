/**
 * User Actions and Reducers
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            // Action Payload: {user object}
            state.value.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        logout: (state, action) => {
            state.value.user = null;
            localStorage.removeItem('user');
        }
    },
});

// Exporting Actions
export const { login, logout } = userSlice.actions;

// Exporting Reducer
export default userSlice.reducer;