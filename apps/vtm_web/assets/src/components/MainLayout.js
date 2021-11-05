// @flow

import React, {useState} from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {CommonListItem, MainListItems, SecondaryListItems} from "./_layout/Menu";
import {isUserMaster} from "../services/base-types";
import {useSession} from "../services/session-service";
import {useMediaQuery} from "@mui/material";
import MessageControl from "./_layout/MessageControl";
import OnlineControl from "./_layout/OnlineControl";
import LogoutControl from "./_layout/LogoutControl";
import DefaultFallback from "../_base/components/DefaultFallback";
import ReloadControl from "./_layout/ReloadControl";
import {useMessageSubscription} from "./_hooks/useMessageSubscription";

const drawerWidth = 300;

export default function MiniDrawer({children}: {children: any}): any {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [user,] = useSession();
    const numberOfMessages = useMessageSubscription();

    const [characterFetchKey, setCharacterFetchKey] = useState(Math.round(Math.random() * 100));

    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const showCompressedTitle = useMediaQuery(theme.breakpoints.down('sm'));
    const showPartialTitle = useMediaQuery(theme.breakpoints.down('lg'));

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
        <Box>
            <Toolbar />
            <Divider />
            <List>
                <MainListItems drawerDone={closeOnSelected}
                               onUpdate={onCharacterUpdate}
                               reloadCount={characterFetchKey} />
            </List>
            <Divider />
            {masterMenu()}
            <Divider />
            <CommonListItem />
        </Box>
    );

    const drawer = () => {
        const container = window !== undefined ? () => window.document.body : undefined;

        return (
            <>
                <Drawer container={container}
                        variant="temporary"
                        open={open}
                        onClose={_ => setOpen(p => !p)}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}>
                    {drawerContent()}
                </Drawer>
                <Drawer variant="permanent"
                        sx={{
                            display: { xs: 'none', md: 'block' },
                            '& .MuiDrawer-paper': {
                                boxSizing: 'border-box',
                                width: drawerWidth,
                                background: "transparent"
                            },
                        }}
                        open>
                    {drawerContent()}
                </Drawer>
            </>
        );
    };

    return (
        <Box sx={{
            display: 'flex',
            background: "url('background-total.webp')",
            backgroundPosition: "left top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "normal",
            overflow: "auto"
        }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{
                background: "url('masquerade.webp')",
                backgroundColor: "#101010B0",
                width: { md: `calc(100% - ${drawerWidth}px)` },
                ml: { xs: `${drawerWidth}px` },
            }}>
                <Toolbar>
                    <IconButton color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                sx={{
                                    marginRight: '36px',
                                    mr: 2,
                                    display: { md: 'none' }
                                }}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6"
                                noWrap
                                component="h1"
                                color="inherit"
                                sx={{
                                    flexGrow: "1",
                                    fontFamily: 'DefaultTypewriter'
                                }}>
                        {title()}
                    </Typography>
                    <ReloadControl />
                    <MessageControl numberOfMessages={numberOfMessages} />
                    <OnlineControl />
                    <LogoutControl />
                </Toolbar>
            </AppBar>
            <Box component="nav"
                 sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                 aria-label="mailbox folders">
                {drawer()}
            </Box>
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                width: { lg: `calc(100% - ${drawerWidth}px)` },
                background: "url('pattern.webp')"
            }} style={{height: "100vh"}}>
                <Toolbar />
                <React.Suspense fallback={<DefaultFallback />}>
                    {children}
                </React.Suspense>
            </Box>
        </Box>
    );
}
