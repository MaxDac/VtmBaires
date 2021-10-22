// @flow

import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {useHistory} from "react-router-dom";
import { MainRoutes } from "../../MainRouter";

type Props = {
    message: {|
        id: string,
        subject: string;
        onGame: ?boolean;
        read: ?boolean;
        senderUser?: ?{|
            id: string;
            name: ?string;
        |};
        senderCharacter?: ?{|
            id: string;
            name: ?string;
        |};
        receiverUser?: ?{|
            id: string;
            name: ?string;
        |};
        receiverCharacter?: ?{|
            id: string;
            name: ?string;
        |};
        insertedAt: ?string;
        modifiedAt: ?string;
    |}
}

const MessageListItem = ({message}: Props): any => {
    const history = useHistory();

    const readIcon = () =>
        message.read
            ? <RadioButtonUncheckedIcon />
            : <RadioButtonCheckedIcon />;

    const getName = (): string =>
        message.senderUser?.name
            ? message.senderCharacter?.name ?? message.senderUser?.name
            : message.receiverCharacter?.name ?? message.receiverUser?.name ?? "";

    const formatMessageTime = () =>
        !!message.insertedAt
            ? ` (${message.insertedAt})`
            : "";

    const getNameAndHour = () =>
        `${getName()}${formatMessageTime()}`

    const getSubject = () => message?.subject;



    return (
        <ListItem button
                  key={message.id}
                  alignItems="flex-start"
                  onClick={_ => history.push(MainRoutes.readMessage(message.id))}>
            <ListItemAvatar>
                {readIcon()}
            </ListItemAvatar>
            <ListItemText
                primary={getNameAndHour()}
                secondary={getSubject()}>
            </ListItemText>
        </ListItem>
    );
}

export default MessageListItem;
