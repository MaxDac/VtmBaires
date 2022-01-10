// @flow

import React from "react";
import ListItemText from "@mui/material/ListItemText";
import {ForumSectionDescription} from "./ForumListItem";

type Props = {
    title: ?string;
    hasNewMessages: ?boolean;
    description: ?string;
    lastThread: ?{|
        +id: string,
        +title: ?string,
        +updatedAt: ?any,
    |}
};

const ForumListItemText = ({title, hasNewMessages, description, lastThread}: Props): any => {
    return (
        <ListItemText primary={title}
                      primaryTypographyProps={{
                          fontFamily: 'DefaultTypewriter',
                          padding: "5px",
                          color: "white",
                          fontSize: "1.2rem"
                      }}
                      secondary={<ForumSectionDescription newMessages={hasNewMessages}
                                                          description={description}
                                                          lastThreadId={lastThread?.id}
                                                          lastThreadTitle={lastThread?.title}
                                                          lastThreadUpdatedAt={lastThread?.updatedAt} />}
                      sx={{
                          color: "white",
                          fontFamily: 'DefaultTypewriter',
                          fontSize: "24px",
                          padding: "5px"
                      }} />
    );
}

export default ForumListItemText;
