import {createSlice} from "@reduxjs/toolkit";

// const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
const savedRole = localStorage.getItem("role") || "";
const savedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";

const initialLoginState = {
    // user: savedUser,
    role: savedRole,
    isLoggedIn: savedIsLoggedIn
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialLoginState,
    reducers: {
        // setUser(state, action) {
        //     state.user = action.payload;
        //     localStorage.setItem("user", JSON.stringify(action.payload));
        // },
        login(state, action) {
            state.isLoggedIn = true;
            state.role = action.payload;
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("role", action.payload)
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
