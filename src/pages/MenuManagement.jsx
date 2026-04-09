import React, { useActionState, useEffect, useRef, useState } from 'react';
import { Box, Container, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, updateItem } from "../store/ItemSlice.js";
import { validateItemAction } from "../actions/ItemActions.jsx";
import MenuCard from "../components/MenuCard.jsx";
import MenuFilterBar from "../components/MenuFilterBar.jsx";
import MenuFormModal from "../components/MenuFormModal.jsx";
import MenuDeleteModal from "../components/MenuDeleteModal.jsx";

export default function MenuManagement() {
    const dispatch = useDispatch();
    const [localErrors, setLocalErrors] = useState(null);
    const menuItems = useSelector((state) => state.items.list);

    const [state, formAction, isPending] = useActionState(validateItemAction, { error: null, success: false });

    const formModalRef = useRef();
    const deleteModalRef = useRef();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    const categories = ['All', 'Main', 'Pasta', 'Drink', 'Snack'];
    const filteredItems = menuItems.filter((item) => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    useEffect(() => {
        if (state.success && state.data) {
            state.isEdit ? dispatch(updateItem(state.data)) : dispatch(addItem(state.data));
            formModalRef.current.close();
        }
    }, [state.data, state.success, state.isEdit, dispatch]);

    useEffect(() => {
        if (!state?.errors) return;
        setLocalErrors((prev) => JSON.stringify(prev) === JSON.stringify(state.errors) ? prev : state.errors);
    }, [state?.errors]);

    const handleOpenCreateModal = () => { setEditingItem(null); setDeletingItem(null); setLocalErrors(null); formModalRef.current.open(); };
    const handleOpenEditModal = (item) => { setEditingItem(item); setDeletingItem(null); setLocalErrors(null); formModalRef.current.open(); };
    const handleOpenDeleteModal = (itemId) => { setEditingItem(null); setDeletingItem(itemId); deleteModalRef.current.open(); };
    
    const handleConfirmDelete = () => {
        if (deletingItem) dispatch(deleteItem(deletingItem));
        setDeletingItem(null);
        deleteModalRef.current.close();
    };

    return (
        <Box className="min-h-screen bg-gray-50/50 pb-16">
            <Box className="bg-white border-b border-gray-100 p-6 sticky top-0 z-20 shadow-sm">
                <Container maxWidth="md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <Typography variant="h5" className="font-black text-gray-800">Manajemen Menu</Typography>
                            <Typography variant="body2" className="text-gray-400 mt-1">Kelola daftar hidangan, harga, dan ketersediaan stok</Typography>
                        </div>
                        <button className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 rounded-xl py-3 px-6 font-bold text-white capitalize shadow-lg shadow-orange-200 transition-colors w-full sm:w-auto" onClick={handleOpenCreateModal}>
                            <Plus size={20} /> Tambah Menu Baru
                        </button>
                    </div>
                </Container>
            </Box>

            <Container maxWidth="md" className="mt-8">
                <MenuFilterBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
                <div className="space-y-4">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"><Typography className="text-gray-400 font-medium">Menu tidak ditemukan</Typography></div>
                    ) : (
                        filteredItems.map((item) => <MenuCard key={item.id} item={item} onEdit={handleOpenEditModal} onDelete={handleOpenDeleteModal} />)
                    )}
                </div>
            </Container>

            <MenuFormModal ref={formModalRef} editingItem={editingItem} formAction={formAction} isPending={isPending} localErrors={localErrors} state={state} />
            <MenuDeleteModal ref={deleteModalRef} onConfirm={handleConfirmDelete} onCancel={() => deleteModalRef.current.close()} />
        </Box>
    );
}