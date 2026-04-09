import React from 'react';
import { Chip, IconButton, Paper, Typography } from "@mui/material";
import { Edit2, Tag, Trash2 } from "lucide-react";

export default function MenuCard({ item, onEdit, onDelete }) {
    return (
        <Paper
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
                        icon={<Tag size={12} className="text-orange-600" />}
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
                    onClick={() => onEdit(item)}
                    className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-colors"
                >
                    <Edit2 size={18} />
                </IconButton>
                <IconButton
                    onClick={() => onDelete(item.id)}
                    className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-colors"
                >
                    <Trash2 size={18} />
                </IconButton>
            </div>
        </Paper>
    );
}
