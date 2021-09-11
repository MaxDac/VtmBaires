/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type chatSubscriptionVariables = {|
  mapId: string
|};
export type chatSubscriptionResponse = {|
  +newChatEntry: ?{|
    +id: ?string,
    +text: ?string,
    +result: ?string,
    +characterId: ?string,
    +characterChatAvatar: ?string,
    +chatMapId: ?string,
    +characterName: ?string,
  |}
|};
export type chatSubscription = {|
  variables: chatSubscriptionVariables,
  response: chatSubscriptionResponse,
|};


/*
subscription chatSubscription(
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
    "name": "chatSubscription",
    "selections": (v1/*: any*/),
    "type": "RootSubscriptionType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatSubscription",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "036111dd29fb1f053b424d59a647f3ee",
    "id": null,
    "metadata": {},
    "name": "chatSubscription",
    "operationKind": "subscription",
    "text": "subscription chatSubscription(\n  $mapId: ID!\n) {\n  newChatEntry(mapId: $mapId) {\n    id\n    text\n    result\n    characterId\n    characterChatAvatar\n    chatMapId\n    characterName\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ecbd13afe619d35cb329d40fde0fed42';
module.exports = node;
