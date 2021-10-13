/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type ChangeCharacterAttributeInput = {|
  attributeId: string,
  characterId: string,
  newValue: number,
|};
export type ChangeCharacterAttributeMutationVariables = {|
  input: ChangeCharacterAttributeInput
|};
export type ChangeCharacterAttributeMutationResponse = {|
  +changeCharacterAttribute: ?{|
    +result: ?boolean
  |}
|};
export type ChangeCharacterAttributeMutation = {|
  variables: ChangeCharacterAttributeMutationVariables,
  response: ChangeCharacterAttributeMutationResponse,
|};


/*
mutation ChangeCharacterAttributeMutation(
  $input: ChangeCharacterAttributeInput!
) {
  changeCharacterAttribute(input: $input) {
    result
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
    "concreteType": "ChangeCharacterAttributePayload",
    "kind": "LinkedField",
    "name": "changeCharacterAttribute",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "result",
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
    "name": "ChangeCharacterAttributeMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeCharacterAttributeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "798ae8c045281533b65cdf6d9a7014fd",
    "id": null,
    "metadata": {},
    "name": "ChangeCharacterAttributeMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeCharacterAttributeMutation(\n  $input: ChangeCharacterAttributeInput!\n) {\n  changeCharacterAttribute(input: $input) {\n    result\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '7116ea8e26913458017068d28c8a356c';
module.exports = node;
