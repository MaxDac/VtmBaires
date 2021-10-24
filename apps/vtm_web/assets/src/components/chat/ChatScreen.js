// @flow

import React from "react";
import { useEffect, useRef } from "react";
import List from "@mui/material/List";
import type { ChatEntry } from "../../services/base-types";
import ChatEntryComponent from "./ChatEntryComponent";
import { emptyArray } from "../../_base/utils";
import { useChatEntriesForSubscriptions } from "./hooks/ChatEntryFromSubscriptionHook";
import {useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/styles";

type Props = {
    entries: ?Array<ChatEntry>;
    additionalEntries: ?Array<ChatEntry>;
    showCharacterDescription: (string, string) => void;
}

const ChatScreen = ({entries, additionalEntries, showCharacterDescription}: Props): any => {
    const theme = useTheme();
    const chatContainer = useRef();

    const additionalEntriesWithAvatar = useChatEntriesForSubscriptions(additionalEntries);

    const showMiniFont = useMediaQuery(theme.breakpoints.down('md'));
    const fontSize = showMiniFont ? "14px" : "16px";

    // This was previously used as a dependency for the following useEffect, but it seems that it doesn't update itself.
    // The operation performed inside the following useEffect is not asynchronous or difficult at all anyway
    // const chatContainerScrollHeight: number = (chatContainer.current: any)?.scrollHeight;

    useEffect(() => {
        const obj: any = chatContainer.current;
        // obj.scrollIntoView();
        obj.scrollTop = obj.scrollHeight;
    });

    const aggregatedEntries = () => {
        if (entries != null) {
            if (additionalEntriesWithAvatar != null) {
                return entries.concat(additionalEntriesWithAvatar);
            }
            else {
                return entries;
            }
        }

        if (additionalEntriesWithAvatar != null) {
            return additionalEntriesWithAvatar;
        }

        return emptyArray<ChatEntry>();
    }

    const showEntries = () => {
        const ets = aggregatedEntries();

        if (ets && ets.map) {
            return ets?.map((e, index) => {
                if (e != null) {
                    return (
                        <ChatEntryComponent entry={e}
                                            key={e.id}
                                            isLast={index === ets.length - 1}
                                            showCharacterDescription={showCharacterDescription}
                                            sx={{
                                                fontSize
                                            }} />
                    );
                }

                return (<></>);
            });
        }

        return [];
    };

    return (
        <List sx={{
            flex: "4 0",
            overflowY: "scroll"
        }} ref={chatContainer}>
            {showEntries()}
        </List>
    );
}

export default ChatScreen;
