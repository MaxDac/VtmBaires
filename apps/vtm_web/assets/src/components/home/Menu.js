// @flow

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import MapIcon from '@material-ui/icons/Map';
import HomeIcon from '@material-ui/icons/Home';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import type { History } from "../../_base/types";
import {Routes} from "../../AppRouter";

export const mainListItems = (history: History, drawerDone: () => void): any => {
    const pushHistory = (route: string) => () => {
        drawerDone();
        history.push(route);
    };

    return (
        <div>
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
        </div>
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
        </div>
    );
}
