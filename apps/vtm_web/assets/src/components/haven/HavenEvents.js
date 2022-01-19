// @flow

import React, {useContext} from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getCharacterHavenEventsQuery} from "../../services/queries/haven/GetCharacterHavenEventsQuery";
import type {
    GetCharacterHavenEventsQuery
} from "../../services/queries/haven/__generated__/GetCharacterHavenEventsQuery.graphql";
import {useSession} from "../../services/session-service";
import {useRelayEnvironment} from "react-relay";
import {UtilityContext} from "../../contexts";
import {handleMutation} from "../../_base/utils";
import resolveEventMutation from "../../services/mutations/havens/ResolveEventMutation";
import HavenEventsList from "./HavenEventsList";

export type HavenEventsInternalProps = {
    characterId: string;
    fetchKey: number;
    resolveEvent: string => void;
};

const HavenEventsInternal = ({characterId, fetchKey, resolveEvent}: HavenEventsInternalProps) => {
    const events = useCustomLazyLoadQuery<GetCharacterHavenEventsQuery>(getCharacterHavenEventsQuery, {
        characterId: characterId
    }, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.getCharacterDomainEvents?.result;

    return (
        <HavenEventsList events={events}
                         resolveEvent={resolveEvent} />
    )
};

export type HavenEventsWrapperProps = {
    component: HavenEventsInternalProps => any;
};

export const HavenEventsWrapper = ({component}: HavenEventsWrapperProps): any => {
    const {showUserNotification, openDialog} = useContext(UtilityContext);
    const environment = useRelayEnvironment();
    const [,character] = useSession();
    const [fetchKey, setFetchKey] = React.useState<number>(0);

    const resolveEvent = (id: string) => {
        openDialog(
            "Risolvi evento",
            "Sei sicuro di voler risolvere o ignorare questo evento? Se confermi, l'evento non sarà più visibile.",
            () => {
                handleMutation(() => resolveEventMutation(environment, {
                    eventId: id
                }).finally(_ => setFetchKey(p => p + 1)), showUserNotification, {
                    successMessage: "L'evento è stato correttamente risolto"
                });
            });
    };


    if (character?.id != null) {
        return component({
            characterId: character.id,
            fetchKey: fetchKey,
            resolveEvent: resolveEvent
        });
    }

    return (<></>);
};

const HavenEvents = (): any => {
    return (
        <HavenEventsWrapper component={HavenEventsInternal} />
    );
};

export default HavenEvents;
