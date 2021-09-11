// @flow

import graphql from 'babel-plugin-relay/macro';
import {wrapQueryAuthorized} from "../../relay-utils";
import {loadQuery} from "react-relay";
import environment from "../../../_base/relay-environment";

export type MapLocationSlim = {
    id: string;
    name: string;
    description: string;
    isChat: boolean;
}

export type MapLocation = MapLocationSlim & {
    image: string;
}

export type ChatEntry = {
    id: string;
    chatMapId: string;
    characterId: string;
    characterName: string;
    characterChatAvatar: string;
    result: string;
    text: string;
}

export const mainMapsQuery: any = graphql`
    query ChatQueriesMainMapsQuery {
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
    query ChatQueriesSectionMapsQuery($parentId: ID!) {
        sectionMaps(parentId: $parentId) {
            id
            name
            description
            isChat
        }
    }
`;

const mapQuery = graphql`
    query ChatQueriesMapQuery($id: ID!) {
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
    query ChatQueriesChatEntriesQuery($mapId: ID!) {
        mapChatEntries(mapId: $mapId) {
            id
            chatMapId
            characterId
            characterName
            characterChatAvatar
            result
            text
        }
    }
`;

export const preloadedMainMapsQuery: any = loadQuery(environment, mainMapsQuery, {});

const extractMapId = <T: MapLocationSlim>(map: T): T => ({
    ...map,
    id: map.id.replace("map-", "")
});

export const mapsQueryPromise = (parentId: string): Promise<Array<MapLocationSlim>> => {
    return wrapQueryAuthorized<{ sectionMaps: Array<MapLocationSlim> }>(mapsQuery, {
        parentId: parentId
    })
        .then(x => x.sectionMaps.map(extractMapId));
};

export const mapQueryPromise = (id: string): Promise<MapLocation> => {
    return wrapQueryAuthorized<{ map: MapLocation }>(mapQuery, {
        id: id
    })
        .then(x => extractMapId(x.map));
};

export const chatEntriesQueryPromise = (mapId: string): Promise<Array<ChatEntry>> => {
    return wrapQueryAuthorized<{ mapChatEntries: Array<ChatEntry> }>(chatEntriesQuery, {
        mapId: mapId
    })
        .then(x => x.mapChatEntries);
};
