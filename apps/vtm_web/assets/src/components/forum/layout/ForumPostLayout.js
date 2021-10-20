// @flow

import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";
import { defaultFormatDateAndTime } from "../../../_base/utils";

type Props = {
    post: ?Post;
    children: any;
}

const ForumPostLayout = ({post, children}: Props): any => {
    return (
        <Grid item xs={12}>
            <Paper elevation={10} sx={{
                padding: "20px",
                margin: "20px"
            }}>
                <Grid container>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                    <Grid item xs={12} sx={{textAlign: "right"}}>
                        <Typography component="span" sx={{
                            fontSize: "12px"
                        }}>
                            {defaultFormatDateAndTime(post?.insertedAt)}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}

export default ForumPostLayout;
