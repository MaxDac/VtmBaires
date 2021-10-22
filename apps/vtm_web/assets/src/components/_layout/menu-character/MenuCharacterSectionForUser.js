// @flow

import React, {useContext} from "react";
import {SessionContext} from "../../../contexts";
import {useHistory} from "react-router";
import MenuItem from "@mui/material/MenuItem";
import MenuCharacterItem from "./MenuCharacterItem";
import type { UserCharacter } from "../../../services/queries/accounts/UserCharactersQuery";
import { MainRoutes } from "../../MainRouter";

type Props = {
    drawerDone: () => void;
    characters: Array<UserCharacter>;
    onUpdate: () => void;
}

const MenuCharacterSectionForUser = ({drawerDone, characters, onUpdate}: Props): any => {
    const history = useHistory();

    const {setCurrentCharacter} = useContext(SessionContext);

    const pushHistory = (route: string) => {
        drawerDone();
        history.push(route);
    }
    
    const handleSheetSelection = (info: any) =>
        _ => {
            setCurrentCharacter(info);

            if (!info.approved && !info.isComplete) {
                pushHistory(`${MainRoutes.creationBase}${info.stage + 1}`);
            }
            else {
                pushHistory(MainRoutes.sheet(info.id));
            }

            onUpdate();
        }

    const showCharacters = () => {
        if (characters != null && characters.length > 0) {
            return characters
                .filter(o => o !== null)
                .map(o => {
                    return (
                        <MenuCharacterItem character={o} 
                                           key={o?.id}
                                           handleSheetSelection={handleSheetSelection} />
                    )
                });
        }

        return <MenuItem key={"0"} onClick={_ => history.push(MainRoutes.creation1)}>Crea nuovo</MenuItem>;
    }

    return (
        <>
            {showCharacters()}
        </>
    );
}

export default MenuCharacterSectionForUser;
