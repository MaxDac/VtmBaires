// @flow

import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {useUserCharactersQuery} from "../../../services/queries/accounts/UserCharactersQuery";
import {useMenuCharactersAvatar} from "./menu-character/MenuCharactersAvatarHook";
import ListItem from "@mui/material/ListItem";
import {Routes} from "../../../AppRouter";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import ListItemText from "@mui/material/ListItemText";
import {MainRoutes} from "../../MainRouter";
import MapIcon from "@mui/icons-material/Map";
import MenuCharacterSection from "./menu-character/MenuCharacterSection";
import MenuHuntSection from "./sections/MenuHuntSection";
import AssignmentIcon from "@mui/icons-material/Assignment";
import ChatIcon from "@mui/icons-material/Chat";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import {menuIconStyle, MenuSecondaryText} from "./menu-base-utils";
import type {MenuProps} from "./menu-base-utils";
import useIsChatRoute from "../../_hooks/useIsChatRoute";
import MovableDialog from "./dialog/MovableDialog";

const CharacterSheet = React.lazy(() => import('../../character/CharacterSheet'));

const MainListItems = ({drawerDone, reloadCount, onUpdate}: MenuProps): any => {
    const history = useHistory();
    const characters = useUserCharactersQuery(reloadCount);
    const charactersWithAvatars = useMenuCharactersAvatar(characters);
    const [popupOpen, setPopupOpen] = useState(false);
    const isChatRoute = useIsChatRoute();

    const pushHistory = (route: string) => {
        drawerDone();

        if (route.indexOf("sheet") !== -1 && isChatRoute) {
            pushComponentOnPopup();
        }
        else {
            history.push(route);
        }
    };

    const pushHistoryOnAnotherTab = (route: string) => {
        drawerDone();
        const newTab = window.open(`#${route}`, "_blank");
        newTab.focus();
    };

    const handlePopupOpen = () => setPopupOpen(_ => true);

    const handlePopupClose = () => setPopupOpen(_ => false);

    const pushComponentOnPopup = () => {
        handlePopupOpen();
    };

    return (
        <>
            <MovableDialog open={popupOpen} handleClose={handlePopupClose}>
                <CharacterSheet contained />
            </MovableDialog>
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

export default MainListItems;
