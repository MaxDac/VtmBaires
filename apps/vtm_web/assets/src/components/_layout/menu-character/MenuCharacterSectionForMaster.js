// @flow

import React, {useContext} from "react";
import {SessionContext} from "../../../contexts";
import {useHistory} from "react-router-dom";
import {Routes} from "../../../AppRouter";
import MenuItem from "@mui/material/MenuItem";
import MenuCharacterItem from "./MenuCharacterItem";
import type { UserCharacter } from "../../../services/queries/accounts/UserCharactersQuery";

type Props = {
    drawerDone: () => void;
    characters: Array<UserCharacter>;
    onUpdate: () => void;
}

const MenuCharacterSectionForMaster = ({drawerDone, characters, onUpdate}: Props): any => {
    const history = useHistory();
    const {setCurrentCharacter} = useContext(SessionContext);

    const pushHistory = (route: string) => {
        drawerDone();
        history.push(route);
    }
    
    const handleSheetSelection = (info: UserCharacter) =>
        _ => {
            if (!info.approved && !info.isComplete) {
                pushHistory(`${Routes.creationBase}${info.stage + 1}`);
            }
            else {
                pushHistory(Routes.sheet(info.id));
            }
        };

    const handleCharacterSelection = (info: UserCharacter) =>
        _ => {
            setCurrentCharacter({
                id: info.id,
                name: info.name,
                approved: info.approved
            });

            onUpdate();
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

        return <MenuItem key={"0"} onClick={_ => history.push(Routes.creation1)}>Crea nuovo</MenuItem>;
    }

    return (
        <>
            {showCharacters()}
        </>
    );
}

export default MenuCharacterSectionForMaster;
