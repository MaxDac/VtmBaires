// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../Main.Layout.Style";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ForumPost from "./ForumPost";
import type { Post } from "../../../services/queries/forum/GetForumThreadPostsQuery";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import { getCharacterAvatarQuery } from "../../../services/queries/character/GetCharacterAvatarQuery";
import type { GetCharacterAvatarQuery } from "../../../services/queries/character/__generated__/GetCharacterAvatarQuery.graphql";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import type {GetCharacterChatAvatarQuery} from "../../../services/queries/character/__generated__/GetCharacterChatAvatarQuery.graphql";
import {getCharacterChatAvatarQuery} from "../../../services/queries/character/GetCharacterChatAvatarQuery";
import Avatar from "@mui/material/Avatar";
import { defaultFormatDateAndTime } from "../../../_base/date-utils";
import ParsedText from "../../../_base/components/ParsedText";

type Props = {
    onGame: boolean;
    post: ?Post;
}

const ForumChatAvatar = ({characterId, characterName}): any => {
    const avatar = useCustomLazyLoadQuery<GetCharacterChatAvatarQuery>(getCharacterChatAvatarQuery, {
        characterId: characterId
    }, {
        fetchPolicy: "store-or-network"
    })?.getCharacterChatAvatar?.chatAvatar;

    return (
        <td style={{width: "50px"}}>
            <Avatar src={avatar}
                    sx={{width: "50px", height: "50px"}}
                    alt={`${characterName ?? ""} Avatar`} />
        </td>
    );
};

const ForumAvatar = ({characterId, characterName}): any => {
    const avatar = useCustomLazyLoadQuery<GetCharacterAvatarQuery>(getCharacterAvatarQuery, { id: characterId }, {
        fetchPolicy: "store-or-network"
    })?.getCharacterAvatar?.avatar;

    return (
        <td style={{width: "120px"}}>
            <Avatar style={{width: "100px", height: "100px"}}
                    src={avatar}
                    alt={`${characterName ?? ""} Avatar`} />
        </td>
    );
};

const ForumPostWithAvatarInternal = ({characterId, post, onGame}): any => {
    const theme = useTheme();
    const style = () => onGame
        ? mainFontFamily
        : {};

    const showChatAvatar = useMediaQuery(theme.breakpoints.down('md'));

    const avatarControl = () =>
        showChatAvatar
            ? (<ForumChatAvatar characterId={characterId} characterName={post?.character?.name} />)
            : (<ForumAvatar characterId={characterId} characterName={post?.character?.name} />);

    return (
        <Box>
            <table>
                <tbody>
                    <tr>
                        {avatarControl()}
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
                                        <ParsedText text={post?.text} sx={style()} />
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
