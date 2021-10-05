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
    +character: ?{|
      +id: string,
      +name: ?string,
      +chatAvatar: ?string,
    |},
    +chatMap: ?{|
      +id: string
    |},
    +master: ?boolean,
    +result: ?string,
    +text: ?string,
    +insertedAt: ?any,
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
    character {
      id
      name
      chatAvatar
    }
    chatMap {
      id
    }
    master
    result
    text
    insertedAt
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
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
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "character",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "chatAvatar",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "ChatLocation",
        "kind": "LinkedField",
        "name": "chatMap",
        "plural": false,
        "selections": [
          (v1/*: any*/)
        ],
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "insertedAt",
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
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetChatEntriesQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "eebf24294bde7a50cc95e90ff8cfbd77",
    "id": null,
    "metadata": {},
    "name": "GetChatEntriesQuery",
    "operationKind": "query",
    "text": "query GetChatEntriesQuery(\n  $mapId: ID!\n) {\n  mapChatEntries(mapId: $mapId) {\n    id\n    character {\n      id\n      name\n      chatAvatar\n    }\n    chatMap {\n      id\n    }\n    master\n    result\n    text\n    insertedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'd5407372de03f6121747b185f6ae0d3d';
module.exports = node;
