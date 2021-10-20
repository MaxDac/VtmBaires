/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetAdminChatEntriesQueryVariables = {|
  mapId: string,
  fromDate: any,
  toDate: any,
|};
export type GetAdminChatEntriesQueryResponse = {|
  +mapAdminChatEntries: ?$ReadOnlyArray<?{|
    +id: string,
    +character: ?{|
      +id: string,
      +name: ?string,
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
export type GetAdminChatEntriesQuery = {|
  variables: GetAdminChatEntriesQueryVariables,
  response: GetAdminChatEntriesQueryResponse,
|};


/*
query GetAdminChatEntriesQuery(
  $mapId: ID!
  $fromDate: DateTime!
  $toDate: DateTime!
) {
  mapAdminChatEntries(mapId: $mapId, from: $fromDate, to: $toDate) {
    id
    character {
      id
      name
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "fromDate"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mapId"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "toDate"
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "from",
        "variableName": "fromDate"
      },
      {
        "kind": "Variable",
        "name": "mapId",
        "variableName": "mapId"
      },
      {
        "kind": "Variable",
        "name": "to",
        "variableName": "toDate"
      }
    ],
    "concreteType": "MapChatEntry",
    "kind": "LinkedField",
    "name": "mapAdminChatEntries",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "character",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "name",
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
          (v3/*: any*/)
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "GetAdminChatEntriesQuery",
    "selections": (v4/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "GetAdminChatEntriesQuery",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "92c2fa491da8fe406e03512c8da19799",
    "id": null,
    "metadata": {},
    "name": "GetAdminChatEntriesQuery",
    "operationKind": "query",
    "text": "query GetAdminChatEntriesQuery(\n  $mapId: ID!\n  $fromDate: DateTime!\n  $toDate: DateTime!\n) {\n  mapAdminChatEntries(mapId: $mapId, from: $fromDate, to: $toDate) {\n    id\n    character {\n      id\n      name\n    }\n    chatMap {\n      id\n    }\n    master\n    result\n    text\n    insertedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '11b6ad5f258397d2579472e78111e8de';
module.exports = node;
