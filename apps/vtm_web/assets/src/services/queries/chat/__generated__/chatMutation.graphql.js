/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ChatEntryRequest = {|
  characterId: string,
  chatMapId: string,
  result?: ?string,
  text?: ?string,
|};
export type chatMutationVariables = {|
  entry?: ?ChatEntryRequest
|};
export type chatMutationResponse = {|
  +createChatEntry: ?{|
    +id: ?string,
    +chatMapId: ?string,
    +characterId: ?string,
    +characterName: ?string,
    +result: ?string,
    +text: ?string,
  |}
|};
export type chatMutation = {|
  variables: chatMutationVariables,
  response: chatMutationResponse,
|};
*/


/*
mutation chatMutation(
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

const node/*: ConcreteRequest*/ = (function(){
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
    "name": "chatMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "chatMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "12886bd73d656fa3d2cb96831ff38529",
    "id": null,
    "metadata": {},
    "name": "chatMutation",
    "operationKind": "mutation",
    "text": "mutation chatMutation(\n  $entry: ChatEntryRequest\n) {\n  createChatEntry(entry: $entry) {\n    id\n    chatMapId\n    characterId\n    characterName\n    result\n    text\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '4115bae0f01e71c4c815bcfaf291f15d';

module.exports = node;
