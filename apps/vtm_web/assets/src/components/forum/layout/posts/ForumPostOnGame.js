// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../../Main.Layout.Style";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import type {Post} from "../../../../services/queries/forum/GetForumThreadPostsQuery";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/material/styles";
import {defaultFormatDateAndTime} from "../../../../_base/date-utils";
import ParsedText from "../../../../_base/components/ParsedText";
import type {GenericReactComponent} from "../../../../_base/types";
import ForumChatAvatar from "./ForumChatAvatar";
import ForumAvatar from "./ForumAvatar";
import ForumNoAvatar from "./ForumNoAvatar";

type Props = {
    post: ?Post;
    onGame: boolean;
};

export type ForumAvatarProps = {
    containerStyle: any;
};

const ForumPostOnGame = ({post, onGame}: Props): GenericReactComponent => {
    const theme = useTheme();
    const style = () => onGame
        ? mainFontFamily
        : {};

    const showChatAvatar = useMediaQuery(theme.breakpoints.down('md'));

    const avatarStyle = {
        width: "120px",
        verticalAlign: "top",
        paddingTop: "3rem"
    };

    const avatarControl = () =>
        post?.character?.id != null
            ? (showChatAvatar
                ? (<ForumChatAvatar characterId={post.character.id}
                                    characterName={post?.character?.name}
                                    containerStyle={avatarStyle} />)
                : (<ForumAvatar characterId={post.character.id}
                                characterName={post?.character?.name}
                                containerStyle={avatarStyle} />))
            : (<ForumNoAvatar containerStyle={avatarStyle} />);

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
                                        {post?.character?.name ?? "Personaggio Rimosso"}
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
                                    <Box component="div" sx={{
                                        minHeight: "90px",
                                        padding: "10px"
                                    }}>
                                        <ParsedText text={post?.text} useNaturalNewLine sx={style()} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </td>
                    </tr>    
                </tbody>                
            </table>
        </Box>
    );
};

export default ForumPostOnGame;
