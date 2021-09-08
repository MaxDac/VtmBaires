/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type getCharacterStageQueryVariables = {|
  id: string
|};
export type getCharacterStageQueryResponse = {|
  +getCharacter: ?{|
    +info: ?{|
      +id: ?string
    |},
    +stage: ?number,
  |}
|};
export type getCharacterStageQuery = {|
  variables: getCharacterStageQueryVariables,
  response: getCharacterStageQueryResponse,
|};
*/


/*
query getCharacterStageQuery(
  $id: ID!
) {
  getCharacter(id: $id) {
    info {
      id
    }
    stage
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
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
        "concreteType": "CharacterInfo",
        "kind": "LinkedField",
        "name": "info",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "stage",
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
    "name": "getCharacterStageQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getCharacterStageQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9d2ab93dc82b6604ed25b5f06f6ae5a6",
    "id": null,
    "metadata": {},
    "name": "getCharacterStageQuery",
    "operationKind": "query",
    "text": "query getCharacterStageQuery(\n  $id: ID!\n) {\n  getCharacter(id: $id) {\n    info {\n      id\n    }\n    stage\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '3623a811d2bc41311742660f67fedbea';

module.exports = node;
