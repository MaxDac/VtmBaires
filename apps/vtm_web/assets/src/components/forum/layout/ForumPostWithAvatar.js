// @flow

import React from "react";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import Box from "@mui/material/Box";

type Props = {
    onGame: boolean;
    post: ?Post;
}

const ForumPostWithAvatar = ({post, onGame}: Props): any => {
    const style = () => onGame
        ? mainFontFamily
        : {};

    return (
        <Box>
            <img style={{width: "100px", height: "100px", border: "2px grey dotted"}} 
                 src={post?.creatorAvatar}
                 alt={`${post?.creatorName ?? ""} Avatar`}
                 align="left"
                 vspace="10px"
                 hspace="10px" />
            <Box component="span">
                <Typography style={{
                    ...style(),
                    color: "#C92929"
                }}>
                    {post?.creatorName}
                </Typography>
                <Typography sx={style()}>
                    {post?.text}
                </Typography>
            </Box>
        </Box>
    );
}

export default ForumPostWithAvatar;
