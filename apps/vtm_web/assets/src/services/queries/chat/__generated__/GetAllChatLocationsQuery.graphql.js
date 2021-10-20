/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type GetAllChatLocationsQueryVariables = {||};
export type GetAllChatLocationsQueryResponse = {|
  +allChatLocations: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
  |}>
|};
export type GetAllChatLocationsQuery = {|
  variables: GetAllChatLocationsQueryVariables,
  response: GetAllChatLocationsQueryResponse,
|};


/*
query GetAllChatLocationsQuery {
  allChatLocations {
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
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "allChatLocations",
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
    "name": "GetAllChatLocationsQuery",
    "selections": (v0/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GetAllChatLocationsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "eef3fd018490c3cc3f0401747ce32e32",
    "id": null,
    "metadata": {},
    "name": "GetAllChatLocationsQuery",
    "operationKind": "query",
    "text": "query GetAllChatLocationsQuery {\n  allChatLocations {\n    id\n    name\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '67f31ec66cc0a696a4598d6435c1f053';
module.exports = node;
