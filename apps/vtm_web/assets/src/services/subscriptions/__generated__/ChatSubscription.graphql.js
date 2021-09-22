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
    +characterId: ?string,
    +characterChatAvatar: ?string,
    +chatMapId: ?string,
    +characterName: ?string,
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
    characterId
    characterChatAvatar
    chatMapId
    characterName
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
v1 = [
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
        "kind": "ScalarField",
        "name": "characterId",
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
        "name": "chatMapId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "characterName",
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
    "selections": (v1/*: any*/),
    "type": "RootSubscriptionType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChatSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "30f0e3705c8ac5d0b0ef75e678e31269",
    "id": null,
    "metadata": {},
    "name": "ChatSubscription",
    "operationKind": "subscription",
    "text": "subscription ChatSubscription(\n  $mapId: ID!\n  $token: String!\n) {\n  newChatEntry(mapId: $mapId, token: $token) {\n    id\n    text\n    result\n    master\n    characterId\n    characterChatAvatar\n    chatMapId\n    characterName\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '7ef3ff6cbce36ec90fdab0cc627ebef3';
module.exports = node;
