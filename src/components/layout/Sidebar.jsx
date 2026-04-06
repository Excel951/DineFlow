import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Box, Drawer, Typography, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { LayoutDashboard, Utensils, ClipboardList, Settings, LogOut } from 'lucide-react';

const SIDEBAR_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/staff/dashboard' },
    { id: 'menu', label: 'Master Menu', icon: Utensils, path: '/staff/menu' },
    { id: 'orders', label: 'Order List', icon: ClipboardList, path: '/staff/orders' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/staff/settings' },
];


export default function Sidebar({ isOpen, onClose, isMobile, width }) {
    const location = useLocation();

    const SidebarContent = (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 3 }}>
            {/* Logo Area */}
            <Typography variant="h5" sx={{ fontWeight: 900, color: '#F97316', mb: 5, px: 2 }}>
                DineFlow <span style={{ color: '#1F2937' }}>Staff</span>
            </Typography>

            {/* Navigation List */}
            <List sx={{ flexGrow: 1 }}>
                {SIDEBAR_ITEMS.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItemButton
                            key={item.id}
                            component={NavLink}
                            to={item.path}
                            onClick={isMobile ? onClose : undefined}
                            sx={{
                                mb: 1,
                                borderRadius: '12px',
                                color: isActive ? '#F97316' : '#6B7280',
                                bgcolor: isActive ? '#FFF7ED' : 'transparent',
                                '&:hover': { bgcolor: '#FFF7ED', color: '#F97316' },
                            }}
                        >
                            <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                                <item.icon size={22} />
                            </ListItemIcon>
                            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 700 }} />
                        </ListItemButton>
                    );
                })}
            </List>

            {/* Logout Button */}
            <ListItemButton sx={{ borderRadius: '12px', color: '#EF4444', mt: 'auto' }}>
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                    <LogOut size={22} />
                </ListItemIcon>
                <ListItemText primary="Logout" primaryTypographyProps={{ fontWeight: 700 }} />
            </ListItemButton>
        </Box>
    )

    return (
        <Box
            component="nav"
            sx={{
                width: { md: isOpen ? width : 0 },
                flexShrink: { md: 0 },
                transition: 'width 0.3s ease-in-out', // Animasi mulus saat sidebar ditutup/dibuka
            }}
        >
            <Drawer
                variant={isMobile ? "temporary" : "persistent"}
                open={isOpen}
                onClose={onClose}
                PaperProps={{
                    sx: {
                        width: width,
                        border: 'none',
                        borderRight: '1px solid #F3F4F6',
                        boxShadow: isMobile ? 4 : 0 // Shadow hanya muncul saat di HP
                    }
                }}
            >
                {SidebarContent}
            </Drawer>
        </Box>
    )
}