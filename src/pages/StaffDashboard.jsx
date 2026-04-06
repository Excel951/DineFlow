import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Box, Button, Chip, Container, Grid, Paper, Tab, Tabs, Typography} from "@mui/material";
import {BellRing, CheckCircle2, Clock, CookingPot, ShoppingBag} from "lucide-react";
import {clearNotification, receiveNewOrder, updateOrderStatus} from "../store/OrderSlice.js";
import Items from "../Items.js";
import {notificationSound} from "../utils/audio.js";


export default function StaffDashboard() {
    const dispatch = useDispatch();

    const orders = useSelector((state) => state.orders.list);
    const hasNewOrder = useSelector((state) => state.orders.hasNewOrder);

    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (hasNewOrder) {
            notificationSound();
            dispatch(clearNotification());
        }
    }, [hasNewOrder, dispatch]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const simulateIncomingOrder = () => {
        const newId = "ORD-" + Math.floor(Math.random() * 100000);

        dispatch(receiveNewOrder({
            id: newId,
            table: "Meja " + Math.floor(Math.random() * 100000),
            items: [
                {itemId: 1, qty: 1},
                {itemId: 3, qty: 3},
            ],
            total: 129000,
            status: 0,
            time: "Baru saja",
            // time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
        }))
    }

    const filteredOrders = orders.filter(order => order.status === tabValue);

    return (
        <Box className="min-h-screen bg-gray-50 pb-10">
            {/* Header Dashboard */}
            <Box className="bg-white border-b border-gray-100 p-6 sticky top-0 z-20 shadow-sm">
                <Container maxWidth="md">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <Typography variant="h5" className="font-black text-gray-800">DineFlow Staff</Typography>
                            <Typography variant="caption"
                                        className="text-gray-400 font-medium tracking-widest uppercase">
                                Order Management System
                            </Typography>
                        </div>

                        {/* Tombol Simulasi - Nanti bisa dihapus kalau WebSocket backend Go sudah siap */}
                        <Button
                            variant="outlined"
                            color="warning"
                            onClick={simulateIncomingOrder}
                            startIcon={<BellRing size={16}/>}
                            className="rounded-full border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 font-bold"
                        >
                            Simulasi Order
                        </Button>
                    </div>

                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        textColor="inherit"
                        TabIndicatorProps={{style: {backgroundColor: '#ea580c', height: 3}}}
                    >
                        <Tab
                            icon={<ShoppingBag size={18}/>}
                            label={`Baru (${orders.filter(o => o.status === 0).length})`}
                            className="font-bold capitalize"
                        />
                        <Tab icon={<CookingPot size={18}/>} label="Proses" className="font-bold capitalize"/>
                        <Tab icon={<CheckCircle2 size={18}/>} label="Selesai" className="font-bold capitalize"/>
                    </Tabs>
                </Container>
            </Box>

            {/* List Pesanan */}
            <Container maxWidth="md" className="mt-8">
                <Grid container spacing={3}>
                    {filteredOrders.length === 0 ? (
                        <Box className="w-full text-center py-20 opacity-40">
                            <ShoppingBag size={64} className="mx-auto mb-4"/>
                            <Typography>Tidak ada pesanan di kategori ini</Typography>
                        </Box>
                    ) : (
                        filteredOrders.map((order) => (
                            <Grid item xs={12} key={order.id}>
                                <Paper elevation={0}
                                       className="p-5 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                    {/* ... HEADER CARD ... */}
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Typography
                                                    className="font-black text-lg text-gray-800">{order.table}</Typography>
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

                                    {/* LOGIKA LOOKUP ITEM:
                                         Kita mencocokkan orderItem.itemId dengan data di Items.js
                                      */}
                                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 mb-5 space-y-2">
                                        {order.items.map((orderItem, idx) => {
                                            // Temukan data lengkap produk berdasarkan ID
                                            const productDetail = Items.find(p => p.id === orderItem.itemId);
                                            // Fallback jika ID tidak ditemukan (mencegah crash)
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

                                    {/* ... Action Button ... */}
                                    <div className="flex gap-2">
                                        {order.status === 0 && (
                                            <Button
                                                fullWidth variant="contained"
                                                className="bg-orange-500 hover:bg-orange-600 rounded-xl py-3 font-bold capitalize shadow-orange-200 shadow-lg"
                                                onClick={() => dispatch(updateOrderStatus({id: order.id, status: 1}))}
                                            >
                                                Terima & Masak
                                            </Button>
                                        )}
                                        {order.status === 1 && (
                                            <Button
                                                fullWidth variant="contained"
                                                className="bg-green-600 hover:bg-green-700 rounded-xl py-3 font-bold capitalize shadow-green-200 shadow-lg"
                                                onClick={() => dispatch(updateOrderStatus({id: order.id, status: 2}))}
                                            >
                                                Makanan Siap Diantar
                                            </Button>
                                        )}
                                    </div>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
