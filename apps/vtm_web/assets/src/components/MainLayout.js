// @flow

import React, {useEffect, useState} from 'react';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {CommonListItem, MainListItems, SecondaryListItems} from "./_layout/Menu";
import {isUserMaster} from "../services/base-types";
import {useSession} from "../services/session-service";
import {useMediaQuery} from "@mui/material";
import MessageControl from "./_layout/MessageControl";
import OnlineControl from "./_layout/OnlineControl";
import LogoutControl from "./_layout/LogoutControl";
import DefaultFallback from "../_base/components/DefaultFallback";
import ReloadControl from "./_layout/ReloadControl";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(9)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({children}: {children: any}): any {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [user,] = useSession();

    const [characterFetchKey, setCharacterFetchKey] = useState(Math.round(Math.random() * 100));

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const theresEnoughSpace = useMediaQuery(theme.breakpoints.up("md"));
    const showCompressedTitle = useMediaQuery(theme.breakpoints.down('sm'));
    const showPartialTitle = useMediaQuery(theme.breakpoints.down('lg'));

    useEffect(() => {
        setOpen(_ => theresEnoughSpace);
    }, [theresEnoughSpace]);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const closeOnSelected = () => {
        if (fullScreen) {
            handleDrawerClose();
        }
    }

    const onCharacterUpdate = () => {
        setCharacterFetchKey(p => p + 1);
    }

    const masterMenu = () => {
        if (isUserMaster(user)) {
            return (
                <>
                    <Divider/>
                    <List>
                        <SecondaryListItems drawerDone={closeOnSelected} 
                                            isClosed={!open}
                                            onUpdate={onCharacterUpdate}
                                            reloadCount={characterFetchKey} />
                    </List>
                </>
            );
        }

        return (<></>);
    };

    const title = () => {
        if (showCompressedTitle) {
            return "VTM Baires";
        }

        if (showPartialTitle) {
            return "Vampire TM: Buenos Aires by Night";
        }

        return "Vampire the Masquerade: Buenos Aires by Night";
    }

    const drawerContent = () => (
        <Box sx={{
            background: "url('pattern.webp')"
        }}>
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                <MainListItems drawerDone={closeOnSelected}
                               isClosed={!open}
                               onUpdate={onCharacterUpdate}
                               reloadCount={characterFetchKey} />
            </List>
            <Divider />
            {masterMenu()}
            <Divider />
            <CommonListItem isClosed={!open} />
        </Box>
    );

    const drawer = () => {
        if (theresEnoughSpace) {
            return (
                <Drawer variant="permanent" open={open}>
                    {drawerContent()}
                </Drawer>
            );
        }
        
        return (
            <MuiDrawer variant="temporary"
                       open={open}
                       onClose={() => setOpen(_ => false)}
                       ModalProps={{
                           keepMounted: true, // Better open performance on mobile.
                       }}
                       sx={{
                           display: { xs: 'block', sm: 'none' },
                           '& .MuiDrawer-paper': {
                               boxSizing: 'border-box',
                               width: drawerWidth,
                               backgroundColor: "black"
                           }
                       }}>
                {drawerContent()}
            </MuiDrawer>
        );
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                background: "url('masquerade.webp')"
            }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6"
                                noWrap
                                component="h1"
                                color="inherit"
                                sx={{
                                    flexGrow: "1",
                                    fontFamily: 'GabrieleLightRibbon'
                                }}>
                        {title()}
                    </Typography>
                    <ReloadControl />
                    <MessageControl />
                    <OnlineControl />
                    <LogoutControl />
                </Toolbar>
            </AppBar>
            {drawer()}
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                background: "url('pattern.webp')"
            }} style={{height: "100vh"}}>
                <DrawerHeader />
                <React.Suspense fallback={<DefaultFallback />}>
                    {children}
                </React.Suspense>
            </Box>
        </Box>
    );
}
