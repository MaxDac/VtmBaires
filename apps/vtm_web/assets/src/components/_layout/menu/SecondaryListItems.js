// @flow

import React from "react";
import {useHistory} from "react-router-dom";
import {useNpcsQuery} from "../../../services/queries/npcs/GetAllNpcsQuery";
import {useMenuCharactersAvatar} from "./menu-character/MenuCharactersAvatarHook";
import MenuNpcSection from "./sections/MenuNpcSection";
import ListItem from "@mui/material/ListItem";
import {MainRoutes} from "../../MainRouter";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListItemText from "@mui/material/ListItemText";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import {menuIconStyle, MenuSecondaryText} from "./menu-base-utils";
import type {MenuProps} from "./menu-base-utils";

const SecondaryListItems = ({drawerDone, reloadCount, onUpdate}: MenuProps): any => {
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
};

export default SecondaryListItems;
