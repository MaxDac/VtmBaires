// @flow

import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import type {UserCharacter} from "../../../services/queries/accounts/UserCharactersQuery";
import {useTheme} from "@mui/styles";
import {useSession} from "../../../services/session-service";
import IconButton from "@mui/material/IconButton";
import {menuIconStyle, menuTextStyle, menuTextStyleHover} from "../Menu";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

type Props = {
    character: UserCharacter;
    handleSheetSelection: UserCharacter => any => void;
    handleCharacterSelection?: UserCharacter => any => void;
}

const MenuCharacterItem = ({character, handleSheetSelection, handleCharacterSelection}: Props): any => {
    const theme = useTheme();
    const [,currentCharacter] = useSession(true);

    const MenuCharacterItemMenuSecondaryText = ({hover}): any => (
        <Typography component="span" sx={{
            ...(!!hover ? menuTextStyleHover : menuTextStyle),
            cursor: "pointer"
        }} onClick={handleSheetSelection(character)}>
            {character?.name}
        </Typography>
    );

    const actions = () => {
        return handleCharacterSelection != null
            ? (
                <Tooltip title="Seleziona personaggio">
                    <IconButton edge="end"
                                onClick={handleCharacterSelection(character)}
                                aria-label="select">
                        {character?.id === currentCharacter?.id
                            ? <RadioButtonCheckedIcon sx={menuIconStyle} />
                            : <RadioButtonUncheckedIcon sx={menuIconStyle} />
                        }
                    </IconButton>
                </Tooltip>
            )
            : (<></>);
    };

    const isButton = handleCharacterSelection == null;

    const onClick = isButton
        ? handleSheetSelection(character)
        : () => {};

    return (
        <ListItem key={character?.id}
                  button={isButton}
                  onClick={onClick}
                  // sx={{ pl: 4 }}
                  secondaryAction={actions()}>
            <ListItemIcon>
                <Avatar src={character?.chatAvatar} sx={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} />
            </ListItemIcon>
            <ListItemText secondary={<MenuCharacterItemMenuSecondaryText />} />
        </ListItem>
    );
}

export default MenuCharacterItem;
