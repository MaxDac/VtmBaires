/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatQueriesChatEntriesQueryVariables = {|
  mapId: string
|};
export type ChatQueriesChatEntriesQueryResponse = {|
  +mapChatEntries: ?$ReadOnlyArray<?{|
    +id: ?string,
    +chatMapId: ?string,
    +characterId: ?string,
    +characterName: ?string,
    +characterChatAvatar: ?string,
    +result: ?string,
    +text: ?string,
  |}>
|};
export type ChatQueriesChatEntriesQuery = {|
  variables: ChatQueriesChatEntriesQueryVariables,
  response: ChatQueriesChatEntriesQueryResponse,
|};


/*
query ChatQueriesChatEntriesQuery(
  $mapId: ID!
) {
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
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mapId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "mapId",
        "variableName": "mapId"
      }
    ],
    "concreteType": "MapChatEntry",
    "kind": "LinkedField",
    "name": "mapChatEntries",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "chatMapId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "characterId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "characterName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "characterChatAvatar",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "result",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "text",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChatQueriesChatEntriesQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatQueriesChatEntriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d99f81e2ddf8464447db96f83a5c3e79",
    "id": null,
    "metadata": {},
    "name": "ChatQueriesChatEntriesQuery",
    "operationKind": "query",
    "text": "query ChatQueriesChatEntriesQuery(\n  $mapId: ID!\n) {\n  mapChatEntries(mapId: $mapId) {\n    id\n    chatMapId\n    characterId\n    characterName\n    characterChatAvatar\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '90ac6a3ef2c3a8baab37f9a5ff71db4b';
module.exports = node;
