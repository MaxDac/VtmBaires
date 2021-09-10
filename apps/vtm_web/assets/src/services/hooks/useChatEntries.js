// @flow

import {useMemo, useState} from "react";
import {chatEntriesQueryPromise} from "../queries/chat/chat-queries";
import type {ChatEntry} from "../queries/chat/chat-queries";

const useChatEntries = (mapId: string): Array<ChatEntry> => {
    const [entries, setEntries] = useState<Array<ChatEntry>>([]);

    useMemo(() =>
        chatEntriesQueryPromise(mapId)
            .then(c => setEntries(c))
            .catch(e => console.error("Error while retrieving the character", e)), [mapId]);

    return entries;
}

export default useChatEntries;
