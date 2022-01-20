// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getHavenUnresolvedEventsQuery} from "../../../services/queries/haven/GetHavenUnresolvedEventsQuery";
import type {
    GetHavenUnresolvedEventsQuery
} from "../../../services/queries/haven/__generated__/GetHavenUnresolvedEventsQuery.graphql";
import {HavenEventsListWrapper} from "../../haven/HavenEventsListWrapper";
import Stack from "@mui/material/Stack";

const AdminHavenEventsInternal = ({fetchKey, component}) => {
    const events = useCustomLazyLoadQuery<GetHavenUnresolvedEventsQuery>(getHavenUnresolvedEventsQuery, {}, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.getUnresolvedEvents?.result;

    return component(events);
}

const AdminHavenEvents = (): any => {
    return (
        <Stack direction="column">
            <h1 style={{
                fontFamily: 'Disturbed',
                marginRight: "20px"
            }}>
                Eventi nel Dominio
            </h1>

            <HavenEventsListWrapper isMaster
                                    component={AdminHavenEventsInternal} />
        </Stack>
    );
};

export default AdminHavenEvents;
