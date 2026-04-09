import React from 'react';
import { Button, Chip, Paper, Typography } from "@mui/material";
import { Clock } from "lucide-react";
import { useDispatch } from "react-redux";
import { updateOrderStatus } from "../store/orderSlice";
import Items from "../Items.js";

export default function StaffDashboardOrderCard({ order }) {
    const dispatch = useDispatch();

    return (
        <Paper elevation={0}
               className="p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            {/* ... HEADER CARD ... */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Typography className="font-black text-lg text-gray-800">{order.table}</Typography>
                        <Chip label={order.id} size="small"
                              className="bg-orange-100 text-orange-800 text-[10px] font-bold"/>
                    </div>
                    <div className="flex items-center text-gray-400 gap-1 text-xs font-medium">
                        <Clock size={12}/> <span>{order.time}</span>
                    </div>
                </div>
                <Typography className="font-bold text-gray-800 bg-gray-50 px-3 py-1 rounded-lg">
                    Rp {order.total.toLocaleString()}
                </Typography>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-5 space-y-2">
                {order.items.map((orderItem, idx) => {
                    const productDetail = Items.find(p => p.id === orderItem.itemId);
                    const productName = productDetail ? productDetail.name : "Menu tidak diketahui";

                    return (
                        <div key={idx} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-500"/>
                            <Typography variant="body2"
                                        className="text-gray-700 font-semibold flex-1">
                                {productName}
                            </Typography>
                            <Typography variant="body2" className="font-bold text-orange-600">
                                x{orderItem.qty}
                            </Typography>
                        </div>
                    );
                })}
            </div>

            <div className="flex gap-2">
                {order.status === 0 && (
                    <Button
                        fullWidth variant="contained"
                        className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 font-bold capitalize shadow-orange-200 shadow-lg text-white"
                        onClick={() => dispatch(updateOrderStatus({id: order.id, status: 1}))}
                    >
                        Terima & Masak
                    </Button>
                )}
                {order.status === 1 && (
                    <Button
                        fullWidth variant="contained"
                        className="bg-green-600 hover:bg-green-700 rounded-xl py-3 font-bold capitalize shadow-green-200 shadow-lg text-white"
                        onClick={() => dispatch(updateOrderStatus({id: order.id, status: 2}))}
                    >
                        Makanan Siap Diantar
                    </Button>
                )}
            </div>
        </Paper>
    );
}
