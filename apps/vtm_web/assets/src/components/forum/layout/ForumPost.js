// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

type Props = {
    onGame: boolean;
    post: ?Post;
}

const ForumPost = ({post, onGame}: Props): any => {
    const style = () => onGame
        ? mainFontFamily
        : {};

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography sx={{
                    ...mainFontFamily
                }}>
                    {post?.creatorName}
                </Typography>
            </Grid>
            <Grid item xs={12} sx={{
                padding: "10px",
                margin: "10px"}}>
                <Paper component="div" variant="outlined">
                    <Typography sx={{
                        ...style(),
                        padding: "10px",
                        margin: "10px"
                    }}>
                        {post?.text}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ForumPost;
