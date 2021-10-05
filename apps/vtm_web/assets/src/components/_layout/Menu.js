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
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import {Routes} from "../../AppRouter";
import MenuCharacterSection from "./MenuCharacterSection";
import {useHistory} from "react-router-dom";
import Divider from "@mui/material/Divider";

type Props = {
    drawerDone: () => void;
    isClosed: boolean;
}

export const MainListItems = ({drawerDone}: Props): any => {
    const history = useHistory();

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
            <ListItem button onClick={pushHistory(Routes.mainMap)}>
                <ListItemIcon>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Mappa" />
            </ListItem>
            <MenuCharacterSection pushHistory={pushHistory} />
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Guide" />
            </ListItem>
            <ListItem button onClick={_ => history.push(Routes.forumSections)}>
                <ListItemIcon>
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Forum" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.settings)}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Impostazioni" />
            </ListItem>
        </>
    );
};

export const SecondaryListItems = ({drawerDone, isClosed}: Props): any => {
    const history = useHistory();

    const pushHistory = (route: string) => () => {
        drawerDone();
        history.push(route);
    };

    const DOLogo = () => {
        if (!isClosed) {
            return (
                <ListItem>
                    <a href="https://www.digitalocean.com/?refcode=26dfc8b090af&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge"><img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" /></a>
                </ListItem>
            );
        }

        return (<></>);
    }

    return (
        <div>
            <ListSubheader inset>Admin</ListSubheader>
            <ListItem button onClick={pushHistory(Routes.admin)}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.admin)}>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Accettazione" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.admin)}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Lista personaggi" />
            </ListItem>
            <Divider />
            {DOLogo()}
        </div>
    );
}
