// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterSheetFragment} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterSheet$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

export const avatarWidth: number = 270;
export const avatarHeight: number = 470;

type Props = {
    characterQuery: any;
    sx?: any;
}

const CharacterSheetAvatarSection = ({characterQuery, sx}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterSheet$key>(
        characterSheetFragment,
        characterQuery);

    console.log("avatar", sheet);

    return (
        <Paper component="div" sx={{
            width: `${avatarWidth + 10}px`,
            height: `${avatarHeight + 10}px`,
            display: "inline-flex",
            textAlign: "center",
            margin: "1rem",
            backgroundColor: "background.paper"
        }} variant="outlined">
            <Box sx={{
                margin: "0 auto",
                marginTop: "auto",
                marginBottom: "auto",
                background: `url('${sheet?.avatar ?? ""}')`,
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "contain",
                width: `${avatarWidth}px`,
                height: `${avatarHeight}px`,
            }} />
        </Paper>
    )
};

export default CharacterSheetAvatarSection;
