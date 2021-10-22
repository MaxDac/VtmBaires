// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {defaultFormatDateAndTime} from "../../../_base/utils";

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
                <Grid container sx={{padding: "3px"}}>
                    <Grid item xs={6}>
                        <Typography sx={{
                            ...mainFontFamily
                        }}>
                            {post?.character?.name ?? post?.user?.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} sx={{
                        textAlign: "right",
                        display: "inline-flex"
                    }}>
                        <div style={{
                            marginTop: "auto",
                            textAlign: "right",
                            width: "100%",
                            fontSize: "13px"
                        }}>
                            {defaultFormatDateAndTime(post?.insertedAt)}
                        </div>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Paper component="div" variant="outlined">
                    <Typography sx={{
                        ...style(),
                        padding: "10px"
                    }}>
                        {post?.text}
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    );
}

export default ForumPost;
