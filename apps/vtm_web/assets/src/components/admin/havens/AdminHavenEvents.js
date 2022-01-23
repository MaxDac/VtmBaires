// @flow

import React from "react";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import {getHavenUnresolvedEventsQuery} from "../../../services/queries/haven/GetHavenUnresolvedEventsQuery";
import type {
  GetHavenUnresolvedEventsQueryResponse,
  GetHavenUnresolvedEventsQueryVariables,
} from "../../../services/queries/haven/__generated__/GetHavenUnresolvedEventsQuery.graphql";
import {HavenEventsListWrapper} from "../../haven/HavenEventsListWrapper";
import Stack from "@mui/material/Stack";
import { emptyExactObject } from "../../../_base/utils";

const AdminHavenEventsInternal = ({fetchKey, component}) => {
    const events = useCustomLazyLoadQuery<GetHavenUnresolvedEventsQueryVariables, GetHavenUnresolvedEventsQueryResponse>(getHavenUnresolvedEventsQuery, emptyExactObject(), {
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
