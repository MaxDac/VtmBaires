// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapMutation} from '../../../_base/relay-utils';
import type {IEnvironment} from "relay-runtime/store/RelayStoreTypes";

const updateSessionMapMutation = graphql`
    mutation UpdateSessionMapMutation($mapId: ID!) {
        updateSessionMap(mapId: $mapId)
    }
`;

export const updateSessionMap = (environment: IEnvironment, mapId: string): Promise<any> => 
    wrapMutation(environment, updateSessionMapMutation, {
        mapId: mapId
    });
