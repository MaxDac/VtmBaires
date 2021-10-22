// @flow

import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";

type Props = {
    post: ?Post;
    children: any;
}

const ForumPostLayout = ({post, children}: Props): any => {
    return (
        <Grid item xs={12}>
            <Paper elevation={10} sx={{
                padding: "5px",
                marginTop: "10px",
                maginBottom: "10px"
            }}>
                <Grid container>
                    <Grid item xs={12} sx={{textAlign: "right"}}>
                        <Typography component="span" sx={{
                            fontSize: "12px"
                        }}>
                            
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default ForumPostLayout;
