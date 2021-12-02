// @flow

import React, {useContext} from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import type { Post } from "../../../services/queries/forum/GetForumThreadPostsQuery";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import {useSession} from "../../../services/session-service";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {MainRoutes} from "../../MainRouter";
import {useHistory} from "react-router-dom";
import {UtilityContext} from "../../../contexts";
import DeletePostMutation from "../../../services/mutations/forum/DeletePostMutation";
import {useRelayEnvironment} from "react-relay";
import {handleMutation} from "../../../_base/utils";
import {menuIconStyle} from "../../_layout/menu/menu-base-utils";

type Props = {
    threadId: string;
    post: ?Post;
    children: any;
    onReload: () => void;
}

const ForumPostLayout = ({threadId, post, children, onReload}: Props): any => {
    const environment = useRelayEnvironment();
    const history = useHistory();
    const [user,] = useSession();
    const {showUserNotification, openDialog} = useContext(UtilityContext);

    const modifyPost = () =>
        history.push(MainRoutes.modifyForumPost(threadId, post?.id ?? ""));

    const deletePost = () => {
        if (post?.id != null) {
            const postId = post.id;
            openDialog("Cancellazione post", "Sei sicuro di voler cancellare questo post?", () => {
                handleMutation(() => DeletePostMutation(environment, postId), showUserNotification, {
                    successMessage: "Post eliminato con successo",
                    onCompleted: onReload
                })
            });
                
        }
    };

    const userIsMaster = user?.role === "MASTER";

    const isUserOfPost = post?.user?.id != null && user?.id != null && post.user.id === user.id;

    const bottomControls = () => {
        if (userIsMaster || isUserOfPost) {
            return (
                <Grid item xs={12} sx={{
                    textAlign: "right"
                }}>
                    <Stack direction="row"
                           spacing={2}
                           sx={{
                               width: "90px",
                               marginRight: "0.5rem",
                               marginLeft: "auto"
                           }}>
                        <Box>
                            <Tooltip title="Modifica post">
                                <IconButton edge="end"
                                            aria-label="Modifica"
                                            onClick={_ => modifyPost()}>
                                    <BorderColorIcon sx={menuIconStyle} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box>
                            <Tooltip title="Rimuovi post">
                                <IconButton edge="end"
                                            aria-label="Rimuovi"
                                            onClick={_ => deletePost()}>
                                    <DeleteIcon sx={menuIconStyle} />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Stack>
                </Grid>
            );
        }

        return (<></>);
    }

    return (
        <Grid item xs={12}>
            <Paper elevation={10} sx={{
                padding: "5px",
                marginTop: "10px",
                maginBottom: "10px",
                background: "#121212"
            }}>
                <Grid container>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                    {bottomControls()}
                </Grid>
            </Paper>
        </Grid>
    );
}

export default ForumPostLayout;
