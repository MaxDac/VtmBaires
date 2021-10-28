// @flow

import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
import MenuNpcSection from "./MenuNpcSection";
import MenuHuntSection from "./MenuHuntSection";
import { MainRoutes } from "../MainRouter";
import {useUserCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import {useNpcsQuery} from "../../services/queries/npcs/GetAllNpcsQuery";
import AppVersion from "../../_base/components/AppVersion";
import JoinUsOnDiscord from "../../_base/components/JoinUsOnDiscord";
import Box from "@mui/material/Box";
import {useMenuCharactersAvatar} from "./MenuCharactersAvatarHook";

type Props = {
    drawerDone: () => void;
    isClosed: boolean;
    reloadCount: number;
    onUpdate: () => void;
}

export const MainListItems = ({drawerDone, reloadCount, onUpdate}: Props): any => {
    const history = useHistory();
    const characters = useUserCharactersQuery(reloadCount);
    const charactersWithAvatars = useMenuCharactersAvatar(characters);

    const pushHistory = (route: string) => {
        drawerDone();
        history.push(route);
    };

    const pushHistoryOnAnotherTab = (route: string) => {
        drawerDone();
        const newTab = window.open(`#${route}`, "_blank");
        newTab.focus();
    };

    return (
        <>
            <ListItem button onClick={_ => pushHistory(Routes.main)}>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.mainMap)}>
                <ListItemIcon>
                    <MapIcon />
                </ListItemIcon>
                <ListItemText primary="Mappa" />
            </ListItem>
            <MenuCharacterSection pushHistory={pushHistory}
                                  characters={charactersWithAvatars}
                                  onUpdate={onUpdate} />
            <MenuHuntSection />
            <ListItem button onClick={_ => pushHistoryOnAnotherTab(Routes.guideMain)}>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary="Guide" />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.forumSections)}>
                <ListItemIcon>
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Forum" />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.settings)}>
                <ListItemIcon>
                    <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Impostazioni" />
            </ListItem>
        </>
    );
};

export const SecondaryListItems = ({drawerDone, reloadCount, onUpdate}: Props): any => {
    const history = useHistory();
    const npcs = useNpcsQuery(reloadCount);
    const npcsWithAvatar = useMenuCharactersAvatar(npcs);

    const pushHistory = (route: string) => {
        drawerDone();
        history.push(route);
    };

    return (
        <>
            {/*<ListSubheader inset>Admin</ListSubheader>*/}
            <MenuNpcSection pushHistory={pushHistory}
                            npcs={npcsWithAvatar}
                            onUpdate={onUpdate} />
            <ListItem button onClick={_ => pushHistory(MainRoutes.unapprovedCharacters)}>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="Accettazione" />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.charactersList)}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Lista personaggi" />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.chatViewer)}>
                <ListItemIcon>
                    <MarkChatReadIcon />
                </ListItemIcon>
                <ListItemText primary="Chats" />
            </ListItem>
        </>
    );
}

export const CommonListItem = ({isClosed}: {isClosed: boolean}): any => {
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

    const appVersion = () => {
        if (!isClosed) {
            return (
                <ListItem>
                    <AppVersion />
                </ListItem>
            );
        }

        return (<></>);
    };

    return (
        <>
            <Box sx={{marginTop: "15px"}}>
                <JoinUsOnDiscord isClosed={isClosed} />
            </Box>
            <Box sx={{marginTop: "15px"}}>
                {DOLogo()}
            </Box>
            {appVersion()}
        </>
    )
}
