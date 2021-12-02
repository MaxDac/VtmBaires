// @flow

import React, {useContext, useState} from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import GroupsIcon from '@mui/icons-material/Groups';
import {SessionContext} from "../../../../contexts";
import {useHistory} from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {Collapse} from "@mui/material";
import List from "@mui/material/List";
import {MainRoutes} from "../../../MainRouter";
import type {Npc} from "../../../../services/queries/npcs/GetAllNpcsQuery";
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";
import MenuCharacterItem from "../menu-character/MenuCharacterItem";
import type {UserCharacter} from "../../../../services/queries/accounts/UserCharactersQuery";

type Props = {
    pushHistory: string => void;
    npcs: Array<Npc>;
    onUpdate: () => void;
}

const MenuNpcSection = ({pushHistory, npcs, onUpdate}: Props): any => {
    const history = useHistory();
    const [expand, setExpand] = useState(false);
    const {setCurrentCharacter} = useContext(SessionContext);
    
    const handleSheetSelection = (info: UserCharacter) =>
        _ => {
            pushHistory(MainRoutes.sheet(info.id));
        };

    const handleCharacterSelection = (info: UserCharacter) =>
        _ => {
            setCurrentCharacter({
                id: info.id,
                name: info.name,
                approved: info.approved,
                clan: {
                    name: info.clan?.name
                }
            });

            onUpdate();
        };

    const showNpcs = () => {
        const rows = [];

        if (npcs != null && npcs.length > 0) {
            rows.push(
                npcs
                    .filter(o => o !== null)
                    .map(o => {
                        const c: UserCharacter = {
                            id: o?.id,
                            name: o?.name ?? "",
                            stage: 5,
                            approved: true,
                            isComplete: true,
                            chatAvatar: o?.chatAvatar,
                            clan: {
                                name: o?.clan?.name ?? ""
                            }
                        };

                        return c;
                    })
                    .map(o => (
                        <MenuCharacterItem character={o}
                                           key={o?.id}
                                           handleSheetSelection={handleSheetSelection}
                                           handleCharacterSelection={handleCharacterSelection} />
                    ))
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
                <ListItemText secondary={<MenuSecondaryText text="NPGs" />} />
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
