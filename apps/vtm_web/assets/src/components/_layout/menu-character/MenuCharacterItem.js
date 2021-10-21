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

type Props = {
    character: UserCharacter;
    handleSheetSelection: UserCharacter => any => void;
    handleCharacterSelection?: UserCharacter => any => void;
}

const MenuCharacterItem = ({character, handleSheetSelection, handleCharacterSelection}: Props): any => {
    const theme = useTheme();
    const [,currentCharacter] = useSession(true);

    const actions = () => {
        return (
            <>
                <IconButton edge="end"
                            aria-label="select"
                            onClick={handleSheetSelection(character)}
                            sx={{marginRight: "3px"}}>
                    <AssignmentIndIcon />
                </IconButton>
                {
                    handleCharacterSelection != null
                        ? (
                            <IconButton edge="end"
                                        onClick={handleCharacterSelection(character)}
                                        aria-label="select">
                                {character?.id === currentCharacter?.id
                                    ? <RadioButtonCheckedIcon/>
                                    : <RadioButtonUncheckedIcon/>
                                }
                            </IconButton>
                        )
                        : (<></>)
                }
            </>
        );
    };

    return (
        <ListItem key={character?.id}
                  // sx={{ pl: 4 }}
                  secondaryAction={actions()}>
            <ListItemIcon>
                <Avatar src={character?.chatAvatar} sx={{
                    width: theme.spacing(3),
                    height: theme.spacing(3)
                }} />
            </ListItemIcon>
            <ListItemText primary={character?.name} />
        </ListItem>
    );
}

export default MenuCharacterItem;
