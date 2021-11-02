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

export const menuIconStyle = {
    color: "#C92929"
};

export const menuTextStyle = {
    fontFamily: "Disturbed"
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
                    <HomeIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Home" primaryTypographyProps={menuTextStyle} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.mainMap)}>
                <ListItemIcon>
                    <MapIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Mappa" primaryTypographyProps={menuTextStyle} />
            </ListItem>
            <MenuCharacterSection pushHistory={pushHistory}
                                  characters={charactersWithAvatars}
                                  onUpdate={onUpdate} />
            <MenuHuntSection />
            <ListItem button onClick={_ => pushHistoryOnAnotherTab(Routes.guideMain)}>
                <ListItemIcon>
                    <AssignmentIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Guide" primaryTypographyProps={menuTextStyle} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.forumSections)}>
                <ListItemIcon>
                    <ChatIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Forum" primaryTypographyProps={menuTextStyle} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.settings)}>
                <ListItemIcon>
                    <SettingsIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Impostazioni" primaryTypographyProps={menuTextStyle} />
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
                    <GroupAddIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Accettazione" primaryTypographyProps={menuTextStyle} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.charactersList)}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Lista personaggi" primaryTypographyProps={menuTextStyle} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.chatViewer)}>
                <ListItemIcon>
                    <MarkChatReadIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="Chats" primaryTypographyProps={menuTextStyle} />
            </ListItem>
        </>
    );
}

export const CommonListItem = ({isClosed}: {isClosed: boolean}): any => {
    const DOLogo = () => {
        if (!isClosed) {
            return (
                <ListItem>
                    <Box sx={{margin: "0 auto"}}>
                        <a href="https://www.digitalocean.com/?refcode=26dfc8b090af&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
                            <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" />
                        </a>
                    </Box>
                </ListItem>
            );
        }

        return (<></>);
    }

    const appVersion = () => {
        if (!isClosed) {
            return (
                <ListItem>
                    <Box sx={{margin: "0 auto"}}>
                        <AppVersion />
                    </Box>
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
