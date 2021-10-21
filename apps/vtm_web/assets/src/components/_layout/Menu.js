// @flow

import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AssignmentIcon from "@mui/icons-material/Assignment";
import MapIcon from "@mui/icons-material/Map";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from '@mui/icons-material/Settings';
import ChatIcon from '@mui/icons-material/Chat';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import {Routes} from "../../AppRouter";
import MenuCharacterSection from "./menu-character/MenuCharacterSection";
import {useHistory} from "react-router-dom";
import Divider from "@mui/material/Divider";
import MenuNpcSection from "./MenuNpcSection";
import MenuHuntSection from "./MenuHuntSection";

type Props = {
    drawerDone: () => void;
    isClosed: boolean;
}

export const MainListItems = ({drawerDone}: Props): any => {
    const history = useHistory();
    const [reloadCount, setReloadCount] = useState(0);

    const pushHistory = (route: string) => () => {
        drawerDone();
        history.push(route);
    };

    const pushHistoryOnAnotherTab = (route: string) => () => {
        drawerDone();
        const newTab = window.open(`#${route}`, "_blank");
        newTab.focus();
    };

    const onUpdate = () => {
        setReloadCount(c => c + 1);
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
            <MenuHuntSection />
            <MenuCharacterSection drawerDone={drawerDone} 
                                  reloadCount={reloadCount}
                                  onUpdate={onUpdate} />
            <ListItem button onClick={pushHistoryOnAnotherTab(Routes.guideMain)}>
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
    const [reloadCount, setReloadCount] = useState(0);

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

    const onUpdate = () => {
        setReloadCount(c => c + 1);
    };

    return (
        <div>
            <ListSubheader inset>Admin</ListSubheader>
            <MenuNpcSection pushHistory={pushHistory} 
                            reloadCount={reloadCount}
                            onUpdate={onUpdate} />
            <ListItem button onClick={pushHistory(Routes.unapprovedCharacters)}>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Accettazione" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.charactersList)}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Lista personaggi" />
            </ListItem>
            <ListItem button onClick={pushHistory(Routes.chatViewer)}>
                <ListItemIcon>
                    <MarkChatReadIcon />
                </ListItemIcon>
                <ListItemText primary="Chats" />
            </ListItem>
            <Divider />
            {DOLogo()}
        </div>
    );
}
