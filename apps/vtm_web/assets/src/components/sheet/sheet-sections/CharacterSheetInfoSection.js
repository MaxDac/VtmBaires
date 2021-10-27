// @flow

import React from "react";
import {useFragment} from "react-relay";
import {
    characterInfoFragment,
    characterSheetFragment
} from "../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {CharacterFragments_characterInfo$key} from "../../../services/queries/character/__generated__/CharacterFragments_characterInfo.graphql";
import ConcealedCharacterInfo from "../../_data/ConcealedCharacterInfo";
import {mainFontFamily} from "../../Main.Layout.Style";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetCharacterAvatarQuery} from "../../../services/queries/character/__generated__/GetCharacterAvatarQuery.graphql";
import { getCharacterAvatarQuery } from "../../../services/queries/character/GetCharacterAvatarQuery";

type Props = {
    characterQuery: any
}

const CharacterSheetInfoSection = ({characterQuery}: Props): any => {
    const info = useFragment<?CharacterFragments_characterInfo$key>(
        characterInfoFragment,
        characterQuery);

    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery);

    const avatar = useCustomLazyLoadQuery<GetCharacterAvatarQuery>(getCharacterAvatarQuery, {
        id: characterQuery?.id
    }, {
        fetchPolicy: "store-or-network"
    })?.getCharacterAvatar?.avatar;

    return (
        <Grid container>
            <Grid item xs={12} sm={5} md={4} xl={3} sx={{
                textAlign: "center"
            }}>
                <img src={avatar} alt="character-avatar" style={{
                    width: "200px",
                    height: "200px"
                }} />
            </Grid>
            <Grid item xs={12} sm={7} md={8} xl={9}>
                <Typography sx={{
                    ...mainFontFamily,
                    color: "red",
                    fontSize: "24px"
                }}>
                    {info?.name}

                    <ConcealedCharacterInfo characterId={characterQuery?.getCharacter?.id}>
                        &nbsp;({info?.clan?.name})
                    </ConcealedCharacterInfo>
                </Typography>
                <Typography sx={mainFontFamily}>
                    {sheet?.description}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default CharacterSheetInfoSection;
