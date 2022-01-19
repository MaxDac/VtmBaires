// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import HavenEventsList from "../../haven/HavenEventsList";
import {getHavenUnresolvedEventsQuery} from "../../../services/queries/haven/GetHavenUnresolvedEventsQuery";
import type {
    GetHavenUnresolvedEventsQuery
} from "../../../services/queries/haven/__generated__/GetHavenUnresolvedEventsQuery.graphql";
import {HavenEventsWrapper} from "../../haven/HavenEvents";

const AdminHavenEventsInternal = ({fetchKey, resolveEvent}) => {
    const events = useCustomLazyLoadQuery<GetHavenUnresolvedEventsQuery>(getHavenUnresolvedEventsQuery, {}, {
        fetchPolicy: "network-only",
        fetchKey: fetchKey
    })?.getUnresolvedEvents?.result;

    return (
        <HavenEventsList events={events}
                         resolveEvent={resolveEvent} />
    )
}

const AdminHavenEvents = (): any => {
    return (
        <HavenEventsWrapper component={AdminHavenEventsInternal} />
    );
};

export default AdminHavenEvents;
