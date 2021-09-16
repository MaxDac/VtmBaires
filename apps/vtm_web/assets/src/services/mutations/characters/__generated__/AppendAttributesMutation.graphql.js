/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type CharacterAttributeRequest = {|
  attributeId: string,
  characterId: string,
  value: number,
|};
export type AppendAttributesMutationVariables = {|
  request: $ReadOnlyArray<?CharacterAttributeRequest>,
  newStage: number,
|};
export type AppendAttributesMutationResponse = {|
  +appendCharacterAttributes: ?{|
    +id: string,
    +name: ?string,
  |}
|};
export type AppendAttributesMutation = {|
  variables: AppendAttributesMutationVariables,
  response: AppendAttributesMutationResponse,
|};


/*
mutation AppendAttributesMutation(
  $request: [CharacterAttributeRequest]!
  $newStage: Int!
) {
  appendCharacterAttributes(request: $request, newStage: $newStage) {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "newStage"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "request"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "newStage",
        "variableName": "newStage"
      },
      {
        "kind": "Variable",
        "name": "request",
        "variableName": "request"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "appendCharacterAttributes",
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
        "name": "name",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppendAttributesMutation",
    "selections": (v2/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppendAttributesMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f0fc2344a528e8c16909b49fc1fcbf01",
    "id": null,
    "metadata": {},
    "name": "AppendAttributesMutation",
    "operationKind": "mutation",
    "text": "mutation AppendAttributesMutation(\n  $request: [CharacterAttributeRequest]!\n  $newStage: Int!\n) {\n  appendCharacterAttributes(request: $request, newStage: $newStage) {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '08f617dfeffa1c8e55da67ed93950800';
module.exports = node;
