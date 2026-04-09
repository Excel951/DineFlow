import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Container, Grid, Typography } from "@mui/material";
import { ShoppingBag } from "lucide-react";
import { clearNotification, receiveNewOrder } from "../store/orderSlice";
import StaffDashboardOrderCard from "../components/StaffDashboardOrderCard";
import StaffDashboardHeader from "../components/StaffDashboardHeader";
import { notificationSound } from "../utils/audio.js";

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

    const simulateIncomingOrder = () => {
        dispatch(receiveNewOrder({
            id: "ORD-" + Math.floor(Math.random() * 100000),
            table: "Meja " + Math.floor(Math.random() * 100000),
            items: [{itemId: 1, qty: 1}, {itemId: 3, qty: 3}],
            total: 129000,
            status: 0,
            time: "Baru saja",
        }));
    };

    const filteredOrders = orders.filter(order => order.status === tabValue);
    const newOrdersCount = orders.filter(o => o.status === 0).length;

    return (
        <Box className="min-h-screen bg-gray-50 pb-10">
            <StaffDashboardHeader 
                tabValue={tabValue} 
                onTabChange={(e, v) => setTabValue(v)} 
                onSimulateOrder={simulateIncomingOrder} 
                newOrdersCount={newOrdersCount} 
            />

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
                                <StaffDashboardOrderCard order={order} />
                            </Grid>
                        ))
                    )}
                </Grid>
            </Container>
        </Box>
    );
}
