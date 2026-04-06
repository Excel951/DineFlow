import React, {useEffect, useRef} from 'react';
import { Box, Typography, Button, Chip, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight, ArrowLeft, Flame, Scale, ChefHat, Sparkles } from "lucide-react";
import {useSelector} from "react-redux";

// Komponen ini menerima props:
// - item: Makanan yang sedang dipilih
// - menuItems: Seluruh daftar makanan (untuk mencari Prev, Next, dan Rekomendasi)
// - onNavigate: Fungsi untuk memindah item (Prev/Next)
// - onClose: Fungsi untuk menutup modal
export default function FoodDetailModal({ item, menuItems, onNavigate, onClose, onSelectRecommendation }) {
    const topOfModalRef = useRef(null);
    const allMenuItems = useSelector((state) => state.items.list);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (topOfModalRef.current) {
                const scrollContainer = topOfModalRef.current.closest('.overflow-y-auto');
                if (scrollContainer) {
                    scrollContainer.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    })
                } else {
                    topOfModalRef.current.scrollIntoView({
                        behavior: 'smooth', block: 'start'
                    })
                }
            }
        }, 100)

        return () => clearTimeout(timer);
    }, [item]);

    if (!item) return null;

//     LOGIC NAVIGASI
    const currentIndex = menuItems.findIndex(i => i.id === item.id);
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex !== -1 && currentIndex < menuItems.length - 1;

//     LOGIC REKOMENDASI
    const recommendedItems = allMenuItems
        .filter((m) => m.id !== item.id && m.category !== item.category)
        .slice(0, 4);

    return (
        <Box ref={topOfModalRef} className="pb-4">
            <div className="text-center mb-8 mt-2">
                <Typography variant="h3" className="font-black text-gray-900 tracking-tight leading-tight text-3xl sm:text-4xl md:text-5xl">
                    {item.name}
                </Typography>
                <div className="flex justify-center mt-4">
                    <Chip
                        icon={<Flame size={16} className="text-orange-500" />}
                        label={item.category}
                        className="bg-orange-50 text-orange-700 font-bold uppercase tracking-widest text-xs px-3 py-4 rounded-xl"
                    />
                </div>
            </div>

            {/* LAYOUT KOLOM */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-12 mb-12 items-start">

                {/* Gambar Utama */}
                <div className="w-full md:w-1/2 lg:w-5/12 shrink-0">
                    <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl shadow-orange-100/50 border-4 sm:border-8 border-white group">
                        <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute bottom-4 right-4 bg-gray-900/90 backdrop-blur-sm text-white font-black text-xl py-2 px-5 rounded-2xl shadow-lg border border-gray-700">
                            Rp {item.price.toLocaleString()}
                        </div>
                    </div>
                </div>

                {/* Deskripsi */}
                <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col justify-center">
                    <Typography variant="h6" className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <ChefHat size={22} className="text-orange-500" />
                        Deskripsi Hidangan
                    </Typography>
                    <Typography className="text-gray-600 leading-relaxed mb-8 font-medium text-base md:text-lg">
                        Dibuat dengan bahan-bahan premium pilihan yang diracik khusus oleh chef kami. Menghadirkan perpaduan rasa autentik dengan bumbu rahasia keluarga yang dijamin memanjakan lidah Anda sejak suapan pertama.
                    </Typography>

                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="bg-orange-50/50 p-5 rounded-3xl border border-orange-100">
                            <div className="flex items-center gap-2 text-gray-800 font-black mb-2 text-sm md:text-base">
                                <Scale size={18} className="text-orange-500" /> Berat Porsi
                            </div>
                            <Typography className="text-gray-500 font-medium">± 350 Gram</Typography>
                        </div>
                        <div className="bg-orange-50/50 p-5 rounded-3xl border border-orange-100">
                            <div className="flex items-center gap-2 text-gray-800 font-black mb-2 text-sm md:text-base">
                                <Sparkles size={18} className="text-orange-500" /> Bumbu Utama
                            </div>
                            <Typography className="text-gray-500 font-medium">Mala, Garlic, Soy</Typography>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <Typography variant="h6" className="font-bold text-gray-800 mb-5 px-1 flex items-center gap-2">
                    Cocok Dinikmati Bersama
                </Typography>

                {/* REKOMENDASI: Ukuran diperkecil (w-28 sm:w-32) agar tidak menyaingi gambar utama */}
                <div className="flex overflow-x-auto gap-4 md:gap-6 pb-4 hide-scrollbar snap-x">
                    {recommendedItems.map((recommended) => (
                        <div
                            key={recommended.id}
                            onClick={() => onSelectRecommendation(recommended)}
                            className="w-28 sm:w-32 shrink-0 cursor-pointer group snap-start"
                        >
                            <div className="w-full aspect-square rounded-[1.5rem] overflow-hidden mb-3 shadow-md border-2 border-transparent group-hover:border-orange-400 transition-all duration-300">
                                <img
                                    src={recommended.image}
                                    alt={recommended.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <Typography className="font-bold text-gray-800 text-sm truncate group-hover:text-orange-600 transition-colors">
                                {recommended.name}
                            </Typography>
                            <Typography className="text-orange-500 font-black text-xs mt-0.5">
                                Rp {recommended.price.toLocaleString()}
                            </Typography>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. NAVIGASI BAWAH (STICKY FOOTER) */}
            {/* -mx-6 dan px-6 digunakan agar tombol menempel ke ujung kiri-kanan modal */}
            {/* sticky bottom-0 membuatnya tidak ikut terscroll */}
            <div className="sticky bottom-0 py-4 bg-white/95 backdrop-blur-sm border-t border-gray-100 z-10 flex justify-between items-center mt-8">
                <Button
                    disabled={!hasPrev}
                    onClick={() => onNavigate(currentIndex - 1)}
                    startIcon={<ChevronLeft size={20} />}
                    className={`font-bold py-3 px-2 sm:px-6 rounded-2xl capitalize ${hasPrev ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'}`}
                >
                    <span className="hidden sm:inline">Sebelumnya</span>
                </Button>

                {/*/!* Tombol Back ini sekarang menggantikan posisi tombol default Modal *!/*/}
                {/*<Button*/}
                {/*    onClick={onClose}*/}
                {/*    variant="contained"*/}
                {/*    startIcon={<ArrowLeft size={18} />}*/}
                {/*    className="bg-gray-900 hover:bg-black text-white font-bold py-3 px-6 sm:px-12 rounded-2xl shadow-lg capitalize text-sm sm:text-base"*/}
                {/*>*/}
                {/*    Kembali*/}
                {/*</Button>*/}

                <Button
                    disabled={!hasNext}
                    onClick={() => onNavigate(currentIndex + 1)}
                    endIcon={<ChevronRight size={20} />}
                    className={`font-bold py-3 px-2 sm:px-6 rounded-2xl capitalize ${hasNext ? 'text-gray-700 hover:bg-gray-100' : 'text-gray-300'}`}
                >
                    <span className="hidden sm:inline">Selanjutnya</span>
                </Button>
            </div>
        </Box>
    )
}