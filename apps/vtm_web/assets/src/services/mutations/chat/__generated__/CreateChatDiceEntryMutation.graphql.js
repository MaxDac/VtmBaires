/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatDiceEntryRequest = {|
  abilityId?: ?string,
  attributeId?: ?string,
  characterId: string,
  chatMapId: string,
  difficulty?: ?number,
  freeThrow?: ?number,
  master?: ?boolean,
|};
export type CreateChatDiceEntryMutationVariables = {|
  entry?: ?ChatDiceEntryRequest
|};
export type CreateChatDiceEntryMutationResponse = {|
  +createChatDiceEntry: ?{|
    +id: string,
    +chatMapId: ?string,
    +characterId: ?string,
    +characterName: ?string,
    +result: ?string,
    +text: ?string,
  |}
|};
export type CreateChatDiceEntryMutation = {|
  variables: CreateChatDiceEntryMutationVariables,
  response: CreateChatDiceEntryMutationResponse,
|};


/*
mutation CreateChatDiceEntryMutation(
  $entry: ChatDiceEntryRequest
) {
  createChatDiceEntry(entry: $entry) {
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
    "name": "createChatDiceEntry",
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
    "name": "CreateChatDiceEntryMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateChatDiceEntryMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ee05b0b138e8eaa9cacb091d4ec8a1b1",
    "id": null,
    "metadata": {},
    "name": "CreateChatDiceEntryMutation",
    "operationKind": "mutation",
    "text": "mutation CreateChatDiceEntryMutation(\n  $entry: ChatDiceEntryRequest\n) {\n  createChatDiceEntry(entry: $entry) {\n    id\n    chatMapId\n    characterId\n    characterName\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '85a16b3b2b516eaa7e836ee98b0d4862';
module.exports = node;
