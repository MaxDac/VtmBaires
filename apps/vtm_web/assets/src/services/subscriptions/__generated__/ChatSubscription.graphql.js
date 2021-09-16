/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatSubscriptionVariables = {|
  mapId: string
|};
export type ChatSubscriptionResponse = {|
  +newChatEntry: ?{|
    +id: string,
    +text: ?string,
    +result: ?string,
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
) {
  newChatEntry(mapId: $mapId) {
    id
    text
    result
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
    "cacheID": "a0599ef0e9fb9f0dfb48fa2b16358bdb",
    "id": null,
    "metadata": {},
    "name": "ChatSubscription",
    "operationKind": "subscription",
    "text": "subscription ChatSubscription(\n  $mapId: ID!\n) {\n  newChatEntry(mapId: $mapId) {\n    id\n    text\n    result\n    characterId\n    characterChatAvatar\n    chatMapId\n    characterName\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '3d043162d494a26db08872833c954707';
module.exports = node;
