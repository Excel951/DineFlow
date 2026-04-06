import React, {useActionState, useEffect, useRef, useState} from 'react';
import {Alert, Box, Button, Chip, Container, IconButton, InputBase, Paper, Typography} from "@mui/material";
import {Edit2, Plus, Search, Tag, Trash2} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import {addItem, deleteItem, updateItem} from "../store/ItemSlice.js";
import Modal from "../components/UI/Modal.jsx";
import Input from "../components/Input.jsx";
import {validateItemAction} from "../actions/ItemActions.js";


export default function MenuManagement() {
    const dispatch = useDispatch();

    const [localErrors, setLocalErrors] = useState(null);
    const menuItems = useSelector((state) => state.items.list);

    const [state, formAction, isPending] = useActionState(validateItemAction, {
        error: null,
        success: false
    });

    const formModalRef = useRef();
    const deleteModalRef = useRef();

    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const [editingItem, setEditingItem] = useState(null);
    const [deletingItem, setDeletingItem] = useState(null);

    useEffect(() => {
        if (state.success && state.data) {
            if (state.isEdit) {
                dispatch(updateItem(state.data));
            } else {
                dispatch(addItem(state.data));
            }
            // state.success = false;
            // state.data = null;
            formModalRef.current.close();
        }
    }, [state.data, state.success, state.isEdit, dispatch]);

    useEffect(() => {
        if (!state?.errors) return;

        setLocalErrors((prev) => {
            const same = JSON.stringify(prev) === JSON.stringify(state.errors);

            return same ? prev : state.errors;
        })
    }, [state?.errors])

    const categories = ['All', 'Main', 'Pasta', 'Drink', 'Snack'];

    const filteredItems = menuItems.filter((item) => {
        const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    })

    const clearFormState = () => {
        setLocalErrors(null);
    }

    const handleOpenCreateModal = () => {
        setEditingItem(null);
        setDeletingItem(null);
        console.log("Opening Create Modal - State Reset:", {editingItem: null, deletingItem: null});
        clearFormState();
        formModalRef.current.open();
    }

    const handleOpenDeleteModal = (itemId) => {
        setEditingItem(null);
        setDeletingItem(itemId);
        deleteModalRef.current.open();
    }

    const handleOpenEditModal = (item) => {
        setEditingItem(item);
        setDeletingItem(null);
        clearFormState();
        formModalRef.current.open();
    }

    const handleConfirmDelete = () => {
        if (deletingItem) {
            dispatch(deleteItem(deletingItem));
            setDeletingItem(null);
            deleteModalRef.current.close();
        }
    }

    return (
        <Box className="min-h-screen bg-gray-50/50 pb-16">
            {/* Header Section */}
            <Box className="bg-white border-b border-gray-100 p-6 sticky top-0 z-20 shadow-sm">
                <Container maxWidth="md">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <Typography variant="h5" className="font-black text-gray-800">Manajemen Menu</Typography>
                            <Typography variant="body2" className="text-gray-400 mt-1">
                                Kelola daftar hidangan, harga, dan ketersediaan stok
                            </Typography>
                        </div>

                        <button
                            variant="contained"
                            startIcon={<Plus size={20}/>}
                            className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 px-6 font-bold capitalize shadow-lg shadow-orange-200 w-full sm:w-auto"
                            sx={{textTransform: 'none', borderRadius: '12px'}}
                            onClick={() => handleOpenCreateModal()}
                        >
                            Tambah Menu Baru
                        </button>
                    </div>
                </Container>
            </Box>

            <Container maxWidth="md" className="mt-8">
                {/* Toolbar: Search & Filter */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    {/* Search Bar */}
                    <Paper elevation={0}
                           className="flex-1 flex items-center bg-white px-4 py-1.5 rounded-2xl border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                        <Search size={20} className="text-gray-400 mr-2"/>
                        <InputBase
                            placeholder="Cari nama menu..."
                            className="w-full text-sm font-medium"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Paper>

                    {/* Category Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 hide-scrollbar items-center">
                        {categories.map((cat) => (
                            <Chip
                                key={cat}
                                label={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`font-bold px-2 rounded-xl cursor-pointer transition-all ${
                                    activeCategory === cat
                                        ? "bg-gray-900 text-white shadow-md"
                                        : "bg-white text-gray-500 border border-gray-200 hover:bg-gray-50"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Daftar Menu (Horizontal Cards) */}
                <div className="space-y-4">
                    {filteredItems.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <Typography className="text-gray-400 font-medium">Menu tidak ditemukan</Typography>
                        </div>
                    ) : (
                        filteredItems.map((item) => (
                            <Paper
                                key={item.id}
                                elevation={0}
                                className="group flex items-center p-4 rounded-3xl border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
                            >
                                {/* Foto Makanan */}
                                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover rounded-2xl shadow-sm group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Detail Makanan */}
                                <div className="flex-1 ml-4 sm:ml-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Typography variant="h6" className="font-bold text-gray-800 leading-tight">
                                            {item.name}
                                        </Typography>
                                    </div>

                                    <div className="flex items-center gap-3 mt-1">
                                        <Chip
                                            icon={<Tag size={12} className="text-orange-600"/>}
                                            label={item.category}
                                            size="small"
                                            className="bg-orange-50 text-orange-700 font-bold text-[10px] uppercase tracking-wider rounded-lg h-6"
                                        />
                                        <Typography className="font-black text-orange-600">
                                            Rp {item.price.toLocaleString()}
                                        </Typography>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-1 sm:gap-2 ml-4">
                                    <IconButton
                                        onClick={() => handleOpenEditModal(item)}
                                        className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-colors"
                                    >
                                        <Edit2 size={18}/>
                                    </IconButton>
                                    <IconButton
                                        onClick={() => handleOpenDeleteModal(item.id)}
                                        className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors"
                                    >
                                        <Trash2 size={18}/>
                                    </IconButton>
                                </div>
                            </Paper>
                        ))
                    )}
                </div>
            </Container>


            {/*  MODAL CREATE  */}
            <Modal ref={formModalRef} title={editingItem ? "Edit Menu" : "Tambah Menu Baru"}>
                <form
                    key={editingItem ? `edit-${editingItem.id}` : 'create'}
                    action={formAction}
                    className="space-y-4"
                >
                    {/* Pesan Error (Jika Validasi Gagal) */}
                    {localErrors && (
                        <Alert severity="error" className="mb-4 rounded-xl">{state.error}</Alert>
                    )}

                    {/* HIDDEN INPUT UNTUK ID */}
                    {editingItem && (
                        <input type="hidden" name="id" value={editingItem.id}/>
                    )}

                    <label className="text-xs text-gray-500 mb-1 ml-1">Nama Menu</label>
                    <Input
                        name="name"
                        defaultValue={(editingItem ? editingItem.name : "") || state?.data?.name}
                        error={localErrors?.name} // Jika ada error di field 'name'
                        helperText={localErrors?.name?.[0]} // Ambil pesan error pertama
                    />

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="text-xs text-gray-500 mb-1 ml-1">Harga (Rp)</label>
                            <Input
                                name="price"
                                type="number"
                                defaultValue={(editingItem ? editingItem.price : "") || state?.data?.price}
                                error={localErrors?.price}
                                helperText={localErrors?.price?.[0]}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-col mb-4">
                                <label className="text-xs text-gray-500 mb-1 ml-1">Kategori</label>
                                <select
                                    name="category"
                                    defaultValue={(editingItem ? editingItem.category : "Main") || state?.data?.category}
                                    className="w-full p-3.5 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-200 outline-none text-gray-700"
                                >
                                    <option value="Main">Main Course</option>
                                    <option value="Pasta">Pasta</option>
                                    <option value="Drink">Drink</option>
                                    <option value="Snack">Snack</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <label className="text-xs text-gray-500 mb-1 ml-1">URL Gambar (Opsional)</label>
                    <Input
                        name="image"
                        defaultValue={(editingItem ? editingItem.image : "") || state?.data?.image}
                        error={localErrors?.image}
                        helperText={localErrors?.image?.[0]}
                    />

                    <button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={isPending}
                        className={`w-full py-4 rounded-2xl font-bold mt-2 transition-colors ${
                            isPending ? "bg-gray-300" : "bg-gray-900 text-white hover:bg-black"
                        }`}
                    >
                        {isPending ? "Menyimpan..." : (editingItem ? "Simpan Perubahan" : "Tambahkan Menu")}
                    </button>
                </form>
            </Modal>


            {/*  MODAL DELETE  */}
            <Modal ref={deleteModalRef} title="Konfirmasi Hapus Menu">
                <Typography className="text-gray-700 mb-4">
                    Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak dapat dibatalkan.
                </Typography>
                <div className="flex justify-end gap-3">
                    <button
                        onClick={() => deleteModalRef.current.close()}
                        className="bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-xl font-bold px-5 py-2"
                    >
                        Batal
                    </button>
                    <button
                        onClick={handleConfirmDelete}
                        className="bg-red-500 text-white hover:bg-red-600 rounded-xl font-bold px-5 py-2"
                    >
                        Hapus
                    </button>
                </div>
            </Modal>
        </Box>
    )
}