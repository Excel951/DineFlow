import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    list: [
        {
            id: 1,
            name: "Spicy Ramen Tokyo",
            price: 45000,
            image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500",
            category: "Main"
        },
        {
            id: 2,
            name: "Creamy Carbonara",
            price: 52000,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500",
            category: "Pasta"
        },
        {
            id: 3,
            name: "Berry Smoothies",
            price: 28000,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
            category: "Drink"
        },
        {
            id: 4,
            name: "Chicken Teriyaki",
            price: 48000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 5,
            name: "Margherita Pizza",
            price: 60000,
            image: "https://images.unsplash.com/photo-1601924582971-6fbc3f3d6f7a?w=500",
            category: "Pizza"
        },
        {
            id: 6,
            name: "Caesar Salad",
            price: 35000,
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
            category: "Salad"
        },
        {
            id: 7,
            name: "Iced Latte",
            price: 30000,
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500",
            category: "Drink"
        },
        {
            id: 8,
            name: "Beef Bulgogi",
            price: 55000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 9,
            name: "Pad Thai",
            price: 47000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 10,
            name: "Tiramisu",
            price: 42000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Dessert"
        },
        {
            id: 11,
            name: "Nasi Goreng Special",
            price: 40000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 12,
            name: "Tom Yum Soup",
            price: 45000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Soup"
        },
        {
            id: 13,
            name: "Cheeseburger Deluxe",
            price: 55000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Burger"
        },
        {
            id: 14,
            name: "French Fries",
            price: 25000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Snack"
        },
        {
            id: 15,
            name: "Matcha Latte",
            price: 32000,
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500",
            category: "Drink"
        },
        {
            id: 16,
            name: "Sushi Platter",
            price: 75000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 17,
            name: "Pancakes Maple Syrup",
            price: 38000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Dessert"
        },
        {
            id: 18,
            name: "Falafel Wrap",
            price: 42000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 19,
            name: "Greek Salad",
            price: 36000,
            image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500",
            category: "Salad"
        },
        {
            id: 20,
            name: "Chocolate Milkshake",
            price: 30000,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
            category: "Drink"
        },
        {
            id: 21,
            name: "Pho Bo",
            price: 48000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Soup"
        },
        {
            id: 22,
            name: "BBQ Ribs",
            price: 85000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 23,
            name: "Spring Rolls",
            price: 28000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Snack"
        },
        {
            id: 24,
            name: "Espresso",
            price: 25000,
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500",
            category: "Drink"
        },
        {
            id: 25,
            name: "Lasagna",
            price: 62000,
            image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?w=500",
            category: "Pasta"
        },
        {
            id: 26,
            name: "Chicken Wings",
            price: 45000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Snack"
        },
        {
            id: 27,
            name: "Mango Sticky Rice",
            price: 38000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Dessert"
        },
        {
            id: 28,
            name: "Shawarma",
            price: 50000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 29,
            name: "Onion Rings",
            price: 27000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Snack"
        },
        {
            id: 30,
            name: "Green Tea",
            price: 22000,
            image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=500",
            category: "Drink"
        },
        {
            id: 31,
            name: "Butter Chicken",
            price: 60000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 32,
            name: "Fish and Chips",
            price: 55000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
        },
        {
            id: 33,
            name: "Club Sandwich",
            price: 42000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Snack"
        },
        {
            id: 34,
            name: "Rendang Padang",
            price: 65000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
          },
          {
            id: 35,
            name: "Gyoza Dumplings",
            price: 38000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Snack"
          },
          {
            id: 36,
            name: "Banana Split",
            price: 35000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Dessert"
          },
          {
            id: 37,
            name: "Hot Chocolate",
            price: 28000,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=500",
            category: "Drink"
          },
          {
            id: 38,
            name: "Satay Chicken",
            price: 40000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
          },
          {
            id: 39,
            name: "Vegetable Curry",
            price: 45000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Main"
          },
          {
            id: 40,
            name: "Apple Pie",
            price: 37000,
            image: "https://images.unsplash.com/photo-1604908177522-432f5a6d6e1f?w=500",
            category: "Dessert"
          }
    ]

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
