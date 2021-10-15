// @flow

import React from "react";
import CharacterSheet from "../../sheet/CharacterSheet";
import Grid from "@mui/material/Grid";
import ChangeCharacterStatusForm from "./forms/ChangeCharacterStatusForm";
import {useCharacterCompleteQuery} from "../../../services/queries/character/GetCharacterCompleteQuery";

type Props = {
    characterId: string;
}

const CharacterChatDashboard = ({characterId}: Props): any => {
    const character = useCharacterCompleteQuery(characterId);

    return (
        <Grid container>
            <Grid xs={12}>
                <ChangeCharacterStatusForm character={character} />
            </Grid>
            <Grid xs={12}>
                <CharacterSheet contained={true}
                                id={characterId}
                                reload={true}/>
            </Grid>
        </Grid>
    );
}

export default CharacterChatDashboard;
