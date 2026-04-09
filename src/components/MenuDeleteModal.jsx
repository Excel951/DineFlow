import React from 'react';
import { Typography } from "@mui/material";
import Modal from "./UI/Modal.jsx";

const MenuDeleteModal = React.forwardRef(({ onConfirm, onCancel }, ref) => {
    return (
        <Modal ref={ref} title="Konfirmasi Hapus Menu">
            <Typography className="text-gray-700 mb-4">
                Apakah Anda yakin ingin menghapus menu ini? Tindakan ini tidak dapat dibatalkan.
            </Typography>
            <div className="flex justify-end gap-3">
                <button
                    onClick={onCancel}
                    className="bg-gray-100 text-gray-500 hover:bg-gray-200 rounded-xl font-bold px-5 py-2"
                >
                    Batal
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-500 text-white hover:bg-red-600 rounded-xl font-bold px-5 py-2"
                >
                    Hapus
                </button>
            </div>
        </Modal>
    );
});

export default MenuDeleteModal;
