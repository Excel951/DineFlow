import React from 'react';
import { Alert } from "@mui/material";
import Input from "./Input.jsx";
import Modal from "./UI/Modal.jsx";

const MenuFormModal = React.forwardRef(({ editingItem, formAction, isPending, localErrors, state }, ref) => {
    return (
        <Modal ref={ref} title={editingItem ? "Edit Menu" : "Tambah Menu Baru"}>
            <form
                key={editingItem ? `edit-${editingItem.id}` : 'create'}
                action={formAction}
                className="space-y-4"
            >
                {localErrors && (
                    <Alert severity="error" className="mb-4 rounded-xl">{state.error}</Alert>
                )}

                {editingItem && (
                    <input type="hidden" name="id" value={editingItem.id} />
                )}

                <label className="text-xs text-gray-500 mb-1 ml-1">Nama Menu</label>
                <Input
                    name="name"
                    defaultValue={(editingItem ? editingItem.name : "") || state?.data?.name}
                    error={localErrors?.name}
                    helperText={localErrors?.name?.[0]}
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
                    disabled={isPending}
                    className={`w-full py-4 rounded-2xl font-bold mt-2 transition-colors ${
                        isPending ? "bg-gray-300" : "bg-gray-900 text-white hover:bg-black"
                    }`}
                >
                    {isPending ? "Menyimpan..." : (editingItem ? "Simpan Perubahan" : "Tambahkan Menu")}
                </button>
            </form>
        </Modal>
    );
});

export default MenuFormModal;
