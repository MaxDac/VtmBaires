// @flow

import Box from "@mui/material/Box";
import React from "react";

type CenteredBoxProps = {
    innerBoxSx?: any,
    children: any,
    isBodyChild: boolean
}

const CenteredBox = ({innerBoxSx, children, isBodyChild}: CenteredBoxProps): any => (
    <Box component="div" sx={{
        display: "table",
        position: isBodyChild ? "absolute" : "relative",
        top: "0",
        left: "0",
        height: "100%",
        width: "100%",
    }}>
        <Box component="div" sx={{
            display: "table-cell",
            verticalAlign: "middle"
        }}>
            <Box component="div" sx={{
                ...innerBoxSx,
                marginLeft: "auto",
                marginRight: "auto",
                width: "90%",
            }} onClick={_ => console.info("clicking")}>
                {children}
            </Box>
        </Box>
    </Box>
);

export default CenteredBox;
