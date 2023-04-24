import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist"
import storage from "redux-persist/lib/storage";
import adminReducer from './adminSlice';
import userReducer from "./userSlice";
import vendorReducer from "./vendorSlice"



const persistConfig = {
    key : "persist_key",
    storage,
};

const reducers = combineReducers({
    admin : adminReducer,
    user : userReducer,
    vendor : vendorReducer
});

const persistedReducer = persistReducer( persistConfig, reducers);

const store = configureStore({
    reducer: persistedReducer,
});

export default store;
