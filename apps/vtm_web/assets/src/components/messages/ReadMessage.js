// @flow

import React, {useContext, useEffect} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getMessageQuery} from "../../services/queries/messages/GetMessageQuery";
import type {GetMessageQuery} from "../../services/queries/messages/__generated__/GetMessageQuery.graphql";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import {getInitials} from "../../_base/utils";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ReturnToMessagesControl from "./components/ReturnToMessagesControl";
import {useHistory} from "react-router-dom";
import DeleteMessageMutation from "../../services/mutations/messages/DeleteMessageMutation";
import {UtilityContext} from "../../contexts";
import SetMessageReadMutation from "../../services/mutations/messages/SetMessageReadMutation";
import ParsedText from "../../_base/components/ParsedText";
import {useRelayEnvironment} from "react-relay";
import { MainRoutes } from "../MainRouter";

type Props = {
    messageId: string;
}

const ReadMessage = ({messageId}: Props): any => {
    const history = useHistory();
    const environment = useRelayEnvironment();
    const {openDialog, showUserNotification} = useContext(UtilityContext);
    const message = useCustomLazyLoadQuery<GetMessageQuery>(getMessageQuery, {messageId})?.getMessage;

    useEffect(() => {
        if (message?.id != null && !message.read) {
            SetMessageReadMutation(environment, message.id)
                .catch(e => console.error("Error while setting read flag on the message.", e));
        }
    }, [environment, message]);

    const avatarSize = 72;

    const avatarStyle = {
        width: avatarSize,
        height: avatarSize
    };

    const getSenderName = () =>
        message?.senderCharacter?.name ?? message?.senderUser?.name;

    const getReceiverName = () =>
        message?.receiverCharacter?.name ?? message?.receiverCharacter?.name;

    const getAvatarSrc = () => {
        if (message?.senderCharacter?.chatAvatar) {
            return (<Avatar alt="character-avatar" src={message?.senderCharacter?.chatAvatar} sx={avatarStyle} />);
        }

        return <Avatar sx={avatarStyle}>{getInitials(getSenderName() ?? "")}</Avatar>
    }

    const deleteMessage = _ =>
        openDialog("Cancella messaggio", "Sei sicuro di voler cancellare il messaggio?", () => {
            DeleteMessageMutation(environment, messageId)
                .catch(e => showUserNotification({
                    type: "error",
                    graphqlError: e,
                    message: "Si è verificato un errore cancellando il messaggio."
                }))
                .finally(() => history.push(MainRoutes.messages));
        });

    return (
        <ReturnToMessagesControl>
            <Card sx={{width: "100%"}}>
                <CardContent>
                    <Grid container sx={{width: "100%"}}>
                        <Grid item xs={3} sm={2} md={1}>
                            {getAvatarSrc()}
                        </Grid>
                        <Grid item xs={9} sm={10} md={11}>
                            <Typography>
                                <b>From: </b> {getSenderName()}
                            </Typography>
                            <Typography>
                                <b>To: </b> {getReceiverName()}
                            </Typography>
                            <Typography>
                                <b>Subject: </b> {message?.subject}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper variant="outlined" component="div" sx={{
                                padding: "10px",
                                margin: "10px"
                            }}>
                                <ParsedText text={message?.text} />
                            </Paper>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{textAlign: "right"}}>
                    <Button type="button" onClick={_ => history.push(MainRoutes.newMessage(messageId))}>Rispondi</Button>
                    <Button type="button" onClick={deleteMessage}>Elimina</Button>
                </CardActions>
            </Card>
        </ReturnToMessagesControl>
    );
}

export default ReadMessage;
