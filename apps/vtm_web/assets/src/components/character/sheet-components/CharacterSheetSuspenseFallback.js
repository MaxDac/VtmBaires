// @flow

import React from "react";
import type {GenericReactComponent} from "../../../_base/types";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

export const CharacterSheetSuspenseFallback = (): GenericReactComponent => {
    return (
        <>
            <Box component="div" style={{textAlign: "center"}}>
                <Skeleton variant="text" height={20} width={40} />
            </Box>

            <Skeleton variant="circular" width={40} height={40} />
            <Skeleton variant="rect" width={210} height={118} />
        </>
    );
};

export default CharacterSheetSuspenseFallback;
