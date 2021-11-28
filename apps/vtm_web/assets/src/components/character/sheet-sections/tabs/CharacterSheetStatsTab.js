// @flow

import React, {Suspense} from "react";
import CharacterSheetStatsSection from "../sections/CharacterSheetStatsSection";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

type Props = {
    characterQuery: any;
}

export const CharacterSheetStatsTabSuspenseFallback = (): any => {
    const Title = () => (
        <Box component="div" sx={{
            width: "100%"
        }}>
            <Skeleton variant="text" height={30} width={200} sx={{
                margin: "0 auto"
            }} />
        </Box>
    );

    const Dots = () => (
        <Box sx={{display: "inline-flex", marginTop: "3px"}}>
            <Skeleton animation="wave" variant="circular" width={14} height={14} sx={{margin: "3px"}} />
            <Skeleton animation="wave" variant="circular" width={14} height={14} sx={{margin: "3px"}} />
            <Skeleton animation="wave" variant="circular" width={14} height={14} sx={{margin: "3px"}} />
            <Skeleton animation="wave" variant="circular" width={14} height={14} sx={{margin: "3px"}} />
            <Skeleton animation="wave" variant="circular" width={14} height={14} sx={{margin: "3px"}} />
        </Box>
    );

    const listRows = (rowCount: number) => {
        const rows = [];

        for (let i = 0; i < rowCount; i++) {
            rows.push(
                <Grid container>
                    <Grid item xs={6}>
                        <Skeleton variant="text" sx={{margin: "2px"}} />
                    </Grid>
                    <Grid item xs={6}>
                        <Dots />
                    </Grid>
                </Grid>
            );
        }

        return rows;
    };

    const ListGroup = ({rowCount}) => (
        <Grid container>
            <Grid xs={12} sm={6} md={4}>
                {listRows(rowCount)}
            </Grid>
            <Grid xs={12} sm={6} md={4}>
                {listRows(rowCount)}
            </Grid>
            <Grid xs={12} sm={6} md={4}>
                {listRows(rowCount)}
            </Grid>
        </Grid>
    );

    return (
        <>
            <Title />
            <ListGroup rowCount={3} />
            <Title />
            <ListGroup rowCount={10} />
        </>
    );
};

const CharacterSheetStatsTab = ({characterQuery}: Props): any => {
    return (
        <Suspense fallback={<CharacterSheetStatsTabSuspenseFallback />}>
            { characterQuery?.id != null
                ? <CharacterSheetStatsSection characterId={characterQuery.id}
                                              characterQuery={characterQuery} />
                : <></>
            }
        </Suspense>
    );
};

export default CharacterSheetStatsTab;
