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
import Typography from "@mui/material/Typography";

type Props = {
    drawerDone: () => void;
    reloadCount: number;
    onUpdate: () => void;
}

const whiteOnHover = {
    transitionProperty: "color",
    transitionDuration: "0.3s",
    transitionTimingFunction: "ease-in-ease-out",
    "&:hover": {
        color: "white"
    }
}

export const menuIconStyle = {
    ...whiteOnHover,
    color: "primary.main"
};

export const menuTextStyle = {
    ...whiteOnHover,
    fontFamily: "Disturbed",
    fontSize: "1.1rem",
    color: "primary.light",
    textShadow: "5px 5px 5px black",
};

export const menuTextStyleHover = {
    ...menuTextStyle,
    color: "white"
};

export type MenuSecondaryTypeProps = {
    text: ?string;
    hover?: boolean;
}

export const MenuSecondaryText = ({text, hover}: MenuSecondaryTypeProps): any => (
    <Typography component="span" sx={!!hover ? menuTextStyleHover : menuTextStyle}>
        {text ?? ""}
    </Typography>
);

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
                <ListItemText secondary={<MenuSecondaryText text="Home" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.mainMap)}>
                <ListItemIcon>
                    <MapIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Mappa" />} />
            </ListItem>
            <MenuCharacterSection pushHistory={pushHistory}
                                  characters={charactersWithAvatars}
                                  onUpdate={onUpdate} />
            <MenuHuntSection />
            <ListItem button onClick={_ => pushHistoryOnAnotherTab(Routes.guideMain)}>
                <ListItemIcon>
                    <AssignmentIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Guide" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.forumSections)}>
                <ListItemIcon>
                    <ChatIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Forum" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.charactersList)}>
                <ListItemIcon>
                    <SupervisedUserCircleIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Lista personaggi" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.settings)}>
                <ListItemIcon>
                    <SettingsIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Impostazioni" />} />
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
            <MenuNpcSection pushHistory={pushHistory}
                            npcs={npcsWithAvatar}
                            onUpdate={onUpdate} />
            <ListItem button onClick={_ => pushHistory(MainRoutes.unapprovedCharacters)}>
                <ListItemIcon>
                    <GroupAddIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Accettazione" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.chatViewer)}>
                <ListItemIcon>
                    <MarkChatReadIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Chats" />} />
            </ListItem>
        </>
    );
}

export const CommonListItem = (): any => {
    const DOLogo = () => (
        <ListItem>
            <Box sx={{margin: "0 auto"}}>
                <a href="https://www.digitalocean.com/?refcode=26dfc8b090af&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge">
                    <img src="https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%201.svg" alt="DigitalOcean Referral Badge" />
                </a>
            </Box>
        </ListItem>
    );

    const appVersion = () => (
        <ListItem>
            <Box sx={{margin: "0 auto"}}>
                <AppVersion />
            </Box>
        </ListItem>
    );

    return (
        <>
            <Box sx={{marginTop: "15px"}}>
                <JoinUsOnDiscord />
            </Box>
            <Box sx={{marginTop: "15px"}}>
                {DOLogo()}
            </Box>
            {appVersion()}
        </>
    )
}
