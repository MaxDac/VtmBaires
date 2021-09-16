/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetCharacterStageQueryVariables = {|
  id: string
|};
export type GetCharacterStageQueryResponse = {|
  +getCharacter: ?{|
    +id: string,
    +stage: ?number,
    +isComplete: ?boolean,
    +approved: ?boolean,
  |}
|};
export type GetCharacterStageQuery = {|
  variables: GetCharacterStageQueryVariables,
  response: GetCharacterStageQueryResponse,
|};


/*
query GetCharacterStageQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    id
    stage
    isComplete
    approved
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "getCharacter",
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
        "name": "stage",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isComplete",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "approved",
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
    "name": "GetCharacterStageQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GetCharacterStageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "873f743f4eb14c9163555c31b484a961",
    "id": null,
    "metadata": {},
    "name": "GetCharacterStageQuery",
    "operationKind": "query",
    "text": "query GetCharacterStageQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    id\n    stage\n    isComplete\n    approved\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '00fef2fcf5658b4b289166f38ebf7d07';
module.exports = node;
