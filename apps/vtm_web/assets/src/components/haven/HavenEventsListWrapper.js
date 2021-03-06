// @flow

import React from "react";
import {useRelayEnvironment} from "react-relay";
import {handleMutation} from "../../_base/utils";
import resolveEventMutation from "../../services/mutations/havens/ResolveEventMutation";
import type {HavenEvent} from "../../services/queries/haven/HavenEventFragment";
import type {GenericReactComponent} from "../../_base/types";
import HavenEventsList from "./HavenEventsList";
import {useDialog} from "../../_base/providers/DialogProvider";
import {useCustomSnackbar} from "../../_base/notification-utils";
import {useCharacterRecoilState} from "../../session/hooks";

export type HavenEventsInternalComponent = ?$ReadOnlyArray<?HavenEvent> => GenericReactComponent;

export type HavenEventsInternalProps = {
    characterId: string;
    fetchKey: number;
    component: HavenEventsInternalComponent;
};

export type HavenEventsListWrapperProps = {
    isMaster?: boolean;
    component: HavenEventsInternalProps => GenericReactComponent;
};

/**
 * This component wraps the rendering around and inside the haven page, abstracting away only the query, that has
 * to be in a React component in order to be used.
 * Basically, it works like this: Wrapper{Injected component{List}}, and the wrapper will be used by the page component.
 * @param isMaster
 * @param component
 * @return {JSX.Element|*}
 * @constructor
 */
export const HavenEventsListWrapper = ({isMaster, component}: HavenEventsListWrapperProps): GenericReactComponent => {
    const {showDialog} = useDialog()
    const {enqueueSnackbar} = useCustomSnackbar();
    const environment = useRelayEnvironment();
    const [character,] = useCharacterRecoilState()
    const [fetchKey, setFetchKey] = React.useState<number>(0);

    const resolveEvent = (id: string) => {
        showDialog(
            "Risolvi evento",
            "Sei sicuro di voler risolvere o ignorare questo evento? Se confermi, l'evento non sarà più visibile.",
            () => {
                handleMutation(() => resolveEventMutation(environment, {
                    eventId: id
                }).finally(_ => setFetchKey(p => p + 1)), enqueueSnackbar, {
                    successMessage: "L'evento è stato correttamente risolto"
                });
            });
    };

    if (character?.id != null) {
        return component({
            characterId: character.id,
            fetchKey: fetchKey,
            component: events => (
                <HavenEventsList events={events}
                                 resolveEvent={resolveEvent}
                                 isMaster={isMaster === true} />
            )
        });
    }

    return (<></>);
};

export default HavenEventsListWrapper;
