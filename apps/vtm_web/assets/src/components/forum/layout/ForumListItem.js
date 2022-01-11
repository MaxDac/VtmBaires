// @flow

import React, {useContext} from "react";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import {handleMutation} from "../../../_base/utils";
import {useSession} from "../../../services/session-service";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import {UtilityContext} from "../../../contexts";
import DeleteThreadMutation from "../../../services/mutations/forum/DeleteThreadMutation";
import {useRelayEnvironment} from "react-relay";
import {useHistory} from "react-router-dom";
import {MainRoutes} from "../../MainRouter";
import {menuIconStyle} from "../../_layout/menu/menu-base-utils";
import ForumListItemText from "./ForumListItemText";

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
            +updatedAt: ?any
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
    onClick: ?string => void;
    onUpdate?: () => void;
}

const ForumListItem = ({item, hasNewPosts, onClick, onUpdate}: ForumItemProps): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const [user,] = useSession();
    const {showUserNotification, openDialog} = useContext(UtilityContext);

    // Hack
    // This variable controls the navigation flow.
    // When the ListItem element is of type button, it's impossible to select the secondary actions because their
    // events are triggered BEFORE the ListItem click event, this way the route gets messed up as well
    // (Current page -> secondary action -> ListItem button action)
    // By using this variable, I can control the flow: if any of the second action is selected, this variable will be
    // set to *true*, "disabling" in fact the ListItem event!
    // The state was not used because the new value didn't get refreshed between the two different events, and because
    // when the component will be re-rendered, it will have to be equal to false.
    let holdAction = false;

    const isUserMaster = () => user?.role === "MASTER";

    const isUserThreadCreator = () => user?.id != null && item?.creatorUser?.id != null && user.id === item.creatorUser.id;

    const accessThreadEventHandler = _ => {
        if (!holdAction) {
            onClick(item?.id);
        }
    }

    const modifyThread = () => {
        holdAction = true;
        if (item?.id != null && item?.forumSection?.id != null) {
            history.push(MainRoutes.modifyForumThread(item.forumSection.id, item.id));
        }
    };

    const deleteThread = () => {
        holdAction = true;
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

        return (
            <Stack direction="row">
                {modifyAction()}
                {deleteAction()}
            </Stack>
        );
    };

    const hasNewPostsComplete = () =>
        hasNewPosts != null
            ? hasNewPosts
            : item?.hasNewPosts;

    return (
        <>
            <Divider />
            <ListItem key={item?.id}
                      alignItems="flex-start"
                      dense
                      button
                      onClick={accessThreadEventHandler}
                      secondaryAction={actions()}>
                <ForumListItemText title={item?.title}
                                   hasNewMessages={hasNewPostsComplete()}
                                   description={item?.description}
                                   lastThread={item?.lastThread} />
            </ListItem>
            <Divider />
        </>
    );
}

export default ForumListItem;
