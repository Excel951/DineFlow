import React, {useEffect, useState} from "react";
import {Search} from "lucide-react";
import CategoryBar from "../components/CategoryBar";
import MenuList from "../components/MenuList";
import CartSheet from "../components/CartSheet";
import Items from "../Items.js";
import {useCart} from "../context/CartContext.jsx";

const FoodMenu = () => {
    const cartCtx = useCart();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const categories = ["All", "Main", "Pasta", "Drink", "Snack"];
    const menuItems = Items;

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => {
            clearTimeout(handler);
        }
    }, [searchQuery]);

    const totalHarga = cartCtx.cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0,
    );
    const totalItem = cartCtx.cart.reduce((acc, item) => acc + item.qty, 0);

    const filteredMenuItems = menuItems.filter((item) => {
        const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(debouncedQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    })

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <header className="sticky top-0 bg-white p-4 shadow-sm z-10">
                <div className="flex justify-between items-center mb-4 gap-4">
                    <h1 className="text-xl font-bold text-orange-600">DineFlow</h1>
                    <div
                        className="flex-1 flex items-center bg-gray-100 px-3 py-2 rounded-full border border-transparent focus-within:border-orange-300 focus-within:bg-white transition-all">
                        <Search size={18} className="text-gray-400"/>
                        <input
                            type="text"
                            placeholder="Cari menu favorit..."
                            className="bg-transparent border-none outline-none ml-2 text-sm w-full text-gray-700"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                {/* Categories - Component 2 */}
                <CategoryBar
                    categories={categories}
                    activeCategory={selectedCategory}
                    onSelect={setSelectedCategory}
                />
            </header>

            {/* Menu List */}
            {filteredMenuItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search size={40} className="text-gray-300"/>
                    </div>
                    <h3 className="font-bold text-gray-800">Menu tidak ditemukan</h3>
                    <p className="text-sm text-gray-500 mt-1">Coba cari dengan kata kunci lain atau ganti kategori.</p>
                </div>
            ) : (
                <MenuList menuItems={filteredMenuItems}/>
            )}

            {/* Floating Cart - Component 4 */}
            <CartSheet totalHarga={totalHarga} totalItem={totalItem}/>
        </div>
    );
};

export default FoodMenu;
