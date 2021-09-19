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
    +master: ?boolean,
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
    master
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
        "name": "master",
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
    "cacheID": "f655dc541aecb454e5e9cab37413ebde",
    "id": null,
    "metadata": {},
    "name": "GetChatEntriesQuery",
    "operationKind": "query",
    "text": "query GetChatEntriesQuery(\n  $mapId: ID!\n) {\n  mapChatEntries(mapId: $mapId) {\n    id\n    chatMapId\n    characterId\n    characterName\n    characterChatAvatar\n    master\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '56a72f4fe318a232bb1a2f7edeaee7c4';
module.exports = node;
