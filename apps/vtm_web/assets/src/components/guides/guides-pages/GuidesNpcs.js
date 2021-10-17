// @flow

import React from "react";
import Typography from "@mui/material/Typography";

type Props = {

}

const GuidesNpcs = (props: Props): any => {
    const storyStyle = {
        fontFamily: 'GabrieleLightRibbon',
        fontSize: "14px",
        margin: "20px 0",
        paddingLeft: "20px",
        paddingRight: "10px"
    }

    const liStyle = {
        margin: "15px 0"
    };

    return (
        <>
            <Typography paragraph>
                <h1>
                    Clan e Sette
                </h1>
            </Typography>

            <Typography paragraph sx={storyStyle}>
                Aveva ancora nella mente le urla del suo sire. Quando &egrave; costretta ad
                officiare a rituali specifici del suo retaggio
            </Typography>

            <Typography paragraph sx={liStyle}>
                Temp
            </Typography>
        </>
    );
}

export default GuidesNpcs;
