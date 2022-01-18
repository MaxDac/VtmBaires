// @flow

import React from "react";
import {useHistory} from "react-router-dom";
import MenuNpcSection from "./sections/MenuNpcSection";
import ListItem from "@mui/material/ListItem";
import {MainRoutes} from "../../MainRouter";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListItemText from "@mui/material/ListItemText";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import {menuIconStyle, MenuSecondaryText} from "./menu-base-utils";
import type {MenuProps} from "./menu-base-utils";
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';

const SecondaryListItems = ({drawerDone, reloadCount, onUpdate}: MenuProps): any => {
    const history = useHistory();

    const pushHistory = (route: string) => {
        drawerDone();
        history.push(route);
    };

    return (
        <>
            <MenuNpcSection pushHistory={pushHistory}
                            reloadCount={reloadCount}
                            onUpdate={onUpdate} />
            <ListItem button onClick={_ => pushHistory(MainRoutes.unapprovedCharacters)}>
                <ListItemIcon>
                    <GroupAddIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Accettazione" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(MainRoutes.adminHavens)}>
                <ListItemIcon>
                    <MapsHomeWorkTwoToneIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Gestione Rifugi" />} />
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
