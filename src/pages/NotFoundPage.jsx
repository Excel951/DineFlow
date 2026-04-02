import {useNavigate} from "react-router";
import {Box, Button, Container, Typography} from "@mui/material";
import {ArrowLeft, UtensilsCrossed} from "lucide-react";
import React from "react";

export default function NotFoundPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <Box className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">

            {/* Ornamen Latar Belakang (Opsional, agar tidak terlalu sepi) */}
            <div className="absolute top-10 left-10 text-orange-100 opacity-50 rotate-[-15deg]">
                <UtensilsCrossed size={120} />
            </div>
            <div className="absolute bottom-10 right-10 text-orange-100 opacity-50 rotate-[15deg]">
                <UtensilsCrossed size={150} />
            </div>

            <Container maxWidth="sm" className="text-center relative z-10">
                {/* Visual Tengah (Piring Ikon - Anti Pecah) */}
                <div className="mb-10 relative">
                    {/* Lingkaran Piring Putih */}
                    <div className="w-60 h-60 sm:w-72 sm:h-72 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl shadow-orange-100 border-8 border-white group transition-transform hover:scale-105 duration-500">
                        {/* Ikon Sendok Garpu Raksasa (Warna Gray/Orange) */}
                        <div className="text-gray-300 group-hover:text-orange-400 transition-colors duration-500">
                            <UtensilsCrossed size={120} strokeWidth={1.5} className="sm:scale-[1.3]" />
                        </div>
                    </div>

                    {/* Badge 404 (Modern & Eye-Catching) */}
                    <div className="absolute -bottom-5 -right-5 sm:-right-8 bg-gray-900 text-white font-black text-2xl py-3 px-6 rounded-3xl shadow-2xl rotate-12 border-4 border-white">
                        404
                    </div>
                </div>

                {/* Teks Error */}
                <Typography variant="h3" className="font-black text-gray-800 mb-3 tracking-tight">
                    Oops! Kehabisan Menu
                </Typography>

                <Typography className="text-gray-500 mb-10 font-medium text-base sm:text-lg px-4">
                    Sepertinya halaman yang kamu cari sudah dihapus dari menu, atau meja ini memang tidak pernah ada.
                </Typography>

                {/* Tombol Kembali (Konsisten dengan tema DineFlow) */}
                <button
                    onClick={handleBack}
                    variant="contained"
                    startIcon={<ArrowLeft size={20} />}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 px-8 rounded-2xl shadow-lg shadow-orange-200 capitalize text-lg transition-transform hover:-translate-y-1"
                >
                    Kembali ke Sebelumnya
                </button>
            </Container>
        </Box>
    )
}