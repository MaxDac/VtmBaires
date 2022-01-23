// @flow

import React from "react";
import {useNavigate} from "react-router-dom";
import MenuNpcSection from "./sections/MenuNpcSection";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ListItemText from "@mui/material/ListItemText";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import {menuIconStyle, MenuSecondaryText} from "./menu-base-utils";
import type {MenuProps} from "./menu-base-utils";
import MapsHomeWorkTwoToneIcon from '@mui/icons-material/MapsHomeWorkTwoTone';
import type {GenericReactComponent} from "../../../_base/types";
import CameraIndoorTwoToneIcon from "@mui/icons-material/CameraIndoorTwoTone";
import {AdminRoutes} from "../../admin/AdminRouter";

const SecondaryListItems = ({drawerDone, reloadCount, onUpdate}: MenuProps): GenericReactComponent => {
    const navigate = useNavigate();

    const pushHistory = (route: string) => {
        drawerDone();
        navigate(route);
    };

    return (
        <>
            <MenuNpcSection pushHistory={pushHistory}
                            reloadCount={reloadCount}
                            onUpdate={onUpdate} />
            <ListItem button onClick={_ => pushHistory(AdminRoutes.unapprovedCharacters)}>
                <ListItemIcon>
                    <GroupAddIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Accettazione" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(AdminRoutes.adminHavens)}>
                <ListItemIcon>
                    <MapsHomeWorkTwoToneIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Gestione Rifugi" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(AdminRoutes.chatViewer)}>
                <ListItemIcon>
                    <MarkChatReadIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Chats" />} />
            </ListItem>
            <ListItem button onClick={_ => pushHistory(AdminRoutes.adminHavenEvents)}>
                <ListItemIcon>
                    <CameraIndoorTwoToneIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="Eventi Globali" />} />
            </ListItem>
        </>
    );
};

export default SecondaryListItems;
