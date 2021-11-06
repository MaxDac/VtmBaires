// @flow

import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import type {UserCharacter} from "../../../services/queries/accounts/UserCharactersQuery";
import {useTheme} from "@mui/styles";
import {useSession} from "../../../services/session-service";
import IconButton from "@mui/material/IconButton";
import {menuIconStyle, MenuSecondaryText} from "../Menu";
import Tooltip from "@mui/material/Tooltip";

type Props = {
    character: UserCharacter;
    handleSheetSelection: UserCharacter => any => void;
    handleCharacterSelection?: UserCharacter => any => void;
}

const MenuCharacterItem = ({character, handleSheetSelection, handleCharacterSelection}: Props): any => {
    const theme = useTheme();
    const [,currentCharacter] = useSession(true);

    const actions = () => {
        return handleCharacterSelection != null
            ? (
                <>
                    <Tooltip title="Scheda personaggio">
                        <IconButton edge="end"
                                    aria-label="select"
                                    onClick={handleSheetSelection(character)}
                                    sx={{marginRight: "3px"}}>
                            <AssignmentIndIcon sx={menuIconStyle} />
                        </IconButton>
                    </Tooltip>
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
                </>
            )
            : (<></>);
    };

    return (
        <ListItem key={character?.id}
                  button={handleCharacterSelection == null}
                  onClick={handleSheetSelection(character)}
                  // sx={{ pl: 4 }}
                  secondaryAction={actions()}>
            <ListItemIcon>
                <Avatar src={character?.chatAvatar} sx={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} />
            </ListItemIcon>
            <ListItemText secondary={<MenuSecondaryText text={character?.name} />} />
        </ListItem>
    );
}

export default MenuCharacterItem;
