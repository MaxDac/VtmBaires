// @flow

import graphql from "babel-plugin-relay/macro";
import {convertToJavascriptArray, useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {Map} from "../../base-types";
import {convertToMap} from "../../base-types";
import {emptyArray} from "../../../_base/utils";
import type {Query} from "relay-runtime/util/RelayRuntimeTypes";
import type {SectionMapsQueryResponse, SectionMapsQueryVariables,} from "./__generated__/SectionMapsQuery.graphql";

export const mapsQuery: Query<SectionMapsQueryVariables, SectionMapsQueryResponse> = graphql`
    query SectionMapsQuery($parentId: ID!) {
        sectionMaps(parentId: $parentId) {
            id
            name
            description
            isChat
        }
    }
`;

const convert = result =>
    convertToJavascriptArray(result?.sectionMaps).map(convertToMap) ?? emptyArray();

export default function useSectionMaps(id: string): Array<Map> {
    const ret = useCustomLazyLoadQuery(mapsQuery, { parentId: id });
    return convert(ret);
}
