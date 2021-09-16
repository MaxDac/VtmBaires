/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type PredatorTypesQueryVariables = {||};
export type PredatorTypesQueryResponse = {|
  +predatorTypes: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
  |}>
|};
export type PredatorTypesQuery = {|
  variables: PredatorTypesQueryVariables,
  response: PredatorTypesQueryResponse,
|};


/*
query PredatorTypesQuery {
  predatorTypes {
    id
    name
    description
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "PredatorType",
    "kind": "LinkedField",
    "name": "predatorTypes",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
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
    "name": "PredatorTypesQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "PredatorTypesQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "e8d8c3d2e4eed9dfe39036d7689a3156",
    "id": null,
    "metadata": {},
    "name": "PredatorTypesQuery",
    "operationKind": "query",
    "text": "query PredatorTypesQuery {\n  predatorTypes {\n    id\n    name\n    description\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = 'ca69305c79f2dd15e4e12ae7239d8425';
module.exports = node;
