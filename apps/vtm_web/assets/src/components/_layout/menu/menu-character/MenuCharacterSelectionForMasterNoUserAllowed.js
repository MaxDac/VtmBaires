// @flow

import React from "react";
import {useSession} from "../../../../services/session-service";
import {MainRoutes} from "../../../MainRouter";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {menuTextStyle, menuTextStyleHover} from "../menu-base-utils";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {useTheme} from "@mui/material/styles";
import {useMenuCharactersAvatar} from "./MenuCharactersAvatarHook";

type Props = {
    pushHistory: string => void;
}

const MenuCharacterSelectionForMasterNoUserAllowed = ({pushHistory}: Props): any => {
    const theme = useTheme();
    const [,character] = useSession();
    const [characterWithAvatar,] = useMenuCharactersAvatar([character]);

    const onSheetSelected = () => pushHistory(MainRoutes.sheet(character.id));

    const MenuCharacterItemMenuSecondaryText = ({hover}: any): any => (
        <Typography component="span" sx={{
            ...(!!hover ? menuTextStyleHover : menuTextStyle),
            cursor: "pointer"
        }} onClick={onSheetSelected}>
            {character?.name}
        </Typography>
    );

    return (
        <ListItem key={character?.id}
                  button
                  onClick={onSheetSelected}>
            <ListItemIcon>
                <Avatar src={characterWithAvatar.chatAvatar} sx={{
                    width: theme.spacing(5),
                    height: theme.spacing(5)
                }} />
            </ListItemIcon>
            <ListItemText secondary={<MenuCharacterItemMenuSecondaryText />} />
        </ListItem>
    );
};

export default MenuCharacterSelectionForMasterNoUserAllowed;
