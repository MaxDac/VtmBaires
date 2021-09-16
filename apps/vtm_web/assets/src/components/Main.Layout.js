// @flow

import React, {useContext} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './home/Menu';
import TopRightMenu from './home/TopRightMenu';
import {useHistory} from "react-router-dom";
import useStyles from "./Main.Layout.Style";
import {SessionContext, UtilityContext} from "../App";
import {isUserMaster} from "../services/base-types";

export opaque type MainLayoutClasses = any;

export type MainLayoutProps = {
    children: MainLayoutClasses => any;
}

export default function MainLayout({ children }: MainLayoutProps): any {
    const history = useHistory();
    const classes = useStyles();
    const { getUser } = useContext(SessionContext)

    const {
        openDialog,
        setError,
        setWait
    } = useContext(UtilityContext);

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const masterMenu = () => {
        if (isUserMaster(getUser())) {
            return (
                <>
                    <Divider/>
                    <List>{secondaryListItems(history, drawerDone)}</List>
                </>
            );
        }

        return (<></>);
    };

    const drawerDone = handleDrawerClose;

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}>
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        Dashboard
                    </Typography>
                    <TopRightMenu setError={setError}
                                  openDialog={openDialog}
                                  setWait={setWait}
                                  classes={classes} />
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}>
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>{mainListItems(history, drawerDone)}</List>
                {masterMenu()}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {children(classes)}
            </main>
        </div>
    );
}
