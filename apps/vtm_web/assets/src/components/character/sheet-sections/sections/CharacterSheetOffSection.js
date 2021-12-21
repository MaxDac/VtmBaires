// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import {useFragment} from "react-relay";
import {characterOffFragment} from "../../../../services/queries/character/CharacterFragments";
import type {CharacterFragments_characterOff$key} from "../../../../services/queries/character/__generated__/CharacterFragments_characterOff.graphql";
import ParsedText from "../../../../_base/components/ParsedText";
import {mainFontFamily} from "../../../Main.Layout.Style";
import SoundWrapperComponent from "../../../../_base/components/SoundWrapperComponent";

type Props = {
    characterQuery: any
};

const offComponents = {
    img: ({node, ...props}) => (
        <Box sx={{textAlign: "center"}}>
            <img {...props} style={{margin: "0 auto"}} alt={props?.alt ?? "img"} />
        </Box>
    )
};

const CharacterSheetOffSection = ({characterQuery}: Props): any => {
    const sheet = useFragment<?CharacterFragments_characterOff$key>(
        characterOffFragment,
        characterQuery);

    return (
        <Grid item xs={12}>
            {
                sheet?.soundtrack != null && sheet.soundtrack !== ""
                    ? (<SoundWrapperComponent soundSourceUrl={sheet.soundtrack} />)
                    : (<></>)
            }
            <ParsedText text={sheet?.off} 
                        ignoreDefaultComponents 
                        internalDivSx={{
                            ...mainFontFamily
                        }}
                        components={offComponents}
                        useDivsInsteadOfParagraphs={true} />
        </Grid>
    );
}

export default CharacterSheetOffSection;
