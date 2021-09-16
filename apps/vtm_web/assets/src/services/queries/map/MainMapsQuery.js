// @flow

import type {GraphQLTaggedNode} from "relay-runtime";
import graphql from "babel-plugin-relay/macro";
import {convertToJavascriptArray, useCustomLazyLoadQuery} from "../../../_base/relay-utils";
import type {Map} from "../../base-types";
import {convertToMap} from "../../base-types";
import {emptyArray, log} from "../../../_base/utils";

export const mainMapsQuery: GraphQLTaggedNode = graphql`
    query MainMapsQuery {
        mainMaps {
            id
            name
            description
            children {
                id
                name
            }
        }
    }
`;

export const convert: any => any = result => {
    return convertToJavascriptArray(result?.mainMaps).map(convertToMap) ?? emptyArray();
}

export default function useMainMaps(): Array<Map> {
    const ret = useCustomLazyLoadQuery(mainMapsQuery, {});
    log("ret", ret);
    return convert(ret);
}
