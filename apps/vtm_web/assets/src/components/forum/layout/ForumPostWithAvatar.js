// @flow

import React from "react";
import type {Post} from "../../../services/queries/forum/GetForumThreadQuery";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import Box from "@mui/material/Box";
import {useCharacterAvatarQuery} from "../../../services/queries/character/GetCharacterAvatarQuery";
import ForumPost from "./ForumPost";

type Props = {
    onGame: boolean;
    post: ?Post;
}

const ForumPostWithAvatarInternal = ({characterId, post, onGame}): any => {
    const avatar = useCharacterAvatarQuery(characterId)
        ?.getCharacterAvatar
        ?.avatar;

    const style = () => onGame
        ? mainFontFamily
        : {};

    return (
        <Box>
            <img style={{width: "100px", height: "100px", border: "2px grey dotted"}} 
                 src={avatar}
                 alt={`${post?.character?.name ?? ""} Avatar`}
                 align="left"
                 vspace="10px"
                 hspace="10px" />
            <Box component="span">
                <Typography style={{
                    ...style(),
                    color: "#C92929"
                }}>
                    {post?.character?.name}
                </Typography>
                <Typography sx={style()}>
                    {post?.text}
                </Typography>
            </Box>
        </Box>
    );
};

const ForumPostWithAvatar = ({post, onGame}: Props): any => {
    console.log("post", post);
    if (post?.character?.id) {
        return (
            <ForumPostWithAvatarInternal characterId={post?.character?.id} 
                                         post={post} 
                                         onGame={onGame} />
        );
    }

    return (
        <ForumPost post={post} onGame={onGame} />
    );
};

export default ForumPostWithAvatar;
