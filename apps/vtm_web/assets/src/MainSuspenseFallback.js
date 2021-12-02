// @flow

import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {useTheme} from "@mui/material/styles";
import {useMediaQuery} from "@mui/material";

type Props = {

}

const MainSuspenseFallback = (props: Props): any => {
    const theme = useTheme();
    const isSmall = useMediaQuery(theme.breakpoints.down("md"));

    const lateralBar = () => isSmall
        ? (<></>)
        : (
            <Grid item xs={3} sx={{padding: "20px"}}>
                <Skeleton variant="rectangular" width="100%" style={{height: "100vh"}} />
            </Grid>
        );

    return (
        <Grid container sx={{height: "100vh"}}>
            {lateralBar()}
            <Grid item xs={isSmall ? 12 : 9}>
                <Box sx={{ width: "100%" }}>
                    <Typography variant="h3"><Skeleton /></Typography>
                    <Skeleton variant="rectangular" width="100%" height="100vh">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    );
}

export default MainSuspenseFallback;
