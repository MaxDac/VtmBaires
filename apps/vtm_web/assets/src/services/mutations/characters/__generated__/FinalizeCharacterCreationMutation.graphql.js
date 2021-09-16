/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type FinalizeCharacterCreationInput = {|
  attributes?: ?$ReadOnlyArray<?CharacterAttributeRequest>,
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
  predatorTypeId: string,
|};
export type FinalizeCharacterCreationMutationVariables = {|
  input: FinalizeCharacterCreationInput
|};
export type FinalizeCharacterCreationMutationResponse = {|
  +finalizeCharacterCreation: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type FinalizeCharacterCreationMutation = {|
  variables: FinalizeCharacterCreationMutationVariables,
  response: FinalizeCharacterCreationMutationResponse,
|};


/*
mutation FinalizeCharacterCreationMutation(
  $input: FinalizeCharacterCreationInput!
) {
  finalizeCharacterCreation(input: $input) {
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
    "concreteType": "FinalizeCharacterCreationPayload",
    "kind": "LinkedField",
    "name": "finalizeCharacterCreation",
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
    "name": "FinalizeCharacterCreationMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FinalizeCharacterCreationMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ca69950890ec8f766b7c77f01a844d20",
    "id": null,
    "metadata": {},
    "name": "FinalizeCharacterCreationMutation",
    "operationKind": "mutation",
    "text": "mutation FinalizeCharacterCreationMutation(\n  $input: FinalizeCharacterCreationInput!\n) {\n  finalizeCharacterCreation(input: $input) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'f6118bcc3f84b0f1df21d9504d466fe4';
module.exports = node;
