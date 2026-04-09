import React from 'react';
import { AppBar, Toolbar, IconButton, Box, Typography, Avatar, Chip } from '@mui/material';
import { Menu, Bell } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function AdminHeader({onMenuClick, isMobile}) {
    const {userName} = useSelector(state => state.auth);

    return (
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid #F3F4F6',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {/* Tombol Menu sekarang selalu muncul (dulu tersembunyi di PC) */}
                    <IconButton onClick={onMenuClick} sx={{ mr: 1, color: '#1F2937' }}>
                        <Menu size={24} />
                    </IconButton>

                    <Typography variant="body1" sx={{ color: '#6B7280', fontWeight: 500, display: { xs: 'none', sm: 'block' } }}>
                        Selamat bekerja, <span style={{ color: '#1F2937', fontWeight: 800 }}>{userName || 'Staff'}</span>!
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
                    <IconButton sx={{ color: '#6B7280', bgcolor: '#F9FAFB' }}>
                        <Bell size={20} />
                    </IconButton>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: 2, borderLeft: '1px solid #F3F4F6' }}>
                        <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1F2937', lineHeight: 1 }}>
                                {userName || 'Deo'}
                            </Typography>
                            <Chip label="Administrator" size="small" sx={{ height: 18, fontSize: 10, fontWeight: 700, mt: 0.5, bg: '#F3F4F6' }} />
                        </Box>
                        <Avatar
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Deo"
                            sx={{ width: 40, height: 40, border: '2px solid #F97316' }}
                        />
                    </Box>
                </Box>
            </Toolbar>
        </AppBar>
    )
}