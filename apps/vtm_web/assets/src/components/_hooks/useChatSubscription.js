// @flow

import {useEffect, useRef} from "react";
import {subscribe} from "../../_base/relay-utils";
import subscriptionObservable from "../../services/subscriptions/ChatSubscription";
import type {ChatEntry} from "../../services/base-types";
import useSubscriptionTokenQuery from "../../services/queries/accounts/SubscriptionTokenQuery";

const useChatSubscription = (id: string, setAdditionalEntries: (Array<ChatEntry> => Array<ChatEntry>) => void): any => {
    const chatToken = useSubscriptionTokenQuery();

    const setAdditionalEntriesRef = useRef(setAdditionalEntries);

    useEffect(() => {
        const handleUnhandledExceptionAtChat = e => {
            console.error("Unhandled error while subscribing", e);

            if (typeof e === "string" && e.indexOf("message [") !== -1) {
                document.location.reload(false);
            }
        };

        window.addEventListener("unhandledrejection", handleUnhandledExceptionAtChat);

        const showNewChatEntry = entry => setAdditionalEntriesRef.current(es => [...es, entry]);

        const performSubscription = token =>
            subscribe(subscriptionObservable(id, token), showNewChatEntry, (e, _) => {
                console.error("Error while performing chat subscription.", e);
                // showUserNotification({
                //     type: "error",
                //     message: "C'è stato un problema nella connessione della chat, ricarica la pagina per ritentare."
                // });
                // Trying to reload the page instead
                document.location.reload(false);
            });

        if (chatToken != null && chatToken !== "") {
            console.debug("subscribing");
            const subscription = performSubscription(chatToken);
            return () => {
                console.info("unsubscribing");
                window.removeEventListener("unhandledrejection", handleUnhandledExceptionAtChat);
                subscription.unsubscribe();
            };
        }
    }, [id, chatToken]);

}

export default useChatSubscription;
