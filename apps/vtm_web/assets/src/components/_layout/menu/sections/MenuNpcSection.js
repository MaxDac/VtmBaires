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
import {menuIconStyle, MenuSecondaryText} from "../menu-base-utils";
import MenuCharacterItem from "../menu-character/MenuCharacterItem";
import type {UserCharacter} from "../../../../services/queries/accounts/UserCharactersQuery";
import {useNpcsQuery} from "../../../../services/queries/npcs/GetAllNpcsQuery";
import {useMenuCharactersAvatar} from "../menu-character/MenuCharactersAvatarHook";

type Props = {
    pushHistory: string => void;
    reloadCount: number;
    onUpdate: () => void;
}

const MenuNpcSectionItems = ({reloadCount, handleSheetSelection, handleCharacterSelection}) => {
    const history = useHistory();
    const npcs = useNpcsQuery(reloadCount);
    const npcsWithAvatar = useMenuCharactersAvatar(npcs);

    const showNpcs = () => {
        const rows = [];

        if (npcsWithAvatar != null && npcsWithAvatar.length > 0) {
            rows.push(
                npcsWithAvatar
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
    };

    return (
        <>
            {showNpcs()}
        </>
    )
};

const MenuNpcSection = ({pushHistory, reloadCount, onUpdate}: Props): any => {
    const [expand, setExpand] = useState(false);
    const [hasBeenExpanded, setHasBeenExpanded] = useState(false);
    const {setCurrentCharacter} = useContext(SessionContext);

    const toggleNpcsSelectionMenuExpansion = _ => {
        setHasBeenExpanded(_ => true);
        setExpand(p => !p);
    }
    
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

    const expandedMenu = () =>
        hasBeenExpanded
            ? (
                <List component="div" disablePadding>
                    {expand
                        ? (<MenuNpcSectionItems reloadCount={reloadCount}
                                                handleSheetSelection={handleSheetSelection}
                                                handleCharacterSelection={handleCharacterSelection} />)
                        : (<></>)
                    }
                </List>
            )
            : (<></>);

    return (
        <>
            <ListItem button onClick={toggleNpcsSelectionMenuExpansion}>
                <ListItemIcon>
                    <GroupsIcon sx={menuIconStyle} />
                </ListItemIcon>
                <ListItemText secondary={<MenuSecondaryText text="NPGs" />} />
                {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={expand} timeout="auto">
                {expandedMenu()}
            </Collapse>
        </>
    );
}

export default MenuNpcSection;
