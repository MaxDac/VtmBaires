/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AddAdvantagesInput = {|
  attributes?: ?$ReadOnlyArray<?CharacterAttributeRequest>,
  characterId: string,
  newStage: number,
  request: CharacterFinalizationRequest,
|};
export type CharacterAttributeRequest = {|
  attributeId: string,
  characterId: string,
  value: number,
|};
export type CharacterFinalizationRequest = {|
  advantages: string,
  notes?: ?string,
  predatorTypeId?: ?string,
|};
export type AddAdvantagesMutationVariables = {|
  input: AddAdvantagesInput
|};
export type AddAdvantagesMutationResponse = {|
  +addAdvantages: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type AddAdvantagesMutation = {|
  variables: AddAdvantagesMutationVariables,
  response: AddAdvantagesMutationResponse,
|};


/*
mutation AddAdvantagesMutation(
  $input: AddAdvantagesInput!
) {
  addAdvantages(input: $input) {
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
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "AddAdvantagesPayload",
    "kind": "LinkedField",
    "name": "addAdvantages",
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
    "name": "AddAdvantagesMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddAdvantagesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "08a75161ee656f869e53b9289efa84f8",
    "id": null,
    "metadata": {},
    "name": "AddAdvantagesMutation",
    "operationKind": "mutation",
    "text": "mutation AddAdvantagesMutation(\n  $input: AddAdvantagesInput!\n) {\n  addAdvantages(input: $input) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '91a98d4426e67957ae251f1d19d6142f';
module.exports = node;
