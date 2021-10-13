/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type NpcAttributesRequest = {|
  attributes: $ReadOnlyArray<?NpcAttribute>
|};
export type NpcAttribute = {|
  id: string,
  value: number,
|};
export type AssignNpcAttributesMutationVariables = {|
  characterId: string,
  request: NpcAttributesRequest,
|};
export type AssignNpcAttributesMutationResponse = {|
  +assignNpcAttributes: ?{|
    +response: ?{|
      +id: string
    |}
  |}
|};
export type AssignNpcAttributesMutation = {|
  variables: AssignNpcAttributesMutationVariables,
  response: AssignNpcAttributesMutationResponse,
|};


/*
mutation AssignNpcAttributesMutation(
  $characterId: ID!
  $request: NpcAttributesRequest!
) {
  assignNpcAttributes(input: {characterId: $characterId, request: $request}) {
    response {
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
    "concreteType": "AssignNpcAttributesPayload",
    "kind": "LinkedField",
    "name": "assignNpcAttributes",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Character",
        "kind": "LinkedField",
        "name": "response",
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
    "name": "AssignNpcAttributesMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AssignNpcAttributesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cc63f74841d425018db7ef581821f639",
    "id": null,
    "metadata": {},
    "name": "AssignNpcAttributesMutation",
    "operationKind": "mutation",
    "text": "mutation AssignNpcAttributesMutation(\n  $characterId: ID!\n  $request: NpcAttributesRequest!\n) {\n  assignNpcAttributes(input: {characterId: $characterId, request: $request}) {\n    response {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '73e863c16a22f2da64e9ee78eabf9dd6';
module.exports = node;
