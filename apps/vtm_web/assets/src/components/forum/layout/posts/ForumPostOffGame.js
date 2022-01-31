// @flow

import React from "react";
import Typography from "@mui/material/Typography";
import {mainFontFamily} from "../../../Main.Layout.Style";
import Grid from "@mui/material/Grid";
import type { Post } from "../../../../services/queries/forum/GetForumThreadPostsQuery";
import { defaultFormatDateAndTime } from "../../../../_base/date-utils";
import ParsedText from "../../../../_base/components/ParsedText";
import Box from "@mui/material/Box";
import type {GenericReactComponent} from "../../../../_base/types";

type Props = {
    onGame: boolean;
    post: ?Post;
}

const ForumPostOffGame = ({post, onGame}: Props): GenericReactComponent => {
    const style = () => onGame
        ? mainFontFamily
        : {};

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container sx={{padding: "3px"}}>
                    <Grid item xs={6}>
                        <Typography component="h1" sx={{
                            ...style,
                            fontSize: "1.5rem",
                            fontVariant: "small-caps"
                        }}>
                            {post?.user?.name ?? "Utente cancellato"}
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
                <Box component="div">
                    <ParsedText text={post?.text} useNaturalNewLine sx={{
                        ...style(),
                        padding: "10px"
                    }} />
                </Box>
            </Grid>
        </Grid>
    );
}

export default ForumPostOffGame;
