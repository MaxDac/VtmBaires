// @flow

import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import type {Post} from "../../../../services/queries/forum/GetForumThreadPostsQuery";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import BorderColorIcon from '@mui/icons-material/BorderColor';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import {MainRoutes} from "../../../MainRouter";
import {useHistory} from "react-router-dom";
import DeletePostMutation from "../../../../services/mutations/forum/DeletePostMutation";
import {useRelayEnvironment} from "react-relay";
import {handleMutation} from "../../../../_base/utils";
import {menuIconStyle} from "../../../_layout/menu/menu-base-utils";
import type {GenericReactComponent} from "../../../../_base/types";
import {useRecoilValue} from "recoil";
import {sessionCharacterStateAtom} from "../../../../session/atoms";
import {useDialog} from "../../../../_base/providers/DialogProvider";
import {useCustomSnackbar} from "../../../../_base/notification-utils";
import {isUserMasterSelector} from "../../../../session/selectors";

type Props = {
    threadId: string;
    post: ?Post;
    children: any;
    onReload: () => void;
}

const ForumPostLayout = ({threadId, post, children, onReload}: Props): GenericReactComponent => {
    const environment = useRelayEnvironment()
    const history = useHistory()
    const user = useRecoilValue(sessionCharacterStateAtom)
    const isUseMaster = useRecoilValue(isUserMasterSelector)
    const {showDialog} = useDialog()
    const {enqueueSnackbar} = useCustomSnackbar()

    const modifyPost = () =>
        history.push(MainRoutes.modifyForumPost(threadId, post?.id ?? ""));

    const deletePost = () => {
        if (post?.id != null) {
            const postId = post.id;
            showDialog("Cancellazione post", "Sei sicuro di voler cancellare questo post?", () => {
                handleMutation(() => DeletePostMutation(environment, postId), enqueueSnackbar, {
                    successMessage: "Post eliminato con successo",
                    onCompleted: onReload
                })
            });
                
        }
    };

    const isUserOfPost = post?.user?.id != null && user?.id != null && post.user.id === user.id;

    const bottomControls = () => {
        if (isUseMaster || isUserOfPost) {
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
