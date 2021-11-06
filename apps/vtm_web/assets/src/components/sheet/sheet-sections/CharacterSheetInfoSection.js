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
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

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
            <Grid item xs={12} lg={7} xl={5} sx={{
                textAlign: "center"
            }}>
                <Paper sx={{
                    width: "420px",
                    height: "290px",
                    display: "inline-flex",
                    textAlign: "center",
                    margin: "1rem",
                    backgroundColor: "background.paper"
                }} variant="outlined">
                    <Avatar alt="character-avatar"
                            // src={avatar}
                            src="https://i.pinimg.com/originals/af/42/82/af428236bb113725c9064267e5b98e3c.jpg"
                            variant="square"
                            style={{
                                margin: "0 auto",
                                marginTop: "auto",
                                marginBottom: "auto",
                                width: "auto",
                                height: "auto",
                                maxWidth: "400px",
                                maxHeight: "270px"
                            }} />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={5} xl={7}>
                <Typography sx={{
                    ...mainFontFamily,
                    color: "secondary.light",
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
