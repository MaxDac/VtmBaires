/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChangeCharacterExperienceInput = {|
  characterId: string,
  experienceChange: number,
|};
export type ChangeCharacterExperienceMutationVariables = {|
  input: ChangeCharacterExperienceInput
|};
export type ChangeCharacterExperienceMutationResponse = {|
  +changeCharacterExperience: ?{|
    +result: ?{|
      +id: string
    |}
  |}
|};
export type ChangeCharacterExperienceMutation = {|
  variables: ChangeCharacterExperienceMutationVariables,
  response: ChangeCharacterExperienceMutationResponse,
|};


/*
mutation ChangeCharacterExperienceMutation(
  $input: ChangeCharacterExperienceInput!
) {
  changeCharacterExperience(input: $input) {
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
    "concreteType": "ChangeCharacterExperiencePayload",
    "kind": "LinkedField",
    "name": "changeCharacterExperience",
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
    "name": "ChangeCharacterExperienceMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCharacterExperienceMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "093c37f113620efe1dfe24c326c342f7",
    "id": null,
    "metadata": {},
    "name": "ChangeCharacterExperienceMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeCharacterExperienceMutation(\n  $input: ChangeCharacterExperienceInput!\n) {\n  changeCharacterExperience(input: $input) {\n    result {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'dc56f4eef5b0feb45563cbf3456e8c9f';
module.exports = node;
