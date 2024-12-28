import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container, useTheme, useMediaQuery, SwipeableDrawer } from '@mui/material';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Breadcrumbs from './Breadcrumbs';
import { useLayout } from '../../hooks/useLayout';
import { useLayoutContext } from '../../contexts/LayoutContext';

const MainLayout = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const { isSidebarOpen, toggleSidebar } = useLayout();
    const { isSidebarOpen: contextIsSidebarOpen } = useLayoutContext();

    // Mobile sidebar component
    const MobileSidebar = () => (
        <SwipeableDrawer
            anchor="left"
            open={isSidebarOpen}
            onClose={toggleSidebar}
            onOpen={toggleSidebar}
            sx={{
                display: { xs: 'block', md: 'none' },
                '& .MuiDrawer-paper': {
                    width: 240,
                    bgcolor: theme.palette.mode === 'dark' ? '#1e1e1e' : '#fff',
                }
            }}
        >
            <Sidebar mobile />
        </SwipeableDrawer>
    );

    // Desktop sidebar component
    const DesktopSidebar = () => (
        <Sidebar 
            open={isSidebarOpen} 
            onClose={toggleSidebar}
            variant="permanent"
            sx={{
                display: { xs: 'none', md: 'block' },
                '& .MuiDrawer-paper': {
                    position: 'fixed',
                    width: isSidebarOpen ? 240 : 64,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                },
            }}
        />
    );

    return (
        <Box 
            sx={{
                display: 'flex',
                height: '100vh',
                overflow: 'hidden'
            }}
        >
            {/* Render both sidebars - they'll be conditionally displayed via CSS */}
            <MobileSidebar />
            <DesktopSidebar />

            {/* Main Content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100vh',
                    overflow: 'hidden',
                    transition: 'margin-left 0.3s ease',
                    marginLeft: { xs: 0, md: isSidebarOpen ? '240px' : '64px' },
                }}
            >
                <Header 
                    onToggleSidebar={toggleSidebar}
                    isMobile={isMobile}
                />

                <Box
                    sx={{
                        p: 3,
                        flexGrow: 1,
                        overflow: 'auto',
                        height: 'calc(100vh - 64px)',
                    }}
                >
                    <Breadcrumbs sx={{ mb: { xs: 2, sm: 3 } }} />

                    <Container 
                        maxWidth="xl" 
                        disableGutters
                        sx={{ 
                            py: { xs: 2, sm: 3 },
                            px: { xs: 1, sm: 2, md: 3 } 
                        }}
                    >
                        <Box
                            sx={{
                                bgcolor: theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
                                minHeight: 'calc(100vh - 88px)',
                                borderRadius: 1,
                            }}
                        >
                            <Outlet />
                        </Box>
                    </Container>
                </Box>

                <Footer sx={{ 
                    py: { xs: 2, sm: 3 },
                    px: { xs: 2, sm: 3, md: 4 } 
                }} />
            </Box>
        </Box>
    );
};

export default MainLayout; 