/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type HealMutationVariables = {|
  characterId: string,
  chatMapId: string,
|};
export type HealMutationResponse = {|
  +heal: ?{|
    +result: ?{|
      +id: string,
      +character: ?{|
        +id: string
      |},
      +text: ?string,
    |}
  |}
|};
export type HealMutation = {|
  variables: HealMutationVariables,
  response: HealMutationResponse,
|};


/*
mutation HealMutation(
  $characterId: ID!
  $chatMapId: ID!
) {
  heal(input: {characterId: $characterId, chatMapId: $chatMapId}) {
    result {
      id
      character {
        id
      }
      text
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "characterId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "chatMapId"
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
        "fields": [
          {
            "kind": "Variable",
            "name": "characterId",
            "variableName": "characterId"
          },
          {
            "kind": "Variable",
            "name": "chatMapId",
            "variableName": "chatMapId"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "HealPayload",
    "kind": "LinkedField",
    "name": "heal",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MapChatEntry",
        "kind": "LinkedField",
        "name": "result",
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
              (v1/*: any*/)
            ],
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HealMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HealMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "c48f973b95974cfa4b242943f3cc457c",
    "id": null,
    "metadata": {},
    "name": "HealMutation",
    "operationKind": "mutation",
    "text": "mutation HealMutation(\n  $characterId: ID!\n  $chatMapId: ID!\n) {\n  heal(input: {characterId: $characterId, chatMapId: $chatMapId}) {\n    result {\n      id\n      character {\n        id\n      }\n      text\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '48e3600d55ae387c0a389417a9a97717';
module.exports = node;
