import {createSlice} from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const initialLoginState = {user: savedUser, isLoggedIn: savedIsLoggedIn};

const authSlice = createSlice({
    name: "auth",
    initialState: initialLoginState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload));
        },
        login(state) {
            state.isLoggedIn = true;
            localStorage.setItem("isLoggedIn", "true");
        },
        logout(state) {
            state.user = {};
            state.isLoggedIn = false;
            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");
        },
    },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
