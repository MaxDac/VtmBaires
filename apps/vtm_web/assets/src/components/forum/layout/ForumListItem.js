// @flow

import React, {useContext} from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import {handleMutation} from "../../../_base/utils";
import {useSession} from "../../../services/session-service";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Stack from "@mui/material/Stack";
import {UtilityContext} from "../../../contexts";
import DeleteThreadMutation from "../../../services/mutations/forum/DeleteThreadMutation";
import {useRelayEnvironment} from "react-relay";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../../MainRouter";
import { defaultFormatDateAndTime } from "../../../_base/date-utils";
import {menuIconStyle} from "../../_layout/menu/menu-base-utils";

type ForumSectionDescriptionProps = {
    description: ?string;
    newMessages: ?boolean;
    lastThreadId: ?string;
    lastThreadTitle: ?string;
    lastThreadUpdatedAt: ?string;
}

export const ForumSectionDescription = ({
                                            description,
                                            //newMessages,
                                            lastThreadId,
                                            lastThreadTitle,
                                            lastThreadUpdatedAt
}: ForumSectionDescriptionProps): any => (
    <Stack direction="row" justifyContent="space-between" sx={{width: "calc(100% - 80px)"}}>
        <Typography sx={{
            fontFamily: 'DefaultTypewriter',
            padding: "5px",
            color: "white"
        }} variant="body2">
            {description} {/* TODO - Fix the notification from the back end before showing it - newMessages ? (<b><span style={{color: "#C31313"}}>(Nuovi Messaggi)</span></b>) : (<></>)*/}
        </Typography>
        { lastThreadId != null
            ? (
                    <Typography sx={{
                        fontFamily: 'DefaultTypewriter',
                        padding: "5px",
                        color: "gray"
                    }} variant="body2">
                        Ultimo thread: {defaultFormatDateAndTime(lastThreadUpdatedAt)} - {lastThreadTitle}
                    </Typography>
            )
            : (<></>)
        }
    </Stack>
);

export type ForumItemProps = {
    item: ?{|
        +id: string,
        +forumSection: ?{|
            +id: string
        |},
        +creatorUser: ?{|
            +id: string,
            +name: ?string,
        |},
        +lastThread?: ?{|
            +id: string,
            +title: ?string,
            +updated_at: ?any
        |},
        +hasNewPosts?: ?boolean,
        +creatorCharacter: ?{|
            +id: string,
            +name: ?string,
        |},
        +title: ?string,
        +description: ?string,
        +insertedAt: ?any,
        +updatedAt: ?any,
    |};
    hasNewPosts?: ?boolean;
    internal?: boolean;
    onClick: ?string => void;
    onUpdate?: () => void;
}

const ForumListItem = ({item, hasNewPosts, internal, onClick, onUpdate}: ForumItemProps): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const [user,] = useSession();
    const {showUserNotification, openDialog} = useContext(UtilityContext);

    const isUserMaster = () => user?.role === "MASTER";

    const isUserThreadCreator = () => user?.id != null && item?.creatorUser?.id != null && user.id === item.creatorUser.id;

    const accessThreadEventHandler = _ => onClick(item?.id);

    const modifyThread = () => {
        if (item?.id != null && item?.forumSection?.id != null) {
            history.push(MainRoutes.modifyForumThread(item.forumSection.id, item.id));
        }
    };

    const deleteThread = () => {
        if (item?.id != null) {
            const threadId = item.id;

            openDialog(
                "Rimuovi Thread",
                "Sei sicuro di voler rimuovere questo Thread? Tutti i messaggi dentro il Thread saranno anche essi cancellati.",
                () => {
                    handleMutation(() => DeleteThreadMutation(environment, threadId), showUserNotification, {
                        successMessage: "Il Thread è stato cancellato con successo.",
                        onCompleted: onUpdate
                    })
                });
        }
    };

    const actions = () => {
        const modifyAction = () => {
            if (isUserMaster() || isUserThreadCreator()) {
                return (
                    <Box>
                        <Tooltip title="Modifica post">
                            <IconButton aria-label="Modifica"
                                        onClick={_ => modifyThread()}>
                                <BorderColorIcon sx={menuIconStyle} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            }

            return (<></>);
        }

        const deleteAction = () => {
            if (isUserMaster()) {
                return (
                    <Box>
                        <Tooltip title="Rimuovi post">
                            <IconButton aria-label="Rimuovi"
                                        onClick={_ => deleteThread()}>
                                <DeleteIcon sx={menuIconStyle} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                );
            }

            return (<></>);
        };

        if (internal && item?.forumSection?.id != null) {
            return (
                <Stack direction="row">
                    {modifyAction()}
                    {deleteAction()}
                    <Box>
                        <Tooltip title="Entra nel Thread">
                            <IconButton aria-label="Entra nel Thread"
                                        onClick={_ => onClick(item?.id)}>
                                <ArrowForwardIcon sx={menuIconStyle} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Stack>
            );
        }

        return (<></>);
    };

    const goToThread = () => {
        if (!(internal === true)) {
            return accessThreadEventHandler;
        }

        return undefined;
    }

    const hasNewPostsComplete = () =>
        hasNewPosts != null
            ? hasNewPosts
            : item?.hasNewPosts;

    return (
        <>
            <Divider />
            <ListItem key={item?.id}
                      alignItems="flex-start"
                      button={(!(internal === true))}
                      onClick={goToThread()}
                      secondaryAction={actions()}>
                <ListItemText primary={item?.title}
                              secondary={<ForumSectionDescription newMessages={hasNewPostsComplete()}
                                                                  description={item?.description}
                                                                  lastThreadId={item?.lastThread?.id}
                                                                  lastThreadTitle={item?.lastThread?.title}
                                                                  lastThreadUpdatedAt={item?.lastThread?.updated_at} />}
                              sx={{
                                  color: "white",
                                  fontFamily: 'DefaultTypewriter',
                                  fontSize: "24px",
                                  padding: "5px"
                              }} />
            </ListItem>
            <Divider />
        </>
    );
}

export default ForumListItem;
