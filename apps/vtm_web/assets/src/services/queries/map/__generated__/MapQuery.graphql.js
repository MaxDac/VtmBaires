/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MapQueryVariables = {|
  id: string
|};
export type MapQueryResponse = {|
  +map: ?{|
    +id: string,
    +name: ?string,
    +description: ?string,
    +image: ?string,
    +isChat: ?boolean,
  |}
|};
export type MapQuery = {|
  variables: MapQueryVariables,
  response: MapQueryResponse,
|};


/*
query MapQuery(
  $id: ID!
) {
  map(id: $id) {
    id
    name
    description
    image
    isChat
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
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "map",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "image",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "isChat",
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
    "name": "MapQuery",
    "selections": (v1/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MapQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f92f0ab3a36e197d281250aeba38ee90",
    "id": null,
    "metadata": {},
    "name": "MapQuery",
    "operationKind": "query",
    "text": "query MapQuery(\n  $id: ID!\n) {\n  map(id: $id) {\n    id\n    name\n    description\n    image\n    isChat\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '56a07d2050004911a0011309987977bf';
module.exports = node;
