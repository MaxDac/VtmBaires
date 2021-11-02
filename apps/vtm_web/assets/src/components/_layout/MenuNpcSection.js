// @flow

import React, {useContext, useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {useSession} from "../../services/session-service";
import GroupsIcon from '@mui/icons-material/Groups';
import { SessionContext, UtilityContext } from "../../contexts";
import {useHistory} from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";
import {useTheme} from "@mui/styles";
import { MainRoutes } from "../MainRouter";
import type {Npc} from "../../services/queries/npcs/GetAllNpcsQuery";
import {menuIconStyle, menuTextStyle} from "./Menu";

type Props = {
    pushHistory: string => void;
    npcs: Array<Npc>;
    onUpdate: () => void;
}

const MenuNpcSection = ({pushHistory, npcs, onUpdate}: Props): any => {
    const history = useHistory();
    const theme = useTheme();
    const [expand, setExpand] = useState(false);
    const [,currentCharacter] = useSession();
    const {setCurrentCharacter} = useContext(SessionContext);
    const {openDialog} = useContext(UtilityContext);

    const handleNpcSelection = (info: any) =>
        _ => {
            setCurrentCharacter(info);

            if (info.isComplete) {
                openDialog(
                    "Selezione personaggio", 
                    "Il personaggio è stato selezionato, vuoi vedere la sua scheda?", 
                    () => pushHistory(MainRoutes.sheet(info?.id)));
            }
            else {
                pushHistory(MainRoutes.defineNpc(info?.id));
            }

            onUpdate();
        }

    const showNpcs = () => {
        const rows = [];

        if (npcs != null && npcs.length > 0) {
            rows.push(
                npcs
                    .filter(o => o !== null)
                    .map(o => {
                        return (
                            <ListItem key={o?.id} button sx={{ pl: 4 }} onClick={handleNpcSelection(o)}>
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
                    })
            );
        }

        rows.push(<MenuItem key={"0"} onClick={_ => history.push(MainRoutes.createNewNpc)}>Crea nuovo personaggio</MenuItem>);
        return rows;
    }

    return (
        <>
            <ListItem button onClick={_ => setExpand(p => !p)}>
                <ListItemIcon>
                    <GroupsIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText primary="NPCs" primaryTypographyProps={menuTextStyle} />
                {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expand} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {expand ? showNpcs() : <></>}
                </List>
            </Collapse>
        </>
    );
}

export default MenuNpcSection;
