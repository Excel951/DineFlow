import {configureStore} from "@reduxjs/toolkit";
import orderReducer from "./OrderSlice.js";
import authReducer from "./Auth-redux.js";
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
