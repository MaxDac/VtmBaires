// @flow

import graphql from "babel-plugin-relay/macro";
import type {Map} from "../../base-types";
import {convertToMap} from "../../base-types";
import {useCustomLazyLoadQuery} from "../../../_base/relay-utils";

const mapQuery = graphql`
    query MapQuery($id: ID!) {
        map(id: $id) {
            id
            name
            description
            image
            isChat
        }
    }
`;

export default function useMap(id: string): ?Map {
    const ret = useCustomLazyLoadQuery(mapQuery, { id });
    return convertToMap(ret?.map);
}
