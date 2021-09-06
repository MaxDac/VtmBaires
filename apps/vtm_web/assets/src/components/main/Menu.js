// @flow

import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link } from "react-router-dom";

import type { History } from "../../_base/types";
import {Routes} from "../../AppRouter";

export const mainListItems = (history: History): any => (
    <div>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Guide" />
        </ListItem>
    </div>
);

export const secondaryListItems = (history: History): any => (
    <div>
        <ListSubheader inset>Admin</ListSubheader>
        <ListItem button onClick={() => history.push(Routes.get("admin"))}>
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
    </div>
);