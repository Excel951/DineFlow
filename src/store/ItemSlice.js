import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    list: [
        {
            id: 1,
            name: "Spicy Ramen Tokyo",
            price: 45000,
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
            category: "Main",
        },
        {
            id: 2,
            name: "Creamy Carbonara",
            price: 52000,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500",
            category: "Pasta",
        },
        {
            id: 3,
            name: "Berry Smoothies",
            price: 28000,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
            category: "Drink",
        },
    ],
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.list.unshift(action.payload);
        },
        updateItem: (state, action) => {
            const {id, ...updates} = action.payload;
            const itemIndex = state.list.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                state.list[itemIndex] = {...state.list[itemIndex], ...updates};
            }
        },
        deleteItem: (state, action) => {
            state.list = state.list.filter(item => item.id !== action.payload);
        },
        setItems: (state, action) => {
            state.list = action.payload;
        }
    },
})

export const {addItem, updateItem, deleteItem, setItems} = itemSlice.actions;
export default itemSlice.reducer;
