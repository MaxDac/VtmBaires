// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapQueryAuthorized} from "../../relay-utils";
import {loadQuery} from "react-relay";
import environment from "../../../_base/relay-environment";
import type {Id} from "../character/character-types";

export type MapLocationSlim = {
    id: string;
    name: string;
    description: string;
    isChat: string;
}

export type MainMapLocation = {
    id: string;
    name: string;
    description: string;
    childs: Array<MapLocationSlim>;
}

export type MapLocation = {
    id: string;
    name: string;
    description: string;
    image: string;
    isChat: string;
}

export type ChatEntry = {
    id: string;
    chatMapId: string;
    characterId: string;
    characterName: string;
    result: string;
    text: string;
}

export const mainMapsQuery: any = graphql`
    query chatQueriesMainMapsQuery {
        mainMaps {
            id
            name
            description
            childs {
                id
                name
            }
        }
    }
`;

const mapsQuery = graphql`
    query chatQueriesSectionMapsQuery($parentId: ID!) {
        sectionMaps(parentId: $parentId) {
            id
            name
            description
            isChat
        }
    }
`;

const mapQuery = graphql`
    query chatQueriesMapQuery($id: ID!) {
        map(id: $id) {
            id
            name
            description
            image
            isChat
        }
    }
`;

const chatEntriesQuery = graphql`
    query chatQueriesChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            chatMapId
            characterId
            characterName
            result
            text
        }
    }
`;

export const preloadedMainMapsQuery: any = loadQuery(environment, mainMapsQuery, {});

export const mapsQueryPromise = (parentId: string): Promise<Array<MapLocationSlim>> => {
    return wrapQueryAuthorized<{ sectionMaps: Array<MapLocationSlim> }>(mapsQuery, {
        parentId: parentId
    })
        .then(x => x.sectionMaps);
};

export const mapQueryPromise = (id: string): Promise<MapLocation> => {
    return wrapQueryAuthorized<{ map: MapLocation }>(mapQuery, {
        id: id
    })
        .then(x => x.map);
};

export const chatEntriesQueryPromise = (mapId: string): Promise<Array<ChatEntry>> => {
    return wrapQueryAuthorized<{ mapChatEntries: Array<ChatEntry> }>(chatEntriesQuery, {
        mapId: mapId
    })
        .then(x => x.mapChatEntries);
};
