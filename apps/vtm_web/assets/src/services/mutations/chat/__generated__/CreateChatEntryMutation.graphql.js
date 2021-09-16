/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatEntryRequest = {|
  characterId: string,
  chatMapId: string,
  result?: ?string,
  text?: ?string,
|};
export type CreateChatEntryMutationVariables = {|
  entry?: ?ChatEntryRequest
|};
export type CreateChatEntryMutationResponse = {|
  +createChatEntry: ?{|
    +id: string,
    +chatMapId: ?string,
    +characterId: ?string,
    +characterName: ?string,
    +result: ?string,
    +text: ?string,
  |}
|};
export type CreateChatEntryMutation = {|
  variables: CreateChatEntryMutationVariables,
  response: CreateChatEntryMutationResponse,
|};


/*
mutation CreateChatEntryMutation(
  $entry: ChatEntryRequest
) {
  createChatEntry(entry: $entry) {
    id
    chatMapId
    characterId
    characterName
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
    "name": "entry"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "entry",
        "variableName": "entry"
      }
    ],
    "concreteType": "MapChatEntry",
    "kind": "LinkedField",
    "name": "createChatEntry",
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
    "name": "CreateChatEntryMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateChatEntryMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ee8662208b99efe47283dc65b6f9c25a",
    "id": null,
    "metadata": {},
    "name": "CreateChatEntryMutation",
    "operationKind": "mutation",
    "text": "mutation CreateChatEntryMutation(\n  $entry: ChatEntryRequest\n) {\n  createChatEntry(entry: $entry) {\n    id\n    chatMapId\n    characterId\n    characterName\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '601b98e644240e90e0b6be88b0d9a20a';
module.exports = node;
