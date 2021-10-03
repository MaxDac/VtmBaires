// @flow

import React from "react";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";

type Props = {
    onGame: boolean;
    post: ?Post;
}

const ForumPostWithAvatar = ({post, onGame}: Props): any => {
    const style = () => onGame
        ? mainFontFamily
        : {};

    return (
        <Grid container>
            <Grid item xs={6} sm={3} md={2} sx={{textAlign: "center"}}>
                <Avatar sx={{width: "100px", height: "100px"}} src={post?.creatorAvatar} />
            </Grid>
            <Grid item xs={6} sm={9} md={10}>
                <Typography sx={style()}>
                    {post?.text}
                </Typography>
            </Grid>
        </Grid>
    );
}

export default ForumPostWithAvatar;
