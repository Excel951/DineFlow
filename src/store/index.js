import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import authReducer from "./Auth-redux.jsx";
import itemReducer from "./ItemSlice.js";

const store = configureStore(
    {
        reducer:
            {
                orders: orderReducer,
                auth: authReducer,
                items: itemReducer
            }
    }
);

export default store;
