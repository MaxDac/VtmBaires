// @flow

import React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

type Props = {

}

const MainSuspenseFallback = (props: Props): any => {
    return (
        <Grid container>
            <Grid item xs={2} sx={{padding: "20px"}}>
                <Skeleton variant="rectangular" width="100%" style={{height: "100vh"}} />
            </Grid>
            <Grid item xs={10}>
                <Box sx={{ width: "100%" }}>
                    <Typography variant="h1"><Skeleton /></Typography>
                    <Skeleton animation="wave" />
                    <Skeleton animation={false} />
                    <Skeleton variant="rectangular" width="100%">
                        <div style={{ paddingTop: '57%' }} />
                    </Skeleton>
                </Box>
            </Grid>
        </Grid>
    );
}

export default MainSuspenseFallback;
