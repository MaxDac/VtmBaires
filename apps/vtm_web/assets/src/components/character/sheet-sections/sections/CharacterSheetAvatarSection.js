// @flow

import React from "react";
import {useFragment} from "react-relay";
import {characterSheetFragment} from "../../../../services/queries/character/CharacterFragments";
import type {
  CharacterFragments_characterSheet$key,
} from "../../../../services/queries/character/__generated__/CharacterFragments_characterSheet.graphql";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import type {GenericReactComponent} from "../../../../_base/types";

export const avatarWidth: number = 270;
export const avatarHeight: number = 470;

type Props = {
    characterQuery: CharacterFragments_characterSheet$key;
    sx?: any;
}

const CharacterSheetAvatarSection = ({characterQuery, sx}: Props): GenericReactComponent => {
    const sheet = useFragment(
        characterSheetFragment,
        characterQuery);

    const realAvatarHeight = sheet?.isNpc === true ? avatarWidth : avatarHeight

    return (
        <Paper component="div" sx={{
            width: `${avatarWidth + 10}px`,
            height: `${realAvatarHeight + 10}px`,
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
                height: `${realAvatarHeight}px`,
            }} />
        </Paper>
    )
};

export default CharacterSheetAvatarSection;
