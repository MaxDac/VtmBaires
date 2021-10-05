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
    +character: ?{|
      +id: string,
      +name: ?string,
    |},
    +chatMap: ?{|
      +id: string
    |},
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
    character {
      id
      name
    }
    chatMap {
      id
    }
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
        "name": "entry",
        "variableName": "entry"
      }
    ],
    "concreteType": "MapChatEntry",
    "kind": "LinkedField",
    "name": "createChatDiceEntry",
    "plural": false,
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
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateChatDiceEntryMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "7601a1f32203b77a3cd400fde96babf7",
    "id": null,
    "metadata": {},
    "name": "CreateChatDiceEntryMutation",
    "operationKind": "mutation",
    "text": "mutation CreateChatDiceEntryMutation(\n  $entry: ChatDiceEntryRequest\n) {\n  createChatDiceEntry(entry: $entry) {\n    id\n    character {\n      id\n      name\n    }\n    chatMap {\n      id\n    }\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ce56ea339785f3bd1f0bce8ed7beaebf';
module.exports = node;
