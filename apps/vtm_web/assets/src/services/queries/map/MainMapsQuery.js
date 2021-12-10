// @flow

import type {GraphQLTaggedNode} from "relay-runtime";
import graphql from "babel-plugin-relay/macro";
import {convertToJavascriptArray} from "../../../_base/relay-utils";
import {convertToMap} from "../../base-types";
import {emptyArray} from "../../../_base/utils";

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
};
