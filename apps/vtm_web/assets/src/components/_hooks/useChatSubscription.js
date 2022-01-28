// @flow

import {useEffect, useRef} from "react";
import {subscribe} from "../../_base/relay-utils";
import subscriptionObservable from "../../services/subscriptions/ChatSubscription";
import type {ChatEntry} from "../../services/base-types";
import useSubscriptionTokenQuery from "../../services/queries/accounts/SubscriptionTokenQuery";
import {showDesktopNotification} from "../../_base/notification-utils";
import {useSession} from "../../services/session-service";
import type {GenericReactComponent} from "../../_base/types";

const useChatSubscription = (id: string, setAdditionalEntries: (Array<ChatEntry> => Array<ChatEntry>) => void): GenericReactComponent => {
    const [,character] = useSession();
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

        const showNewChatEntry = (entry: ChatEntry) => {
            if (entry?.command === "DELETE") {
                setAdditionalEntriesRef.current(es =>
                    es.filter(e =>
                        e?.id != null &&
                        e.id !== entry?.id));
            }
            else {
                if (entry?.character?.id !== character?.id) {
                    showDesktopNotification("Chat", "Hai ricevuto un nuovo messaggio");
                }

                setAdditionalEntriesRef.current(es => [...es, entry]);
            }
        }

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
                console.debug("unsubscribing");
                window.removeEventListener("unhandledrejection", handleUnhandledExceptionAtChat);
                subscription.unsubscribe();
            };
        }
    }, [id, chatToken, character?.id]);
}

export default useChatSubscription;
