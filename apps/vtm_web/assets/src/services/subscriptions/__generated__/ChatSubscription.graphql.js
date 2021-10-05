/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatSubscriptionVariables = {|
  mapId: string,
  token: string,
|};
export type ChatSubscriptionResponse = {|
  +newChatEntry: ?{|
    +id: string,
    +text: ?string,
    +result: ?string,
    +master: ?boolean,
    +character: ?{|
      +id: string,
      +name: ?string,
      +chatAvatar: ?string,
    |},
    +chatMap: ?{|
      +id: string
    |},
    +insertedAt: ?any,
  |}
|};
export type ChatSubscription = {|
  variables: ChatSubscriptionVariables,
  response: ChatSubscriptionResponse,
|};


/*
subscription ChatSubscription(
  $mapId: ID!
  $token: String!
) {
  newChatEntry(mapId: $mapId, token: $token) {
    id
    text
    result
    master
    character {
      id
      name
      chatAvatar
    }
    chatMap {
      id
    }
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "token"
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
      },
      {
        "kind": "Variable",
        "name": "token",
        "variableName": "token"
      }
    ],
    "concreteType": "MapChatEntry",
    "kind": "LinkedField",
    "name": "newChatEntry",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
        "name": "result",
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
    "name": "ChatSubscription",
    "selections": (v2/*: any*/),
    "type": "RootSubscriptionType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatSubscription",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "2b6e2dfe0f9099d60bd87f0ba386fd92",
    "id": null,
    "metadata": {},
    "name": "ChatSubscription",
    "operationKind": "subscription",
    "text": "subscription ChatSubscription(\n  $mapId: ID!\n  $token: String!\n) {\n  newChatEntry(mapId: $mapId, token: $token) {\n    id\n    text\n    result\n    master\n    character {\n      id\n      name\n      chatAvatar\n    }\n    chatMap {\n      id\n    }\n    insertedAt\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '99035210dc4550436d6a568056fe8807';
module.exports = node;
