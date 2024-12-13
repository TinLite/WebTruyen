import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

import { Autocomplete, Divider, InputAdornment, TextField, Typography } from '@mui/material';
import { CreatorStudioNavigationBar } from '../components/navigation-bar';

const drawerWidth = 240;

export default function StudioLayout() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawerContent = (
        <>
            <Toolbar>
                <Typography variant="h6">
                    NetTrộm Studio
                </Typography>
            </Toolbar>
            <Divider />
            <CreatorStudioNavigationBar />
        </>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawerContent}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar
                    className="sticky top-0 z-30"
                    sx={[
                        (theme)=>({
                            backgroundColor: theme.palette.background.default,
                        }),
                    ]}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {md: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Autocomplete
                        freeSolo
                        id="free-solo-2-demo"
                        disableClearable
                        options={[]}
                        sx={{
                            flexShrink: '0',
                            marginLeft: 'auto',
                        }}
                        className='ml-auto max-w-xs flex-grow'
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Search"
                                placeholder="Kimetsu no Yaiba"
                                size="small"
                                slotProps={{
                                    input: {
                                        ...params.InputProps,
                                        type: 'search',
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    },
                                }}
                            />
                        )}
                    />
                </Toolbar>
                <div>
                    <Outlet />
                </div>
            </Box>
        </Box>
    );
}
