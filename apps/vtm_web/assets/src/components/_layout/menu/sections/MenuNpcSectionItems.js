// @flow

import React from "react";
import {useNavigate} from "react-router-dom";
import {useNpcsQuery} from "../../../../services/queries/npcs/GetAllNpcsQuery";
import {useMenuCharactersAvatar} from "../menu-character/MenuCharactersAvatarHook";
import type {UserCharacter} from "../../../../services/queries/accounts/UserCharactersQuery";
import MenuCharacterItem from "../menu-character/MenuCharacterItem";
import MenuItem from "@mui/material/MenuItem";
import type {GenericReactComponent} from "../../../../_base/types";
import {AdminRoutes} from "../../../admin/AdminRouter";

type Props = {
    reloadCount: number;
    handleSheetSelection: UserCharacter => any => void;
    handleCharacterSelection?: UserCharacter => any => void;
}

const MenuNpcSectionItems = ({reloadCount, handleSheetSelection, handleCharacterSelection}: Props): GenericReactComponent => {
    const navigate = useNavigate();
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

        rows.push(<MenuItem key={"0"} onClick={_ => navigate(AdminRoutes.createNewNpc)}>Crea nuovo personaggio</MenuItem>);
        return rows;
    };

    return (
        <>
            {showNpcs()}
        </>
    )
};

export default MenuNpcSectionItems;
