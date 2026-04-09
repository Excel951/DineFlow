import React from 'react';
import { Chip, InputBase, Paper } from "@mui/material";
import { Search } from "lucide-react";

export default function MenuFilterBar({ 
    searchQuery, 
    setSearchQuery, 
    categories, 
    activeCategory, 
    setActiveCategory 
}) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search Bar */}
            <Paper elevation={0}
                   className="flex-1 flex items-center bg-white px-4 py-1.5 rounded-2xl border border-gray-200 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                <Search size={20} className="text-gray-400 mr-2" />
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
    );
}
