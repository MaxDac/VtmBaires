// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {GetMessageQuery} from "../../../services/queries/messages/__generated__/GetMessageQuery.graphql";
import {getMessageQuery} from "../../../services/queries/messages/GetMessageQuery";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import type {SubmitProperties} from "../NewMessage";
import MessageTemplate from "./MessageTemplate";

type Props = {
    messageId: string;
    onSubmit: SubmitProperties => void;
    toUserId?: string;
}

const ReplyToMessage = ({messageId, onSubmit, toUserId}: Props): any => {
    const message = useCustomLazyLoadQuery<GetMessageQuery>(
        getMessageQuery,
        {messageId: messageId},
        {
            fetchPolicy: "store-and-network"
        })?.getMessage;

    const onSubmitInternal = (e: SubmitProperties) => onSubmit({
        ...e,
        replyToMessageId: message?.id
    });

    return (
        <Grid container>
            <Grid item xs={12}>
                <Card sx={{margin: "20px"}}>
                    <CardContent>
                        <Typography variant="h5" component="div" sx={{padding: "10px"}}>
                            Messaggio precedente
                        </Typography>
                        <Typography>
                            {message?.text}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <MessageTemplate submitted={onSubmitInternal}
                                 characterId={message?.senderCharacter?.id}
                                 userId={message?.senderUser?.id}
                                 toUserId={toUserId}
                                 onGame={message?.onGame === true}
                                 isReply={true}
                                 subject={`Re: ${message?.subject ?? ""}`}/>
            </Grid>
        </Grid>
    );
}

export default ReplyToMessage;
