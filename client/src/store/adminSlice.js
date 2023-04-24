import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
};

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        setAdminLogin: ( state, action) =>{
            state.token = action.payload;
        },
        removeAdminId: (state, action) => {
            state.token = null;
        }
    },
});

export const {setAdminLogin, removeAdminId }= adminSlice.actions;

export default adminSlice.reducer;