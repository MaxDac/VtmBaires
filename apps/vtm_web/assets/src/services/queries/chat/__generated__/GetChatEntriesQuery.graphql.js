/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetChatEntriesQueryVariables = {|
  mapId: string
|};
export type GetChatEntriesQueryResponse = {|
  +mapChatEntries: ?$ReadOnlyArray<?{|
    +id: string,
    +chatMapId: ?string,
    +characterId: ?string,
    +characterName: ?string,
    +characterChatAvatar: ?string,
    +result: ?string,
    +text: ?string,
  |}>
|};
export type GetChatEntriesQuery = {|
  variables: GetChatEntriesQueryVariables,
  response: GetChatEntriesQueryResponse,
|};


/*
query GetChatEntriesQuery(
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
    "name": "GetChatEntriesQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetChatEntriesQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8bb21bf4decff5c538f63d0102f160ee",
    "id": null,
    "metadata": {},
    "name": "GetChatEntriesQuery",
    "operationKind": "query",
    "text": "query GetChatEntriesQuery(\n  $mapId: ID!\n) {\n  mapChatEntries(mapId: $mapId) {\n    id\n    chatMapId\n    characterId\n    characterName\n    characterChatAvatar\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '54ce6c38f11a4d6f51c859076fbc52ed';
module.exports = node;
