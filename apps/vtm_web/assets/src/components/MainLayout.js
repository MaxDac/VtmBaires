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
import {CommonListItem, MainListItems, menuIconStyle, SecondaryListItems} from "./_layout/Menu";
import {isUserMaster} from "../services/base-types";
import {useSession} from "../services/session-service";
import {useMediaQuery} from "@mui/material";
import MessageControl from "./_layout/MessageControl";
import OnlineControl from "./_layout/OnlineControl";
import LogoutControl from "./_layout/LogoutControl";
import DefaultFallback from "../_base/components/DefaultFallback";
import ReloadControl from "./_layout/ReloadControl";
import {useMessageSubscription} from "./_hooks/useMessageSubscription";
import ReturnToChatControl from "./_layout/ReturnToChatControl";

const drawerWidth = 300;

const SwipeableDrawer = React.lazy(() => import("@mui/material/SwipeableDrawer"));

const PageDrawer = ({open, setOpen, children}) => {
    const theme = useTheme();
    const container = window !== undefined ? () => window.document.body : undefined;
    const fullScreen = useMediaQuery(theme.breakpoints.up('md'));

    if (fullScreen) {
        return (
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
                {children}
            </Drawer>
        );
    }

    return (
        <SwipeableDrawer container={container}
                         variant="temporary"
                         open={open}
                         onOpen={_ => setOpen(p => !p)}
                         onClose={_ => setOpen(p => !p)}
                         ModalProps={{
                             keepMounted: true, // Better open performance on mobile.
                         }}
                         sx={{
                             display: { xs: 'block', md: 'none' },
                             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                         }}>
            {children}
        </SwipeableDrawer>
    );
};

const MiniDrawer = ({children}: {children: any}): any => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [user,] = useSession();
    const numberOfMessages = useMessageSubscription();

    const [characterFetchKey, setCharacterFetchKey] = useState(Math.round(Math.random() * 100));

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const showCompressedTitle = useMediaQuery(theme.breakpoints.down('sm'));
    const showPartialTitle = useMediaQuery(theme.breakpoints.down('lg'));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const closeOnSelected = () => {
        if (isSmallScreen) {
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

    return (
        <Box sx={{
            display: 'flex',
            background: "url('background-total.webp')",
            backgroundPosition: "left top",
            backgroundSize: "auto 100vh",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            backgroundBlendMode: "screen",
            backgroundColor: "#101010",
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
                        <MenuIcon sx={menuIconStyle} />
                    </IconButton>
                    <Typography variant="h6"
                                noWrap
                                component="h1"
                                color="inherit"
                                sx={{
                                    flexGrow: "1",
                                    fontFamily: 'DefaultTypewriter',
                                    color: "primary.main"
                                }}>
                        {title()}
                    </Typography>
                    <ReturnToChatControl />
                    <ReloadControl />
                    <MessageControl numberOfMessages={numberOfMessages} />
                    <OnlineControl />
                    <LogoutControl />
                </Toolbar>
            </AppBar>
            <Box component="nav"
                 sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
                 aria-label="mailbox folders">
                <PageDrawer open={open} setOpen={setOpen}>
                    {drawerContent()}
                </PageDrawer>
            </Box>
            <Box component="main" sx={{
                flexGrow: 1,
                p: 3,
                width: { lg: `calc(100% - ${drawerWidth}px)` },
                // background: "url('pattern.webp')"
                // backgroundColor: "linear-gradient(to right, #19191900, #191919)"
            }} style={{height: "100vh"}}>
                <Toolbar />
                <React.Suspense fallback={<DefaultFallback />}>
                    {children}
                </React.Suspense>
            </Box>
        </Box>
    );
};

export default MiniDrawer;
