// @flow

import React from "react";
import {useFragment} from "react-relay";
import {
    characterAvatarsFragment,
    characterInfoFragment,
    characterSheetFragment
} from "../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import type {GetCharacterQueryResponse} from "../../../services/queries/character/__generated__/GetCharacterQuery.graphql";
import Grid from "@material-ui/core/Grid";
import type {CharacterFragments_characterAvatar$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterAvatar.graphql";
import Typography from "@material-ui/core/Typography";
import type {CharacterFragments_characterInfo$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import ConcealedCharacterInfo from "../../_data/ConcealedCharacterInfo";

type Props = {
    classes: any,
    characterQuery: GetCharacterQueryResponse
}

const CharacterSheetInfoSection = ({classes, characterQuery}: Props): any => {
    const info = useFragment<?CharacterFragments_characterInfo$key>(
        characterInfoFragment,
        characterQuery.getCharacter);

    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery.getCharacter);

    const avatar = useFragment<?CharacterFragments_characterAvatar$key>(
        characterAvatarsFragment,
        characterQuery.getCharacter);

    return (
        <Grid container>
            <Grid item xs={12} md={3}>
                <img src={avatar?.avatar} alt="character-avatar" className={classes.sheetAvatar} />
            </Grid>
            <Grid item xs={12} md={9}>
                <Typography className={classes.sheetTitle}>
                    {info?.name}

                    <ConcealedCharacterInfo characterId={characterQuery?.getCharacter?.id}>
                        &nbsp;({info?.clan?.name})
                    </ConcealedCharacterInfo>
                </Typography>
                <Typography className={classes.sheetText}>
                    {sheet?.description}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CharacterSheetInfoSection;
