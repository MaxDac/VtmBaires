/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChatEntryRequest = {|
  characterId: string,
  chatMapId: string,
  text?: ?string,
|};
export type CreateChatEntryMutationVariables = {|
  entry?: ?ChatEntryRequest
|};
export type CreateChatEntryMutationResponse = {|
  +createChatEntry: ?{|
    +id: string,
    +chatMap: ?{|
      +id: string
    |},
    +character: ?{|
      +id: string,
      +name: ?string,
    |},
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
    chatMap {
      id
    }
    character {
      id
      name
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
    "name": "createChatEntry",
    "plural": false,
    "selections": [
      (v1/*: any*/),
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
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateChatEntryMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "8025afac0b19bfdfd27e87030a32db7f",
    "id": null,
    "metadata": {},
    "name": "CreateChatEntryMutation",
    "operationKind": "mutation",
    "text": "mutation CreateChatEntryMutation(\n  $entry: ChatEntryRequest\n) {\n  createChatEntry(entry: $entry) {\n    id\n    chatMap {\n      id\n    }\n    character {\n      id\n      name\n    }\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'c5b851cb9a7d1d70063c58fb29e13082';
module.exports = node;
