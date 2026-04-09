import {Box, useMediaQuery, useTheme} from "@mui/material";
import {Suspense, useEffect, useState} from "react";
import {Outlet} from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
import LoadingFallback from "../LoadingFallback";

export default function AdminLayout() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
    const sidebarWidth = 280;

    useEffect(() => {
        setIsSidebarOpen(!isMobile);
    }, [isMobile]);

    const toggleSidebar = () => {
        setIsSidebarOpen((!isSidebarOpen));
    }

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F9FAFB' }}>

            {/* SIDEBAR NAVIGATION */}
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                isMobile={isMobile}
                width={sidebarWidth}
            />

            {/* MAIN CONTENT AREA */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    minWidth: 0,
                    // Transisi margin dan width agar animasinya smooth saat sidebar bergeser
                    transition: theme.transitions.create(['margin', 'width'], {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    // Di layar PC, jika sidebar tertutup, lebarnya jadi 100%
                    width: {
                        xs: '100%',
                        md: isSidebarOpen ? `calc(100% - ${sidebarWidth}px)` : '100%'
                    },
                }}
            >
                {/* HEADER */}
                <AdminHeader onMenuClick={toggleSidebar} />

                {/* CONTENT */}
                <Box
                    sx={{
                        p: { xs: 2, sm: 3, md: 4 },
                        flexGrow: 1,
                        overflowY: 'auto'
                    }}
                >
                    <Suspense fallback={<LoadingFallback />}>
                        <Outlet />
                    </Suspense>
                </Box>
            </Box>
        </Box>
    )
}