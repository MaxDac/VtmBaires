/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type AllCharactersQueryVariables = {||};
export type AllCharactersQueryResponse = {|
  +charactersList: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type AllCharactersQuery = {|
  variables: AllCharactersQueryVariables,
  response: AllCharactersQueryResponse,
|};


/*
query AllCharactersQuery {
  charactersList {
    id
    name
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Character",
    "kind": "LinkedField",
    "name": "charactersList",
    "plural": true,
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AllCharactersQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AllCharactersQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "d8f881a9632b741e0904f28a26753912",
    "id": null,
    "metadata": {},
    "name": "AllCharactersQuery",
    "operationKind": "query",
    "text": "query AllCharactersQuery {\n  charactersList {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '85ad58b861b5f3fac581d286a3d7bb47';
module.exports = node;
