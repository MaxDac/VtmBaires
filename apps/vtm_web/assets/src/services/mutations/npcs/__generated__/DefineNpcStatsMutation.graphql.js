/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type NpcStatsRequest = {|
  advantages: string,
  bloodPotency: number,
  generation: number,
  humanity: number,
  notes?: ?string,
  predatorTypeId: string,
  willpower: number,
|};
export type DefineNpcStatsMutationVariables = {|
  characterId: string,
  request: NpcStatsRequest,
|};
export type DefineNpcStatsMutationResponse = {|
  +defineNpcStats: ?{|
    +response: ?{|
      +id: string
    |}
  |}
|};
export type DefineNpcStatsMutation = {|
  variables: DefineNpcStatsMutationVariables,
  response: DefineNpcStatsMutationResponse,
|};


/*
mutation DefineNpcStatsMutation(
  $characterId: ID!
  $request: NpcStatsRequest!
) {
  defineNpcStats(input: {characterId: $characterId, request: $request}) {
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
    "concreteType": "DefineNpcStatsPayload",
    "kind": "LinkedField",
    "name": "defineNpcStats",
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
    "name": "DefineNpcStatsMutation",
    "selections": (v1/*: any*/),
    "type": "RootMutationType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DefineNpcStatsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cd5352fb213bd0c747cadc842fd7b6db",
    "id": null,
    "metadata": {},
    "name": "DefineNpcStatsMutation",
    "operationKind": "mutation",
    "text": "mutation DefineNpcStatsMutation(\n  $characterId: ID!\n  $request: NpcStatsRequest!\n) {\n  defineNpcStats(input: {characterId: $characterId, request: $request}) {\n    response {\n      id\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '112ff079101a748ef2ad134079301339';
module.exports = node;
