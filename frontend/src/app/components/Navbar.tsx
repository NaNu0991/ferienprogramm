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
            <AppBar position="static" style={{ backgroundColor: 'grey', boxShadow: 'none' }}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
                        onClick={() => setDrawerOpen(true)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Geltendorfer Ferienprogramm
                    </Typography>
                    {menuItems.map(item => (
                        <Button
                            key={item.text}
                            href={item.href}
                            variant="contained"
                            color="inherit"
                            sx={{ display: { xs: 'none', md: 'inline-flex' }, ml: 1, color: 'black' }}
                        >
                            {item.text}
                        </Button>
                    ))}
                </Toolbar>
            </AppBar>

            {/* Drawer für mobile Navigation */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <List sx={{ width: 220 }}>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                onClick={() => setDrawerOpen(false)}
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
