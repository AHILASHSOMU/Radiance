import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: null,
    vendorData:null
};

export const vendorSlice = createSlice({
    name: "vendor",
    initialState,
    reducers:{
        setVendorLogin: (state,action) =>{
            state.token = action.payload.token;
            state.vendorData = action.payload.vendorData;
        },
        setVendorLogout: (state,action) =>{
            state.token = null;
            state.vendorData = null;
        }
    }
})

export const {setVendorLogin,setVendorLogout} = vendorSlice.actions;
export default vendorSlice.reducer;