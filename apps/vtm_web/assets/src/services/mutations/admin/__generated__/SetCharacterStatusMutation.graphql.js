/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type SetCharacterStatusRequest = {|
  aggravatedDamage?: ?number,
  damage?: ?number,
  hunger?: ?number,
  stains?: ?number,
  willpowerDamage?: ?number,
|};
export type SetCharacterStatusMutationVariables = {|
  characterId: string,
  request: SetCharacterStatusRequest,
|};
export type SetCharacterStatusMutationResponse = {|
  +setCharacterStatus: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type SetCharacterStatusMutation = {|
  variables: SetCharacterStatusMutationVariables,
  response: SetCharacterStatusMutationResponse,
|};


/*
mutation SetCharacterStatusMutation(
  $characterId: ID!
  $request: SetCharacterStatusRequest!
) {
  setCharacterStatus(input: {characterId: $characterId, request: $request}) {
    result {
      id
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
    "name": "request"
  }
],
v1 = [
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
            "name": "request",
            "variableName": "request"
          }
        ],
        "kind": "ObjectValue",
        "name": "input"
      }
    ],
    "concreteType": "SetCharacterStatusPayload",
    "kind": "LinkedField",
    "name": "setCharacterStatus",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "result",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "id",
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
    "name": "SetCharacterStatusMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SetCharacterStatusMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "83951ce4499ec09be2c2307438ebc505",
    "id": null,
    "metadata": {},
    "name": "SetCharacterStatusMutation",
    "operationKind": "mutation",
    "text": "mutation SetCharacterStatusMutation(\n  $characterId: ID!\n  $request: SetCharacterStatusRequest!\n) {\n  setCharacterStatus(input: {characterId: $characterId, request: $request}) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'b4245fe67e114d4a42b4fc18baf60113';
module.exports = node;
