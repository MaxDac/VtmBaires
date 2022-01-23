// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../_base/relay-utils";
import {getCharacterHavenEventsQuery} from "../../services/queries/haven/GetCharacterHavenEventsQuery";
import type {
    GetCharacterHavenEventsQuery
} from "../../services/queries/haven/__generated__/GetCharacterHavenEventsQuery.graphql";
import HavenEventsListWrapper from "./HavenEventsListWrapper";
import type {HavenEventsInternalProps} from "./HavenEventsListWrapper";
import Stack from "@mui/material/Stack";
import RequireAuth from "../_auth/RequireAuth";
import RouterPage from "../RouterPage";

const HavenEvents = (): any => {
    return (
        <RequireAuth>
            <RouterPage>
                <Stack direction="column">
                    <h1 style={{
                        fontFamily: 'Disturbed',
                        marginRight: "20px"
                    }}>
                        Eventi nel Dominio del personaggio
                    </h1>

                    <HavenEventsListWrapper component={HavenEventsInternal} />
                </Stack>
            </RouterPage>
        </RequireAuth>
    );
};

const HavenEventsInternal = ({characterId, fetchKey, component}: HavenEventsInternalProps) => {
    const events = useCustomLazyLoadQuery<GetCharacterHavenEventsQuery>(getCharacterHavenEventsQuery, {
        characterId: characterId
    }, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.getCharacterDomainEvents?.result;

    return component(events);
};

export default HavenEvents;
