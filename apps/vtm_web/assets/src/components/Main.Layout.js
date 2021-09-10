// @flow

import React, {useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
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
import { mainListItems, secondaryListItems } from './main/Menu';
import TopRightMenu from './main/TopRightMenu';
import {useHistory} from "react-router-dom";
import {check} from "../services/login-service";
import {Routes} from "../AppRouter";
import useCheckMaster from "../services/hooks/useCheckMaster";
import useStyles from "./Main.Layout.Style";


export opaque type MainLayoutClasses = any;

export type MainLayoutProps = {
    children: MainLayoutClasses => any
}

export default function MainLayout(props: MainLayoutProps): any {
    const history = useHistory();
    const classes = useStyles();
    const isMaster = useCheckMaster();

    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        check().catch(_ => history.push(Routes.login));
    }, [history]);

    const masterMenu = () => {
        if (isMaster) {
            return (
                <>
                    <Divider/>
                    <List>{secondaryListItems(history)}</List>
                </>
            );
        }

        return (<></>);
    }

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
                    <TopRightMenu />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
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
                <List>{mainListItems(history)}</List>
                {masterMenu()}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                {props.children(classes)}
            </main>
        </div>
    );
}
