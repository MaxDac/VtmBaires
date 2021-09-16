/**
 * @flow
 */

/* eslint-disable */

'use strict';

import type { ConcreteRequest } from 'relay-runtime';
export type MainMapsQueryVariables = {||};
export type MainMapsQueryResponse = {|
  +mainMaps: ?$ReadOnlyArray<?{|
    +id: string,
    +name: ?string,
    +description: ?string,
    +children: ?$ReadOnlyArray<?{|
      +id: string,
      +name: ?string,
    |}>,
  |}>
|};
export type MainMapsQuery = {|
  variables: MainMapsQueryVariables,
  response: MainMapsQueryResponse,
|};


/*
query MainMapsQuery {
  mainMaps {
    id
    name
    description
    children {
      id
      name
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "ChatLocation",
    "kind": "LinkedField",
    "name": "mainMaps",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
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
        "concreteType": "ChatLocation",
        "kind": "LinkedField",
        "name": "children",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/)
        ],
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
    "name": "MainMapsQuery",
    "selections": (v2/*: any*/),
    "type": "RootQueryType",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "MainMapsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "b9886ec8d104b1399c8fedc244543a32",
    "id": null,
    "metadata": {},
    "name": "MainMapsQuery",
    "operationKind": "query",
    "text": "query MainMapsQuery {\n  mainMaps {\n    id\n    name\n    description\n    children {\n      id\n      name\n    }\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node: any).hash = '5d697fa94b71c3a66b6e9a1b12922784';
module.exports = node;
