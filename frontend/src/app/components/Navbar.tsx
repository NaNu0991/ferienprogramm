'use client'

import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';

export function Navbar() {
    const [drawerOpen, setDrawerOpen] = useState(false);

    const menuItems = [
        { text: 'START', href: '/' },
        { text: 'ANMELDUNG', href: '/anmeldung' },
        { text: 'PROGRAMMLISTE', href: '/programmliste' },
        { text: 'KALENDER', href: '/kalender' },
        { text: 'IMPRESSUM', href: '/impressum' },
    ];

    return (
        <>
            <AppBar
                position="sticky"
                elevation={6}
                sx={{
                    top: 0,
                    bgcolor: '#aedff7',
                    color: '#045a8d',
                    borderRadius: '0 0 16px 16px',
                    px: { xs: 2, md: 4 },
                    zIndex: (theme) => theme.zIndex.drawer + 1, // sicher über Drawer und anderem Content
                }}
            >
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon fontSize="large" />
                    </IconButton>

                    <Typography
                        variant="h5"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            fontFamily: "'Comic Sans MS', cursive, sans-serif", // spielerische Schrift
                            fontWeight: 'bold',
                            letterSpacing: 1,
                        }}
                    >
                        Gemeinde Ferienprogramm
                    </Typography>

                    {menuItems.map((item) => (
                        <Button
                            key={item.text}
                            href={item.href}
                            variant="contained"
                            color="primary"
                            sx={{
                                display: { xs: 'none', md: 'inline-flex' },
                                ml: 2,
                                backgroundColor: '#3f51b5', // Indigo-Blau als Hintergrund
                                color: '#ffffff',           // Weißer Text für klaren Kontrast
                                borderRadius: 2,
                                fontWeight: 600,
                                fontSize: '1rem',
                                textTransform: 'none',
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: '#303f9f', // Dunkleres Indigo beim Hover
                                    boxShadow: 'none',
                                },
                            }}
                        >
                            {item.text}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>

            <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <List sx={{ width: 250, bgcolor: '#fce4ec' /* zartes Rosa */ }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                onClick={() => setDrawerOpen(false)}
                                sx={{
                                    color: '#3e2723',
                                    fontWeight: 600,
                                    fontFamily: "'Comic Sans MS', cursive, sans-serif",
                                }}
                            >
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
