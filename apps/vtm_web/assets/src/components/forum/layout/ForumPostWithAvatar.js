// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import {useCharacterAvatarQuery} from "../../../services/queries/character/GetCharacterAvatarQuery";
import ForumPost from "./ForumPost";
import {defaultFormatDateAndTime} from "../../../_base/utils";
import type { Post } from "../../../services/queries/forum/GetForumThreadPostsQuery";

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
            <table>
                <tbody>
                    <tr>
                        <td style={{width: "120px"}}>
                            <img style={{width: "100px", height: "100px", border: "2px grey dotted"}} 
                                src={avatar}
                                alt={`${post?.character?.name ?? ""} Avatar`}
                                align="left"
                                vspace="10px"
                                hspace="10px" />
                        </td>
                        <td valign="top" style={{width: "100%"}}>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Typography style={{
                                        ...style(),
                                        color: "#C92929"
                                    }}>
                                        {post?.character?.name}
                                    </Typography>
                                </Grid>
                                <Grid item component="div" xs={6} sx={{
                                    fontSize: "13px",
                                    display: "inline-flex"
                                }}>
                                    <div style={{
                                        textAlign: "right",
                                        marginTop: "auto",
                                        width: "100%"
                                    }}>
                                        {defaultFormatDateAndTime(post?.insertedAt)}
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper component="div" variant="outlined" sx={{
                                        minHeight: "90px",
                                        padding: "10px"
                                    }}>
                                        <Typography sx={style()}>
                                            {post?.text}
                                        </Typography>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </td>
                    </tr>    
                </tbody>                
            </table>
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
