// @flow

import React, {useContext, useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {Routes} from "../../AppRouter";
import {useSession} from "../../services/session-service";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import type {UserCharactersQuery} from "../../services/queries/accounts/__generated__/UserCharactersQuery.graphql";
import {userCharactersQuery} from "../../services/queries/accounts/UserCharactersQuery";
import { SessionContext, UtilityContext } from "../../contexts";
import {useHistory} from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";
import {useTheme} from "@mui/styles";

type Props = {
    pushHistory: string => () => void;
}

const MenuCharacterSection = ({pushHistory}: Props): any => {
    const history = useHistory();
    const theme = useTheme();
    const [expand, setExpand] = useState(false);
    const [,currentCharacter] = useSession();
    const {openDialog} = useContext(UtilityContext);
    const {setCurrentCharacter} = useContext(SessionContext);

    const characters = useCustomLazyLoadQuery<UserCharactersQuery>(userCharactersQuery, {}, {
        fetchPolicy: "store-and-network"
    })?.me?.userCharacters;

    const handleCharacterSelection = (info: any) =>
        _ => {
            setCurrentCharacter(info);

            if (!info.approved && !info.isComplete) {
                pushHistory(`${Routes.creationBase}${info.stage + 1}`)();
            }
            else {
                openDialog(
                    "Selezione personaggio", 
                    "Il personaggio è stato selezionato, vuoi vedere la sua scheda?", 
                    pushHistory(Routes.sheet(info.id)));
            }
        }

    const showCharacters = () => {
        if (characters != null && characters.length > 0) {
            return characters
                .filter(o => o !== null)
                .map(o => {
                    return (
                        <ListItem key={o?.id} button sx={{ pl: 4 }} onClick={handleCharacterSelection(o)}>
                            <ListItemIcon>
                                <Avatar src={o?.chatAvatar} sx={{
                                    width: theme.spacing(3),
                                    height: theme.spacing(3)
                                }} />
                            </ListItemIcon>
                            <ListItemText primary={o?.name}>
                                {o?.id === currentCharacter?.id
                                    ? <RadioButtonCheckedIcon/>
                                    : <RadioButtonUncheckedIcon/>
                                }
                            </ListItemText>
                        </ListItem>
                    )
                });
        }

        return <MenuItem key={"0"} onClick={_ => history.push(Routes.creation1)}>Crea nuovo</MenuItem>;
    }

    return (
        <>
            <ListItem button onClick={_ => setExpand(p => !p)}>
                <ListItemIcon>
                    <AccountCircleOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Personaggio" />
                {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {expand ? showCharacters() : <></>}
                </List>
            </Collapse>
        </>
    );
}

export default MenuCharacterSection;
