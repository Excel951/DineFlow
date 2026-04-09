import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import Header from "../components/Header";
import MenuList from "../components/MenuList";
import CartSheet from "../components/CartSheet";
import { useCart } from "../context/CartContext.jsx";
import Modal from "../components/UI/Modal.jsx";
import FoodDetailModal from "../components/FoodDetailModal.jsx";
import { useSelector } from "react-redux";

const FoodMenu = () => {
    const cartCtx = useCart();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    const categories = ["All", "Main", "Pasta", "Drink", "Snack"];
    const menuItems = useSelector((state) => state.items.list);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
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
    });

    const [selectedItem, setSelectedItem] = useState(null);
    const detailModalRef = useRef();

    const handleOpenDetail = (item) => {
        setSelectedItem(item);
        detailModalRef.current.open();
    }

    const handleCloseDetail = () => {
        setSelectedItem(null);
        detailModalRef.current.close();
    }

    const handleNavigateDetail = (newIndex) => {
        setSelectedItem(menuItems[newIndex])
    }

    const handleSelectRecommendation = (item) => {
        setSelectedItem(item);
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-24 font-sans">
            <Header
                categories={categories}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {filteredMenuItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
                    <div className="bg-gray-100 p-4 rounded-full mb-4">
                        <Search size={40} className="text-gray-300" />
                    </div>
                    <h3 className="font-bold text-gray-800">Menu tidak ditemukan</h3>
                    <p className="text-sm text-gray-500 mt-1">Coba cari dengan kata kunci lain atau ganti kategori.</p>
                </div>
            ) : (
                <MenuList menuItems={filteredMenuItems} onOpen={handleOpenDetail} />
            )}

            <CartSheet totalHarga={totalHarga} totalItem={totalItem} />

            <Modal
                title=""
                hideFooter={true}
                ref={detailModalRef}
                maxWidthClass={"sm:max-w-4xl w-full"}
            >
                <FoodDetailModal
                    item={selectedItem}
                    onClose={handleCloseDetail}
                    onNavigate={handleNavigateDetail}
                    onSelectRecommendation={handleSelectRecommendation}
                    menuItems={filteredMenuItems}
                />
            </Modal>
        </div>
    );
};

export default FoodMenu;
