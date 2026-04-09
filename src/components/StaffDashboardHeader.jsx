import React from 'react';
import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { BellRing, CheckCircle2, CookingPot, ShoppingBag } from "lucide-react";

export default function StaffDashboardHeader({ tabValue, onTabChange, onSimulateOrder, newOrdersCount }) {
    return (
        <Box className="bg-white border-b border-gray-100 p-6 sticky top-0 z-20 shadow-sm">
            <Container maxWidth="md">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <Typography variant="h5" className="font-black text-gray-800">DineFlow Staff</Typography>
                        <Typography variant="caption" className="text-gray-400 font-medium tracking-widest uppercase">
                            Order Management System
                        </Typography>
                    </div>

                    <Button
                        variant="outlined"
                        color="warning"
                        onClick={onSimulateOrder}
                        startIcon={<BellRing size={16}/>}
                        className="rounded-full border-orange-200 text-orange-600 bg-orange-50 hover:bg-orange-100 font-bold"
                    >
                        Simulasi Order
                    </Button>
                </div>

                <Tabs
                    value={tabValue}
                    onChange={onTabChange}
                    variant="fullWidth"
                    textColor="inherit"
                    TabIndicatorProps={{style: {backgroundColor: '#ea580c', height: 3}}}
                >
                    <Tab
                        icon={<ShoppingBag size={18}/>}
                        label={`Baru (${newOrdersCount})`}
                        className="font-bold capitalize"
                    />
                    <Tab icon={<CookingPot size={18}/>} label="Proses" className="font-bold capitalize"/>
                    <Tab icon={<CheckCircle2 size={18}/>} label="Selesai" className="font-bold capitalize"/>
                </Tabs>
            </Container>
        </Box>
    );
}
