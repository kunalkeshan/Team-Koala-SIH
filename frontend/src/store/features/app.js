/**
 * App Actions and Reducers
 */

 import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
     value: {
         snackbar: {
             display: false,
             message: "",
             type: "error", // error, warning, info, success
         },
         showLoading: false,
        }
 };
 
 export const appSlice = createSlice({
     name: "app",
     initialState,
     reducers: {
         showSnackbar: (state, action) => {
             state.value.snackbar = { ...initialState.value.snackbar, display: true, ...action.payload }
         },
         hideSnackbar: (state, action) => {
             state.value.snackbar.display = false;
         },
         enableLoading: (state, action) => {
             state.value.showLoading = true;
         },
         disableLoading: (state, action) => {
             state.value.showLoading = false;
         },
     },
 });
 
 // Exporting Actions
 export const { showSnackbar, hideSnackbar, enableLoading, disableLoading } = appSlice.actions;
 
 // Exporting Reducer
 export default appSlice.reducer;