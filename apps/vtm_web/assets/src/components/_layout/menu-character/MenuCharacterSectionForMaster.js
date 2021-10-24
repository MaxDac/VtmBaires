// @flow

import React, {useContext} from "react";
import {SessionContext} from "../../../contexts";
import {useHistory} from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import MenuCharacterItem from "./MenuCharacterItem";
import type { UserCharacter } from "../../../services/queries/accounts/UserCharactersQuery";
import { MainRoutes } from "../../MainRouter";

type Props = {
    pushHistory: string => void;
    characters: Array<UserCharacter>;
    onUpdate: () => void;
}

const MenuCharacterSectionForMaster = ({pushHistory, characters, onUpdate}: Props): any => {
    const history = useHistory();
    const {setCurrentCharacter} = useContext(SessionContext);
    
    const handleSheetSelection = (info: UserCharacter) =>
        _ => {
            if (!info.approved && !info.isComplete) {
                pushHistory(`${MainRoutes.creationBase}${info.stage + 1}`);
            }
            else {
                pushHistory(MainRoutes.sheet(info.id));
            }

            onUpdate();
        };

    const handleCharacterSelection = (info: UserCharacter) =>
        _ => {
            setCurrentCharacter({
                id: info.id,
                name: info.name,
                approved: info.approved
            });

            document.location.reload();
        };

    const showCharacters = () => {
        if (characters != null && characters.length > 0) {
            return characters
                .filter(o => o !== null)
                .map(o => (<MenuCharacterItem character={o}
                                              key={o?.id}
                                              handleSheetSelection={handleSheetSelection}
                                              handleCharacterSelection={handleCharacterSelection} />));
        }

        return <MenuItem key={"0"} onClick={_ => history.push(MainRoutes.creation1)}>Crea nuovo personaggio</MenuItem>;
    }

    return (
        <>
            {showCharacters()}
        </>
    );
}

export default MenuCharacterSectionForMaster;
