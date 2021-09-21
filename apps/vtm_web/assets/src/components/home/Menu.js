// @flow

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import type { History } from "../../_base/types";
import {Routes} from "../../AppRouter";

export const mainListItems = (history: History, drawerDone: () => void): any => {
    const pushHistory = (route: string) => () => {
        drawerDone();
        history.push(route);
    };

    return (
        <>
            <ListItem button onClick={pushHistory(Routes.main)}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.sheet())}>
                <ListItemIcon>
                    <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="Sheet" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.mainMap)}>
                <ListItemIcon>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Map" />
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Guide" />
            </ListItem>
        </>
    );
};

export const secondaryListItems = (history: History, drawerDone: () => void): any => {
    const pushHistory = (route: string) => () => {
        drawerDone();
        history.push(route);
    };

    return (
        <div>
            <ListSubheader inset>Admin</ListSubheader>
            <ListItem button onClick={pushHistory(Routes.admin)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem>
                <a href="https://www.digitalocean.com/?refcode=26dfc8b090af&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" /></a>
            </ListItem>
        </div>
    );
}
